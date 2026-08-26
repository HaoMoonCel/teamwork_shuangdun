<template>
  <section
    class="chronology-module font-sans text-ink relative overflow-hidden min-h-screen flex flex-col"
  >
    <!-- 背景图：右缘刻符 + 暖光渐变（只作氛围） -->
    <img
      :src="timelineImage"
      alt=""
      class="chronology-bg-image"
      aria-hidden="true"
    />

    <!-- 顶部过渡：承接上一板块（Hero）的暖色底，平滑淡入时间轴 -->
    <div class="timeline-transition" aria-hidden="true"></div>

    <!-- 底部过渡：向刻符简介板块的纸色底平滑淡出 -->
    <div class="timeline-transition-bottom" aria-hidden="true"></div>

    <div class="relative mx-auto w-full max-w-[126rem] px-8 py-10 sm:px-12 md:py-14 flex-1 flex flex-col justify-start">
      <!-- 模块标题（左对齐） -->
      <header>
        <p class="flex items-center gap-2.5 text-[1.2rem] font-medium uppercase tracking-[0.4em] text-ochre">
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0"
            v-html="GLYPHS.sun" aria-hidden="true"
          ></svg>
          <span>Chronology of Shuangdun Site</span>
        </p>
        <h2 class="mt-4 text-[2.5rem] font-bold leading-tight tracking-[0.04em] font-sans">双墩遗址考古大事记</h2>
        <span class="mt-4 block h-[0.2rem] w-12 bg-gold" aria-hidden="true"></span>
      </header>

      <!-- 进度指示：当前节点 / 总数 -->
      <div class="timeline-progress mt-6">
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <span class="progress-label">
          <span class="progress-cur">{{ String(current + 1).padStart(2, '0') }}</span>
          <span class="progress-sep">/</span>
          <span>{{ String(items.length).padStart(2, '0') }}</span>
        </span>
      </div>

      <!-- 时间轴：垂直居中在标题下方的模块中部 -->
      <div class="flex-1 flex flex-col justify-center mt-4">
      <!-- 水平时间轴：直线主线 + 圆形节点，信息直接附着节点 -->
      <div class="arc-stage relative" ref="arcStage" :style="{ height: stageH + 'px' }">
        <!-- 整条轨道：横向滑动 -->
        <div
          class="arc-track"
          :style="{ width: trackW + 'px', transform: `translateX(${trackX}px)` }"
        >
          <!-- 时间主线：淡赭石细实线 -->
          <div class="timeline-line" :style="{ top: nodeY + 'px' }" aria-hidden="true"></div>

          <!-- 年份节点：窗口式卡片沿主线上/下交替排布 -->
          <div
            v-for="(item, i) in items"
            :key="item.year"
            role="button"
            tabindex="0"
            class="arc-node"
            :class="[
              cardClass(i),
              { 'is-active': i === current },
              'is-above',
            ]"
            :style="nodeStyle(i)"
            :aria-label="`查看 ${item.year} ${item.title}`"
            @click="openItem(i)"
            @keydown.enter.self="openItem(i)"
          >
            <span class="arc-dot"></span>
            <span class="arc-year">{{ item.year }}</span>
            <span
              class="win-card"
              :style="{ '--hc': headColor(i) }"
            >
              <span class="win-head">
                <span class="win-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="win-title">{{ item.title }}</span>
              </span>
              <span class="win-body">
                <span class="win-meta">
                  <span class="win-type">{{ item.type }}</span>
                  <span v-if="item.milestone" class="win-milestone">里程碑</span>
                </span>
                <span class="win-desc">{{ item.desc }}</span>
              </span>
            </span>
          </div>
        </div>

        <!-- 左右切换箭头：左 3 个加宽角度小于号 / 右 3 个大于号（SVG 描边加粗） -->
        <button type="button" class="axis-arrow left" aria-label="上一个年份" @click="step(-1)">
          <svg viewBox="0 0 72 24" fill="none" stroke="currentColor" stroke-width="3.2"
            stroke-linecap="round" stroke-linejoin="round" class="axis-chevron" aria-hidden="true">
            <polyline points="19,2 6,12 19,22" />
            <polyline points="43,2 30,12 43,22" />
            <polyline points="67,2 54,12 67,22" />
          </svg>
        </button>
        <button type="button" class="axis-arrow right" aria-label="下一个年份" @click="step(1)">
          <svg viewBox="0 0 72 24" fill="none" stroke="currentColor" stroke-width="3.2"
            stroke-linecap="round" stroke-linejoin="round" class="axis-chevron" aria-hidden="true">
            <polyline points="5,2 18,12 5,22" />
            <polyline points="29,2 42,12 29,22" />
            <polyline points="53,2 66,12 53,22" />
          </svg>
        </button>
      </div>
      </div>
    </div>
  </section>

  <!-- 详情弹窗：点卡片标题区弹出（方案 B），内容与原窗口一致 -->
  <Teleport to="body">
    <div v-if="detail" class="tl-modal-mask" @click.self="closeDetail">
      <div
        class="tl-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`${detail.year} ${detail.title}`"
      >
        <div class="tl-modal-head" :style="{ '--hc': detail.color }">
          <span class="tl-modal-num">{{ detail.index }}</span>
          <span class="tl-modal-head-text">
            <span class="tl-modal-year">{{ detail.year }}</span>
            <span class="tl-modal-title">{{ detail.title }}</span>
          </span>
          <button type="button" class="tl-modal-close" aria-label="关闭详情" @click="closeDetail">
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"
            ><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="tl-modal-body">
          <div class="win-meta">
            <span class="win-type">{{ detail.type }}</span>
            <span v-if="detail.milestone" class="win-milestone">里程碑</span>
          </div>
          <p class="tl-modal-desc">{{ detail.desc }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import timelineImage from '../../../pic/2.jpg'

// ── 文案数据 ──
const items = [
  { year: '1985年', type: '考古调查', title: '文物普查发现', desc: '在第二次全国文物普查中被发现，遗址位于蚌埠市淮上区双墩村北的台地上，南北长约 180 米，总面积约 2.5 万平方米，是淮河中游年代最早的新石器时代遗存。', milestone: false },
  { year: '1986年', type: '考古发掘', title: '抢救性发掘', desc: '蚌埠市博物馆组织抢救性发掘，出土陶塑雕题纹面人头像等重要文物，其微笑神态被誉为“世界上最古老的微笑”。', milestone: true },
  { year: '1991—1992年', type: '考古发掘', title: '两次考古发掘', desc: '安徽省文物考古研究所与蚌埠市博物馆联合组织两次发掘，共布探方 15 个、面积约 375 平方米，出土陶器、石器、骨角器、蚌器及 600 余件刻划符号。', milestone: true },
  { year: '1998年', type: '文物保护', title: '市级文保单位', desc: '被蚌埠市人民政府公布为市级文物保护单位，遗址保护自此纳入地方文物管理体系。', milestone: false },
  { year: '2004年', type: '文物保护', title: '省级文保单位', desc: '被安徽省人民政府公布为省级文物保护单位，遗址本体与周边环境的保护进一步强化。', milestone: false },
  { year: '2005年', type: '学术研究', title: '正式命名', desc: '中国先秦史学会等单位主办“蚌埠双墩遗址暨双墩文化学术研讨会”，正式提出以“双墩”命名的考古学文化。', milestone: true },
  { year: '2007年', type: '学术研究', title: '发掘简报发表', desc: '安徽省文物考古研究所与蚌埠市博物馆联合发表《安徽蚌埠双墩新石器时代遗址发掘简报》，系统公布历次发掘资料。', milestone: false },
  { year: '2008年', type: '学术研究', title: '发掘报告出版', desc: '联合编著的《蚌埠双墩新石器时代遗址发掘报告》正式出版，为双墩文化的深入研究奠定了资料基础。', milestone: false },
  { year: '2009年', type: '学术研究', title: '汉字源头之证', desc: '中国文字学会等单位共同主办国际学术研讨会，与会专家一致认定双墩刻划符号是汉字的源头之一。', milestone: true },
  { year: '2013年', type: '文物保护', title: '全国重点文保', desc: '被国务院公布为第七批全国重点文物保护单位，编号 7-0186-1-186，保护级别上升至国家级。', milestone: true },
  { year: '2014至今', type: '考古发掘', title: '持续考古发掘', desc: '中国社会科学院考古研究所主持考古发掘，二次发掘全面展开，逐步揭示遗址的聚落布局与文化面貌。', milestone: false },
  { year: '2017年', type: '规划发展', title: '遗址公园立项', desc: '入选国家考古遗址公园立项名单，规划面积约 98.6 公顷，集科研、教育、旅游功能于一体。', milestone: false },
  { year: '2019年', type: '学术研究', title: '淮河文明研讨', desc: '淮河古代文明学术研讨会在蚌埠召开，进一步论证双墩文化在淮河流域早期文明进程中的重要地位。', milestone: false },
  { year: '2021年', type: '规划发展', title: '大遗址专项规划', desc: '列入国家大遗址保护利用“十四五”专项规划，遗址的保护利用进入国家层面统筹推进阶段。', milestone: true },
]

// ── 双墩风格刻符（眉题印）──
const GLYPHS = {
  sun: `<circle cx="12" cy="12" r="4.5"/><path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5"/>`,
}

/* ── 水平时间轴几何 ──
   节点等距分布在一条水平线上；一屏恰好 2 个节点+卡片完整可见（左=当前、右=下一个），
   其余彻底隐藏；卡片统一排在时间主线上方 */
const current = ref(0)
const arcStage = ref(null)
const stageW = ref(1200)
const spacing = ref(400)
const trackW = ref(4000)
const stageH = ref(420)
const nodeY = ref(150)

const rootRatio = () => parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1

const currentItem = computed(() => items[current.value])

/* 进度条：当前节点占总节点比例（用于顶部进度指示） */
const progressPct = computed(() => ((current.value + 1) / items.length) * 100)

/* 整条轨道横向位移：当前节点落在视口 1/4 处（双卡布局：左=当前、右=下一个） */
const trackX = computed(() => -(current.value * spacing.value) + stageW.value / 4)

/* 节点定位：锚点即圆心，随后用 CSS transform 居中 */
function nodeStyle(i) {
  return { left: `${i * spacing.value}px`, top: `${nodeY.value}px` }
}

/* 窗口标题栏配色：赭石系循环（文博克制，不高饱和） */
const HEAD_COLORS = ['#8B5E3C', '#94673E', '#B9925F']
function headColor(i) {
  return HEAD_COLORS[i % HEAD_COLORS.length]
}

/* 只展示当前 + 下一个共 2 个节点：其余彻底隐藏（不出现半截卡片） */
function cardClass(i) {
  return i === current.value || i === current.value + 1 ? 'is-on' : 'is-away'
}

function compute() {
  const el = arcStage.value
  if (!el) return
  const w = el.clientWidth || 1200
  const r = rootRatio()
  stageW.value = w
  /* 间距 = 视口宽 × 0.5：一屏恰好 2 套"节点+卡片"完整可见，
     相邻卡（±1）落在 1/4 与 3/4 处，更远的完全在视口外（无半截） */
  spacing.value = Math.round(w * 0.5)
  trackW.value = (items.length - 1) * spacing.value + w
  /* 中线位置与舞台高度：整体上移，给节点下方的年份留足空间（不被底部裁切） */
  nodeY.value = Math.round(360 * r)
  stageH.value = Math.round(440 * r)
}

let ro = null

function step(dir) {
  const n = current.value + dir
  if (n >= 0 && n < items.length) current.value = n
}

/* ── 点击卡片：聚焦该节点并弹出独立详情卡片 ── */
function openItem(i) {
  current.value = i
  openDetail(i)
}

/* ── 详情弹窗：独立卡片完整展示 ── */
const detail = ref(null)
function openDetail(i) {
  const it = items[i]
  detail.value = {
    index: String(i + 1).padStart(2, '0'),
    year: it.year,
    title: it.title,
    type: it.type,
    milestone: it.milestone,
    desc: it.desc,
    color: headColor(i),
  }
  document.body.style.overflow = 'hidden'
}
function closeDetail() {
  detail.value = null
  document.body.style.overflow = ''
}
function onKeydown(e) {
  if (e.key === 'Escape' && detail.value) closeDetail()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  compute()
  if (window.ResizeObserver) {
    ro = new ResizeObserver(compute)
    if (arcStage.value) ro.observe(arcStage.value)
  } else {
    window.addEventListener('resize', compute)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  if (ro) ro.disconnect()
  else window.removeEventListener('resize', compute)
})
</script>

<style scoped>
/* 模块底色：红褐岩画调，边缘深、向中心柔过渡 */
.chronology-module {
  background: radial-gradient(
    ellipse 90% 100% at 50% 40%,
    #ede0c9 0%,
    #dcc6a2 58%,
    #c3a17c 100%
  );
}

/* 刻符氛围元素：贴右边缘；左侧加宽横向渐变蒙版，从右向左大幅淡化，
   去掉外发光描边（drop-shadow 会让图片像贴纸一样有轮廓），真正融入底色 */
.chronology-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 42%;
  object-fit: cover;
  object-position: center;
  mix-blend-mode: multiply;
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
  filter: sepia(0.55) saturate(1.3) hue-rotate(-8deg) brightness(1.02);
  -webkit-mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 32%,
      #000 60%
    ),
    radial-gradient(
      ellipse 130% 100% at 100% 50%,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.45) 55%,
      transparent 80%
    );
  mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 32%,
      #000 60%
    ),
    radial-gradient(
      ellipse 130% 100% at 100% 50%,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.45) 55%,
      transparent 80%
    );
}

