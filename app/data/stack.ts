export interface StackTech {
    name: string
    icon: string
}

export interface StackCategory {
    key: string
    items: StackTech[]
}

export const stack: StackCategory[] = [
    {
        key: 'core',
        items: [
            { name: 'JavaScript', icon: 'skill-icons:javascript' },
            { name: 'TypeScript', icon: 'skill-icons:typescript' },
        ],
    },
    {
        key: 'frontend',
        items: [
            { name: 'React', icon: 'skill-icons:react-dark' },
            { name: 'Vue.js', icon: 'skill-icons:vuejs-dark' },
            { name: 'Nuxt.js', icon: 'skill-icons:nuxtjs-dark' },
        ],
    },
    {
        key: 'state',
        items: [
            { name: 'Redux', icon: 'skill-icons:redux' },
            { name: 'Pinia', icon: 'skill-icons:pinia-dark' },
            { name: 'Zustand', icon: 'devicon:zustand' },
        ],
    },
    {
        key: 'styling',
        items: [
            { name: 'HTML5', icon: 'skill-icons:html' },
            { name: 'CSS', icon: 'skill-icons:css' },
            { name: 'SCSS', icon: 'skill-icons:sass' },
            { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark' },
        ],
    },
    {
        key: 'backend',
        items: [
            { name: 'Node.js', icon: 'skill-icons:nodejs-dark' },
            { name: 'Payload CMS', icon: 'simple-icons:payloadcms' },
            { name: 'Express.js', icon: 'skill-icons:expressjs-light' },
            { name: 'MongoDB', icon: 'skill-icons:mongodb' },
            { name: 'SQLite', icon: 'skill-icons:sqlite' },
            { name: 'SurrealDB', icon: 'devicon:surrealdb' },
        ],
    },
    {
        key: 'dataTools',
        items: [
            { name: 'REST API', icon: 'mdi:api' },
            { name: 'Vite', icon: 'skill-icons:vite-dark' },
            { name: 'Git', icon: 'skill-icons:git' },
            { name: 'Npm', icon: 'skill-icons:npm-dark' },
            { name: 'Bun', icon: 'skill-icons:bun-dark' },
            { name: 'Yarn', icon: 'skill-icons:yarn-dark' }
        ],
    },
]