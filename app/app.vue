<template>
  <div
    class="relative w-full min-h-screen bg-neutral-950 text-neutral-200 overflow-hidden selection:bg-red-600 selection:text-white">
    <Background />
    <main class="relative z-10 max-w-5xl mx-auto border-x border-neutral-800/60 min-h-screen flex flex-col px-5 md:px-10 lg:px-16 py-10 md:py-16">

      <Hero />
      <Contacts />
      <About />
      <Stack />
      <Experience />

      <div class="section-heading mt-10 flex items-center gap-4 mb-8 md:mb-10">
        <span class="h-px w-10 bg-red-600 shrink-0" />
        <h3 class="font-display text-xl md:text-2xl tracking-widest uppercase text-neutral-300">
          Свяжитесь со мной
        </h3>
      </div>

      <Contacts />
      <Footer />

    </main>
  </div>
</template>

<script setup lang="ts">
import Background from './components/shared/Background.vue';
import Hero from './components/shared/Hero.vue';

useReveal()

useSeoMeta({
  title: 'Портфолио MerVik | Веб-разработчик',
  description: 'Добро пожаловать в моё портфолио.',
  ogTitle: 'MerVik Portfolio',
  ogDescription: 'Посмотрите мои работы.',
  ogImage: '/mervik.jpg',
  ogUrl: 'https://mervik.ru/',
  twitterCard: 'summary_large_image'
})

</script>

<style>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) scale(1);
  }

  50% {
    transform: translateY(-18px) scale(1.08);
  }
}

@keyframes blob {

  0%,
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(-50%, 0) scale(1);
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: translate(-50%, 16px) scale(1.08);
  }
}

@keyframes drip {

  0%,
  100% {
    transform: translateY(0);
    height: 96px;
    opacity: 0.45;
  }

  50% {
    transform: translateY(12px);
    height: 112px;
    opacity: 0.65;
  }
}

.animate-blob {
  animation: blob 12s infinite ease-in-out;
}

.animate-blob-delayed {
  animation: blob 18s infinite ease-in-out reverse;
}

.animate-drip {
  animation: drip 5s infinite ease-in-out;
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 {
  transition-delay: 0.08s;
}

.reveal-delay-2 {
  transition-delay: 0.14s;
}

.reveal-delay-3 {
  transition-delay: 0.20s;
}

.reveal-delay-4 {
  transition-delay: 0.26s;
}

.reveal-delay-5 {
  transition-delay: 0.32s;
}
</style>