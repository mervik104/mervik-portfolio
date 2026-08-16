<template>
    <section :class="{ 'resume-avoid-break': avoidBreak }">
        <h2
            class="mb-3 flex items-center gap-2.5 border-b-2 border-red-600 pb-1.5 font-display text-base md:text-lg tracking-[0.2em] uppercase text-neutral-950">
            <span class="h-2 w-2 rounded-[3px] bg-red-600 shrink-0" />
            {{ title }}
        </h2>
        <slot />
    </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; avoidBreak?: boolean }>(), { avoidBreak: false })
</script>
