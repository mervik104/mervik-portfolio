<template>
    <section class="mb-16 md:mb-24 reveal reveal-delay-3">
        <div class="section-heading flex items-center gap-4 mb-8 md:mb-10">
            <span class="h-px w-10 bg-red-600 shrink-0" />
            <h3 class="font-display text-xl md:text-2xl tracking-widest uppercase text-neutral-300">
                Стек технологий
            </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 tracking-wider">
            <StackItem :item="item" v-for="item in stack" :key="item.label" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { stack } from '../data/stack.ts';
import StackItem from './StackItem.vue';

</script>