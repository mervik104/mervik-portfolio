<template>
    <article :class="card({ commercial: isCommercial })">
        <!-- Accent -->
        <div
            class="absolute inset-0 bg-linear-to-br from-red-600/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div :class="topLine({ commercial: isCommercial })" />

        <!-- Image -->
        <div v-if="item.image" :class="imageWrapper">
            <div v-if="!imgFailed" class="relative aspect-video md:aspect-auto md:h-full w-full overflow-hidden">
                <div v-if="!imgLoaded" class="absolute inset-0 motion-safe:animate-pulse" />

                <img :src="item.image" :alt="item.company[locale]" loading="lazy" decoding="async"
                    referrerpolicy="no-referrer" :class="[
                        'h-full w-full object-contain md:object-cover',
                        imgLoaded ? 'opacity-100' : 'opacity-0',
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

        <!-- Content -->
        <div class="relative p-4 sm:p-5 md:p-7 md:flex-1 md:min-w-0" :class="expanded && 'md:pr-32'">
            <!-- Meta -->
            <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p class="uppercase text-[10px] sm:text-xs tracking-[0.25em] text-red-500 font-mono">
                    {{ item.period[locale] }}
                </p>

                <div class="flex flex-wrap items-center gap-2">
                    <!-- Commercial -->
                    <span v-if="item.commercial" :class="commercialBadge()" role="note"
                        :aria-label="t('experience.commercial')">
                        <BriefcaseIcon />
                        {{ t('experience.commercial') }}
                    </span>

                    <!-- Status -->
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

            <!-- Role -->
            <h3 class="mt-3 font-display tracking-wide text-xl md:text-2xl text-neutral-100 leading-none">
                {{ item.role[locale] }}
            </h3>

            <!-- Company -->
            <p class="mt-2 text-lg sm:text-xl text-neutral-200 font-mono">
                {{ item.company[locale] }}
            </p>

            <!-- Description -->
            <p ref="textEl"
                class="experience-description mt-2 text-[11px] sm:text-[13px] md:text-[15px] leading-relaxed text-neutral-200"
                :class="{ 'is-collapsed': !expanded }">
                {{ item.description[locale] }}
            </p>

            <!-- Toggle -->
            <button v-if="needsToggle" type="button" :aria-expanded="expanded" :class="toggleButton()" @click="toggle">
                {{ expanded ? t('experience.showLess') : t('experience.showMore') }}

                <ChevronDownIcon :class="chevron({ expanded })" />
            </button>

            <!-- Links -->
            <div class="flex flex-wrap items-center gap-3 mt-7">
                <a v-if="item.github" :href="item.github" target="_blank" rel="noopener noreferrer"
                    :class="linkButton({ kind: 'github' })">
                    <GithubIcon />
                    {{ t('experience.github') }}
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
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from 'vue'

import { tv } from 'tailwind-variants'

import type { Experience } from '@/data/experience'

import GithubIcon from '../icons/GithubIcon.vue'
import SiteIcon from '../icons/SiteIcon.vue'
import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
import BriefcaseIcon from '../icons/BriefcaseIcon.vue'

const props = defineProps<{
    item: Experience
}>()

const { t, locale } = useI18n()
const isCommercial = computed(() => props.item.commercial === true)

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

const card = tv({
    base: [
        'group relative overflow-hidden rounded-2xl border',
        'bg-neutral-950/80 backdrop-blur-xl',
        'transition-all duration-300',
        'motion-safe:hover:-translate-y-1',
        'md:flex md:flex-row-reverse',
    ].join(' '),

    variants: {
        commercial: {
            true: [
                'border-amber-500/40',
                'hover:border-amber-400/70',
                'hover:shadow-[0_0_45px_rgba(245,158,11,0.18)]',
            ].join(' '),

            false: [
                'border-red-950/60',
                'hover:border-red-700/50',
                'hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]',
            ].join(' '),
        },
    },
})

const topLine = tv({
    base: [
        'absolute top-0 left-0 h-px w-full',
        'bg-linear-to-r from-transparent to-transparent',
    ].join(' '),

    variants: {
        commercial: {
            true: 'via-amber-400/70',
            false: 'via-red-600/60',
        },
    },
})

/* -------------------------------------------------------------------------- */
/* Badges                                                                     */
/* -------------------------------------------------------------------------- */

