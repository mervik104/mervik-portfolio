<template>
  <header class="mb-16 mt-8 md:mb-24 reveal">
    <p class="font-mono text-red-500 text-xs tracking-[0.35em] uppercase border-b border-red-900/25 pb-2 mb-8 w-fit">
      {{ t('hero.badge') }}
    </p>
    <div class="flex flex-row items-center gap-5 group">
      <div class="relative shrink-0">
        <div
          class="absolute inset-0 bg-red-600/25 blur-2xl scale-150 rounded-full group-hover:scale-[2] transition-transform duration-700 ease-out" />
        <!-- относительный путь к картинке используется так как в билде все файлы из public будут в одной папке -->
        <img src="./mervik.jpg" class="object-cover size-16 md:size-20 rounded-xl md:rounded-2xl" alt="MerVik logo" />
      </div>
      <div>
        <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white leading-none">
          {{ BRAND }}
        </h1>
        <p class="font-mono text-red-500 tracking-[0.22em] uppercase text-[10px] md:text-[14px]">
          {{ resume.role }}
        </p>
      </div>
    </div>
    <p
      class="font-mono text-neutral-200 text-base md:text-lg border-l-2 border-red-600 pl-4 mt-8 max-w-xl leading-relaxed">
      {{ t('hero.tagline') }}
    </p>
    <div class="mt-8 flex flex-wrap items-center gap-3">
      <a :href="PDF_RU" download rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-xl border border-red-800 bg-red-800/20 px-5 py-2.5 font-mono text-sm text-red-400 transition-all duration-300 hover:border-red-600 hover:bg-red-800/40 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
        {{ t('hero.downloadRu') }}
      </a>
      <a :href="PDF_EN" download rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-2.5 font-mono text-sm text-neutral-200 transition-all duration-300 hover:border-red-800 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
        {{ t('hero.downloadEn') }}
      </a>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { BRAND, PDF_EN, PDF_RU } from '@/data/resume';
import { resume as resumeEn } from '@/data/resume.en';
import { resume as resumeRu } from '@/data/resume.ru';

const { t, locale } = useI18n()

const resume = computed(() => (locale.value === 'en' ? resumeEn : resumeRu))
</script>
