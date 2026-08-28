export type Locale = 'ru' | 'en'

export interface Localized {
    ru: string
    en: string
}

export interface Experience {
    role: Localized
    company: Localized
    description: Localized
    period: Localized
    github?: string
    website?: string
    status?: 'completed' | 'development' | 'education'
    commercial?: boolean
    image?: string
}

export const experience: Experience[] = [
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'ГК «Некрасовский»', en: 'Nekrasovsky Group' },
        period: { ru: 'июнь 2026 — август 2026', en: 'June 2026 — August 2026' },
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
        company: { ru: 'Internetlab (тестовое задание)', en: 'Internetlab (test assignment)' },
        period: { ru: 'июль 2026 — июль 2026', en: 'July 2026 — July 2026' },
        description: {
            ru:
                'Тестовое задание: форма обратной связи с анализом тональности сообщений через Google Gemini AI. Backend на FastAPI с слоистой архитектурой (API / Service / Repository), Pydantic-валидация, rate limiting и логирование запросов. Frontend на Nuxt 4 с Pinia и Tailwind CSS 4. Реализован graceful fallback при недоступности AI-модели, автогенерация Swagger-документации.',
            en:
                'Test assignment: a contact form with message sentiment analysis via Google Gemini AI. Backend on FastAPI with layered architecture (API / Service / Repository), Pydantic validation, rate limiting and request logging. Frontend on Nuxt 4 with Pinia and Tailwind CSS 4. Implemented a graceful fallback when the AI model is unavailable, and auto-generated Swagger documentation.',
        },
        github: 'https://github.com/mervik104/internetlab-contact-form-ai',
        status: 'completed',
        image: 'https://internetlab.ru/front/img/logo-white.svg'
    },
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'Freshcheck', en: 'Freshcheck' },
        period: { ru: 'май 2026 — июнь 2026', en: 'May 2026 — June 2026' },
        description: {
            ru:
                'Сайт для гражданской инициативы жителей Астрахани — независимый проект с open-source кодом. Здесь в приоритете была скорость запуска и открытость: backend на Payload CMS + MongoDB. Frontend на Nuxt + Tailwind с тёмной/светлой темой, ISR и SEO — чтобы контент по проверкам находился в поиске и быстро обновлялся.',
            en:
                'Website for a civic initiative of Astrakhan residents — an independent project with open-source code. The priority here was speed to launch and openness: backend on Payload CMS + MongoDB. Frontend on Nuxt + Tailwind with dark/light theme, ISR and SEO — so inspection content shows up in search and updates fast.',
        },
        github: 'https://github.com/RostorVlasov/prosrochkapatrol',
        website: 'https://freshcheckastra.ru/',
        status: 'completed',
        commercial: true,
        image: 'https://api.freshcheckastra.ru/api/media/file/Frame%20433-1.png'
    },
    {
        role: { ru: 'Frontend Developer', en: 'Frontend Developer' },
        company: { ru: 'Личный проект', en: 'Personal project' },
        period: { ru: 'июнь 2026 — июнь 2026', en: 'June 2026 — June 2026' },
        description: {
            ru:
                'Разработал сайт-визитку на Nuxt и Tailwind CSS v4. Задеплоил на GitHub Pages.',
            en:
                'Built portfolio site with Nuxt and Tailwind CSS v4. Deployed to GitHub Pages.',
        },
        github: 'https://github.com/mervik104/mervik-portfolio',
        website: 'https://mervik.ru/',
        status: 'completed',
        image: './mervik.jpg'
    },
    {
        role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
        company: { ru: 'Nuxtgram - Личный проект', en: 'Nuxtgram - Personal project' },
        period: { ru: 'зима 2026 — наст.время', en: 'Winter 2026 — present' },
        description: {
            ru:
                'Social/photo-блог в духе Instagram: посты с картинками, лайки/реакции, комментарии, подписки, профили. Архитектура полностью serverless — без собственного монолитного бэкенда, только сервисы-провайдеры с чётким разделением зон ответственности. Frontend — Nuxt 4 SPA (Vue 3.5, TypeScript 5.9): ssr отключён, hash-роутинг, сборка в один статический HTML через nuxt-single-html — весь проект деплоится как статика на GitHub Pages, без CI на данный момент. Аутентификация полностью на Clerk (@clerk/nuxt) — регистрация и вход по email/OAuth, управление сессией; для доступа к данным Clerk выдаёт JWT по кастомному шаблону с issuer и audience, привязанными к проекту. Этот же JWT служит сессионным токеном для SurrealDB и проверяется Cloudflare Worker (issuer/audience/наличие sub) перед любой операцией — фронтенд не является границей доверия, все секреты и права живут на сервере. Данные — SurrealDB (документно-графовая БД) через типизированный ORM surqlize: таблицы users, media, posts, comments и рёбра follows, post_reactions, comment_reactions, доступ построен на server-side permissions по схеме (миграция 001-infrastructure.surql), плюс real-time LIVE-подписки на изменения с инкрементальным обновлением сторов. Медиа и файлы — Cloudflare Worker поверх Backblaze B2: presigned URL на загрузку/скачивание с TTL, проверка владельца объекта, ограничение размера, публичных прямых загрузок в bucket нет. State-менеджмент — Pinia (auth/post/comment/follows-сторы), формы — vee-validate + Zod-схемы, UI — @nuxt/ui, Tailwind CSS 4, tailwind-variants, color-mode, toast-уведомления, анимации через @formkit/auto-animate. Есть юнит-тесты на bun:test (мапперы, схема, форматирование, логгер, редиректы) и собственный браузерный логгер, пишущий пачками в локальный лог-эндпоинт. Отдельная деталь эволюции проекта: раньше Nuxtgram работал на self-hosted Payload CMS (Next.js + MongoDB) как монолитном бэкенде — этот код вынесен и сохранён отдельно как legacy-репозиторий (nuxtgram-backend) исключительно для истории, а текущая архитектура полностью переехала на serverless-стек.',
            en:
                'An Instagram-style social/photo feed app: posts with images, likes/reactions, comments, follows, and profiles. The architecture is fully serverless — no self-hosted monolithic backend, only provider services with clearly separated responsibilities. Frontend is a Nuxt 4 SPA (Vue 3.5, TypeScript 5.9): SSR disabled, hash-based routing, built into a single static HTML file via nuxt-single-html — the whole app is deployed as static assets on GitHub Pages, with no CI pipeline yet. Authentication runs entirely on Clerk (@clerk/nuxt) — email/OAuth sign-up and sign-in, session management; for data access Clerk issues a JWT from a custom template with a project-specific issuer and audience. That same JWT doubles as the SurrealDB session token and is verified by a Cloudflare Worker (issuer/audience/subject checks) before any operation — the frontend is never treated as a trust boundary, all secrets and authorization live server-side. Data lives in SurrealDB (a document-graph database) accessed through the typed surqlize ORM: tables for users, media, posts, comments, and edges for follows, post_reactions, comment_reactions, with access enforced by schema-level, server-side permissions (migration 001-infrastructure.surql), plus real-time LIVE subscriptions that incrementally update the Pinia stores. Media and file handling go through a Cloudflare Worker in front of Backblaze B2: presigned upload/download URLs with a TTL, ownership checks on objects, size limits, and no direct public writes to the bucket. State management is Pinia (auth/post/comment/follows stores), forms use vee-validate with Zod schemas, and the UI is built on @nuxt/ui, Tailwind CSS 4, tailwind-variants, color-mode support, toast notifications, and @formkit/auto-animate for animation. The project has unit tests on bun:test (mappers, schema, formatting, logger, redirects) and a custom browser logger that batches logs to a local log endpoint. One notable part of the project\'s evolution: Nuxtgram originally ran on a self-hosted Payload CMS backend (Next.js + MongoDB) as its monolith — that code has since been split out and preserved separately as a legacy repository (nuxtgram-backend) purely for reference, while the current codebase has fully moved to the serverless stack described above.',
        },
        github: 'https://github.com/mervik104/nuxtgram-frontend',
        status: 'development',
        image: './nuxtgram.png'
    },
    {
        role: { ru: 'Самообучение', en: 'Self-education' },
        company: { ru: 'Путь в разработку', en: 'Path into development' },
        period: { ru: 'май 2025 — январь 2026', en: 'May 2025 — January 2026' },
        description: {
            ru:
                'Погружение в разработку с нуля: начал с основ — HTML, CSS и JavaScript, разобрался с версткой, DOM и логикой интерфейсов. Далее изучил React и CSS-фреймворки (Tailwind CSS), собирал первые компонентные приложения. Постепенно перешёл на Vue и Nuxt — этот стек оказался ближе по архитектуре, реактивности и developer experience, и с тех пор стал основным. На завершающем этапе занялся backend-разработкой: Node.js, работа с базами данных, проектирование REST API. Параллельно осваивал современные AI-инструменты (Cursor, Claude, GitHub Copilot и подобные) как часть повседневного workflow — для ускорения разработки, ревью кода и решения нетиповых задач.',
            en:
                'A from-scratch journey into development: started with the fundamentals — HTML, CSS and JavaScript, learning markup, the DOM, and interface logic. Moved on to React and CSS frameworks (Tailwind CSS), building early component-based apps. Gradually transitioned to Vue and Nuxt — this stack felt closer in architecture, reactivity, and developer experience, and has been my primary stack since. In the final stage, picked up backend development: Node.js, databases, REST API design. Alongside this, adopted modern AI tools (Cursor, Claude, GitHub Copilot and similar) as part of the everyday workflow — for speeding up development, code review, and tackling non-trivial problems.',
        },
        status: 'education',
    },
]
