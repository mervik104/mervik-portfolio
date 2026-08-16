export default defineI18nLocale(() => ({
  meta: {
    title: 'MerVik Portfolio — Web Developer',
    description: 'MerVik Portfolio — Vue / Nuxt / Fullstack developer. Projects, experience and contacts.',
    ogTitle: 'MerVik Portfolio',
    ogDescription: 'Check out my work.',
  },
  hero: {
    badge: 'Portfolio',
    subtitle: 'Frontend / Fullstack Developer',
    tagline:
      'I build modern interfaces and fullstack applications with a focus on architecture, UX and performance.',
  },
  about: {
    title: 'About me',
    p1: "I'm a frontend developer creating modern web interfaces and fullstack applications. My core stack is {vue}, {nuxt}, {react} and {ts}.\n\nI can design scalable application architecture, work with {restApi}, global state and complex UI systems. I make interfaces responsive across all screen sizes, implement dark and light themes out of the box, and add multi-language support — from two languages up to three or four in a single project.\n\nI also have experience with {mongodb}, {sqlite}, {payloadCms} and a bit of {expressJs}.\n\nI focus on clean code, performance and visually polished interfaces: I optimize load times, improve SEO and make sure the site feels equally good on desktop and mobile.",
    p2: "I mostly work with the {nuxt} + {payloadCms} combo — it lets me run the whole product end to end: from database structure and API to the final interface. This approach gives full control over the architecture and cuts down coordination time between frontend and backend. I've implemented different auth approaches: tried JWT with access/refresh tokens and auto-refresh via interceptors, but eventually switched to session-based auth through httpOnly cookies (Payload CMS) — a safer option against XSS.",
  },
  stack: {
    title: 'Tech stack',
    categories: {
      core: 'Core',
      frontend: 'Frontend',
      state: 'State',
      styling: 'Styling',
      backend: 'Backend',
      dataTools: 'Data & Tools',
    },
  },
  experience: {
    title: 'Experience',
    completed: 'Completed',
    inDevelopment: 'In development',
    openSite: 'Visit site',
  },
  contact: {
    title: 'Get in touch',
  },
  contacts: {
    telegram: "Telegram: {'@'}mervik104",
    github: 'GitHub: mervik104',
    mail: "mervik104{'@'}gmail.com",
  },
  footer: {
    rights: '© 2026 MerVik (Boris Stepanenko). All rights reserved.',
  },
  language: {
    title: 'Switch language',
    en: 'English',
    ru: 'Russian',
  },
}))
