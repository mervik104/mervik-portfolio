<template>
    <article
        class="group relative overflow-hidden rounded-2xl border border-red-950/60 bg-neutral-950/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-700/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]">

        <div
            class="absolute inset-0 bg-linear-to-br from-red-600/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div class="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-red-600/60 to-transparent" />

        <div class="relative p-6 md:p-7">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <p class="uppercase sm:text-sm tracking-[0.25em] text-[10px] text-red-500 mb-2">
                        {{ period }}
                    </p>

                    <h4 class="font-display tracking-wide text-xl md:text-2xl text-neutral-100 leading-none">
                        {{ role }}
                    </h4>

                    <p class="mt-2 text-lg text-neutral-300 font-mono">
                        {{ company }}
                    </p>
                </div>

                <div v-if="status" :class="[
                    'shrink-0 inline-flex items-center gap-2 rounded-xl px-3 py-2 border',
                    status === 'completed'
                        ? 'border-emerald-800/40 bg-emerald-950/30'
                        : 'border-amber-800/40 bg-amber-950/30'
                ]">

                    <span class="relative flex h-2 w-2">
                        <span :class="[
                            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                            status === 'completed'
                                ? 'bg-emerald-400'
                                : 'bg-amber-400'
                        ]" />

                        <span :class="[
                            'relative inline-flex h-2 w-2 rounded-full',
                            status === 'completed'
                                ? 'bg-emerald-400'
                                : 'bg-amber-400'
                        ]" />
                    </span>

                    <span :class="[
                        'font-mono text-[11px] uppercase tracking-[0.18em]',
                        status === 'completed'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                    ]">
                        {{ status === 'completed' ? 'Закончен' : 'В разработке' }}
                    </span>
                </div>
            </div>

            <p class="mt-6 text-sm md:text-[15px] leading-relaxed text-neutral-400">
                {{ description }}
            </p>

            <div class="flex flex-wrap items-center gap-3 mt-7">
                <a v-if="github" :href="github" target="_blank"
                    class="group/link inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm text-neutral-300 transition-all duration-300 hover:border-red-800 hover:text-red-400">

                    <GithubIcon />
                    GitHub
                </a>

                <a v-if="website" :href="website" target="_blank"
                    class="group/link inline-flex items-center gap-2 rounded-xl border border-red-800 bg-red-800/20 px-4 py-2 text-sm text-red-400 transition-all duration-300 hover:border-red-600 hover:bg-red-800/40">

                    <SiteIcon />
                    Открыть сайт
                </a>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import GithubIcon from './icons/GithubIcon.vue'
import SiteIcon from './icons/SiteIcon.vue'
import type { experienceType } from '../data/experience.ts';

defineProps<experienceType>()
</script>