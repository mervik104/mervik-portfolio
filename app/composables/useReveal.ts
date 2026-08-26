import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
    let observer: IntersectionObserver | null = null

    const initReveal = () => {
        const reduceMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const targets = document.querySelectorAll('.reveal')

        if (reduceMotion) {
            // без анимации: контент виден сразу, observer не нужен
            targets.forEach(el => el.classList.add('revealed'))
            return
        }

        observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).classList.add('revealed')
                        observer?.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )
        targets.forEach(el => observer!.observe(el))
    }

    onMounted(() => {
        initReveal()
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
}
