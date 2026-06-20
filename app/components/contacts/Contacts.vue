<template>
    <section class="mb-16 md:mb-12 reveal reveal-delay-1">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-sm">
            <ContactItem :href="TELEGRAM" text="Telegram: mervik104">
                <TelegramIcon />
            </ContactItem>
            <ContactItem :href="GITHUB" text="GitHub: mervik104">
                <GithubIcon />
            </ContactItem>
            <ContactItem :href="MAIL" text="mervik104@gmail.com">
                <MailIcon />
            </ContactItem>
        </div>
    </section>
</template>

<script setup lang="ts">
import { GITHUB, MAIL, TELEGRAM } from '@/data/contacts';
import ContactItem from './ContactItem.vue';
import TelegramIcon from '../icons/TelegramIcon.vue';
import GithubIcon from '../icons/GithubIcon.vue';
import MailIcon from '../icons/MailIcon.vue';
</script>

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