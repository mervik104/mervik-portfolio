<template>
    <div class="stack-item group relative">
        <h4
            class="font-mono text-red-500 text-sm uppercase tracking-widest mb-3 group-hover:opacity-100 transition-opacity duration-200">
            {{ t(`stack.categories.${item.key}`) }}
        </h4>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div v-for="tech in item.items" :key="tech.name" class="flex items-center gap-2">
                <img :src="iconPath(tech.icon)" :alt="tech.name" class="w-5 h-5 shrink-0" loading="lazy" />
                <span class="font-display tracking-widest text-base md:text-lg text-white">
                    {{ tech.name }}
                </span>
            </div>
        </div>

        <div class="absolute -bottom-2 left-0 h-px w-0 bg-red-600/60 group-hover:w-full transition-all duration-300" />
    </div>
</template>

<script lang="ts" setup>
import { iconPath } from '@/utils/iconPath'

const { t } = useI18n()

defineProps<{
    item: {
        key: string
        items: { name: string; icon: string }[]
    }
}>()
</script>