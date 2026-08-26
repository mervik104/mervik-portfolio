<template>
    <section class="grow reveal reveal-delay-4">
        <div class="section-heading flex items-center gap-4 mb-8 md:mb-10">
            <span class="h-px w-10 bg-red-600 shrink-0" />
            <h2 class="font-display text-xl md:text-2xl tracking-widest uppercase text-neutral-200">
                {{ t('experience.title') }}
            </h2>
        </div>

        <div class="grid gap-5">
            <ExperienceCard v-for="item in experience" :key="item.company.ru" :item="item" />
        </div>

    </section>
</template>

<script lang="ts" setup>
import { experience } from '@/data/experience';

const { t } = useI18n()

</script>