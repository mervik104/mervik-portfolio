<template>
  <div class="resume-root min-h-screen bg-neutral-100 font-mono text-neutral-900 print:bg-white">
    <div class="resume-sheet max-w-[210mm] mx-auto min-h-screen bg-white shadow-xl sm:shadow-2xl print:max-w-none print:shadow-none">
      <div
        class="no-print flex flex-nowrap items-center justify-between gap-2 border-b border-neutral-100 px-4 py-3 md:px-10 md:py-4">
        <nav class="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1 text-xs uppercase tracking-widest"
          role="group" :aria-label="t('language.title')">
          <NuxtLink to="/resume/ru" :class="langLink({ active: lang === 'ru' })" :aria-current="lang === 'ru' ? 'page' : undefined">
            RU
          </NuxtLink>
          <NuxtLink to="/resume/en" :class="langLink({ active: lang === 'en' })" :aria-current="lang === 'en' ? 'page' : undefined">
            EN
          </NuxtLink>
        </nav>

        <div class="flex min-w-0 items-center gap-1.5">
          <a :href="currentPdf" download rel="noopener noreferrer"
            class="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium tracking-wide text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:hidden">
            PDF ↓
          </a>
          <a :href="PDF_RU" download rel="noopener noreferrer"
            class="hidden items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium tracking-wide text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:inline-flex">
            {{ t('resume.downloadRu') }}
          </a>
          <a :href="PDF_EN" download rel="noopener noreferrer"
            class="hidden items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium tracking-wide text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:inline-flex">
            {{ t('resume.downloadEn') }}
          </a>
          <NuxtLink to="/" :aria-label="t('resume.backToSite')"
            class="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs tracking-wide text-neutral-500 transition-colors duration-200 hover:border-red-200 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:hidden">
            ←
          </NuxtLink>
          <NuxtLink to="/"
            class="hidden items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs tracking-wide text-neutral-500 transition-colors duration-200 hover:border-red-200 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:inline-flex">
            ← {{ t('resume.backToSite') }}
          </NuxtLink>
        </div>
      </div>

      <main class="px-6 py-8 md:px-10 md:py-10 print:p-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { PDF_EN, PDF_RU } from '@/data/resume'

const { t } = useI18n()
const route = useRoute()

const lang = computed<'ru' | 'en'>(() => (route.params.lang === 'en' ? 'en' : 'ru'))

const currentPdf = computed(() => (lang.value === 'en' ? PDF_EN : PDF_RU))

const langLink = tv({
    base: 'rounded-full px-3 py-1.5 transition-all duration-200',
    variants: {
        active: {
            true: 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]',
            false: 'text-neutral-400 hover:text-neutral-900',
        },
    },
})

useHead({
    bodyAttrs: { class: 'resume-body' },
    meta: [{ name: 'theme-color', content: '#ffffff' }],
})
</script>

<style>
body.resume-body {
    background-color: #ffffff;
}

@media print {
    /* поля и низ страницы задаёт scripts/generate-resume-pdf.mjs
       (page.pdf margins + footerTemplate с номером страницы) */
    html,
    body {
        background: #ffffff !important;
    }

    .resume-root {
        background: #ffffff !important;
        min-height: auto;
    }

    .resume-sheet {
        box-shadow: none !important;
        max-width: none !important;
        margin: 0 !important;
        min-height: auto !important;
    }

    .no-print {
        display: none !important;
    }

    .resume-avoid-break {
        break-inside: avoid;
        page-break-inside: avoid;
    }
}
</style>
