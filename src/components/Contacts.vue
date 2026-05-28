<script setup lang="ts">
import { GITHUB, MAIL, TELEGRAM } from '../data/contacts';
import GithubIcon from './icons/GithubIcon.vue';
import MailIcon from './icons/MailIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';

</script>

<template>
    <section class="mb-16 md:mb-12 reveal reveal-delay-1">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-sm">
            <a :href="TELEGRAM" target="_blank" rel="noopener"
                class="contact-link flex items-center gap-3 p-4 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-900/50 transition-all duration-200 group backdrop-blur-xl">
                <span class="text-red-500 text-base leading-none"><TelegramIcon/></span>
                <span class="group-hover:text-white transition-colors duration-200 text-xs md:text-sm">Telegram:
                    mervik104</span>
            </a>

            <a :href="GITHUB" target="_blank" rel="noopener"
                class="contact-link flex items-center gap-3 p-4 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-900/50 transition-all duration-200 group backdrop-blur-xl">
                <span class="text-red-500 font-bold text-xs"><GithubIcon/></span>
                <span class="group-hover:text-white transition-colors duration-200 text-xs md:text-sm">GitHub:
                    mervik104</span>
            </a>

            <a :href="MAIL"
                class="contact-link flex items-center gap-3 p-4 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-900/50 transition-all duration-200 group backdrop-blur-xl">
                <span class="text-red-500 text-sm leading-none"><MailIcon/></span>
                <span
                    class="group-hover:text-white transition-colors duration-200 truncate text-xs md:text-sm">stepanenkoboris618@gmail.com</span>
            </a>
        </div>
    </section>
</template>

<style scoped>
.contact-link {
    position: relative;
    overflow: hidden;
}

.contact-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(220, 38, 38, 0.5);
    transition: width 0.25s ease;
}

.contact-link:hover::after {
    width: 100%;
}
</style>