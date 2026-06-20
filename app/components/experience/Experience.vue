<template>
    <section class="grow reveal reveal-delay-4">
        <div class="section-heading flex items-center gap-4 mb-8 md:mb-10">
            <span class="h-px w-10 bg-red-600 shrink-0" />
            <h3 class="font-display text-xl md:text-2xl tracking-widest uppercase text-neutral-200">
                Опыт работы
            </h3>
        </div>

        <div class="grid gap-5">
            <ExperienceCard v-bind="data" :key="idx" v-for="(data, idx) in experience"/>
        </div>

    </section>
</template>

<script lang="ts" setup>
import { experience } from '@/data/experience';

</script>