<template>
    <div
        class="flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-1 font-mono text-xs uppercase tracking-widest"
        role="group"
        :aria-label="t('language.title')">
        <button
            v-for="loc in locales"
            :key="loc.code"
            type="button"
            class="rounded-full px-3 py-1.5 transition-all duration-200"
            :class="locale === loc.code
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.35)]'
                : 'text-neutral-400 hover:text-white'"
            :aria-pressed="locale === loc.code"
            @click="setLocale(loc.code)">
            {{ loc.code }}
        </button>
    </div>
</template>

<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
</script>
