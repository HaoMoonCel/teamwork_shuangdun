<template>
  <section
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Decorative symbol background -->
    <div class="absolute inset-0 opacity-5 select-none pointer-events-none">
      <span
        class="absolute top-1/4 left-1/4 text-[20rem] font-serif text-terracotta"
        >日</span
      >
      <span
        class="absolute top-1/3 right-1/4 text-[16rem] font-serif text-terracotta"
        >月</span
      >
      <span
        class="absolute bottom-1/4 left-1/3 text-[14rem] font-serif text-terracotta"
        >山</span
      >
    </div>

    <div class="relative z-10 text-center px-6 max-w-4xl">
      <p class="text-seal font-ui text-sm tracking-widest mb-4 uppercase">
        新石器时代 · 距今约 7300 年
      </p>
      <h1
        class="text-5xl md:text-7xl font-serif font-black text-ink mb-6 leading-tight text-balance"
      >
        探寻七千年前的<br />文字密码
      </h1>
      <p
        class="text-lg md:text-xl text-ink-light mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        双墩刻符是迄今发现最早的刻划符号群之一，<br
          class="hidden sm:block"
        />
        比甲骨文早近四千年，是汉字起源的关键拼图。
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/library"
          class="btn-primary text-center text-lg px-8 py-4"
        >
          探索资源库
        </router-link>
        <router-link
          to="/ai"
          class="btn-secondary text-center text-lg px-8 py-4"
        >
          体验 AI 识别
        </router-link>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg
        class="w-6 h-6 text-terracotta/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>
