<template>
    <a :href="href" target="_blank" rel="noopener"
        class="contact-link flex items-center gap-3 p-4 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-900/50 transition-all duration-200 group backdrop-blur-xl">
        <span class="text-red-500 leading-none">
            <slot></slot>
        </span>
        <span class="group-hover:text-white transition-colors duration-200 text-sm md:text-base">{{ text }}</span>
    </a>
</template>

<script lang="ts" setup>
defineProps<{
    href: string
    text: string
}>()
</script>