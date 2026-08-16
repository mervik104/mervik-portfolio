# MerVik — Сайт-визитка

Портфолио веб-разработчика MerVik (Boris Stepanenko). Одностраничный сайт-визитка на **Nuxt 4** с тёмной темой, красными акцентами и анимированным фоном-«созвездием».

**Живая версия:** [mervik.ru](https://mervik.ru/)

## Стек

- [Nuxt 4](https://nuxt.com) (SSG, single-page output)
- [Tailwind CSS v4](https://tailwindcss.com) + Vite-плагин
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — русский и английский
- [@nuxtjs/seo](https://nuxtseo.com) — sitemap, robots, Open Graph
- [nuxt-single-html](https://github.com/harlan-zw/nuxt-single-html) — инлайнит JS/CSS в один `index.html`
- [gh-pages](https://github.com/tschaub/gh-pages) — деплой на GitHub Pages
- [tsParticles](https://particles.js.org/) — фон «созвездие» (Links-пресет, красная палитра)

## Возможности

- **Один файл** — вся сборка инлайнится в `index.html` (~580 КБ), хостится на GitHub Pages
- **Мультиязычность** — RU/EN с переключателем, без префиксов в URL
- **SEO** — sitemap.xml, robots.txt, Open Graph/Twitter-карточки, `theme-color`, локаль в `<html lang>`
- **Фон-«созвездие»** — tsParticles (Links-пресет) в красных тонах: сеть точек и линий, hover-«grab» от курсора; канвас растянут на высоту документа и «листается» со страницей, под контентом скрыт плотным фоном колонки; включается на широких экранах, уважает `prefers-reduced-motion`
- **Анимации появления** секций через IntersectionObserver
- **Без JS контент не пропадает** — reveal-анимации включаются только при работающем JS
- **Fallback изображений** проектов — при битой картинке показываются инициалы компании
- **Доступность** — `aria-pressed`, `role="status"`, `focus-visible`, `noopener` на внешних ссылках

## Быстрый старт

```bash
# установка
bun install
# (или npm install / pnpm install / yarn)

# дев-сервер на http://localhost:3000
bun run dev

# продакшен-сборка (статический вывод в .output/public)
bun run build

# локальный просмотр собранной версии
bun run preview
```

## Команды

| Команда | Описание |
| --- | --- |
| `dev` | Dev-сервер с HMR |
| `build` | Статическая генерация (`nuxi generate`) |
| `preview` | Локальный предпросмотр `.output/public` |
| `icons:download` | Скачивание SVG-иконок стека в `public/icons` |
| `deploy` | Сборка + публикация на GitHub Pages (`gh-pages -d dist`) |

> `dist` — симлинк на `.output/public`.

## Структура проекта

```
app/
  assets/css/main.css      — шрифты, тема Tailwind
  components/              — секции страницы (Hero, About, Stack, ...)
  composables/
    useParticles.ts        — tsParticles-фон «созвездие» (Links + hover-grab)
    useReveal.ts           — reveal-анимации секций
    useRichText.ts         — подсветка терминов в тексте «Обо мне»
  data/                    — контакты, стек, опыт (содержимое страницы)
  utils/iconPath.ts        — путь к иконке по ключу (prefix:name → /icons/...)
i18n/locales/              — переводы ru.ts / en.ts
public/                    — статика: favicons, иконки стека, изображения проектов
nuxt.config.ts             — конфигурация Nuxt, i18n, SEO, single-html
```

Содержимое страницы (стек, проекты, контакты) вынесено в `app/data/` — правки не требуют пересборки логики.

## Деплой

```bash
bun run deploy
```

Сборка кладётся в `.output/public` и публикуется в ветку `gh-pages`. Домен `mervik.ru` задаётся через `public/CNAME`.

## Особенности конфигурации

- **Одна страница без сервера.** Чтобы `nuxt-single-html` заинлайнил всё в один файл, сообщения i18n держатся в JS-бандле (`experimental.optimizeMessageBundling: false`), а роутинг не используется.
- **Контент видим без JS.** Класс `js` на `<html>` добавляется инлайн-скриптом в `<head>`; reveal-скрытие контента работает только при его наличии.
- **Абсолютные пути для SEO.** `og:image` и прочие мета-теги приводятся к абсолютному виду, чтобы соцсети и краулеры корректно их читали.
