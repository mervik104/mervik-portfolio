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
        role: 'CTO & Fullstack Developer',
        company: 'Freshcheck',
        period: 'май 2026 — настоящее время',
        description:
            'Полный цикл разработки продукта: от архитектуры до UI. Разрабатывал backend на Payload CMS, проектировал MongoDB структуру, API и админ-панель. На frontend реализовывал интерфейсы на Nuxt с Tailwind, компоненты, анимации и взаимодействие с данными.',
        github: 'https://github.com/RostorVlasov/prosrochkapatrol',
        website: 'https://freshcheckastra.ru/',
        status: 'development',
    },
    {
        role: 'CEO & Fullstack Developer',
        company: 'Nuxtgram',
        period: 'зима 2026 — настоящее время',
        description:
            'Разработка социальной платформы на полном стеке Nuxt + Payload CMS + Tailwind. Отвечал за backend-логику, структуру базы данных, API и frontend-интерфейс. Реализовал систему постов, UI компонентов и базовую архитектуру приложения.',
        github: 'https://github.com/mervik104/nuxtgram-frontend',
        status: 'development',
    }
]