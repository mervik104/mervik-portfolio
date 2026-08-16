<template>
    <article :class="card({ commercial: isCommercial })">

        <div
            class="absolute inset-0 bg-linear-to-br from-red-600/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div :class="topLine({ commercial: isCommercial })" />

        <div v-if="item.image" class="relative overflow-hidden md:w-2/5 md:shrink-0">
            <div v-if="!imgFailed"
                class="relative aspect-video md:aspect-auto md:h-full w-full overflow-hidden">
                <div v-if="!imgLoaded" class="absolute inset-0 motion-safe:animate-pulse" />
                <img :src="item.image" :alt="item.company[locale]" loading="lazy" decoding="async"
                    referrerpolicy="no-referrer" :class="[
                        'h-full w-full object-contain md:object-cover',
                        imgLoaded ? 'opacity-100' : 'opacity-0'
                    ]" @load="imgLoaded = true" @error="imgFailed = true" />
            </div>

            <div v-else
                class="flex aspect-video md:aspect-auto md:h-full w-full items-center justify-center bg-linear-to-br from-neutral-900 via-neutral-950 to-red-950/30">
                <span class="font-display text-2xl md:text-3xl tracking-widest text-neutral-600">
                    {{ initials }}
                </span>
            </div>

            <div
                class="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/15 to-transparent md:bg-linear-to-l md:from-neutral-950/40 md:via-transparent md:to-transparent pointer-events-none" />
        </div>

        <div class="relative p-6 md:p-7 md:flex-1 md:min-w-0">
            <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p class="uppercase text-[10px] sm:text-xs tracking-[0.25em] text-red-500 font-mono">
                    {{ item.period[locale] }}
                </p>

                <div class="flex flex-wrap items-center gap-2">
                    <span v-if="item.commercial" :class="commercialBadge()" role="note" :aria-label="t('experience.commercial')">
                        <BriefcaseIcon />
                        {{ t('experience.commercial') }}
                    </span>

                    <div v-if="item.status" :class="statusClasses.badge" role="status" :aria-label="statusLabel">

                    <span class="relative flex h-2 w-2">
                        <span :class="statusClasses.ping" />

                        <span :class="statusClasses.dot" />
                    </span>

                    <span :class="statusClasses.label">
                        {{ statusLabel }}
                    </span>
                </div>
            </div>
        </div>

            <h4 class="mt-3 font-display tracking-wide text-xl md:text-2xl text-neutral-100 leading-none">
                {{ item.role[locale] }}
            </h4>

            <p class="mt-2 text-lg sm:text-xl text-neutral-200 font-mono">
                {{ item.company[locale] }}
            </p>

            <p ref="textEl" class="mt-2 overflow-hidden text-sm md:text-[15px] leading-relaxed text-neutral-300 transition-[height] duration-300 ease-out"
                :class="!expanded && 'line-clamp-3'">
                {{ item.description[locale] }}
            </p>

            <button v-if="needsToggle" type="button" @click="toggle" :aria-expanded="expanded" :class="toggleButton()">
                {{ expanded ? t('experience.showLess') : t('experience.showMore') }}
                <ChevronDownIcon :class="chevron({ expanded })" />
            </button>

            <div class="flex flex-wrap items-center gap-3 mt-7">
                <a v-if="item.github" :href="item.github" target="_blank" rel="noopener noreferrer"
                    :class="linkButton({ kind: 'github' })">

                    <GithubIcon />
                    GitHub
                </a>

                <a v-if="item.website" :href="item.website" target="_blank" rel="noopener noreferrer"
                    :class="linkButton({ kind: 'website' })">

                    <SiteIcon />
                    {{ t('experience.openSite') }}
                </a>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { tv } from 'tailwind-variants';
import type { Experience } from '@/data/experience';
import GithubIcon from '../icons/GithubIcon.vue';
import SiteIcon from '../icons/SiteIcon.vue';
import ChevronDownIcon from '../icons/ChevronDownIcon.vue';
import BriefcaseIcon from '../icons/BriefcaseIcon.vue';

const props = defineProps<{ item: Experience }>()

const { t, locale } = useI18n()

const isCommercial = computed(() => props.item.commercial === true)

