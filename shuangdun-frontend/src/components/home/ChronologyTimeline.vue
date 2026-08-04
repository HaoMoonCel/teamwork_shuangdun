<template>
  <section class="chronology-module bg-paper font-sans text-ink">
    <div class="mx-auto max-w-[1120px] px-8 py-16 sm:px-12">
      <!-- 模块标题 + 右上角翻页控件 -->
      <div class="flex items-start justify-between gap-8">
        <header>
          <p class="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.4em] text-ochre">
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 shrink-0"
              v-html="GLYPHS.sun" aria-hidden="true"
            ></svg>
            <span>Chronology of Shuangdun Site</span>
          </p>
          <h2 class="mt-4 text-[32px] font-bold leading-tight tracking-[0.04em]">双墩遗址考古大事记</h2>
          <span class="mt-5 block h-[2px] w-10 bg-gold" aria-hidden="true"></span>
        </header>

        <div class="flex gap-3 pt-1">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink/20 text-ink/70 transition-colors duration-200 hover:border-ochre hover:text-ochre disabled:cursor-not-allowed disabled:opacity-25"
            :disabled="current === 0"
            aria-label="上一个节点"
            @click="step(-1)"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 5.5 8 12l6.5 6.5" />
            </svg>
          </button>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink/20 text-ink/70 transition-colors duration-200 hover:border-ochre hover:text-ochre disabled:cursor-not-allowed disabled:opacity-25"
            :disabled="current === items.length - 1"
            aria-label="下一个节点"
            @click="step(1)"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.5 5.5 16 12l-6.5 6.5" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 横向时间轴：全部节点按时间顺序铺开 -->
      <div class="no-scrollbar mt-14 overflow-x-auto" ref="scrollWrap" @scroll="onScroll">
        <div
          ref="axisWrap"
          tabindex="0"
          role="region"
          aria-label="双墩遗址考古大事记时间轴"
          class="relative h-[58px] min-w-[1200px] outline-none"
          @keydown.left.prevent="step(-1)"
          @keydown.right.prevent="step(1)"
        >
          <!-- 轴线 -->
          <div class="pointer-events-none absolute left-0 right-0 top-[9px] h-px bg-ochre-line"></div>

          <!-- 走过的路：1985 → 当前节点 -->
          <div class="progress-line pointer-events-none absolute top-[9px] h-px bg-gold" :style="progressStyle" aria-hidden="true"></div>

          <!-- 节点 + 年份 -->
          <div
            v-for="(item, i) in items"
            :key="item.year"
            class="absolute top-0 flex w-0 flex-col items-center"
            :style="{ left: pos[i] + 'px' }"
          >
            <button
              type="button"
              class="flex rounded-full border-[1.5px] bg-paper transition-colors duration-200"
              :class="[
                i === current ? 'border-gold bg-gold' : 'border-gold hover:border-ochre',
                item.milestone ? 'h-[22px] w-[22px]' : 'h-[16px] w-[16px]',
              ]"
              :aria-label="`查看 ${item.year} ${item.title}`"
              @click="current = i"
            ></button>
            <span
              class="mt-[7px] whitespace-nowrap text-[11px] transition-colors duration-300"
              :class="i === current ? 'font-medium text-ochre' : 'text-ink/55'"
            >{{ item.year }}</span>
          </div>

          <!-- 金色选择环 -->
          <div
            class="glide-ring pointer-events-none absolute z-[1] h-[28px] w-[28px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-gold/70"
            :style="{ left: ringX + 'px', top: '18px' }"
            aria-hidden="true"
          ></div>
        </div>
      </div>

      <!-- 逐条大展签 -->
      <div class="mt-10">
        <Transition name="card" mode="out-in">
          <article
            :key="current"
            class="relative mx-auto max-w-[880px] rounded-md border bg-cream px-8 py-7 sm:px-10 sm:py-8"
            :class="currentItem.milestone ? 'border-gold/60' : 'border-border'"
          >
            <!-- 元信息行：阶段 / 类别 / 里程碑 / 页码 -->
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-4 text-[11px] tracking-[0.2em]">
                <span class="text-gold">阶段 · {{ phaseName }}</span>
                <span class="text-ink/30" aria-hidden="true">｜</span>
                <span class="text-ink/45">类别 · {{ currentItem.type }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span
                  v-if="currentItem.milestone"
                  class="rounded-[3px] border border-gold/60 px-1.5 py-0.5 text-[10px] tracking-[0.2em] text-gold/80"
                >里程碑</span>
                <span class="text-[11px] font-medium tracking-[0.3em] text-ink/40">{{ pageNo }} / {{ total }}</span>
              </div>
            </div>

            <!-- 主视觉：56px 大年份 + 刻划动画文物图标 -->
            <div class="mt-6 flex items-end justify-between gap-6">
              <h3 class="text-[56px] font-light leading-none tracking-[0.12em]">{{ currentItem.year }}</h3>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" class="draw h-12 w-12 shrink-0 text-gold"
                v-html="ICONS[currentItem.icon]" aria-hidden="true"
              ></svg>
            </div>
            <span class="rule-grow mt-5 block h-px w-12 bg-gold" aria-hidden="true"></span>

            <!-- 标题 + 正文 -->
            <h4 class="mt-5 text-[20px] font-bold tracking-[0.06em]">{{ currentItem.title }}</h4>
            <p class="mt-3 text-[15.5px] font-light leading-[2] text-ink-soft">{{ currentItem.desc }}</p>

            <!-- 信息条：阶段概况 + 前后事件导航 -->
            <div class="mt-6 flex items-center justify-between gap-6 border-t border-border pt-4">
              <span class="whitespace-nowrap text-[11px] tracking-[0.2em] text-ink/40">
                本阶段 {{ phaseRange }} · 共 {{ phaseCount }} 件
              </span>
              <div class="flex items-center gap-5">
                <button
                  v-if="current > 0"
                  type="button"
                  class="truncate text-[12px] tracking-[0.08em] text-ink/45 transition-colors duration-200 hover:text-ochre"
                  @click="current -= 1"
                >‹ {{ items[current - 1].year }} · {{ items[current - 1].title }}</button>
                <span v-else></span>
                <button
                  v-if="current < items.length - 1"
                  type="button"
                  class="truncate text-[12px] tracking-[0.08em] text-ink/45 transition-colors duration-200 hover:text-ochre"
                  @click="current += 1"
                >{{ items[current + 1].year }} · {{ items[current + 1].title }} ›</button>
                <span v-else></span>
              </div>
            </div>
          </article>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// ── 文案数据：type 为事件类别，milestone 为里程碑年份 ──
const items = [
  { year: '1985年', icon: 'spade', type: '考古调查', title: '文物普查发现', desc: '蚌埠市博物馆在第二次全国文物普查中发现', milestone: false },
  { year: '1986年', icon: 'face', type: '考古发掘', title: '抢救性发掘', desc: '抢救性发掘，出土陶塑雕题纹面人头像等重要文物', milestone: true },
  { year: '1991—1992年', icon: 'urn', type: '考古发掘', title: '两次考古发掘', desc: '两次考古发掘，出土大量陶器石器骨器，650余件刻划符号', milestone: true },
  { year: '1998年', icon: 'stele', type: '文物保护', title: '市级文保单位', desc: '列为蚌埠市级文物保护单位', milestone: false },
  { year: '2004年', icon: 'stele', type: '文物保护', title: '省级文保单位', desc: '列为安徽省级文物保护单位', milestone: false },
  { year: '2005年', icon: 'seal', type: '学术研究', title: '正式命名', desc: '学术研讨会，正式命名"双墩文化"', milestone: true },
  { year: '2007年', icon: 'book', type: '学术研究', title: '发掘简报发表', desc: '发表《安徽蚌埠双墩新石器时代遗址发掘简报》', milestone: false },
  { year: '2008年', icon: 'book', type: '学术研究', title: '发掘报告出版', desc: '出版《蚌埠双墩新石器时代遗址发掘报告》', milestone: false },
  { year: '2009年', icon: 'mark', type: '学术研究', title: '汉字源头之证', desc: '国际学术研讨会，认定双墩刻划符号为汉字源头之一', milestone: true },
  { year: '2013年', icon: 'star', type: '文物保护', title: '全国重点文保', desc: '列为第七批全国重点文物保护单位', milestone: true },
  { year: '2014至今', icon: 'spade', type: '考古发掘', title: '持续考古发掘', desc: '中国社科院考古研究所主持考古发掘', milestone: false },
  { year: '2017年', icon: 'talk', type: '规划发展', title: '遗址公园立项', desc: '淮河古代文明研讨会，入选国家考古遗址公园立项名单', milestone: false },
  { year: '2019年', icon: 'talk', type: '学术研究', title: '淮河文明研讨', desc: '淮河古代文明学术研讨会在蚌埠召开', milestone: false },
  { year: '2021年', icon: 'star', type: '规划发展', title: '大遗址专项规划', desc: '列入国家大遗址保护利用"十四五"专项规划', milestone: true },
]

// ── 历史阶段（卡片标签 + 信息条）──
const PHASES = [
  { name: '发现与发掘', range: '1985 — 1992', from: 0, to: 2 },
  { name: '保护与命名', range: '1998 — 2005', from: 3, to: 5 },
  { name: '学术成果', range: '2007 — 2009', from: 6, to: 8 },
  { name: '国家保护', range: '2013 — 2014', from: 9, to: 10 },
  { name: '当代发展', range: '2017 — 2021', from: 11, to: 13 },
]

// ── 双墩风格刻符（眉题印）──
const GLYPHS = {
  sun: `<circle cx="12" cy="12" r="4.5"/><path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5"/>`,
}

// ── 极简文物线稿（path 片段，1.5px 描边，无填充）──
const ICONS = {
  spade: `<path d="M12 3.5v5.5"/><path d="M12 9c-3.1 0-5 2.2-5 5.2 0 .4.3.8.8.8h8.4c.5 0 .8-.4.8-.8C17 11.2 15.1 9 12 9z"/>`,
  face: `<circle cx="12" cy="11.5" r="5.8"/><path d="M9.6 10.7h.01M14.4 10.7h.01"/><path d="M10.4 13.6c1 .7 2.2.7 3.2 0"/><path d="M9.4 7.3c1.6-1.1 3.6-1.1 5.2 0"/>`,
  urn: `<path d="M9.8 3.5h4.4"/><path d="M10.3 3.6c-.2 2.5 1.5 3.2 1.7 4.9s-1.7 2.4-1.7 5.2"/><path d="M13.7 3.6c.2 2.5-1.5 3.2-1.7 4.9s1.7 2.4 1.7 5.2"/><path d="M9.7 16.4c0 1.3 1 2.1 2.3 2.1s2.3-.8 2.3-2.1"/>`,
  seal: `<rect x="7.2" y="8.5" width="9.6" height="11" rx="1"/><rect x="10.2" y="4.8" width="3.6" height="3.4" rx="0.6"/><path d="M10 12h4M10 15h3.4"/>`,
  stele: `<rect x="9" y="3.5" width="6" height="13" rx="1"/><path d="M9.8 7.5h4.4M9.8 10.3h4.4M9.8 13.2h3.2"/><path d="M10.2 18.6v2.4M13.8 18.6v2.4M8.2 21h7.6"/>`,
  book: `<path d="M12 6.2C10.6 5.1 8.8 4.6 6.5 4.6v12c2.3 0 4.1.5 5.5 1.6 1.4-1.1 3.2-1.6 5.5-1.6v-12c-2.3 0-4.1.5-5.5 1.6z"/><path d="M12 6.2v12"/>`,
  mark: `<path d="M7.8 5l3 3.6M14 5l-3 3.6"/><path d="M7.5 12h7.5M7.5 15h5"/><path d="M15 12v3.6"/>`,
  talk: `<circle cx="8.2" cy="10.2" r="4.3"/><path d="M5 13.4 3.6 16.2l3.1-.9"/><circle cx="16.8" cy="12.6" r="3.4"/><path d="M14.3 15.1l-.9 2.3 2.5-.9"/>`,
  star: `<path d="M12 4.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7L5.2 9.2l4.7-.7z"/>`,
}

// ── 时间比例定位：节点间距 = 年份差 / 总跨度 × 剩余空间 + 最小间距 ──
const YEARS = [1985, 1986, 1991, 1998, 2004, 2005, 2007, 2008, 2009, 2013, 2014, 2017, 2019, 2021]

const current = ref(0)
const pos = ref([])
const axisWrap = ref(null)
const scrollWrap = ref(null)
const scrollLeft = ref(0)

const currentItem = computed(() => items[current.value])
const currentPhase = computed(() => PHASES.find((p) => current.value >= p.from && current.value <= p.to))
const phaseName = computed(() => currentPhase.value?.name ?? '')
const phaseRange = computed(() => currentPhase.value?.range ?? '')
const phaseCount = computed(() => (currentPhase.value?.to ?? 0) - (currentPhase.value?.from ?? 0) + 1)
const pageNo = computed(() => String(current.value + 1).padStart(2, '0'))
const total = computed(() => String(items.length).padStart(2, '0'))
const ringX = computed(() => pos.value[current.value] ?? 0)
const progressStyle = computed(() => ({
  left: `${pos.value[0] ?? 0}px`,
  width: `${Math.max(0, (pos.value[current.value] ?? 0) - (pos.value[0] ?? 0))}px`,
}))

function labelWidth(s) {
  const digits = (s.match(/\d/g) || []).length
  return digits * 6.6 + (s.length - digits) * 11 + 6
}

function computePositions() {
  const wrap = axisWrap.value
  if (!wrap) return
  const W = Math.max(wrap.clientWidth, 1200)
  const inset = 40
  const usable = W - inset * 2

  const mins = []
  for (let i = 1; i < items.length; i++) {
    mins.push(Math.max(74, (labelWidth(items[i - 1].year) + labelWidth(items[i].year)) / 2 + 26))
  }
  const sumMin = mins.reduce((a, b) => a + b, 0)
  const scale = Math.min(1, usable / sumMin)
  const gaps = mins.map((m) => m * scale)

  const slack = usable - sumMin * scale
  if (slack > 0) {
    const totalYears = YEARS[YEARS.length - 1] - YEARS[0]
    gaps.forEach((g, i) => {
      gaps[i] = g + ((YEARS[i + 1] - YEARS[i]) / totalYears) * slack
    })
  }

  const p = [inset]
  for (let i = 1; i < items.length; i++) p.push(p[i - 1] + gaps[i - 1])
  pos.value = p
}

function step(dir) {
  const n = current.value + dir
  if (n >= 0 && n < items.length) current.value = n
}

function onScroll() {
  scrollLeft.value = scrollWrap.value?.scrollLeft ?? 0
}

let ro = null

function onResize() {
  computePositions()
}

onMounted(() => {
  computePositions()
  if (window.ResizeObserver) {
    ro = new ResizeObserver(onResize)
    ro.observe(axisWrap.value)
  } else {
    window.addEventListener('resize', onResize)
  }
})

onBeforeUnmount(() => {
  if (ro) ro.disconnect()
  else window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* 金色选择环：沿轴缓滑 */
.glide-ring {
  transition: left 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 走过的路：金线随节点推进延伸 */
.progress-line {
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 展签卡片：交叉淡入 + 轻微上浮 */
.card-enter-active,
.card-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.card-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* 刻划动效：文物图标逐笔刻出 */
.draw path {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: incise 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.draw path:nth-child(2) {
  animation-delay: 0.12s;
}
.draw path:nth-child(3) {
  animation-delay: 0.24s;
}
.draw path:nth-child(4) {
  animation-delay: 0.36s;
}
@keyframes incise {
  to {
    stroke-dashoffset: 0;
  }
}

/* 金色分隔线：渐次展开 */
.rule-grow {
  animation: grow 0.6s ease 0.15s both;
}
@keyframes grow {
  from {
    width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glide-ring,
  .progress-line,
  .card-enter-active,
  .card-leave-active {
    transition-duration: 0.01ms;
  }
  .draw path,
  .rule-grow {
    animation: none;
  }
  .draw path {
    stroke-dashoffset: 0;
  }
}
</style>
