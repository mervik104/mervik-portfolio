import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
    let observer: IntersectionObserver | null = null

    const initReveal = () => {
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
        document.querySelectorAll('.reveal').forEach(el => observer!.observe(el))
    }

    onMounted(() => {
        initReveal()
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
}