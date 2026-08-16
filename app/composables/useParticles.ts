import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { tsParticles, type Container, type ISourceOptions } from '@tsparticles/engine'
import { loadExternalGrabInteraction } from '@tsparticles/interaction-external-grab'
import { loadLinksPreset } from '@tsparticles/preset-links'

const RED = '#ef4444'

export function useParticles(host: Ref<HTMLElement | null>) {
    let container: Container | null = null
    let initTimer = 0
    let disposed = false

    async function init() {
        const element = host.value
        if (!element || disposed) return

        // канвас растягивается на весь документ, но контентная колонка плотная —
        // эффект виден только в полях страницы, где они есть (широкие экраны)
        if (window.innerWidth < 1200) return

        const reduceMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        await loadLinksPreset(tsParticles)
        await loadExternalGrabInteraction(tsParticles)

        if (disposed) return

        const area = window.innerWidth * document.body.scrollHeight
        const options: ISourceOptions = {
            preset: 'links',
            // НЕ fullScreen: контейнер растянут на высоту документа, поэтому
            // частицы «листаются» вместе со страницей
            fullScreen: { enable: false },
            // канвас в высоту документа — DPR 1 держит память и FPS
            detectRetina: false,
            fpsLimit: 60,
            pauseOnBlur: true,
            resize: { enable: true },
            background: { color: 'transparent' },
            particles: {
                number: {
                    value: Math.min(300, Math.max(100, Math.floor(area / 18000))),
                    density: { enable: false },
                },
                paint: {
                    color: { value: RED },
                    fill: {
                        enable: true,
                        color: { value: RED },
                        opacity: { min: 0.3, max: 0.8 },
                    },
                },
                size: { value: { min: 1.5, max: 3.5 } },
                move: {
                    enable: !reduceMotion,
                    speed: reduceMotion ? 0 : { min: 0.25, max: 0.5 },
                    outModes: { default: 'bounce' },
                },
                links: {
                    enable: true,
                    distance: 130,
                    color: RED,
                    opacity: 0.4,
                    width: 1,
                },
            },
            interactivity: {
                detectsOn: 'window',
                events: {
                    onHover: { enable: !reduceMotion, mode: 'grab' },
                    onClick: { enable: false, mode: [] },
                },
                modes: {
                    grab: { distance: 200, links: { opacity: 0.7 } },
                },
            },
        }

        container = (await tsParticles.load({ id: 'tsparticles-bg', element, options })) ?? null

        // после полной загрузки шрифтов высота документа могла измениться —
        // пересоздаём, чтобы частицы покрыли весь документ
        window.addEventListener('load', onLoad, { once: true })
    }

    function onLoad() {
        void tsParticles.refresh()
    }

    onMounted(() => {
        // ждём, пока DOM и раскладка отрисуются
        initTimer = window.setTimeout(() => {
            void init()
        }, 100)
    })

    onUnmounted(() => {
        disposed = true
        clearTimeout(initTimer)
        window.removeEventListener('load', onLoad)
        container?.destroy()
        container = null
    })
}
