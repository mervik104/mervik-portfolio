<script setup lang="ts">
import { GITHUB } from '../data/contacts';

</script>

<template>
    <a :href="GITHUB">
        <div
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur px-4 py-3 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]">
            <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_45%)]" />
            <div
                class="absolute inset-0 rounded-2xl p-px bg-linear-to-br from-red-500/30 via-transparent to-white/5 pointer-events-none" />
            <div class="relative flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl overflow-hidden border border-red-500/20 shrink-0">
                    <img src="/logo.jpg" alt="Mervik" class="w-full h-full object-cover" />
                </div>
                <div class="leading-tight">
                    <div class="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                        Made by
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-white font-semibold tracking-wide">
                            MerVik
                        </span>
                        <span
                            class="text-[10px] px-2 py-0.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 font-mono uppercase tracking-wider">
                            web developer
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>