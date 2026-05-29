<template>
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div class="noise" />

        <div
            class="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-100 bg-red-600 rounded-full blur-[120px] opacity-[0.07] animate-blob" />
        <div
            class="absolute bottom-0 -left-20 size-90 bg-red-900 rounded-full blur-[100px] opacity-[0.06] animate-blob-delayed" />

        <div class="absolute inset-0 overflow-hidden">
            <div v-for="drop in drops" :key="drop.id" class="absolute rounded-full bg-red-500" :style="drop.style" />
        </div>

        <div
            class="absolute top-32 right-8 md:right-14 w-0.75 h-24 bg-linear-to-b from-red-600 via-red-700 to-transparent rounded-full opacity-50 animate-drip" />
        <div
            class="absolute top-56 right-7.5 md:right-12.5 w-2 h-2 bg-red-700 rounded-full opacity-40 animate-drip" />
    </div>
</template>

<script setup lang="ts">
import { useDrops } from '../composables/useDrops';

const { drops } = useDrops()
</script>

<style scoped>
.noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
    background-size: 3px 3px;
    mix-blend-mode: overlay;
}
</style>