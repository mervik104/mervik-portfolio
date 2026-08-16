<template>
    <div>
        <header class="resume-avoid-break flex flex-col gap-5 sm:flex-row sm:items-center">
            <div class="relative shrink-0">
                <div class="absolute inset-0 scale-150 rounded-full bg-red-600/15 blur-2xl" />
                <img :src="PHOTO" :alt="NAME"
                    class="relative h-36 w-28 rounded-2xl border-2 border-red-600/70 object-cover object-top md:h-44 md:w-36" />
            </div>

            <div class="min-w-0">
                <h1 class="font-display text-3xl font-bold leading-none tracking-wider text-neutral-950 md:text-4xl">
                    {{ NAME }}
                </h1>
                <p class="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-red-600 md:text-sm">
                    {{ data.role }}
                </p>
            </div>

            <div class="space-y-1.5 text-sm text-neutral-700 sm:ml-auto sm:text-right">
                <p>
                    <span class="font-medium text-red-600">{{ t('resume.workFormat') }}:</span>
                    {{ data.workFormat }}
                </p>
                <p>
                    <span class="font-medium text-red-600">{{ t('resume.timezone') }}:</span>
                    {{ data.timezone }}
                </p>
            </div>
        </header>

        <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
            <ResumeSection :title="t('resume.summary')" :avoid-break="true"
                class="min-w-0 lg:col-start-1 lg:row-start-1">
                <p class="text-justify text-sm leading-relaxed text-neutral-700">
                    {{ data.summary.join(' ') }}
                </p>
            </ResumeSection>

            <aside class="min-w-0 space-y-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <ResumeSection :title="t('resume.contacts')" :avoid-break="true">
                    <ul class="space-y-2 text-sm">
                        <li>
                            <a :href="phoneHref"
                                class="flex items-center gap-2.5 text-neutral-700 transition-colors hover:text-red-700">
                                <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                                <span class="break-all">{{ data.phone }}</span>
                            </a>
                        </li>
                        <li v-for="contact in contacts" :key="contact.key">
                            <a :href="contact.href" target="_blank" rel="noopener noreferrer"
                                class="flex items-center gap-2.5 text-neutral-700 transition-colors hover:text-red-700">
                                <span class="shrink-0 leading-none text-red-600">
                                    <component :is="contact.icon" class="h-4 w-4" />
                                </span>
                                <span class="break-all">{{ t(contact.key) }}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://mervik.ru/" target="_blank" rel="noopener noreferrer"
                                class="flex items-center gap-2.5 text-neutral-700 transition-colors hover:text-red-700">
                                <span class="shrink-0 leading-none text-red-600">
                                    <SiteIcon class="h-4 w-4" />
                                </span>
                                <span class="break-all">{{ t('resume.site') }}</span>
                            </a>
                        </li>
                    </ul>
                </ResumeSection>

                <ResumeSection :title="t('stack.title')" :avoid-break="true">
                    <div class="flex flex-wrap gap-1.5">
                        <span v-for="tech in allTech" :key="tech"
                            class="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700">
                            {{ tech }}
                        </span>
                    </div>
                </ResumeSection>

                <ResumeSection :title="t('resume.languages')" :avoid-break="true">
                    <ul class="space-y-1.5 text-sm">
                        <li class="flex items-baseline justify-between gap-4">
                            <span class="text-neutral-700">{{ t('resume.russian') }}</span>
                            <span class="text-red-700">{{ t('resume.native') }}</span>
                        </li>
                        <li class="flex items-baseline justify-between gap-4">
                            <span class="text-neutral-700">{{ t('resume.english') }}</span>
                            <span class="text-red-700">{{ data.englishLevel }}</span>
                        </li>
                    </ul>
                </ResumeSection>

                <ResumeSection :title="t('resume.education')" :avoid-break="true">
                    <div v-for="edu in education" :key="edu.company.ru" class="mb-3 last:mb-0">
                        <h3 class="text-sm font-bold text-neutral-950">{{ edu.role[locale] }}</h3>
                        <p class="text-xs text-neutral-600">{{ edu.company[locale] }}</p>
                        <p class="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-red-600">
                            {{ edu.period[locale] }}
                        </p>
                    </div>
                </ResumeSection>
            </aside>

            <ResumeSection :title="t('experience.title')" class="min-w-0 lg:col-start-1 lg:row-start-2">
                <div class="space-y-5">
                    <div v-for="item in workExperience" :key="item.company.ru" class="resume-avoid-break">
                        <div
                            class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-l-2 border-red-600 pl-3">
                            <h3 class="font-display text-lg leading-none tracking-wide text-neutral-950">
                                {{ item.role[locale] }}
                            </h3>
                            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-red-600">
                                {{ item.period[locale] }}
                            </span>
                        </div>
                        <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-neutral-600">
                            <span>{{ item.company[locale] }}</span>
                            <a v-if="item.website" :href="item.website" target="_blank" rel="noopener noreferrer"
                                class="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-red-700"
                                :title="item.website">
                                <SiteIcon class="h-3.5 w-3.5" />
                                <span class="text-xs">{{ prettyHost(item.website) }}</span>
                            </a>
                            <a v-if="item.github" :href="item.github" target="_blank" rel="noopener noreferrer"
                                class="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-red-700"
                                :title="item.github">
                                <GithubIcon class="h-3.5 w-3.5" />
                                <span class="text-xs">GitHub</span>
                            </a>
                        </p>
                        <p class="mt-1.5 text-sm leading-relaxed text-neutral-700">
                            {{ item.description[locale] }}
                        </p>
                    </div>
                </div>
            </ResumeSection>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NAME, PHOTO } from '@/data/resume'
import { resume as resumeEn } from '@/data/resume.en'
import { resume as resumeRu } from '@/data/resume.ru'
import { experience } from '@/data/experience'
import { stack } from '@/data/stack'
import { GITHUB, MAIL, TELEGRAM } from '@/data/contacts'
import TelegramIcon from '@/components/icons/TelegramIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import MailIcon from '@/components/icons/MailIcon.vue'
import SiteIcon from '@/components/icons/SiteIcon.vue'

definePageMeta({ layout: 'resume' })

const route = useRoute()
const { t, locale, setLocale } = useI18n()

const lang = computed<'ru' | 'en'>(() => (route.params.lang === 'en' ? 'en' : 'ru'))

const data = computed(() => (lang.value === 'en' ? resumeEn : resumeRu))

await useAsyncData('resume-locale', () => setLocale(lang.value))

const workExperience = computed(() => experience.filter(e => e.status !== 'education'))
const education = computed(() => experience.filter(e => e.status === 'education'))
const allTech = computed(() => stack.flatMap(cat => cat.items.map(i => i.name)))

const phoneHref = computed(() => `tel:${data.value.phone.replace(/[^+\d]/g, '')}`)

const prettyHost = (url: string) => new URL(url).hostname.replace(/^www\./, '')

const contacts = [
    { key: 'contacts.telegram', href: TELEGRAM, icon: TelegramIcon },
    { key: 'contacts.github', href: GITHUB, icon: GithubIcon },
    { key: 'contacts.mail', href: MAIL, icon: MailIcon },
]

useHead({
    title: computed(() => `${t('resume.pageTitle')} — ${NAME}`),
})

useHead({
    htmlAttrs: computed(() => ({ lang: lang.value === 'en' ? 'en-US' : 'ru-RU' })) as any,
}, { tagPriority: 110 })

useSeoMeta({
    ogLocale: computed(() => (lang.value === 'en' ? 'en_US' : 'ru_RU')),
}, { tagPriority: 'critical' })
</script>
