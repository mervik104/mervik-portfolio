<template>
    <section class="mb-16 md:mb-12 reveal reveal-delay-1">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-sm">
            <ContactItem v-for="contact in contacts" :href="contact.href" :icon="contact.icon" :text="contact.text" :key="contact.href" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { GITHUB, MAIL, TELEGRAM } from '@/data/contacts';
import ContactItem from './ContactItem.vue';
import TelegramIcon from '../icons/TelegramIcon.vue';
import GithubIcon from '../icons/GithubIcon.vue';
import MailIcon from '../icons/MailIcon.vue';

const contacts = [
    { href: TELEGRAM, text: 'Telegram: @mervik104', icon: TelegramIcon },
    { href: GITHUB, text: 'GitHub: mervik104', icon: GithubIcon },
    { href: MAIL, text: 'mervik104@gmail.com', icon: MailIcon },
];

</script>
