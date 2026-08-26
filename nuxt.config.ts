import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  nitro: {
    preset: 'static',
    static: true,
    prerender: {
      routes: [
        '/',
        '/resume/ru',
        '/resume/en',
        '/tg',
        '/telegram',
        '/vk',
        '/github',
        '/mail',
        '/discord',
      ],
      crawlLinks: false,
    },
    routeRules: {
      '/': { prerender: true },
      '/resume/ru': { prerender: true },
      '/resume/en': { prerender: true },
    }
  },

  // ВАЖНО: inlineStyles: true ломает group-hover в проде — Nuxt-инлайнер
  // превращает `:is(:where(.group):hover *)` в невалидный `:hover*`.
  // nuxt-single-html инлайнит CSS/JS-файлы в HTML сам, без этой фичи.
  features: {
    inlineStyles: false,
  },
  modules: ['nuxt-single-html', '@nuxtjs/i18n', '@nuxtjs/seo'],
  singleHtml: {
    enabled: true,
    deleteInlinedFiles: true,
    output: 'index.html'
  },

  i18n: {
    locales: [
      { code: 'ru', language: 'ru-RU', file: 'ru.ts' },
      { code: 'en', language: 'en-US', file: 'en.ts' },
    ],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    langDir: 'locales',
    // ВАЖНО: detectBrowserLanguage переключает локаль по куке ДО гидрации,
    // а статический HTML всегда сгенерирован на ru (defaultLocale) —
    // это давало "Hydration completed but contains mismatches".
    // Выбранный язык восстанавливаем из куки ПОСЛЕ гидрации в plugins/restore-locale.client.ts.
    detectBrowserLanguage: false,
    // messages держим в JS-бандле (а не в /_i18n/.../messages.json),
    // чтобы nuxt-single-html всё заинлайнил в один index.html
    experimental: {
      optimizeMessageBundling: false,
    },
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  site: {
    url: 'https://mervik.ru',
    name: 'MerVik Portfolio',
    description: 'Портфолио веб-разработчика MerVik',
    defaultLocale: 'ru'
  },
  linkChecker: {
    excludeLinks: [
      '/Boris_Stepanenko_CV_ru.pdf',
      '/Boris_Stepanenko_CV_en.pdf',
    ],
  },
  app: {
    head: {
      script: [
        // добавляем класс js на <html> как можно раньше — без JS контент не скрывается
        { innerHTML: "document.documentElement.classList.add('js')", tagPriority: 'critical' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        // шрифты выше сгиба: заголовок (Bebas Neue) и основной текст (DM Mono)
        { rel: 'preload', href: '/fonts/BebasNeue-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/DMMono-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },
})