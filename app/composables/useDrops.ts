import { onMounted, onUnmounted, ref } from 'vue'

type Drop = {
    id: number
    style: Record<string, string>
}

type Zone = {
    x: number
    y: number
    width: number
    height: number
}

type DropPhysics = {
    baseX: number
    baseY: number
    depth: number          // 0 = далеко (мелкая/тусклая), 1 = близко (крупная/яркая)
    ampX: number
    ampY: number
    freq: number
    phaseX: number
    phaseY: number
    reactionScale: number  // насколько сильно точка реагирует на курсор
    parallaxFactor: number // насколько точка "отстаёт/убегает" при скролле
    pushX: number
    pushY: number
    parallaxY: number
    // === Для клик-эффекта ===
    clickImpulseX: number
    clickImpulseY: number
    clickImpulseDecay: number
}

const TEXT_SAFE = 48
const MIN_DROP_GAP = 22
const MAX_ATTEMPTS = 30

const MAX_DROPS = 150
const DENSITY_DIVISOR = 20000

const REPEL_RADIUS = 400   // px — радиус влияния курсора ("батут")
const MAX_PUSH = 30        // px — максимальное смещение от курсора (не далеко)
const MAX_PARALLAX = 1000    // px — максимальный сдвиг от скролл-параллакса
const EASE = 0.1           // коэффициент сглаживания/пружины (0..1)
const CLICK_IMPULSE_RADIUS = 1500     // px — радиус взрыва при клике
const CLICK_MAX_FORCE = 10          // px — максимальный импульс от клика
const CLICK_DECAY = 0.92             // затухание импульса
const CLICK_WAVE_SPEED = 1600         // px/s — скорость распространения волны

