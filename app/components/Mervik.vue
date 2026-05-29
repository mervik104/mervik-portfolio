<script setup lang="ts">
import { GITHUB } from '../data/contacts';

</script>

<template>
    <a :href="GITHUB" class="block">
        <div
            class="group relative overflow-hidden rounded-2xl border
                   border-gray-200 dark:border-white/10
                   bg-white dark:bg-neutral-950/80
                   backdrop-blur px-4 py-3 transition-all duration-300
                   hover:border-red-400/40 dark:hover:border-red-500/30
                   hover:shadow-[0_0_40px_rgba(239,68,68,0.08)] dark:hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]">

            <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                       bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_45%)]
                       dark:bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_45%)]" />

            <div
                class="absolute inset-0 rounded-2xl p-px pointer-events-none
                       bg-linear-to-br from-red-400/20 via-transparent to-gray-100/50
                       dark:from-red-500/30 dark:via-transparent dark:to-white/5" />

            <div class="relative flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl overflow-hidden border border-red-400/20 dark:border-red-500/20 shrink-0">
                    <img src="./mervik.jpg" alt="Mervik" class="w-full h-full object-cover" />
                </div>
                <div class="leading-tight">
                    <div class="font-mono text-[10px] uppercase tracking-widest text-gray-700 dark:text-neutral-500">
                        Site Made by
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-900 dark:text-white font-semibold tracking-wide">
                            MerVik
                        </span>
                        <span
                            class="text-[10px] flex items-center justify-center px-2 py-0.5 rounded-full font-mono uppercase tracking-wider
                                   border border-red-400/30 dark:border-red-500/20
                                   bg-red-50 dark:bg-red-500/10
                                   text-red-500 dark:text-red-400">
                            web developer
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>