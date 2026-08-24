<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-[#2E1E0F] shadow-md'
        : 'bg-[#33220F]'
    "
  >
    <div
      class="max-w-7xl mx-auto px-6 flex items-center justify-between h-[6.25rem]"
    >
      <router-link
        to="/"
        class="flex items-center gap-2.5 transition-colors"
      >
        <!-- 品牌 Logo：陶片刻符图 -->
        <img
          :src="brandLogo"
          alt="双墩刻符数字平台"
          class="h-11 w-11 rounded-lg object-cover transition-transform duration-300"
          :class="scrolled ? 'scale-90' : 'scale-100'"
        />
        <span class="text-[1.5rem] leading-none font-sans font-bold hidden sm:inline text-cream"
          >双墩刻符数字平台</span
        >
      </router-link>

      <!-- Desktop nav：滑动指示器 + 关于下拉 -->
      <div class="hidden md:block" @mouseleave="onTrackLeave">
        <div ref="navTrack" class="relative flex items-center gap-5 py-1">
          <!-- 滑块：浅色胶囊，跟随悬停项滑动并拉伸宽度
               定位校准完成前不显示，避免刷新时"跳"到正确位置 -->
          <span
            ref="pillEl"
            class="absolute top-0 left-0 h-full rounded-full bg-cream/95 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            :class="[
              { 'slider-pill--hidden': !sliderVisible },
              { 'pill-no-transition': suppressPillTransition },
            ]"
            :style="[sliderStyle, { opacity: sliderVisible ? 1 : 0 }]"
          ></span>

          <template v-for="(item, index) in navItems" :key="item.label">
            <!-- 普通导航项 -->
            <router-link
              v-if="item.path"
              :to="item.path"
              :ref="(el) => (linkEls[index] = el)"
              class="nav-item relative px-7 py-2 font-ui text-[1.5rem] leading-none rounded-full origin-center transition-[transform,color] duration-300"
              :class="[
                hoveredIndex === index
                  ? 'scale-105 text-ink'
                  : hoveredIndex === null && itemActive(item)
                    ? 'text-ink'
                    : 'text-cream',
              ]"
              :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
              @mouseenter="hoverIndex = index"
            >
              {{ item.label }}
            </router-link>

            <!-- 关于：下拉子菜单（关于项目 / 平台使用指南） -->
            <div
              v-else
              :ref="(el) => (linkEls[index] = el)"
              class="nav-dropdown relative"
              @mouseenter="hoverIndex = index"
            >
              <span
                class="nav-item relative flex items-center gap-1.5 px-7 py-2 font-ui text-[1.5rem] leading-none rounded-full origin-center transition-[transform,color] duration-300"
                :class="[
                  hoveredIndex === index
                    ? 'scale-105 text-ink'
                    : hoveredIndex === null && itemActive(item)
                      ? 'text-ink'
                      : 'text-cream',
                ]"
              >
                {{ item.label }}
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>

              <Transition name="dd">
                <div
                  v-if="hoverIndex === index"
                  class="absolute left-1/2 top-full -translate-x-1/2 mt-2 min-w-[12rem] rounded-md border border-black/40 bg-[#2E1E0F] shadow-lg py-2"
                >
                  <router-link
                    v-for="c in item.children"
                    :key="c.path"
                    :to="c.path"
                    class="block px-5 py-2.5 text-center font-ui text-[1.25rem] leading-none transition-colors"
                    :class="isActive(c.path) ? 'text-[#E3BE8F] bg-white/10' : 'text-cream hover:bg-white/10'"
                  >
                    {{ c.label }}
                  </router-link>
                </div>
              </Transition>
            </div>
          </template>
        </div>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="toggleMenu"
        class="md:hidden w-12 h-12 flex items-center justify-center text-cream"
      >
        <svg
          v-if="!menuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div
        v-if="menuOpen"
        class="absolute left-0 right-0 bg-[#2E1E0F] border-b border-black/40 shadow-lg md:hidden top-[6.25rem]"
      >
        <div class="flex flex-col p-4 gap-1">
          <template v-for="item in navItems" :key="item.label">
            <!-- 下拉项：把子页面平铺进移动端菜单 -->
            <template v-if="item.children">
              <router-link
                v-for="c in item.children"
                :key="c.path"
                :to="c.path"
                class="px-4 py-3 rounded font-ui text-[1.25rem] leading-none text-center border-l-2 transition-colors"
                :class="
                  isActive(c.path)
                    ? 'border-[#C9A074] text-cream bg-white/10'
                    : 'border-transparent text-cream/80 hover:bg-white/10'
                "
              >
                {{ c.label }}
              </router-link>
            </template>
            <router-link
              v-else
              :to="item.path"
              class="px-4 py-3 rounded font-ui text-[1.25rem] leading-none text-center border-l-2 transition-colors"
              :class="
                isActive(item.path)
                  ? 'border-[#C9A074] text-cream bg-white/10'
                  : 'border-transparent text-cream/80 hover:bg-white/10'
              "
            >
              {{ item.label }}
            </router-link>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import brandLogo from '../../pic/3.png'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/ai', label: '刻符识别' },
  { path: '/library', label: '资源库' },
  {
    label: '关于',
    children: [
      { path: '/about', label: '关于项目' },
      { path: '/guide', label: '平台使用指南' },
    ],
  },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

