<template>
    <div class="stack-item group relative">
        <h4
            class="font-mono text-red-500 text-sm uppercase tracking-widest mb-1 group-hover:opacity-100 transition-opacity duration-200">
            {{ item.label }}
        </h4>
        <div class="font-display tracking-wider text-lg md:text-xl text-white">
            {{ item.value }}
        </div>
        <div class="absolute -bottom-2 left-0 h-px w-0 bg-red-600/60 group-hover:w-full transition-all duration-300" />
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        item: {
            label: string,
            value: string
        }
    }>()
</script>