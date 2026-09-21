export type Locale = 'ru' | 'en'

export interface Localized {
    ru: string
    en: string
}

export type ExperienceStatus = 
    | 'completed'   // Проект полностью завершен и сдан
    | 'development' // Активная фаза разработки (пилятся новые фичи)
    | 'maintenance' // Поддержка (багфиксы, минорные апдейты)
    | 'current'     // Текущая основная работа
    | 'education'   // Обучение, стажировки
    | 'archived'    // Архив / Legacy

export interface Experience {
    role: Localized
    company: Localized
    description: Localized
    period: Localized
    github?: string
    website?: string
    status?: ExperienceStatus
    commercial?: boolean
    image?: string
}

export const experience: Experience[] = [
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'ГК «Некрасовский»', en: 'Nekrasovsky Group' },
        period: { ru: 'июнь 2026 — сентябрь 2026', en: 'June 2026 — September 2026' },
        description: {
            ru:
                'Коммерческий сайт для группы компаний Некрасовский на заказ. Ключевой фокус — презентация бизнеса для международной аудитории: реализовал поддержку трёх языков (русский, английский, китайский) и переключение тёмной/светлой темы. Спроектировал backend на Payload CMS с админ-панелью для самостоятельного управления контентом заказчиком, структуру MongoDB и API. Frontend — Nuxt + Tailwind, ISR-рендеринг, SEO-оптимизация под коммерческий трафик.',
            en:
                'Commercial website for the Nekrasovsky group of companies. Key focus — presenting the business to an international audience: implemented three-language support (Russian, English, Chinese) and dark/light theme switching. Designed a backend on Payload CMS with an admin panel so the client can manage content independently, plus the MongoDB structure and API. Frontend — Nuxt + Tailwind, ISR rendering, SEO optimization for commercial traffic.',
        },
        website: 'https://nekras.ru',
        status: 'completed',
        commercial: true,
        image: 'https://i.ibb.co/tTxCVfcm/favicon.png'
    },
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'Freshcheck', en: 'Freshcheck' },
        period: { ru: 'май 2026 — август 2026', en: 'May 2026 — August 2026' },
        description: {
            ru:
                'Сайт для гражданской инициативы жителей Астрахани — независимый проект с open-source кодом. Здесь в приоритете была скорость запуска и открытость: backend на Payload CMS + MongoDB. Frontend на Nuxt + Tailwind с тёмной/светлой темой, ISR и SEO — чтобы контент по проверкам находился в поиске и быстро обновлялся.',
            en:
                'Website for a civic initiative of Astrakhan residents — an independent project with open-source code. The priority here was speed to launch and openness: backend on Payload CMS + MongoDB. Frontend on Nuxt + Tailwind with dark/light theme, ISR and SEO — so inspection content shows up in search and updates fast.',
        },
        github: 'https://github.com/RostorVlasov/prosrochkapatrol',
        website: 'https://freshcheckastra.ru/',
        status: 'maintenance',
        commercial: true,
        image: 'https://api.freshcheckastra.ru/api/media/file/Frame%20433-1.png'
    },
    {
        role: { ru: 'Frontend Developer', en: 'Frontend Developer' },
        company: { ru: 'Личный проект (Портфолио)', en: 'Personal project (Portfolio)' },
        period: { ru: 'июнь 2026 — наст. время', en: 'June 2026 — present' },
        description: {
            ru:
                'Проектирование, разработка и поддержка личного сайта-портфолио на Nuxt и Tailwind CSS v4. Настроен автоматический деплой на GitHub Pages.',
            en:
                'Design, development, and ongoing maintenance of a personal portfolio site using Nuxt and Tailwind CSS v4. Automated deployment configured via GitHub Pages.',
        },
        github: 'https://github.com/mervik104/mervik-portfolio',
        website: 'https://mervik.ru/',
        status: 'maintenance',
        image: './mervik.jpg'
    },
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'Nuxtgram - Личный проект', en: 'Nuxtgram - Personal project' },
        period: { ru: 'зима 2026 — наст.время', en: 'Winter 2026 — present' },
        description: {
            ru:
                'Social/photo-блог в духе Instagram: посты с картинками, лайки/реакции, комментарии, подписки, профили. Архитектура полностью serverless — без собственного монолитного бэкенда, только сервисы-провайдеры с чётким разделением зон ответственности. Frontend — Nuxt 4 SPA (Vue 3.5, TypeScript 5.9): ssr отключён, hash-роутинг, статическая сборка (компактный index.html + hashed-чанки _nuxt/*) деплоится на GitHub Pages через gh-pages (--nojekyll, иначе Pages дропает папки с _); CI пока нет. Аутентификация полностью на Clerk (@clerk/nuxt) — регистрация и вход по email/OAuth, управление сессией; Clerk выдаёт JWT по кастомному шаблону surrealdb (issuer/audience привязаны к проекту). Этот же JWT служит сессионным токеном для прямого подключения SPA к SurrealDB — доступ к данным ограничивается server-side permissions по схеме, а не фронтендом. Отдельно Cloudflare Worker проверяет тот же JWT (issuer/audience/sub) для провижининга пользователей и всех медиа-операций — фронтенд не является границей доверия, секреты и права живут на сервере. Данные — SurrealDB (документно-графовая БД) через типизированный ORM surqlize: таблицы users, media, posts, comments и рёбра follows, post_reactions, comment_reactions, доступ построен на server-side permissions по схеме (миграция 001-infrastructure.surql), плюс real-time LIVE-подписки на изменения с инкрементальным обновлением сторов. Медиа и файлы — Cloudflare Worker поверх Cloudflare R2: presigned URL на загрузку/скачивание с TTL, проверка владельца объекта, ограничение размера, публичных прямых загрузок в bucket нет. State-менеджмент — Pinia (auth/post/comment/follows-сторы), формы — vee-validate + Zod-схемы, UI — @nuxt/ui, Tailwind CSS 4, tailwind-variants, color-mode, toast-уведомления, анимации через @formkit/auto-animate. Есть юнит-тесты на bun:test (мапперы, схема, реакции, форматирование, стейт, логгер, dom, редиректы) и собственный браузерный логгер, пишущий пачками в локальный лог-эндпоинт. Отдельная деталь эволюции проекта: раньше Nuxtgram работал на self-hosted Payload CMS (Next.js + MongoDB) как монолитном бэкенде — этот код вынесен и сохранён отдельно как legacy-репозиторий (nuxtgram-backend) исключительно для истории, а текущая архитектура полностью переехала на serverless-стек.',
            en:
                'An Instagram-style social/photo feed app: posts with images, likes/reactions, comments, follows, and profiles. The architecture is fully serverless — no self-hosted monolithic backend, only provider services with clearly separated responsibilities. Frontend is a Nuxt 4 SPA (Vue 3.5, TypeScript 5.9): SSR disabled, hash-based routing, a static build (a compact index.html plus hashed _nuxt/* chunks) deployed to GitHub Pages via gh-pages (with --nojekyll, since Pages\' default Jekyll processing would otherwise drop underscore-prefixed folders); no CI pipeline yet. Authentication runs entirely on Clerk (@clerk/nuxt) — email/OAuth sign-up and sign-in, session management; Clerk issues a JWT from a custom "surrealdb" template with a project-specific issuer and audience. That same JWT doubles as the session token for the SPA\'s direct connection to SurrealDB — data access is limited by schema-level, server-side permissions rather than by the frontend. Separately, a Cloudflare Worker verifies the same JWT (issuer/audience/subject) for user provisioning and all media operations — the frontend is never treated as a trust boundary, and all secrets and authorization live server-side. Data lives in SurrealDB (a document-graph database) accessed through the typed surqlize ORM: tables for users, media, posts, comments, and edges for follows, post_reactions, comment_reactions, with access enforced by schema-level, server-side permissions (migration 001-infrastructure.surql), plus real-time LIVE subscriptions that incrementally update the Pinia stores. Media and file handling go through a Cloudflare Worker in front of Cloudflare R2: presigned upload/download URLs with a TTL, ownership checks on objects, size limits, and no direct public writes to the bucket. State management is Pinia (auth/post/comment/follows stores), forms use vee-validate with Zod schemas, and the UI is built on @nuxt/ui, Tailwind CSS 4, tailwind-variants, color-mode support, toast notifications, and @formkit/auto-animate for animation. The project has unit tests on bun:test (mappers, schema, reactions, formatting, state, logger, dom, redirects) and a custom browser logger that batches logs to a local log endpoint. One notable part of the project\'s evolution: Nuxtgram originally ran on a self-hosted Payload CMS backend (Next.js + MongoDB) as its monolith — that code has since been split out and preserved separately as a legacy repository (nuxtgram-backend) purely for reference, while the current codebase has fully moved to the serverless stack described above.',
        },
        github: 'https://github.com/mervik104/nuxtgram-frontend',
        website: 'https://nuxtgram.mervik.ru',
        status: 'development',
        image: './nuxtgram.png'
    },
    {
        role: { ru: 'Самообучение', en: 'Self-education' },
        company: { ru: 'Путь в разработку', en: 'Path into development' },
        period: { ru: 'начало май 2024', en: 'Early May 2024' },
        description: {
            ru:
                'Погружение в разработку с нуля: начал с основ — HTML, CSS и JavaScript, разобрался с версткой, DOM и логикой интерфейсов. Далее изучил React и CSS-фреймворки (Tailwind CSS), собирал первые компонентные приложения. Постепенно перешёл на Vue и Nuxt — этот стек оказался ближе по архитектуре, реактивности и developer experience, и с тех пор стал основным. На завершающем этапе занялся backend-разработкой: Node.js, работа с базами данных, проектирование REST API. Параллельно осваивал современные AI-инструменты (Cursor, Claude, GitHub Copilot и подобные) как часть повседневного workflow — для ускорения разработки, ревью кода и решения нетиповых задач.',
            en:
                'A from-scratch journey into development: started with the fundamentals — HTML, CSS and JavaScript, learning markup, the DOM, and interface logic. Moved on to React and CSS frameworks (Tailwind CSS), building early component-based apps. Gradually transitioned to Vue and Nuxt — this stack felt closer in architecture, reactivity, and developer experience, and has been my primary stack since. In the final stage, picked up backend development: Node.js, databases, REST API design. Alongside this, adopted modern AI tools (Cursor, Claude, GitHub Copilot and similar) as part of the everyday workflow — for speeding up development, code review, and tackling non-trivial problems.',
        },
        status: 'education',
    },
]
