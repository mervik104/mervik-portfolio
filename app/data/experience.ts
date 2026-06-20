export interface experienceType {
    role: string
    company: string
    description: string
    period: string
    github?: string
    website?: string
    status?: 'completed' | 'development'
}

export const experience: experienceType[] = [
    {
        role: 'Fullstack Developer',
        company: "ГК «Некрасовский»",
        period: 'июнь 2026 — наст.время',
        description:
            'Разработка коммерческого сайта для группы компаний «Некрасовский» на заказ. Полный цикл создания продукта — от архитектуры до UI. Спроектировал backend на Payload CMS, структуру базы данных MongoDB, API и админ-панель. Реализовал frontend на Nuxt с Tailwind: компоненты, анимации, взаимодействие с данными. Добавил тёмную и светлую тему, поддержку трёх языков (русский, английский, китайский). Использовал ISR-подход к рендерингу, провёл SEO-оптимизацию.',
        github: 'https://github.com/RostorVlasov/nekrasovsky-group',
        status: 'development',
    },
    {
        role: 'CTO & Fullstack Developer',
        company: 'Freshcheck',
        period: 'май 2026 — июнь 2026',
        description:
            'Разработка сайта для Freshcheck — независимой гражданской инициативы жителей Астрахани. Полный цикл разработки продукта — от архитектуры до UI. Спроектировал backend на Payload CMS, структуру базы данных MongoDB, API и админ-панель. Реализовал frontend на Nuxt с Tailwind: компоненты, анимации, взаимодействие с данными. Добавил тёмную и светлую тему, использовал ISR-подход к рендерингу. Провёл SEO-оптимизацию.',
        github: 'https://github.com/RostorVlasov/prosrochkapatrol',
        website: 'https://freshcheckastra.ru/',
        status: 'completed',
    },
    {
        role: 'Frontend Developer',
        company: 'Личный проект',
        period: 'июнь 2026 — июнь 2026',
        description:
            'Разработал этот сайт-визитку на Nuxt и Tailwind CSS v4. Задеплоил на GitHub Pages.',
        github: 'https://github.com/mervik104/mervik-portfolio',
        website: 'https://mervik.ru/',
        status: 'completed',
    },
    {
        role: 'CEO & Fullstack Developer',
        company: 'Nuxtgram - Личный проект',
        period: 'зима 2026 — наст.время',
        description:
            'Разработка социальной платформы на стеке Nuxt + Payload CMS + Tailwind. Отвечал за backend-логику, структуру базы данных, API и frontend-интерфейс. Реализовал систему постов, UI-компоненты и базовую архитектуру приложения.',
        github: 'https://github.com/mervik104/nuxtgram-frontend',
        status: 'development',
    }
]