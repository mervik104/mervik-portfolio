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
      routes: ['/'],
      crawlLinks: false,
    },
    routeRules: {
      '/': { prerender: true }
    }
  },

  features: {
    inlineStyles: true,
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      alwaysRedirect: false,
    },
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
        { rel: 'icon', href: './favicon.ico' }
      ]
    }
  },
})