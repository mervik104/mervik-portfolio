<template>
    <div
        class="flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-1 font-mono text-xs uppercase tracking-widest"
        role="group"
        :aria-label="t('language.title')">
        <button
            v-for="loc in locales"
            :key="loc.code"
            type="button"
            :class="langButton({ active: locale === loc.code })"
            :aria-pressed="locale === loc.code"
            @click="setLocale(loc.code)">
            {{ loc.code }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

const { t, locale, locales, setLocale } = useI18n()

const langButton = tv({
    base: 'rounded-full px-3 py-1.5 transition-all duration-200',
    variants: {
        active: {
            true: 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.35)]',
            false: 'text-neutral-400 hover:text-white',
        },
    },
})
</script>
