<template>
  <header class="mb-16 mt-8 md:mb-24 reveal">
    <h2 class="font-mono text-red-500 text-xs tracking-[0.35em] uppercase border-b border-red-900/25 pb-2 mb-8 w-fit">
      {{ t('hero.badge') }}
    </h2>
    <div class="flex flex-row items-center gap-5 group">
      <div class="relative shrink-0">
        <div
          class="absolute inset-0 bg-red-600/25 blur-2xl scale-150 rounded-full group-hover:scale-[2] transition-transform duration-700 ease-out" />
        <!-- относительный путь к картинке используется так как в билде все файлы из public будут в одной папке -->
        <img src="./mervik.jpg" class="object-cover size-16 md:size-20 rounded-xl md:rounded-2xl" alt="MerVik logo" />
      </div>
      <div>
        <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white leading-none">
          MerVik
        </h1>
        <p class="font-mono text-red-500 tracking-[0.22em] uppercase text-[10px] md:text-[14px]">
          {{ t('hero.subtitle') }}
        </p>
      </div>
    </div>
    <p
      class="font-mono text-neutral-300 text-base md:text-lg border-l-2 border-red-600 pl-4 mt-8 max-w-xl leading-relaxed">
      {{ t('hero.tagline') }}
    </p>
  </header>
</template>
<script lang="ts" setup>
const { t } = useI18n()
</script>