const card = tv({
    base: 'group relative overflow-hidden rounded-2xl border bg-neutral-950/80 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-1 md:flex md:flex-row-reverse',
    variants: {
        commercial: {
            true: 'border-amber-500/40 hover:border-amber-400/70 hover:shadow-[0_0_45px_rgba(245,158,11,0.18)]',
            false: 'border-red-950/60 hover:border-red-700/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]',
        },
    },
})

const topLine = tv({
    base: 'absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent',
    variants: {
        commercial: {
            true: 'via-amber-400/70',
            false: 'via-red-600/60',
        },
    },
})

const commercialBadge = tv({
    base: 'inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-amber-300',
})

const status = tv({
    slots: {
        badge: 'shrink-0 inline-flex items-center gap-2 rounded-xl border px-3 py-1.5',
        ping: 'absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full opacity-75',
        dot: 'relative inline-flex h-2 w-2 rounded-full',
        label: 'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em]',
    },
    variants: {
        status: {
            completed: {
                badge: 'border-emerald-800/40 bg-emerald-950/30',
                ping: 'bg-emerald-400',
                dot: 'bg-emerald-400',
                label: 'text-emerald-400',
            },
            development: {
                badge: 'border-amber-800/40 bg-amber-950/30',
                ping: 'bg-amber-400',
                dot: 'bg-amber-400',
                label: 'text-amber-400',
            },
            education: {
                badge: 'border-sky-800/40 bg-sky-950/30',
                ping: 'bg-sky-400',
                dot: 'bg-sky-400',
                label: 'text-sky-400',
            },
        },
    },
})

const linkButton = tv({
    base: 'group/link inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    variants: {
        kind: {
            github: 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-red-800 hover:text-red-400',
            website: 'border-red-800 bg-red-800/20 text-red-400 hover:border-red-600 hover:bg-red-800/40',
        },
    },
})

const toggleButton = tv({
    base: 'mt-2 inline-flex items-center gap-1.5 rounded-lg text-sm text-red-400 transition-colors duration-200 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
})

const chevron = tv({
    base: 'transition-transform duration-200',
    variants: {
        expanded: {
            true: 'rotate-180',
            false: 'rotate-0',
        },
    },
})

const statusLabel = computed(() => {
    switch (props.item.status) {
        case 'education':
            return t('experience.education')
        case 'development':
            return t('experience.inDevelopment')
        case 'completed':
            return t('experience.completed')
        default:
            return ''
    }
})

const statusClasses = computed(() => {
    const slots = status({ status: props.item.status })
    return {
        badge: slots.badge(),
        ping: slots.ping(),
        dot: slots.dot(),
        label: slots.label(),
    }
})

const imgFailed = ref(false)
const imgLoaded = ref(false)
const expanded = ref(false)
const textEl = ref<HTMLElement | null>(null)
const needsToggle = ref(false)

let resizeObserver: ResizeObserver | null = null

function checkOverflow() {
    const el = textEl.value
    if (!el) return
    needsToggle.value = el.scrollHeight > el.clientHeight + 1
}

async function toggle() {
    const el = textEl.value
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        expanded.value = !expanded.value
        return
    }

    const collapsing = expanded.value
    const from = el.offsetHeight

    expanded.value = !collapsing
    await nextTick()

    const to = collapsing ? el.offsetHeight : el.scrollHeight
    if (from === to) return

    el.style.height = `${from}px`
    void el.offsetHeight

    el.style.height = `${to}px`

    const clearHeight = (e: TransitionEvent) => {
        if (e.propertyName !== 'height') return
        el.style.height = ''
        el.removeEventListener('transitionend', clearHeight)
    }
    el.addEventListener('transitionend', clearHeight)
}

onMounted(() => {
    checkOverflow()
    if (textEl.value && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
            if (!expanded.value) checkOverflow()
        })
        resizeObserver.observe(textEl.value)
    }
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
})

watch(locale, async () => {
    expanded.value = false
    await nextTick()
    checkOverflow()
})

const initials = computed(() => {
    const name = props.item.company[locale.value]
    const words = name.replace(/[«»"'()]/g, '').split(/\s+/).filter(Boolean)
    const letters = words
        .map(w => w[0])
        .filter(c => c && /[\p{L}\p{N}]/u.test(c))
        .slice(0, 2)
    return letters.join('').toUpperCase()
})
</script>