<template>
  <section class="relative overflow-hidden bg-paper bg-paper-texture">
    <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <!-- 模块标题 -->
      <header class="text-center">
        <p
          class="flex items-center justify-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.4em] text-ochre"
        >
          <span class="inline-block h-px w-6 bg-gold"></span>
          <span>Shuangdun Symbols</span>
          <span class="inline-block h-px w-6 bg-gold"></span>
        </p>
        <h2
          class="mt-4 text-[2.25rem] md:text-[2.5rem] font-sans font-bold leading-tight tracking-[0.04em] text-ink"
        >
          刻符简介
        </h2>
        <span class="mt-4 mx-auto block h-[0.2rem] w-12 bg-gold"></span>
        <p class="mt-5 mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-ink-light">
          双墩刻符出土于安徽蚌埠双墩遗址，距今约 7300 年，早于甲骨文约四千年。遗址共出土刻划符号
          600 余件，本项目数字化收录其中 37 个代表字符，分天文、地理、动植物、生产生活与数字等类别。
        </p>
      </header>

      <!-- 分类统计 -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <span
          v-for="s in stats"
          :key="s.label"
          class="inline-flex items-center gap-2 rounded-full border border-ochre-line bg-cream px-4 py-1.5 text-sm text-ink"
        >
          <span class="font-serif font-bold text-terracotta">{{ s.count }}</span>
          <span>{{ s.label }}</span>
        </span>
      </div>

      <!-- 构形方式（象形 / 指事 / 会意） -->
      <div class="mt-14">
        <h3 class="text-center text-xl md:text-2xl font-sans font-bold text-ink tracking-[0.04em]">
          刻符的构形方式
        </h3>
        <p class="mt-2 text-center text-sm text-ink-light">
          双墩刻符已见象形、指事、会意三种早期构字思路
        </p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div
            v-for="m in methods"
            :key="m.type"
            class="card p-6 text-center hover:border-gold transition-colors"
          >
            <span
              class="inline-block rounded-sm bg-seal px-3 py-1 text-sm tracking-widest text-cream font-serif"
            >
              {{ m.type }}
            </span>
            <p class="mt-4 text-sm leading-relaxed text-ink-light">{{ m.desc }}</p>
            <div class="mt-4 flex items-center justify-center gap-2">
              <span
                v-for="c in m.examples"
                :key="c"
                class="font-serif text-2xl text-terracotta"
              >
                {{ c }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 代表刻符（每类一枚） -->
      <div class="mt-14">
        <h3 class="text-center text-xl md:text-2xl font-sans font-bold text-ink tracking-[0.04em]">
          代表刻符
        </h3>
        <p class="mt-2 text-center text-sm text-ink-light">
          从五大类别中各选一枚，一览双墩刻符的题材与形态
        </p>
        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-6">
          <div
            v-for="f in featured"
            :key="f.id"
            class="group card p-5 text-center hover:border-gold hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="relative mx-auto aspect-square w-full max-w-[8rem] overflow-hidden rounded-md border border-border/60 bg-cream"
            >
              <img
                :src="thumb(f)"
                :alt="f.name"
                class="h-full w-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
              />
              <span
                class="absolute right-1.5 top-1.5 rounded-sm bg-seal px-1.5 py-0.5 text-[0.7rem] leading-none tracking-widest text-cream font-serif"
              >
                {{ f.formType }}
              </span>
            </div>
            <h4 class="mt-3 font-serif text-3xl font-bold text-ink group-hover:text-terracotta transition-colors">
              {{ f.name }}
            </h4>
            <p class="mt-1 text-xs text-ink-light">{{ f.category }}</p>
            <p class="mt-2 text-xs leading-relaxed text-ink-light">{{ f.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <router-link to="/library" class="btn-primary inline-block">
          进入刻符资源库（共 {{ total }} 个）
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { symbols, symbolCategories, getFirstDatasetImage } from '@/data/symbols.js'

const total = symbols.length

/* 各类别刻符数量 */
const stats = symbolCategories
  .filter((c) => c.value !== 'all')
  .map((c) => ({
    label: c.label,
    count: symbols.filter((s) => s.category === c.value).length,
  }))

/* 每类取一枚代表刻符展示 */
const featured = symbolCategories
  .filter((c) => c.value !== 'all')
  .map((c) => symbols.find((s) => s.category === c.value))
  .filter(Boolean)

/* 三种早期构形方式（对应 symbols.js 的 formType） */
const methods = [
  { type: '象形', desc: '描摹实物外形、直观表意，是刻符中最基础的一类。', examples: ['日', '山', '鱼'] },
  { type: '指事', desc: '以抽象符号示意，如用横线数目表示数字。', examples: ['一', '二', '三'] },
  { type: '会意', desc: '组合两个或多个符号，汇合其义以表新意。', examples: ['田', '网', '束'] },
]

function thumb(symbol) {
  return getFirstDatasetImage(symbol)
}
</script>