export function useDrops() {
    const drops = ref<Drop[]>([])
    const physics = new Map<number, DropPhysics>()

    const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let rafId = 0
    let startTime = 0
    let initialScrollY = 0
    let mouseClientX = -9999
    let mouseClientY = -9999
    let clickEvents: Array<{ x: number; y: number; time: number; id: number }> = []
    let clickIdCounter = 0

    // === CANVAS ===
    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null
    let canvasContainer: HTMLElement | null = null

    function initCanvas() {
        canvas = document.createElement('canvas')
        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.pointerEvents = 'none'
        canvas.style.zIndex = '0'
        canvas.style.display = 'block'

        ctx = canvas.getContext('2d')

        canvasContainer = document.createElement('div')
        canvasContainer.style.position = 'fixed'
        canvasContainer.style.top = '0'
        canvasContainer.style.left = '0'
        canvasContainer.style.width = '100%'
        canvasContainer.style.height = '100%'
        canvasContainer.style.pointerEvents = 'none'
        canvasContainer.style.zIndex = '0'
        canvasContainer.style.overflow = 'hidden'
        canvasContainer.appendChild(canvas)

        document.body.appendChild(canvasContainer)

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return
        const dpr = window.devicePixelRatio || 1
        const w = window.innerWidth
        const h = window.innerHeight
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function destroyCanvas() {
        window.removeEventListener('resize', resizeCanvas)
        if (canvasContainer && canvasContainer.parentNode) {
            canvasContainer.parentNode.removeChild(canvasContainer)
        }
        canvas = null
        ctx = null
        canvasContainer = null
    }

    function getForbiddenZones(): Zone[] {
        return Array.from(
            document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,a,span,button,img,li,td,th,label,input,textarea,nav,header,footer,article,section')
        ).map(el => {
            const r = el.getBoundingClientRect()
            return {
                x: r.left - TEXT_SAFE,
                y: r.top + window.scrollY - TEXT_SAFE,
                width: r.width + TEXT_SAFE * 2,
                height: r.height + TEXT_SAFE * 2,
            }
        })
    }

    function isInZone(x: number, y: number, zones: Zone[]): boolean {
        return zones.some(z =>
            x > z.x && x < z.x + z.width &&
            y > z.y && y < z.y + z.height
        )
    }

    function isTooClose(x: number, y: number, placed: { x: number; y: number }[]): boolean {
        return placed.some(p => Math.hypot(x - p.x, y - p.y) < MIN_DROP_GAP)
    }

    function generateDrops(): void {
        const zones = getForbiddenZones()
        const totalH = document.body.scrollHeight
        const totalW = window.innerWidth
        const target = Math.min(MAX_DROPS, Math.floor((totalW * totalH) / DENSITY_DIVISOR))

        const placed: { x: number; y: number }[] = []
        const generated: Drop[] = []
        physics.clear()

        for (let i = 0; i < target; i++) {
            let valid = false
            let x = 0
            let y = 0

            for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
                x = Math.random() * totalW
                y = Math.random() * totalH
                if (!isInZone(x, y, zones) && !isTooClose(x, y, placed)) {
                    valid = true
                    break
                }
            }

            if (!valid) continue
            placed.push({ x, y })

            // depth задаёт "эффект глубины": ближние точки крупнее, ярче и резче
            const depth = Math.random()
            const size = 2.5 + depth * 7.5
            const opacity = 0.12 + depth * 0.45
            const breatheDuration = (Math.random() * 6 + 5).toFixed(1)
            const breatheDelay = (Math.random() * 4).toFixed(1)

            generated.push({
                id: i,
                style: {
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: `${opacity.toFixed(2)}`,
                    '--base-opacity': `${opacity.toFixed(2)}`,
                    animation: reduceMotion
                        ? 'none'
                        : `drop-breathe ${breatheDuration}s ${breatheDelay}s infinite ease-in-out`,
                    willChange: 'transform, opacity',
                    transition: 'none',
                },
            })

            physics.set(i, {
                baseX: x,
                baseY: y,
                depth,
                ampX: 3 + depth * 6,
                ampY: 4 + depth * 8,
                freq: 0.2 + Math.random() * 0.25,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                reactionScale: 0.5 + depth * 0.9,
                parallaxFactor: (depth - 0.5) * 0.12,
                pushX: 0,
                pushY: 0,
                parallaxY: 0,
                clickImpulseX: 0,
                clickImpulseY: 0,
                clickImpulseDecay: CLICK_DECAY,
            })
        }

        drops.value = generated
        initialScrollY = window.scrollY
        startTime = performance.now()
    }

    // === Обработка клик-импульсов ===
    function processClickImpulses(now: number) {
        // Удаляем старые клики
        clickEvents = clickEvents.filter(c => now - c.time < 2000)

        if (clickEvents.length === 0) return

        physics.forEach(p => {
            let totalImpulseX = 0
            let totalImpulseY = 0

            clickEvents.forEach(click => {
                const dx = p.baseX - click.x
                const dy = p.baseY - click.y
                const dist = Math.hypot(dx, dy)

                if (dist < CLICK_IMPULSE_RADIUS && dist > 5) {
                    // Волна: сила зависит от времени и расстояния
                    const timeSinceClick = (now - click.time) / 1000
                    const waveFront = timeSinceClick * CLICK_WAVE_SPEED
                    const waveWidth = 150

                    // Гауссиан волны
                    const waveDist = Math.abs(dist - waveFront)
                    const waveIntensity = Math.exp(-(waveDist * waveDist) / (2 * waveWidth * waveWidth))

                    if (waveIntensity > 0.01) {
                        const nx = dx / dist
                        const ny = dy / dist

                        // Ближние точки сильнее реагируют
                        const depthFactor = 0.3 + p.depth * 0.7
                        const force = waveIntensity * CLICK_MAX_FORCE * depthFactor

                        totalImpulseX += nx * force
                        totalImpulseY += ny * force
                    }
                }
            })

            if (Math.abs(totalImpulseX) > 0.1 || Math.abs(totalImpulseY) > 0.1) {
                p.clickImpulseX += totalImpulseX
                p.clickImpulseY += totalImpulseY
            }
        })
    }

    // === CANVAS RENDER ===
    function renderCanvas(now: number) {
        if (!ctx || !canvas) return

        const w = window.innerWidth
        const h = window.innerHeight
        ctx.clearRect(0, 0, w, h)

        const t = (now - startTime) / 1000
        const scrollY = window.scrollY
        const mouseDocX = mouseClientX
        const mouseDocY = mouseClientY + scrollY

        const viewTop = scrollY - 200
        const viewBottom = scrollY + window.innerHeight + 200

        physics.forEach((p, id) => {
            if (p.baseY < viewTop || p.baseY > viewBottom) return

            // лёгкое "парение" — у дальних точек слабее, у ближних заметнее
            const idleX = reduceMotion ? 0 : Math.sin(t * p.freq + p.phaseX) * p.ampX
            const idleY = reduceMotion ? 0 : Math.cos(t * p.freq * 1.3 + p.phaseY) * p.ampY

            // эффект "батута": точка отталкивается от курсора, сильнее — если он ближе
            let targetPushX = 0
            let targetPushY = 0
            const dx = p.baseX - mouseDocX
            const dy = p.baseY - mouseDocY
            const dist = Math.hypot(dx, dy)

            if (dist < REPEL_RADIUS) {
                const factor = 1 - dist / REPEL_RADIUS
                const force = factor * factor * MAX_PUSH * p.reactionScale
                const nx = dist === 0 ? 0 : dx / dist
                const ny = dist === 0 ? 0 : dy / dist
                targetPushX = nx * force
                targetPushY = ny * force
            }

            // пружинное сглаживание — точка "тянется" за курсором с задержкой
            p.pushX += (targetPushX - p.pushX) * EASE
            p.pushY += (targetPushY - p.pushY) * EASE

            // КЛИК-ИМПУЛЬС: затухание
            p.clickImpulseX *= p.clickImpulseDecay
            p.clickImpulseY *= p.clickImpulseDecay

            if (Math.abs(p.clickImpulseX) < 0.1) p.clickImpulseX = 0
            if (Math.abs(p.clickImpulseY) < 0.1) p.clickImpulseY = 0

            // параллакс при скролле: дальние точки чуть отстают, ближние чуть забегают вперёд
            const rawParallax = (scrollY - initialScrollY) * p.parallaxFactor
            const targetParallax = Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, rawParallax))
            p.parallaxY += (targetParallax - p.parallaxY) * EASE

            const tx = idleX + p.pushX + p.clickImpulseX
            const ty = idleY + p.pushY + p.parallaxY + p.clickImpulseY

            const screenX = p.baseX + tx
            const screenY = p.baseY - scrollY + ty

            // Рисуем точку на Canvas
            const depth = p.depth
            const size = 2.5 + depth * 4.5
            const blur = (1 - depth) * 1.4
            const opacity = 0.20 + depth * 0.40
            const glow = 8 + depth * 6

            // Дыхание (breathe)
            const breatheDuration = parseFloat(drops.value[id]?.style?.animation?.match(/(\d+\.?\d*)s/)?.[1] || '5')
            const breatheDelay = parseFloat(drops.value[id]?.style?.animation?.match(/(\d+\.?\d*)s\s(\d+\.?\d*)s/)?.[2] || '0')
            const breathePhase = ((t + breatheDelay) % breatheDuration) / breatheDuration
            const breatheScale = 1 + Math.sin(breathePhase * Math.PI * 2) * 0.15
            const breatheOpacity = 1 + Math.sin(breathePhase * Math.PI * 2) * 0.1

            const finalSize = size * breatheScale
            const finalOpacity = Math.min(1, opacity * breatheOpacity)

            if(!ctx) return

            // Тень/свечение
            if (glow > 0) {
                ctx.save()
                ctx.globalAlpha = finalOpacity * 0.3
                ctx.beginPath()
                ctx.arc(screenX, screenY, finalSize + glow * 0.5, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(239, 68, 68, 0.3)'
                ctx.fill()
                ctx.restore()
            }

            // Основная точка
            ctx.save()
            ctx.globalAlpha = finalOpacity

            // Blur-эффект через тень
            if (blur > 0.5) {
                ctx.shadowColor = 'rgba(239, 68, 68, 0.5)'
                ctx.shadowBlur = blur * 3
            }

            ctx.beginPath()
            ctx.arc(screenX, screenY, finalSize, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(239, 68, 68, ${finalOpacity})`
            ctx.fill()

            // Внутреннее свечение для ближних точек
            if (depth > 0.5) {
                ctx.beginPath()
                ctx.arc(screenX, screenY, finalSize * 0.4, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 120, 120, ${finalOpacity * 0.6})`
                ctx.fill()
            }

            ctx.restore()
        })
    }

    function tick(now: number) {
        rafId = requestAnimationFrame(tick)

        // === Обработка клик-импульсов ===
        processClickImpulses(now)

        // === Рендер на Canvas ===
        renderCanvas(now)
    }

    function handleMouseMove(e: MouseEvent) {
        mouseClientX = e.clientX
        mouseClientY = e.clientY
    }

    function handleTouchMove(e: TouchEvent) {
        const touch = e.touches[0]
        if (!touch) return
        mouseClientX = touch.clientX
        mouseClientY = touch.clientY
    }

    function handleMouseLeave() {
        mouseClientX = -9999
        mouseClientY = -9999
    }

    // === Обработчик клика ===
    function handleClick(e: MouseEvent) {
        const clickX = e.clientX
        const clickY = e.clientY + window.scrollY

        clickEvents.push({
            x: clickX,
            y: clickY,
            time: performance.now(),
            id: ++clickIdCounter,
        })

        // Ограничиваем количество одновременных кликов
        if (clickEvents.length > 5) {
            clickEvents.shift()
        }
    }

    onMounted(() => {
        // небольшая задержка, чтобы DOM и раскладка успели отрисоваться
        setTimeout(() => {
            initCanvas()
            generateDrops()
        }, 100)

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('click', handleClick)

        rafId = requestAnimationFrame(tick)
    })

    onUnmounted(() => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('click', handleClick)
        destroyCanvas()
    })

    return { drops, setDropRef: () => {} }
}