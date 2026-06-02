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
  modules: ['nuxt-single-html', '@nuxtjs/seo'],
  singleHtml: {
    enabled: true,
    deleteInlinedFiles: true,
    output: 'index.html'
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
    description: 'Портфолио веб-разработчика MerVik'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Портфолио MerVik | Веб-разработчик',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Портфолио MerVik — Vue / Nuxt / Fullstack разработчик. Проекты, опыт и контакты.' },
      ],
      link: [
        { rel: 'icon', href: './favicon.ico' }
      ]
    }
  },
})