const commercialBadge = tv({
    base: [
        'inline-flex shrink-0 items-center gap-1.5',
        'rounded-xl border border-amber-400/40',
        'bg-amber-400/10 px-3 py-1.5',
        'font-mono text-[10px] sm:text-[11px]',
        'uppercase tracking-[0.18em]',
        'text-amber-300',
    ].join(' '),
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
    const slots = status({
        status: props.item.status,
    })

    return {
        badge: slots.badge(),
        ping: slots.ping(),
        dot: slots.dot(),
        label: slots.label(),
    }
})

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
/* -------------------------------------------------------------------------- */

const linkButton = tv({
    base: [
        'group/link inline-flex items-center gap-2',
        'rounded-xl border px-4 py-2 text-sm',
        'transition-all duration-300',
        'focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-red-600',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-neutral-950',
    ].join(' '),

    variants: {
        kind: {
            github: [
                'border-neutral-800',
                'bg-neutral-900/60',
                'text-neutral-200',
                'hover:border-red-800',
                'hover:text-red-400',
            ].join(' '),

            website: [
                'border-red-800',
                'bg-red-800/20',
                'text-red-400',
                'hover:border-red-600',
                'hover:bg-red-800/40',
            ].join(' '),
        },
    },
})

/* -------------------------------------------------------------------------- */
/* Toggle                                                                     */
/* -------------------------------------------------------------------------- */

const toggleButton = tv({
    base: [
        'mt-2 inline-flex items-center gap-1.5',
        'rounded-lg text-sm text-red-400',
        'transition-colors duration-200',
        'hover:text-red-300',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-red-600',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-neutral-950',
    ].join(' '),
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

/* -------------------------------------------------------------------------- */
/* Image                                                                      */
/* -------------------------------------------------------------------------- */

const imgFailed = ref(false)
const imgLoaded = ref(false)

const imageWrapper = computed(() => {
    const base =
        'relative overflow-hidden w-full aspect-video md:aspect-auto transition-all duration-300 ease-out'

    if (!expanded.value) {
        return `${base} md:w-2/5 md:shrink-0 md:h-full`
    }

    return [
        base,
        'md:absolute',
        'md:inset-y-4',
        'md:right-4',
        'md:h-24',
        'md:w-24',
        'md:shrink-0',
        'md:overflow-hidden',
        'md:rounded-2xl',
        'md:border',
        'md:border-red-800/40',
        'md:shadow-lg',
        'md:z-10',
    ].join(' ')
})

/* -------------------------------------------------------------------------- */
/* Description                                                                */
/* -------------------------------------------------------------------------- */

const expanded = ref(false)

const textEl = ref<HTMLElement | null>(null)

const needsToggle = ref(false)

let resizeObserver: ResizeObserver | null = null

function checkOverflow() {
    const el = textEl.value

    if (!el) return

    const styles = window.getComputedStyle(el)

    const lineHeight = Number.parseFloat(styles.lineHeight)

    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
        needsToggle.value = el.scrollHeight > el.clientHeight + 1
        return
    }

    const threeLinesHeight = lineHeight * 3

    needsToggle.value = el.scrollHeight > threeLinesHeight + 1
}

function toggle() {
    if (!needsToggle.value) return

    expanded.value = !expanded.value
}

/* -------------------------------------------------------------------------- */
/* Lifecycle                                                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
    checkOverflow()

    if (
        textEl.value &&
        typeof ResizeObserver !== 'undefined'
    ) {
        resizeObserver = new ResizeObserver(() => {
            checkOverflow()
        })

        resizeObserver.observe(textEl.value)
    }
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
})

/* -------------------------------------------------------------------------- */
/* Locale                                                                     */
/* -------------------------------------------------------------------------- */

watch(locale, () => {
    expanded.value = false

    requestAnimationFrame(() => {
        checkOverflow()
    })
})

/* -------------------------------------------------------------------------- */
/* Initials                                                                   */
/* -------------------------------------------------------------------------- */

const initials = computed(() => {
    const name = props.item.company[locale.value]

    const words = name
        .replace(/[«»"'()]/g, '')
        .split(/\s+/)
        .filter(Boolean)

    const letters = words
        .map(word => word[0])
        .filter(
            char =>
                char &&
                /[\p{L}\p{N}]/u.test(char),
        )
        .slice(0, 2)

    return letters.join('').toUpperCase()
})
</script>

<style scoped>
.experience-description {
    overflow: hidden;
    max-height: 60em;

    transition:
        max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.experience-description.is-collapsed {
    max-height: 4.875em;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
}

/*
 * Respect reduced-motion preferences.
 */
@media (prefers-reduced-motion: reduce) {
    .experience-description {
        transition: none;
    }
}
</style>