/* 导航项激活态：下拉项（关于）在其任一子页面时激活 */
function itemActive(item) {
  if (item.children) return item.children.some((c) => isActive(c.path))
  return isActive(item.path)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

/* ---------------- 滑动指示器 ---------------- */
const navTrack = ref(null)
const linkEls = ref([])
const pillEl = ref(null) // 滑块元素引用，用于切换页面时临时关闭过渡
const hoverIndex = ref(null) // null = 无悬停，滑块停在当前页
const sliderStyle = ref({ width: '0px', transform: 'translateX(0)' })
const sliderVisible = ref(false)
const hoveredIndex = ref(null)
const suppressPillTransition = ref(false) // 路由切换时短暂关闭滑块过渡，避免切换页面时滑块"位移"

function activeIndex() {
  return navItems.findIndex((i) => itemActive(i))
}

// 把滑块移动到第 index 个导航项下方
function moveSlider(index) {
  const track = navTrack.value
  const el = index !== null && index !== -1 ? linkEls.value[index] : null
  // Vue 3 函数 ref 拿到的可能是组件实例（router-link），取 $el
  const dom = el && el.$el ? el.$el : el
  if (!track || !dom) return
  const trackRect = track.getBoundingClientRect()
  const rect = dom.getBoundingClientRect()
  sliderStyle.value = {
    width: `${rect.width}px`,
    transform: `translateX(${rect.left - trackRect.left}px)`,
  }
}

/* 尺寸监听：首页会给 <html> 加 page-home 类把根字号翻倍，
   加上 web 字体加载也会改变文字宽度——任何尺寸变化都自动重算滑块，
   保证胶囊永远和"首页"两个字一样宽 */
let ro = null
function observeSizes() {
  if (typeof ResizeObserver === 'undefined') return
  ro = new ResizeObserver(() => {
    moveSlider(hoverIndex.value ?? activeIndex())
  })
  if (navTrack.value) ro.observe(navTrack.value)
  linkEls.value.forEach((el) => {
    const dom = el && el.$el ? el.$el : el
    if (dom) ro.observe(dom)
  })
}

function leaveNav() {
  hoverIndex.value = null
  hoveredIndex.value = null
  moveSlider(activeIndex())
}

/* 移出导航区时收起滑块；若移入"关于"下拉菜单则不收起 */
function onTrackLeave(e) {
  if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.nav-dropdown')) return
  leaveNav()
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    /* 切换页面时先临时关闭滑块过渡，下一帧测量完再恢复——
       避免滑块在新旧激活项之间产生"位移"动画 */
    suppressPillTransition.value = true
    nextTick(() => {
      if (hoverIndex.value === null) moveSlider(activeIndex())
      requestAnimationFrame(() => {
        suppressPillTransition.value = false
      })
    })
  }
)

function onResize() {
  moveSlider(hoverIndex.value ?? activeIndex())
}

watch(hoverIndex, (index) => {
  if (index !== null) {
    hoveredIndex.value = index
    moveSlider(index)
  }
})

/* ---------------- 滚动状态：收缩 ---------------- */
function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(async () => {
  await nextTick()
  moveSlider(activeIndex())
  observeSizes()
  onScroll()
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })

  /* 等布局真正稳定后滑块才亮相：字体就绪后逐帧监测导航项宽度，
     连续 3 帧宽度不再变化（入场动画、字号过渡全部结束）才显示。
     显示前一刻测量，保证第一次出现就是最终大小，绝不"先小后大"。 */
  const widthOf = (index) => {
    const el = linkEls.value[index]
    const dom = el && el.$el ? el.$el : el
    return dom ? dom.getBoundingClientRect().width : 0
  }

  const settleAndShow = async () => {
    if (sliderVisible.value) return
    const idx = hoverIndex.value ?? activeIndex()
    let last = -1
    let stable = 0
    const deadline = performance.now() + 1200 // 最长等 1.2s

    while (performance.now() < deadline) {
      await new Promise((r) => requestAnimationFrame(r))
      const w = widthOf(idx)
      if (w > 0 && Math.abs(w - last) < 0.5) {
        stable++
        if (stable >= 3) break // 连续 3 帧宽度不变，布局已稳定
      } else {
        stable = 0
      }
      last = w
    }

    moveSlider(hoverIndex.value ?? activeIndex())
    sliderVisible.value = true
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(settleAndShow)
  } else {
    settleAndShow()
  }
  setTimeout(() => {
    if (!sliderVisible.value) settleAndShow()
  }, 900) // 字体迟迟不就绪时的兜底
})
onUnmounted(() => {
  if (ro) ro.disconnect()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* 导航项入场：依次落下 */
.nav-item {
  animation: nav-drop 0.5s ease both;
}
@keyframes nav-drop {
  from {
    opacity: 0;
    transform: translateY(-14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slider-pill--hidden {
  transition: none !important;
}

/* 路由切换期间临时关闭滑块过渡，防止切换时滑块"位移" */
.pill-no-transition {
  transition: none !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 关于下拉菜单：淡入 + 轻微下移 */
.dd-enter-active,
.dd-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translate(-50%, -6px);
}
</style>