/* 顶部过渡：与 Hero 板块底部的边界色 #c3a17c 平滑衔接 */
.timeline-transition {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14rem;
  background: linear-gradient(
    to bottom,
    #c3a17c 0%,
    rgba(195, 161, 124, 0) 100%
  );
  pointer-events: none;
  user-select: none;
}

/* 底部过渡：向刻符简介板块的纸色 #f5f0e8 平滑淡出 */
.timeline-transition-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14rem;
  background: linear-gradient(
    to bottom,
    rgba(245, 240, 232, 0) 0%,
    #f5f0e8 100%
  );
  pointer-events: none;
  user-select: none;
}

/* ── 水平时间轴 ── */
.arc-stage {
  overflow: hidden; /* 视口外的节点裁切隐藏 */
}

.arc-track {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 时间主线：淡赭石细实线（3px） */
.timeline-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(139, 94, 60, 0.45);
}

/* 年份节点：锚点即主线上的圆心；内容块交替排布在线的上/下方 */
.arc-node {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

/* 主次区分：不做透明虚化；激活节点用金色描边 + 更强阴影凸显，非激活保持完整清晰 */
.arc-node.is-active .win-card {
  box-shadow:
    0 0 0 3px rgba(185, 146, 95, 0.55),
    0 10px 30px rgba(60, 40, 20, 0.22);
}

/* 视口外的节点：彻底隐藏，杜绝半截卡片 */
.arc-node.is-away {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* 年份：置于圆形节点正下方（时间主线下），字号为原 1.5 倍 */
.arc-year {
  position: absolute;
  left: 0;
  top: 1.4rem;
  transform: translateX(-50%);
  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #8b5e3c;
  white-space: nowrap;
}

/* 圆点：锚定在时间主线上（放大） */
.arc-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 9999px;
  border: 2px solid rgba(139, 94, 60, 0.55);
  background: rgba(255, 253, 248, 0.95);
  transform: translate(-50%, -50%);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.arc-node.is-active .arc-dot {
  width: 1.9rem;
  height: 1.9rem;
  border-color: #8b5e3c;
  background: #8b5e3c;
  box-shadow: 0 0 0 8px rgba(139, 94, 60, 0.16), 0 2px 8px rgba(60, 40, 20, 0.15);
}

/* 窗口式卡片：盒子放大到原 1.5 倍（高 30rem，宽拉满一屏两栏） */
.win-card {
  position: absolute;
  left: 0;
  width: min(45rem, 46vw);
  height: 20rem;
  overflow: hidden;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(60, 40, 20, 0.12);
}
.arc-node.is-above .win-card {
  bottom: 1.2rem;
}
.arc-node.is-below .win-card {
  top: 1.2rem;
}

/* 标题栏（窗口头）：赭石系底色 + 编号盒，箭头指向中线 */
.win-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.1rem 1.4rem;
  background: var(--hc, #8b5e3c);
  color: #fffefa;
}
.win-num {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.18);
}
.win-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.win-head::after {
  content: '';
  position: absolute;
  left: 50%;
  margin-left: -10px;
  border: 10px solid transparent;
}
.arc-node.is-above .win-head::after {
  bottom: -20px;
  border-top-color: var(--hc, #8b5e3c);
  border-bottom: none;
}
.arc-node.is-below .win-head::after {
  top: -20px;
  border-bottom-color: var(--hc, #8b5e3c);
  border-top: none;
}

/* 正文（窗口体）：米白底，描述文字 */
.win-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.4rem 1.6rem;
  background: #fffefa;
  border: 1px solid rgba(191, 191, 191, 0.4);
  border-top: 0;
  border-radius: 0 0 10px 10px;
}
.win-desc {
  font-size: 1.6rem;
  line-height: 1.65;
  color: #56524d;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 左右切换箭头：3 个加宽角度 SVG 折线箭头，加粗，尺寸约为原符号 4 倍；
   常态更深更清晰，hover 变赭石 + 放大 */
.axis-arrow {
  position: absolute;
  top: 82%; /* 对齐时间主线（nodeY/stageH ≈ 0.82） */
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 3.6rem;
  background: transparent;
  border: none;
  color: rgba(120, 78, 50, 0.85);
  cursor: pointer;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}
.axis-chevron {
  width: 9rem;
  height: 3rem;
}
.axis-arrow:hover {
  color: #8b5e3c;
  transform: translateY(-50%) scale(1.08);
}
.axis-arrow.left {
  left: 0.5rem;
}
.axis-arrow.right {
  right: 0.5rem;
}

/* 进度指示：细金线 + 当前/总数 */
.timeline-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 22rem;
}
.progress-track {
  flex: 1;
  height: 3px;
  border-radius: 999px;
  background: rgba(139, 94, 60, 0.2);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #b9925f;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.progress-label {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #8b5e3c;
  white-space: nowrap;
}
.progress-sep {
  margin: 0 0.15rem;
  color: rgba(139, 94, 60, 0.5);
}

/* 卡片元信息：类型徽章 + 里程碑印章 */
.win-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.win-type {
  font-size: 1.05rem;
  font-weight: 600;
  color: #94673e;
  background: rgba(148, 103, 62, 0.12);
  border-radius: 999px;
  padding: 0.25rem 0.9rem;
  white-space: nowrap;
}
.win-milestone {
  font-size: 1rem;
  letter-spacing: 0.12em;
  color: #fffefa;
  background: #c23b22;
  border-radius: 4px;
  padding: 0.22rem 0.6rem;
  white-space: nowrap;
}

/* 标题栏可点击：hover 提亮 */
.win-head {
  cursor: pointer;
  transition: filter 0.2s ease;
}
.win-head:hover {
  filter: brightness(1.08);
}
.win-head:focus-visible {
  outline: 2px solid #8b5e3c;
  outline-offset: -2px;
}

/* 整卡可点击：hover 只加深阴影（不做位移），提示可查看完整详情 */
.win-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}
.win-card:hover {
  box-shadow: 0 6px 18px rgba(60, 40, 20, 0.18);
}

/* ── 详情弹窗（方案 B）── */
.tl-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(30, 20, 10, 0.45);
  backdrop-filter: blur(4px);
}
.tl-modal {
  width: min(32rem, calc(100% - 3rem));
  max-height: 85vh;
  overflow-y: auto;
  background: #fffefa;
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(40, 25, 10, 0.32);
  animation: tl-modal-in 0.22s ease;
}
@keyframes tl-modal-in {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.tl-modal-head {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.3rem;
  background: var(--hc, #8b5e3c);
  color: #fffefa;
}
.tl-modal-num {
  font-size: 1.15rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.18);
}
.tl-modal-head-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.tl-modal-year {
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
.tl-modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.tl-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid rgba(255, 254, 250, 0.4);
  background: rgba(0, 0, 0, 0.14);
  color: #fffefa;
  cursor: pointer;
  transition: background 0.2s ease;
}
.tl-modal-close:hover {
  background: rgba(0, 0, 0, 0.28);
}
.tl-modal-body {
  padding: 1.2rem 1.5rem;
}
.tl-modal-desc {
  margin-top: 0.8rem;
  font-size: 1.25rem;
  line-height: 1.75;
  color: #56524d;
}

@media (prefers-reduced-motion: reduce) {
  .tl-modal {
    animation-duration: 0.01ms;
  }
  .arc-track {
    transition-duration: 0.01ms;
  }
  .arc-dot {
    transition-duration: 0.01ms;
  }
}
</style>
