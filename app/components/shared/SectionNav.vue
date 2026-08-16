<template>
    <nav :aria-label="t('nav.aria')"
        class="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`"
            class="group relative flex items-center py-0.5" :aria-current="active === section.id ? 'true' : undefined"
            @click.prevent="scrollTo(section.id)">
            <span class="pointer-events-none absolute right-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                :class="active === section.id ? 'text-red-500' : 'text-neutral-400'">
                {{ section.label }}
            </span>
            <span class="block h-2 w-2 rounded-full bg-neutral-700 transition-all duration-300 group-hover:bg-red-500"
                :class="active === section.id
                    ? 'scale-125 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.7)]'
                    : 'hover:scale-110'" />
        </a>
    </nav>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
    sections: { id: string; label: string }[]
}>()

const active = ref(props.sections[0]?.id)

function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    active.value = id
}

let ticking = false

function update() {
    const target = window.scrollY + window.innerHeight * 0.35
    let current = props.sections[0]?.id

    for (const section of props.sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= target) {
            current = section.id
        }
    }

    active.value = current
    ticking = false
}

function onScroll() {
    if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
    }
}

onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
})
</script>
