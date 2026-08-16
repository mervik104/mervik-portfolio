<template>
    <article
        class="group relative overflow-hidden rounded-2xl border border-red-950/60 bg-neutral-950/80 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-red-700/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)] md:flex md:flex-row-reverse">

        <div
            class="absolute inset-0 bg-linear-to-br from-red-600/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div class="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-red-600/60 to-transparent" />

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
            <div class="flex items-center justify-between gap-4">
                <p class="uppercase text-[10px] sm:text-xs tracking-[0.25em] text-red-500 font-mono">
                    {{ item.period[locale] }}
                </p>

                <div v-if="item.status" :class="[
                    'shrink-0 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 border',
                    item.status === 'completed'
                        ? 'border-emerald-800/40 bg-emerald-950/30'
                        : 'border-amber-800/40 bg-amber-950/30'
                ]" role="status"
                    :aria-label="item.status === 'completed' ? t('experience.completed') : t('experience.inDevelopment')">

                    <span class="relative flex h-2 w-2">
                        <span :class="[
                            'absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full opacity-75',
                            item.status === 'completed'
                                ? 'bg-emerald-400'
                                : 'bg-amber-400'
                        ]" />

                        <span :class="[
                            'relative inline-flex h-2 w-2 rounded-full',
                            item.status === 'completed'
                                ? 'bg-emerald-400'
                                : 'bg-amber-400'
                        ]" />
                    </span>

                    <span :class="[
                        'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em]',
                        item.status === 'completed'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                    ]">
                        {{ item.status === 'completed'
                            ? t('experience.completed')
                            : t('experience.inDevelopment') }}
                    </span>
                </div>
            </div>

            <h4 class="mt-3 font-display tracking-wide text-xl md:text-2xl text-neutral-100 leading-none">
                {{ item.role[locale] }}
            </h4>

            <p class="mt-2 text-lg sm:text-xl text-neutral-200 font-mono">
                {{ item.company[locale] }}
            </p>

            <p class="mt-2 text-sm md:text-[15px] leading-relaxed text-neutral-300">
                {{ item.description[locale] }}
            </p>

            <div class="flex flex-wrap items-center gap-3 mt-7">
                <a v-if="item.github" :href="item.github" target="_blank" rel="noopener noreferrer"
                    class="group/link inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-300 transition-all duration-300 hover:border-red-800 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">

                    <GithubIcon />
                    GitHub
                </a>

                <a v-if="item.website" :href="item.website" target="_blank" rel="noopener noreferrer"
                    class="group/link inline-flex items-center gap-2 rounded-xl border border-red-800 bg-red-800/20 px-4 py-2 text-sm text-red-400 transition-all duration-300 hover:border-red-600 hover:bg-red-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">

                    <SiteIcon />
                    {{ t('experience.openSite') }}
                </a>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Experience } from '@/data/experience';
import GithubIcon from '../icons/GithubIcon.vue';
import SiteIcon from '../icons/SiteIcon.vue';

const props = defineProps<{ item: Experience }>()

const { t, locale } = useI18n()

const imgFailed = ref(false)
const imgLoaded = ref(false)

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