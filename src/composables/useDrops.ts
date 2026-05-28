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

const TEXT_SAFE = 48
const MIN_DROP_GAP = 28
const MAX_ATTEMPTS = 30

export function useDrops() {
    const drops = ref<Drop[]>([])

    function getForbiddenZones(): Zone[] {
        return Array.from(
            document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,a,span,button,img')
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
        const target = Math.min(40, Math.floor((totalW * totalH) / 40000))

        const placed: { x: number; y: number }[] = []
        const generated: Drop[] = []

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

            const size = Math.random() * 7 + 3
            const duration = (Math.random() * 10 + 8).toFixed(1)
            const delay = (Math.random() * 6).toFixed(1)

            generated.push({
                id: i,
                style: {
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: `${(Math.random() * 0.5 + 0.15).toFixed(2)}`,
                    filter: `blur(${(Math.random() * 1.5).toFixed(1)}px)`,
                    animation: `float ${duration}s ${delay}s infinite ease-in-out`,
                    boxShadow: '0 0 16px rgba(239,68,68,0.3)',
                },
            })
        }

        drops.value = generated
    }

    onMounted(() => {
        // Slight delay to ensure DOM is fully rendered and layout is calculated
        setTimeout(generateDrops, 100)
        window.addEventListener('resize', generateDrops)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', generateDrops)
    })

    return { drops }
}