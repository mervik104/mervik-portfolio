<template>
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div ref="particlesHost" class="absolute inset-0" />

        <div class="noise" />

        <div
            class="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-100 bg-red-600 rounded-full blur-[120px] opacity-[0.07] animate-blob" />
        <div
            class="absolute bottom-0 -left-20 size-90 bg-red-900 rounded-full blur-[100px] opacity-[0.06] animate-blob-delayed" />

    </div>
</template>

<script setup lang="ts">
const particlesHost = ref<HTMLElement | null>(null)

useParticles(particlesHost)
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
