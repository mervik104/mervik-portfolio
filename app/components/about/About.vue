<template>
    <section class="mb-16 md:mb-24 max-w-3xl reveal reveal-delay-2">
        <div class="section-heading flex items-center gap-4 mb-6">
            <span class="h-px w-10 bg-red-600 shrink-0" />
            <h3 class="font-display text-xl md:text-2xl tracking-widest uppercase text-neutral-200">
                {{ t('about.title') }}
            </h3>
        </div>

        <div class="about-text font-mono text-neutral-300 hyphens-auto leading-6 text-sm md:text-base text-justify">
            <p v-for="(para, i) in paragraphs" :key="i" :class="{ 'mt-4': i > 0 }">
                <template v-for="(seg, j) in para" :key="j">
                    <a v-if="seg.href" :href="seg.href" :class="seg.class" target="_blank" rel="noopener noreferrer">{{ seg.text }}</a>
                    <span v-else-if="seg.class" :class="seg.class">{{ seg.text }}</span>
                    <template v-else>{{ seg.text }}</template>
                </template>
            </p>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { richSegments } = useRichText()

const highlights = {
    vue: { text: 'Vue.js', class: 'text-red-400', href: 'https://vuejs.org' },
    nuxt: { text: 'Nuxt', class: 'text-red-400', href: 'https://nuxt.com' },
    react: { text: 'React', class: 'text-red-400', href: 'https://react.dev' },
    ts: { text: 'TypeScript', class: 'text-red-400', href: 'https://www.typescriptlang.org' },
    restApi: { text: 'REST API', class: 'text-red-400', href: 'https://ru.wikipedia.org/wiki/REST' },
    mongodb: { text: 'MongoDB', class: 'text-red-400', href: 'https://www.mongodb.com' },
    sqlite: { text: 'SQLite', class: 'text-red-400', href: 'https://www.sqlite.org' },
    payloadCms: { text: 'Payload CMS', class: 'text-red-400', href: 'https://payloadcms.com' },
    expressJs: { text: 'Express.js', class: 'text-red-400', href: 'https://expressjs.com' },
}

const paragraphs = computed(() => [
    ...richSegments('about.p1', highlights),
    ...richSegments('about.p2', highlights),
])
</script>
