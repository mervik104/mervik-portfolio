# MerVik — Сайт-визитка и PDF-резюме

[![PageSpeed](https://img.shields.io/badge/PageSpeed-100%2F100-brightgreen?logo=googlechrome&logoColor=white)](https://pagespeed.web.dev/analysis/https-mervik-ru/hsxjj87m71?form_factor=desktop)

Портфолио веб-разработчика MerVik (Boris Stepanenko). Одностраничный сайт-визитка на **Nuxt 4** с тёмной темой, красными акцентами и анимированным фоном-«созвездием», плюс печатные резюме RU/EN, генерируемые из тех же данных в **PDF**.

**Живая версия:** [mervik.ru](https://mervik.ru/)
**Резюме онлайн:** [mervik.ru/resume/ru](https://mervik.ru/resume/ru) · [mervik.ru/resume/en](https://mervik.ru/resume/en)

## Стек

- [Nuxt 4](https://nuxt.com) (SSG, prerender)
- [Tailwind CSS v4](https://tailwindcss.com) + Vite-плагин
- [tailwind-variants](https://www.tailwind-variants.org) — управление вариантами классов
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — русский и английский
- [@nuxtjs/seo](https://nuxtseo.com) — sitemap, robots, Open Graph
- [nuxt-single-html](https://github.com/serkodev/nuxt-single-html) — инлайнит JS/CSS в каждый `index.html`
- [puppeteer-core](https://pptr.dev/) + локальный Chrome — генерация PDF-резюме из свёрстанной страницы
- [axe-core](https://github.com/dequelabs/axe-core) — аудит доступности собранного сайта
- [gh-pages](https://github.com/tschaub/gh-pages) — деплой на GitHub Pages
- [tsParticles](https://particles.js.org/) — фон «созвездие» (Links-пресет, красная палитра)

## Возможности

### Сайт

- **Инлайн-сборка** — JS/CSS каждой страницы инлайнятся в её `index.html`, хостится на GitHub Pages
- **Мультиязычность** — RU/EN с переключателем, без префиксов в URL
- **SEO** — sitemap.xml, robots.txt, Open Graph/Twitter-карточки, корректные `<html lang>`/`og:locale` на каждой странице
- **Фон-«созвездие»** — tsParticles (Links-пресет) в красных тонах с hover-«grab»; включается на широких экранах, уважает `prefers-reduced-motion`
- **Анимации появления** секций через IntersectionObserver; без JS контент не пропадает
- **Fallback изображений** проектов — при битой картинке показываются инициалы компании
- **Доступность** — `aria-*`, `focus-visible`, `noopener` на внешних ссылках

### Резюме и PDF

- **Страницы резюме** `/resume/ru` и `/resume/en` — деловая белая вёрстка с брендовыми акцентами, отдельный layout без шапки/футера сайта
- **PDF-генерация** (`scripts/generate-resume-pdf.mjs`): поднимает локальный сервер над `.output/public`, печатает страницы резюме через Chrome в A4 c фоном
- **Кликабельные ссылки в PDF**: телефон, Telegram, GitHub, почта, сайт mervik.ru в контактах; у каждого проекта — ссылки на сайт и репозиторий GitHub, если есть
- **Пагинация**: стр. 1 — шапка с фото, «Обо мне», контакты, стек, языки, образование; стр. 2 — опыт работы; запрет разрывов внутри блоков (`resume-avoid-break`)
- **Печать из браузера** — те же стили работают при Ctrl/Cmd+P на страницах `/resume/*`

## Быстрый старт

```bash
# установка
bun install
# (или npm install / pnpm install / yarn)

# дев-сервер на http://localhost:3000
bun run dev

# продакшен-сборка (статический вывод в .output/public)
bun run build

# генерация PDF-резюме (нужна собранная сборка + Chrome)
bun run generate:pdf

# локальный просмотр собранной версии
bun run preview
```

## Команды

| Команда | Описание |
| --- | --- |
| `dev` | Dev-сервер с HMR |
| `build` | Статическая генерация (`nuxi generate`) |
| `generate:pdf` | Печать `/resume/{ru,en}` в `public/` и `.output/public` PDF (Chrome ищется автоматически, override — `CHROME_PATH=/путь/к/chrome`) |
| `preview` | Локальный предпросмотр `.output/public` |
| `icons:download` | Скачивание SVG-иконок стека в `public/icons` |
| `audit:a11y` | Аудит доступности собранного сайта (axe-core; нужна сборка + Chrome) |
| `deploy` | Сборка → генерация PDF → публикация на GitHub Pages (`gh-pages -d dist`) |

> `dist` — симлинк на `.output/public`.
>
> PDF пишется сразу в два места: `public/` (чтобы файлы были в dev и в git как страховка) и `.output/public` (чтобы деплой забрал свежие). **Правки `.vue`-файлов попадают в PDF только после `npm run build && npm run generate:pdf`.**

## Структура проекта

```
app/
  assets/css/main.css      — шрифты, тема Tailwind
  components/
    shared/                — Hero, Background, LanguageToggle, SectionNav
    about/                 — секция «Обо мне»
    contacts/              — секция контактов
    experience/            — секция опыта и карточки проектов
    stack/                 — секция стека
    footer/                — футер
    icons/                 — SVG-иконки (GitHub, Telegram, почта, флаги)
    resume/ResumeSection.vue — секция резюме (опция avoid-break против разрывов страниц)
  plugins/
    restore-locale.client.ts — восстановление локали из куки после гидрации
  composables/
    useParticles.ts        — tsParticles-фон «созвездие» (Links + hover-grab)
    useReveal.ts           — reveal-анимации секций
    useRichText.ts         — подсветка терминов в тексте «Обо мне»
  data/
    contacts.ts            — ссылки контактов (Telegram, GitHub, почта)
    experience.ts          — опыт: роль, компания, описание, github?/website?, статус
    resume.ts              — общие константы: имя, фото, пути к PDF
    resume.ru.ts/en.ts     — локализованные данные резюме (телефон, формат, часовой пояс, «Обо мне»)
    stack.ts               — стек технологий
  layouts/resume.vue       — layout резюме: тулбар (RU/EN, PDF-кнопки), печатные стили
  pages/
    index.vue              — главная (сайт-визитка)
    resume/[lang].vue      — страница резюме (ru/en): шапка, секции, ссылки проектов
i18n/locales/              — переводы ru.ts / en.ts
scripts/
  generate-resume-pdf.mjs  — PDF-генерация: статический сервер + puppeteer-core
  download-icons.mjs       — загрузка иконок стека
  a11y-audit.mjs           — аудит доступности (axe-core) по всем маршрутам
public/                    — статика: favicons, иконки, фото, готовые PDF-резюме
nuxt.config.ts             — Nuxt, i18n, SEO, single-html, prerender-роуты
```

Содержимое (стек, проекты, контакты, тексты резюме) вынесено в `app/data/` — правки не требуют пересборки логики, но для PDF нужен переген.

## Деплой

```bash
bun run deploy
```

Цепочка: `build` (статика + prerender `/`, `/resume/ru`, `/resume/en`) → `generate:pdf` (печать резюме в PDF) → публикация `.output/public` в ветку `gh-pages`. Домен `mervik.ru` задаётся через `public/CNAME`.

## Особенности конфигурации

- **Одна страница без сервера.** Чтобы `nuxt-single-html` заинлайнил всё, сообщения i18n держатся в JS-бандле (`experimental.optimizeMessageBundling: false`).
- **`inlineStyles: false` — обязательно.** Nuxt-инлайнер стилей в проде превращает `:is(:where(.group):hover *)` в невалидный `:hover*`, ломая все `group-hover`-эффекты. `nuxt-single-html` инлайнит CSS/JS в HTML самостоятельно и без этой фичи.
- **Контент видим без JS.** Класс `js` на `<html>` добавляется инлайн-скриптом в `<head>`; reveal-скрытие работает только при его наличии.
- **Абсолютные пути для SEO.** `og:image` и мета-теги приводятся к абсолютному виду; favicon подключён абсолютным путём `/favicon.ico`, чтобы работал на вложенных страницах `/resume/*`.
- **Локаль резюме.** Страница `/resume/[lang]` переключает локаль i18n в `useAsyncData`, а `<html lang>`/`og:locale` переопределяются через повышенные `tagPriority` (у `nuxt-seo-utils` дефолты фиксируются на этапе плагина).
- **Поля PDF задаются в скрипте генерации** (`margin`, `displayHeaderFooter`, `footerTemplate`), а не в CSS `@page` — так нижнее поле гарантированно оставляет место под колонтитул.
