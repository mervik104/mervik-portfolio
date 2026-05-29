<template>
  <header class="mb-16 mt-8 md:mb-24 reveal">
    <h2 class="font-mono text-red-500 text-xs tracking-[0.35em] uppercase border-b border-red-900/25 pb-2 mb-8 w-fit">
      Portfolio
    </h2>
    <div class="flex flex-row items-center gap-5 group">
      <div class="relative shrink-0">
        <div class="absolute inset-0 bg-red-600/25 blur-2xl scale-150 rounded-full group-hover:scale-[2] transition-transform duration-700 ease-out" />
        <div class="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-red-900/40 bg-neutral-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-[0_0_48px_rgba(239,68,68,0.12)]">
          <img src="./mervik.jpg" class="object-cover w-12 h-12 md:w-18 md:h-18 rounded-xl md:rounded-2xl" alt="MerVik logo" />
        </div>
      </div>
      <div>
        <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white leading-none">
          MerVik
        </h1>
        <p class="font-mono text-red-500 tracking-[0.22em] uppercase text-[10px] md:text-xs mt-2">
          Frontend / Fullstack Developer
        </p>
      </div>
    </div>
    <p class="font-mono text-neutral-400 text-base md:text-lg border-l-2 border-red-600 pl-4 mt-8 max-w-xl leading-relaxed">
      Создаю современные интерфейсы и fullstack-приложения
      с акцентом на архитектуру, UX и производительность.
    </p>
  </header>
</template>