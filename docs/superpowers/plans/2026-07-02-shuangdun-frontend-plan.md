# 双墩刻符 AI 破译 — 前端 Demo 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `frontend-design` skill for implementing UI components. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建双墩刻符 AI 破译网站的 Vue 3 前端原型（4 页面、~15 组件、完整 mock 交互）

**Architecture:** Vite + Vue 3 + Vue Router 4 + Tailwind CSS 多页应用。组件按页面分目录（home / library / ai），页面组件放 pages/，共享组件放 components/ 根。mock 数据集中放在 data/。

**Tech Stack:** Vite 5, Vue 3 (Composition API), Vue Router 4, Tailwind CSS 3, Noto Serif SC 字体

## Global Constraints

- 古韵中国风配色：主色 `#8B5E3C`，强调色 `#C23B22`，背景 `#F5F0E8`，文字 `#3C2415`
- 展示标题使用 Noto Serif SC 字体
- 响应式断点：≥1024px（桌面）、768-1023px（平板）、<768px（手机）
- AI 识别模拟延迟固定为 2 秒
- 所有刻符图片使用 SVG placeholder 占位（demo 阶段）
- Demo 交互范围：路由切换、筛选过滤、模拟 AI 识别、模态框展示

---

### Task 1: 项目脚手架

**Files:**
- Create: `shuangdun-frontend/package.json`
- Create: `shuangdun-frontend/vite.config.js`
- Create: `shuangdun-frontend/tailwind.config.js`
- Create: `shuangdun-frontend/postcss.config.js`
- Create: `shuangdun-frontend/index.html`
- Create: `shuangdun-frontend/src/main.js`

**Interfaces:**
- Produces: 可运行 `npm run dev` 的空 Vite + Vue 3 + Tailwind 项目

- [ ] **Step 1: 创建项目目录并初始化 package.json**

```bash
mkdir -p shuangdun-frontend/src/{components/{home,library,ai},pages,data,router,assets/styles}
mkdir -p shuangdun-frontend/public/mock/symbols
```

```json
// shuangdun-frontend/package.json
{
  "name": "shuangdun-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: 配置 Vite**

```js
// shuangdun-frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

- [ ] **Step 3: 配置 Tailwind 主题**

```js
// shuangdun-frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F0E8',
        cream: '#FFFEFA',
        terracotta: '#8B5E3C',
        seal: '#C23B22',
        ink: '#3C2415',
        'ink-light': '#7A6455',
        border: '#D4C5B2',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        ui: ['system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    }
  }
}
```

- [ ] **Step 4: 配置 PostCSS**

```js
// shuangdun-frontend/postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: 创建 HTML 入口**

```html
<!-- shuangdun-frontend/index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>双墩刻符 AI 破译</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>
<body class="bg-paper text-ink">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: 创建 main.js**

```js
// shuangdun-frontend/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/base.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 7: 安装依赖并验证**

```bash
cd shuangdun-frontend && npm install && npm run dev
```

Expected: 开发服务器在 http://localhost:5173 启动，空白页面无报错。

---

### Task 2: 全局样式 + App.vue + 路由骨架

**Files:**
- Create: `shuangdun-frontend/src/assets/styles/base.css`
- Create: `shuangdun-frontend/src/router/index.js`
- Create: `shuangdun-frontend/src/App.vue`
- Create: `shuangdun-frontend/src/pages/HomePage.vue`（占位）
- Create: `shuangdun-frontend/src/pages/ResourceLibrary.vue`（占位）
- Create: `shuangdun-frontend/src/pages/AIRecognition.vue`（占位）
- Create: `shuangdun-frontend/src/pages/AboutPage.vue`（占位）

**Interfaces:**
- Produces: 4 路由页面可切换、Tailwind 古风主题生效、宣纸纹理背景

- [ ] **Step 1: 编写全局 CSS**

```css
/* shuangdun-frontend/src/assets/styles/base.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-paper text-ink font-serif;
  }

  h1, h2, h3 {
    @apply font-serif font-bold text-ink;
  }

  ::selection {
    @apply bg-terracotta/20 text-ink;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-terracotta text-cream font-ui rounded
           hover:bg-terracotta/90 active:scale-95
           transition-all duration-200 cursor-pointer;
  }

  .btn-secondary {
    @apply px-6 py-3 border-2 border-terracotta text-terracotta font-ui rounded
           hover:bg-terracotta hover:text-cream active:scale-95
           transition-all duration-200 cursor-pointer;
  }

  .btn-seal {
    @apply px-6 py-3 bg-seal text-cream font-ui rounded
           hover:bg-seal/90 active:scale-95
           transition-all duration-200 cursor-pointer;
  }

  .card {
    @apply bg-cream border border-border rounded-lg shadow-sm
           hover:shadow-md transition-shadow duration-300;
  }

  .divider-cloud {
    @apply h-px bg-border my-8;
  }

  .section-title {
    @apply text-3xl font-serif font-bold text-ink text-center mb-2;
  }

  .section-subtitle {
    @apply text-ink-light text-center mb-8;
  }

  .page-section {
    @apply max-w-7xl mx-auto px-6 py-16;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* 页面过渡 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #F5F0E8;
}
::-webkit-scrollbar-thumb {
  background: #8B5E3C;
  border-radius: 4px;
}
```

- [ ] **Step 2: 创建路由配置**

```js
// shuangdun-frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('@/pages/ResourceLibrary.vue'),
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/pages/AIRecognition.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 3: 创建 App.vue**

```vue
<!-- shuangdun-frontend/src/App.vue -->
<template>
  <div class="min-h-screen bg-paper bg-paper-texture flex flex-col">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
</script>
```

- [ ] **Step 4: 创建四个占位页面**

```vue
<!-- shuangdun-frontend/src/pages/HomePage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <h1 class="text-4xl text-terracotta">首页 — 占位</h1>
  </div>
</template>
```

ResourceLibrary.vue、AIRecognition.vue、AboutPage.vue 结构相同，分别显示"资源库 — 占位"、"AI 识别 — 占位"、"关于项目 — 占位"。

- [ ] **Step 5: 验证路由**

Run `npm run dev`，分别访问 `/`、`/library`、`/ai`、`/about`，确认 4 个占位页面可切换，背景为宣纸纹理。

---

### Task 3: 全局导航栏 NavBar + FooterBar

**Files:**
- Create: `shuangdun-frontend/src/components/NavBar.vue`
- Create: `shuangdun-frontend/src/components/FooterBar.vue`
- Modify: `shuangdun-frontend/src/App.vue`（添加 NavBar + FooterBar）

**Interfaces:**
- Produces: `NavBar` — 固定顶部、四个导航链接、当前页高亮、滚动时半透明背景
- Produces: `FooterBar` — 底部版权信息

- [ ] **Step 1: 编写 NavBar.vue**

```vue
<!-- shuangdun-frontend/src/components/NavBar.vue -->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-paper/90 backdrop-blur shadow-sm' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 text-terracotta hover:text-seal transition-colors">
        <span class="text-2xl">🏺</span>
        <span class="text-lg font-serif font-bold hidden sm:inline">双墩刻符 AI 破译</span>
      </router-link>

      <div class="flex items-center gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded font-ui text-sm transition-colors"
          :class="isActive(item.path)
            ? 'bg-terracotta text-cream'
            : 'text-ink-light hover:text-terracotta'"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/library', label: '资源库' },
  { path: '/ai', label: 'AI 识别' },
  { path: '/about', label: '关于' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
```

- [ ] **Step 2: 编写 FooterBar.vue**

```vue
<!-- shuangdun-frontend/src/components/FooterBar.vue -->
<template>
  <footer class="bg-ink text-cream/60 py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-6 text-center text-sm font-ui">
      <p>© 2026 双墩刻符 AI 破译项目 · 合肥工业大学</p>
      <p class="mt-1">本站所有刻符资料仅供学术研究与科普传播使用，禁止商用</p>
    </div>
  </footer>
</template>
```

- [ ] **Step 3: 更新 App.vue 引入导航和底部**

```vue
<!-- shuangdun-frontend/src/App.vue -->
<template>
  <div class="min-h-screen bg-paper bg-paper-texture flex flex-col">
    <NavBar />
    <main class="flex-1 pt-16">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>
```

- [ ] **Step 4: 验证**

`npm run dev`，确认导航栏固定顶部、四链接可点击切换、滚动时导航栏出现半透明背景、页脚显示。

---

### Task 4: Mock 数据

**Files:**
- Create: `shuangdun-frontend/src/data/symbols.js`
- Create: `shuangdun-frontend/src/data/aiResults.js`
- Create: `shuangdun-frontend/public/mock/symbols/placeholder.svg`

**Interfaces:**
- Produces: `symbols` — 刻符数据数组（~12 条）
- Produces: `filterSymbols(category, formType)` — 筛选函数
- Produces: `getAIMockResult(query)` — 返回 Top 5 结果（2s 延迟）

- [ ] **Step 1: 创建 placeholder SVG**

```svg
<!-- shuangdun-frontend/public/mock/symbols/placeholder.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#F5F0E8" rx="8"/>
  <rect x="2" y="2" width="196" height="196" fill="none" stroke="#8B5E3C" stroke-width="1.5" stroke-dasharray="6,4" rx="7"/>
  <text x="100" y="110" text-anchor="middle" fill="#C23B22" font-size="64" font-family="serif">刻</text>
</svg>
```

- [ ] **Step 2: 编写 symbols.js**

```js
// shuangdun-frontend/src/data/symbols.js
export const symbolCategories = [
  { value: 'all', label: '全部' },
  { value: '天文', label: '天文' },
  { value: '地理', label: '地理' },
  { value: '动植物', label: '动植物' },
  { value: '生产生活', label: '生产生活' },
  { value: '其他', label: '其他' },
]

export const formTypes = [
  { value: 'all', label: '全部' },
  { value: '象形', label: '象形' },
  { value: '指事', label: '指事' },
  { value: '会意', label: '会意' },
]

export const symbols = [
  {
    id: 'sd_001',
    name: '日',
    image: '/mock/symbols/placeholder.svg',
    category: '天文',
    formType: '象形',
    description: '双墩刻符中表示"日"的符号，呈圆形，内有短横或点，象征太阳的光芒。这一符号形态与甲骨文中的"日"字一脉相承。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-001）',
  },
  {
    id: 'sd_002',
    name: '月',
    image: '/mock/symbols/placeholder.svg',
    category: '天文',
    formType: '象形',
    description: '表示"月"的符号，呈弯月形。双墩先民观察月相变化创造出此符号。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-002）',
  },
  {
    id: 'sd_003',
    name: '山',
    image: '/mock/symbols/placeholder.svg',
    category: '地理',
    formType: '象形',
    description: '表示"山"的符号，由三个并列的三角形或弧线构成，描绘山峰连绵的形态。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-003）',
  },
  {
    id: 'sd_004',
    name: '水',
    image: '/mock/symbols/placeholder.svg',
    category: '地理',
    formType: '象形',
    description: '表示"水"的符号，以波浪形线条表现流水意象。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-004）',
  },
  {
    id: 'sd_005',
    name: '鱼',
    image: '/mock/symbols/placeholder.svg',
    category: '动植物',
    formType: '象形',
    description: '表示"鱼"的符号，保留鱼头、鱼身、鱼尾的基本轮廓，形态生动。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-005）',
  },
  {
    id: 'sd_006',
    name: '鹿',
    image: '/mock/symbols/placeholder.svg',
    category: '动植物',
    formType: '象形',
    description: '表示"鹿"的符号，突出鹿角和细长的腿部特征。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-006）',
  },
  {
    id: 'sd_007',
    name: '木',
    image: '/mock/symbols/placeholder.svg',
    category: '动植物',
    formType: '象形',
    description: '表示"木"或"树"的符号，上为枝下为根，结构清晰。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-007）',
  },
  {
    id: 'sd_008',
    name: '网',
    image: '/mock/symbols/placeholder.svg',
    category: '生产生活',
    formType: '会意',
    description: '表示渔网的符号，由交叉线条组成网状图案，反映双墩先民的渔猎生活。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-008）',
  },
  {
    id: 'sd_009',
    name: '弓',
    image: '/mock/symbols/placeholder.svg',
    category: '生产生活',
    formType: '象形',
    description: '表示弓箭的符号，呈弯曲的弓形，反映狩猎工具的刻画。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-009）',
  },
  {
    id: 'sd_010',
    name: '田',
    image: '/mock/symbols/placeholder.svg',
    category: '生产生活',
    formType: '会意',
    description: '表示田地或区域的符号，由分格的矩形构成，反映原始农业活动。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-010）',
  },
  {
    id: 'sd_011',
    name: '云',
    image: '/mock/symbols/placeholder.svg',
    category: '天文',
    formType: '象形',
    description: '表示云的符号，以卷曲线条表现云气缭绕的形态。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-011）',
  },
  {
    id: 'sd_012',
    name: '目',
    image: '/mock/symbols/placeholder.svg',
    category: '其他',
    formType: '象形',
    description: '表示眼睛的符号，呈椭圆形内有圆点，与甲骨文"目"字形态接近。',
    era: '新石器时代中期（约7300年前）',
    source: '双墩遗址出土陶片（编号 SD-T-012）',
  },
]

export function filterSymbols(symbols, category, formType) {
  return symbols.filter(s => {
    const matchCategory = !category || category === 'all' || s.category === category
    const matchForm = !formType || formType === 'all' || s.formType === formType
    return matchCategory && matchForm
  })
}
```

- [ ] **Step 3: 编写 aiResults.js**

```js
// shuangdun-frontend/src/data/aiResults.js
import { symbols } from './symbols.js'

/**
 * 模拟 AI 识别，2 秒延迟后返回 Top 5 结果
 */
export function getAIMockResult(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 从 symbols 中随机选取 5 个，按相似度递减排序
      const shuffled = [...symbols].sort(() => Math.random() - 0.5).slice(0, 5)
      const baseScores = [0.95, 0.82, 0.67, 0.51, 0.38]
      const results = shuffled.map((s, i) => ({
        symbolId: s.id,
        name: s.name,
        image: s.image,
        similarity: baseScores[i] + (Math.random() * 0.05 - 0.025),
        category: s.category,
        description: s.description,
      }))
      resolve({
        query,
        results: results.sort((a, b) => b.similarity - a.similarity),
        timestamp: Date.now(),
      })
    }, 2000)
  })
}
```

---

### Task 5: 首页 — HeroSection + HistoryIntro

**Files:**
- Create: `shuangdun-frontend/src/components/home/HeroSection.vue`
- Create: `shuangdun-frontend/src/components/home/HistoryIntro.vue`
- Modify: `shuangdun-frontend/src/pages/HomePage.vue`

**Interfaces:**
- HeroSection: 无 props，发出 CTA 按钮点击通过 `<router-link>`
- HistoryIntro: 无 props，纯展示组件

- [ ] **Step 1: 编写 HeroSection.vue**

```vue
<!-- shuangdun-frontend/src/components/home/HeroSection.vue -->
<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- 装饰性刻符背景 -->
    <div class="absolute inset-0 opacity-5 select-none pointer-events-none">
      <span class="absolute top-1/4 left-1/4 text-[20rem] font-serif text-terracotta">日</span>
      <span class="absolute top-1/3 right-1/4 text-[16rem] font-serif text-terracotta">月</span>
      <span class="absolute bottom-1/4 left-1/3 text-[14rem] font-serif text-terracotta">山</span>
    </div>

    <div class="relative z-10 text-center px-6 max-w-4xl">
      <p class="text-seal font-ui text-sm tracking-widest mb-4 uppercase">
        新石器时代 · 距今约 7300 年
      </p>
      <h1 class="text-5xl md:text-7xl font-serif font-black text-ink mb-6 leading-tight text-balance">
        探寻七千年前的<br/>文字密码
      </h1>
      <p class="text-lg md:text-xl text-ink-light mb-10 max-w-2xl mx-auto leading-relaxed">
        双墩刻符是迄今发现最早的刻划符号群之一，<br class="hidden sm:block"/>
        比甲骨文早近四千年，是汉字起源的关键拼图。
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/library" class="btn-primary text-center text-lg px-8 py-4">
          探索资源库
        </router-link>
        <router-link to="/ai" class="btn-secondary text-center text-lg px-8 py-4">
          体验 AI 识别
        </router-link>
      </div>
    </div>

    <!-- 底部滚动提示 -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-terracotta/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>
```

- [ ] **Step 2: 编写 HistoryIntro.vue**

```vue
<!-- shuangdun-frontend/src/components/home/HistoryIntro.vue -->
<template>
  <section class="page-section">
    <h2 class="section-title">刻符溯源</h2>
    <p class="section-subtitle">七千年前的文明曙光</p>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- 左侧文字 -->
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-serif font-bold text-terracotta mb-3">🏺 发现与发掘</h3>
          <p class="text-ink-light leading-relaxed">
            双墩遗址位于安徽省蚌埠市淮上区，1985年文物普查中发现。遗址出土了大量带有刻划符号的陶片，
            经碳十四测定，距今约7300年，属于新石器时代中期文化遗存。
          </p>
        </div>
        <div>
          <h3 class="text-xl font-serif font-bold text-terracotta mb-3">📜 刻符内容</h3>
          <p class="text-ink-light leading-relaxed">
            刻符涵盖日月山川等自然物象，以及渔猎、农耕、编织等生产生活场景，
            展现出双墩先民对世界的观察与表达，具有鲜明的象形特征和表意功能。
          </p>
        </div>
        <div>
          <h3 class="text-xl font-serif font-bold text-terracotta mb-3">🔗 与汉字的关联</h3>
          <p class="text-ink-light leading-relaxed">
            双墩刻符在形态上与后来的甲骨文存在明显的承继关系，
            被学界认为是中国文字起源的重要源头之一，对汉字体系的形成产生了深远影响。
          </p>
        </div>
      </div>
      <!-- 右侧图片占位 -->
      <div class="card p-8 flex items-center justify-center min-h-[400px]">
        <div class="text-center text-ink-light">
          <span class="text-8xl font-serif text-terracotta/30">符</span>
          <p class="mt-4 text-sm">刻符展示区（待替换为实际图片）</p>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: 更新 HomePage.vue**

```vue
<!-- shuangdun-frontend/src/pages/HomePage.vue -->
<template>
  <div>
    <HeroSection />
    <HistoryIntro />
  </div>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import HistoryIntro from '@/components/home/HistoryIntro.vue'
</script>
```

- [ ] **Step 4: 验证**

`npm run dev`，首页完整 Hero + 介绍区，CTA 按钮可跳转。

---

### Task 6: 首页 — FeatureCards + UserGuide

**Files:**
- Create: `shuangdun-frontend/src/components/home/FeatureCards.vue`
- Create: `shuangdun-frontend/src/components/home/UserGuide.vue`
- Modify: `shuangdun-frontend/src/pages/HomePage.vue`

- [ ] **Step 1: 编写 FeatureCards.vue**

```vue
<!-- shuangdun-frontend/src/components/home/FeatureCards.vue -->
<template>
  <section class="page-section bg-cream/50">
    <h2 class="section-title">探索双墩刻符</h2>
    <p class="section-subtitle">多维度了解七千年前的刻划符号</p>

    <div class="grid md:grid-cols-3 gap-8 mt-8">
      <router-link
        v-for="feature in features"
        :key="feature.path"
        :to="feature.path"
        class="card p-8 group cursor-pointer text-center hover:border-terracotta transition-colors"
      >
        <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">
          {{ feature.icon }}
        </div>
        <h3 class="text-xl font-serif font-bold text-ink mb-3">{{ feature.title }}</h3>
        <p class="text-ink-light text-sm leading-relaxed">{{ feature.description }}</p>
        <span class="inline-block mt-4 text-sm font-ui text-terracotta group-hover:text-seal transition-colors">
          了解更多 →
        </span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '📚',
    title: '刻符资源库',
    description: '浏览完整的双墩刻符数字档案，支持按形态、意义多维度筛选，查看高清刻符图像与详细解读。',
    path: '/library',
  },
  {
    icon: '🤖',
    title: 'AI 智能识别',
    description: '输入汉字或上传图像，体验基于条件扩散模型的双墩刻符 AI 生成与匹配功能。',
    path: '/ai',
  },
  {
    icon: 'ℹ️',
    title: '关于项目',
    description: '了解项目背景、数据来源与团队成员，共同守护中华文字起源的重要遗产。',
    path: '/about',
  },
]
</script>
```

- [ ] **Step 2: 编写 UserGuide.vue**

```vue
<!-- shuangdun-frontend/src/components/home/UserGuide.vue -->
<template>
  <section class="page-section">
    <h2 class="section-title">使用指南</h2>
    <p class="section-subtitle">三步开始探索之旅</p>

    <div class="grid md:grid-cols-3 gap-8 mt-8">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta text-cream flex items-center justify-center text-2xl font-bold font-ui">
          1
        </div>
        <h3 class="font-serif font-bold text-lg text-ink mb-2">浏览资源库</h3>
        <p class="text-ink-light text-sm">
          进入刻符资源库，按分类或形态筛选感兴趣的刻符，点击查看高清大图和详细解读。
        </p>
      </div>
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta text-cream flex items-center justify-center text-2xl font-bold font-ui">
          2
        </div>
        <h3 class="font-serif font-bold text-lg text-ink mb-2">体验 AI 识别</h3>
        <p class="text-ink-light text-sm">
          在 AI 识别页面输入一个汉字，观察 AI 如何从双墩刻符中匹配最相似的结果。
        </p>
      </div>
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-terracotta text-cream flex items-center justify-center text-2xl font-bold font-ui">
          3
        </div>
        <h3 class="font-serif font-bold text-lg text-ink mb-2">分享与反馈</h3>
        <p class="text-ink-light text-sm">
          将对你有启发的刻符分享给朋友，或提交反馈帮助我们改进 AI 模型。
        </p>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: 更新 HomePage.vue 添加新组件**

在 HomePage.vue 的 `<template>` 中，`<HistoryIntro />` 之后加入：

```vue
<FeatureCards />
<UserGuide />
```

并在 `<script setup>` 中添加对应的 import。

- [ ] **Step 4: 验证**

首页完整呈现：Hero → 刻符溯源 → 功能入口卡片 → 使用指南。

---

### Task 7: 资源库 — SymbolCard + SymbolGrid

**Files:**
- Create: `shuangdun-frontend/src/components/library/SymbolCard.vue`
- Create: `shuangdun-frontend/src/components/library/SymbolGrid.vue`

**Interfaces:**
- SymbolCard: props `{ symbol: Object }`, emits `click`
- SymbolGrid: props `{ symbols: Array }`, emits `select(symbol)`

- [ ] **Step 1: 编写 SymbolCard.vue**

```vue
<!-- shuangdun-frontend/src/components/library/SymbolCard.vue -->
<template>
  <div
    class="card p-4 cursor-pointer group hover:border-terracotta transition-all duration-300"
    @click="$emit('click', symbol)"
  >
    <div class="aspect-square bg-paper rounded overflow-hidden mb-3 flex items-center justify-center relative">
      <img
        :src="symbol.image"
        :alt="symbol.name"
        class="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute top-2 right-2 bg-terracotta/80 text-cream text-xs px-2 py-0.5 rounded font-ui">
        {{ symbol.formType }}
      </div>
    </div>
    <h3 class="font-serif font-bold text-lg text-ink text-center">{{ symbol.name }}</h3>
    <p class="text-ink-light text-xs text-center mt-1 font-ui">{{ symbol.category }}</p>
  </div>
</template>

<script setup>
defineProps({
  symbol: { type: Object, required: true },
})
defineEmits(['click'])
</script>
```

- [ ] **Step 2: 编写 SymbolGrid.vue**

```vue
<!-- shuangdun-frontend/src/components/library/SymbolGrid.vue -->
<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <SymbolCard
      v-for="symbol in symbols"
      :key="symbol.id"
      :symbol="symbol"
      @click="$emit('select', symbol)"
    />
  </div>
</template>

<script setup>
import SymbolCard from './SymbolCard.vue'

defineProps({
  symbols: { type: Array, required: true },
})
defineEmits(['select'])
</script>
```

---

### Task 8: 资源库 — FilterBar + SymbolDetail

**Files:**
- Create: `shuangdun-frontend/src/components/library/FilterBar.vue`
- Create: `shuangdun-frontend/src/components/library/SymbolDetail.vue`

**Interfaces:**
- FilterBar: emits `filter-change({ category, formType })`
- SymbolDetail: props `{ symbol: Object|null, visible: Boolean }`, emits `close`
- SymbolDetail: 模态框形式，展示高清图 + 缩放 + 元信息

- [ ] **Step 1: 编写 FilterBar.vue**

```vue
<!-- shuangdun-frontend/src/components/library/FilterBar.vue -->
<template>
  <div class="card p-4 mb-8">
    <div class="flex flex-wrap gap-4 items-center">
      <div class="flex items-center gap-2">
        <label class="text-sm font-ui text-ink-light whitespace-nowrap">按意义分类：</label>
        <select
          v-model="category"
          class="bg-paper border border-border rounded px-3 py-2 text-sm font-ui text-ink focus:outline-none focus:border-terracotta transition-colors"
          @change="emitFilter"
        >
          <option v-for="c in symbolCategories" :key="c.value" :value="c.value">
            {{ c.label }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-ui text-ink-light whitespace-nowrap">按形态分类：</label>
        <select
          v-model="formType"
          class="bg-paper border border-border rounded px-3 py-2 text-sm font-ui text-ink focus:outline-none focus:border-terracotta transition-colors"
          @change="emitFilter"
        >
          <option v-for="f in formTypes" :key="f.value" :value="f.value">
            {{ f.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { symbolCategories, formTypes } from '@/data/symbols.js'

const emit = defineEmits(['filter-change'])
const category = ref('all')
const formType = ref('all')

function emitFilter() {
  emit('filter-change', {
    category: category.value,
    formType: formType.value,
  })
}
</script>
```

- [ ] **Step 2: 编写 SymbolDetail.vue**

```vue
<!-- shuangdun-frontend/src/components/library/SymbolDetail.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && symbol"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div class="bg-cream rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <!-- 关闭按钮 -->
          <div class="sticky top-0 bg-cream flex justify-between items-center p-4 border-b border-border">
            <h2 class="font-serif font-bold text-xl text-ink">{{ symbol.name }}</h2>
            <button
              @click="$emit('close')"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-paper transition-colors text-ink-light"
            >
              ✕
            </button>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- 左：高清大图 -->
              <div class="bg-paper rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                <img
                  :src="symbol.image"
                  :alt="symbol.name"
                  class="w-full h-auto max-h-[400px] object-contain cursor-zoom-in hover:scale-150 transition-transform duration-300 origin-center"
                />
              </div>
              <!-- 右：元信息 -->
              <div class="space-y-4">
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">释读名称</span>
                  <p class="text-2xl font-serif font-bold text-ink">{{ symbol.name }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">按意义分类</span>
                  <p class="text-ink">{{ symbol.category }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">按形态分类</span>
                  <p class="text-ink">{{ symbol.formType }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">年代</span>
                  <p class="text-ink">{{ symbol.era }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">出处</span>
                  <p class="text-ink">{{ symbol.source }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">详细描述</span>
                  <p class="text-ink leading-relaxed">{{ symbol.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  symbol: { type: Object, default: null },
  visible: { type: Boolean, default: false },
})
defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active { transition: opacity 0.3s ease; }
.modal-enter-active > div { transition: transform 0.3s ease, opacity 0.3s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-leave-active > div { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-enter-from { opacity: 0; }
.modal-enter-from > div { transform: scale(0.95); opacity: 0; }
.modal-leave-to { opacity: 0; }
.modal-leave-to > div { transform: scale(0.95); opacity: 0; }
</style>
```

---

### Task 9: ResourceLibrary 页面组装

**Files:**
- Modify: `shuangdun-frontend/src/pages/ResourceLibrary.vue`

- [ ] **Step 1: 完整实现 ResourceLibrary.vue**

```vue
<!-- shuangdun-frontend/src/pages/ResourceLibrary.vue -->
<template>
  <div class="page-section">
    <h1 class="section-title">刻符资源库</h1>
    <p class="section-subtitle">浏览双墩刻符数字档案</p>

    <FilterBar @filter-change="onFilterChange" />
    <SymbolGrid :symbols="filteredSymbols" @select="openDetail" />

    <!-- 批量导出 -->
    <div class="mt-12 pt-8 border-t border-border text-center">
      <button class="btn-secondary" @click="downloadZip">
        📥 批量导出 ZIP
      </button>
      <p class="text-xs text-ink-light mt-3 font-ui">
        ⚠️ 所有刻符图像资料仅供学术研究与科普传播使用，禁止用于商业用途。
        引用时请注明「双墩刻符数据库」来源。
      </p>
    </div>

    <SymbolDetail
      :symbol="selectedSymbol"
      :visible="detailVisible"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { symbols, filterSymbols } from '@/data/symbols.js'
import FilterBar from '@/components/library/FilterBar.vue'
import SymbolGrid from '@/components/library/SymbolGrid.vue'
import SymbolDetail from '@/components/library/SymbolDetail.vue'

const filters = ref({ category: 'all', formType: 'all' })
const selectedSymbol = ref(null)
const detailVisible = ref(false)

const filteredSymbols = computed(() => {
  return filterSymbols(symbols, filters.value.category, filters.value.formType)
})

function onFilterChange(f) {
  filters.value = f
}

function openDetail(symbol) {
  selectedSymbol.value = symbol
  detailVisible.value = true
}

function downloadZip() {
  alert('Demo 提示：批量导出功能将在正式版本中提供。')
}
</script>
```

- [ ] **Step 2: 验证**

`npm run dev` → `/library`，筛选器可切换、卡片网格响应筛选、点击卡片弹出详情模态框。

---

### Task 10: AI 识别 — ImageUpload + TextInput + InputPanel

**Files:**
- Create: `shuangdun-frontend/src/components/ai/ImageUpload.vue`
- Create: `shuangdun-frontend/src/components/ai/TextInput.vue`
- Create: `shuangdun-frontend/src/components/ai/InputPanel.vue`

**Interfaces:**
- InputPanel: emits `submit({ type: 'image'|'text', value: String|File })`, props `{ disabled: Boolean }`

- [ ] **Step 1: 编写 ImageUpload.vue**

```vue
<!-- shuangdun-frontend/src/components/ai/ImageUpload.vue -->
<template>
  <div class="text-center py-8">
    <label
      class="card p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-terracotta transition-colors border-dashed"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <div class="text-5xl">🖼️</div>
      <p class="text-ink-light font-ui">拖拽图像到此处，或点击上传</p>
      <p class="text-xs text-ink-light/60 font-ui">支持 JPG、PNG 格式</p>
      <input
        type="file"
        accept="image/jpeg,image/png"
        class="hidden"
        @change="onFileChange"
        ref="fileInput"
      />
      <span class="btn-primary text-sm mt-2">选择文件</span>
    </label>
    <div v-if="preview" class="mt-4">
      <img :src="preview" class="max-h-40 mx-auto rounded border border-border" />
      <p class="text-xs text-ink-light mt-2 font-ui">已选择：{{ fileName }}</p>
    </div>
    <p class="text-xs text-ink-light/60 mt-3 font-ui">
      💡 提示：建议上传清晰的刻符照片或手绘图形，背景尽量简洁
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['input-change'])
const fileInput = ref(null)
const preview = ref(null)
const fileName = ref('')

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (ev) => {
      preview.value = ev.target.result
    }
    reader.readAsDataURL(file)
    emit('input-change', { type: 'image', value: file })
  }
}

function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.match(/image\/(jpeg|png)/)) {
    const dt = new DataTransfer()
    dt.items.add(file)
    fileInput.value.files = dt.files
    const event = new Event('change', { bubbles: true })
    fileInput.value.dispatchEvent(event)
  }
}
</script>
```

- [ ] **Step 2: 编写 TextInput.vue**

```vue
<!-- shuangdun-frontend/src/components/ai/TextInput.vue -->
<template>
  <div>
    <div class="relative">
      <textarea
        v-model="text"
        class="w-full bg-paper border border-border rounded-lg p-4 font-serif text-lg text-ink resize-none
               focus:outline-none focus:border-terracotta transition-colors
               placeholder:text-ink-light/40"
        rows="4"
        placeholder="请输入一个或多个汉字，例如：日"
        :disabled="disabled"
        @input="onInput"
      ></textarea>
      <span class="absolute bottom-3 right-3 text-xs text-ink-light/60 font-ui">
        {{ text.length }}/50
      </span>
    </div>
    <p class="text-xs text-ink-light/60 mt-3 font-ui">
      💡 提示：输入你想查询的现代汉字（如「日」「月」「山」），AI 将在数据库中匹配最相似的双墩刻符
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['input-change'])

const text = ref('')

function onInput() {
  if (text.value.length > 50) {
    text.value = text.value.slice(0, 50)
  }
  emit('input-change', { type: 'text', value: text.value })
}
</script>
```

- [ ] **Step 3: 编写 InputPanel.vue**

```vue
<!-- shuangdun-frontend/src/components/ai/InputPanel.vue -->
<template>
  <div class="card p-6 h-full flex flex-col">
    <!-- Tab 切换 -->
    <div class="flex border-b border-border mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-4 py-2 font-ui text-sm transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.key
          ? 'border-terracotta text-terracotta'
          : 'border-transparent text-ink-light hover:text-terracotta'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 内容区 -->
    <div class="flex-1">
      <ImageUpload v-if="activeTab === 'image'" @input-change="onInput" />
      <TextInput v-else :disabled="disabled" @input-change="onInput" />
    </div>

    <!-- 发送按钮 -->
    <button
      class="btn-seal w-full mt-4 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="!canSubmit || disabled"
      @click="onSubmit"
    >
      {{ disabled ? '处理中...' : '发送识别' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageUpload from './ImageUpload.vue'
import TextInput from './TextInput.vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])

const activeTab = ref('text')
const currentInput = ref(null)

const tabs = [
  { key: 'text', label: '📝 文字输入' },
  { key: 'image', label: '📷 图像上传' },
]

const canSubmit = computed(() => {
  if (!currentInput.value) return false
  if (currentInput.value.type === 'text') return currentInput.value.value.trim().length > 0
  return currentInput.value.value !== null
})

function onInput(data) {
  currentInput.value = data
}

function onSubmit() {
  if (canSubmit.value && !props.disabled) {
    emit('submit', currentInput.value)
  }
}
</script>
```

---

### Task 11: AI 识别 — ResultCard + ResultPanel

**Files:**
- Create: `shuangdun-frontend/src/components/ai/ResultCard.vue`
- Create: `shuangdun-frontend/src/components/ai/ResultPanel.vue`

**Interfaces:**
- ResultCard: props `{ result: Object, rank: Number }`
- ResultPanel: props `{ results: Array|null, loading: Boolean }`

- [ ] **Step 1: 编写 ResultCard.vue**

```vue
<!-- shuangdun-frontend/src/components/ai/ResultCard.vue -->
<template>
  <div class="card p-4 flex gap-4 items-start">
    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta text-cream flex items-center justify-center font-bold font-ui text-sm">
      {{ rank }}
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="font-serif font-bold text-lg text-ink">{{ result.name }}</h3>
        <span class="text-xs font-ui text-ink-light">{{ result.category }}</span>
      </div>
      <!-- 对比视图 -->
      <div class="flex items-center gap-4 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-ui text-ink-light">刻符</span>
          <img :src="result.image" class="w-12 h-12 object-contain bg-paper rounded border border-border" />
        </div>
        <span class="text-terracotta text-xl">→</span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-ui text-ink-light">现代汉字</span>
          <span class="text-3xl font-serif text-ink">{{ result.name }}</span>
        </div>
      </div>
      <!-- 相似度评分条 -->
      <div class="flex items-center gap-2">
        <div class="flex-1 h-2 bg-paper rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-1000"
            :class="similarityColor"
            :style="{ width: (result.similarity * 100) + '%' }"
          ></div>
        </div>
        <span class="text-sm font-ui font-bold text-ink min-w-[3rem] text-right">
          {{ (result.similarity * 100).toFixed(0) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: { type: Object, required: true },
  rank: { type: Number, required: true },
})

const similarityColor = computed(() => {
  const s = props.result.similarity
  if (s >= 0.8) return 'bg-seal'
  if (s >= 0.5) return 'bg-terracotta'
  return 'bg-terracotta/50'
})
</script>
```

- [ ] **Step 2: 编写 ResultPanel.vue**

```vue
<!-- shuangdun-frontend/src/components/ai/ResultPanel.vue -->
<template>
  <div class="card p-6 h-full">
    <!-- 空状态 -->
    <div v-if="!loading && !results" class="h-full flex flex-col items-center justify-center text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="font-serif font-bold text-xl text-ink mb-2">等待识别</h3>
      <p class="text-ink-light text-sm font-ui">
        在左侧输入汉字或上传图像，<br/>AI 将为您匹配最相似的双墩刻符。
      </p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="h-full flex flex-col items-center justify-center py-16">
      <div class="relative w-20 h-20 mb-6">
        <div class="absolute inset-0 border-4 border-paper rounded-full"></div>
        <div class="absolute inset-0 border-4 border-transparent border-t-terracotta rounded-full animate-spin"></div>
      </div>
      <p class="text-ink-light font-ui">AI 正在分析中...</p>
      <p class="text-xs text-ink-light/60 mt-2 font-ui">正在匹配双墩刻符数据库</p>
    </div>

    <!-- 结果列表 -->
    <div v-if="!loading && results" class="space-y-4">
      <h3 class="font-serif font-bold text-lg text-ink mb-4">
        识别结果 — 共 {{ results.length }} 个匹配
      </h3>
      <ResultCard
        v-for="(result, i) in results"
        :key="result.symbolId"
        :result="result"
        :rank="i + 1"
      />
      <p class="text-xs text-ink-light/60 text-center mt-4 font-ui">
        ⚠️ 以上为 AI 模型匹配结果，仅供参考
      </p>
    </div>
  </div>
</template>

<script setup>
import ResultCard from './ResultCard.vue'

defineProps({
  results: { type: Array, default: null },
  loading: { type: Boolean, default: false },
})
</script>
```

---

### Task 12: AIRecognition + AboutPage 页面组装

**Files:**
- Modify: `shuangdun-frontend/src/pages/AIRecognition.vue`
- Modify: `shuangdun-frontend/src/pages/AboutPage.vue`

- [ ] **Step 1: 完整实现 AIRecognition.vue**

```vue
<!-- shuangdun-frontend/src/pages/AIRecognition.vue -->
<template>
  <div class="page-section">
    <h1 class="section-title">AI 智能识别</h1>
    <p class="section-subtitle">输入汉字，匹配双墩刻符</p>

    <div class="grid lg:grid-cols-2 gap-8 min-h-[600px]">
      <InputPanel :disabled="loading" @submit="onSubmit" />
      <ResultPanel :results="results" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputPanel from '@/components/ai/InputPanel.vue'
import ResultPanel from '@/components/ai/ResultPanel.vue'
import { getAIMockResult } from '@/data/aiResults.js'

const loading = ref(false)
const results = ref(null)

async function onSubmit(input) {
  loading.value = true
  results.value = null

  const query = input.type === 'text' ? input.value : '图像识别'
  const data = await getAIMockResult(query)

  results.value = data.results
  loading.value = false
}
</script>
```

- [ ] **Step 2: 完整实现 AboutPage.vue**

```vue
<!-- shuangdun-frontend/src/pages/AboutPage.vue -->
<template>
  <div class="page-section max-w-3xl mx-auto">
    <h1 class="section-title">关于项目</h1>
    <p class="section-subtitle">双墩刻符 AI 破译计划</p>

    <!-- 项目背景 -->
    <div class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">🎯 项目背景</h2>
      <div class="space-y-4 text-ink-light leading-relaxed">
        <p>
          本项目的核心目标有二：其一，响应中华文明探源工程对早期文字研究的支持需求，
          通过数字化手段为双墩刻符这一珍贵文化遗产建立标准化的数字档案，
          避免因文物本体年代久远、面临损毁风险而导致的文化信息流失。
        </p>
        <p>
          其二，针对双墩刻符尚未完全破译且公众知晓度低的现状，
          本项目基于条件扩散模型等核心算法，训练 AI 理解双墩刻符与现代汉字之间的映射关系，
          构建集文化科普与 AI 互动于一体的网站，将学术研究成果转化为公众易于参与的趣味体验。
        </p>
      </div>
    </div>

    <!-- 数据声明 -->
    <div class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">📋 数据声明</h2>
      <div class="space-y-3 text-ink-light leading-relaxed text-sm">
        <p>
          <strong class="text-ink">素材来源：</strong>
          所有原始图像资料均来自正式考古发掘记录、学术论文及公开出版的权威著作，
          版权归相关文博单位所有。
        </p>
        <p>
          <strong class="text-ink">使用规范：</strong>
          本站所有内容禁止用于商业用途。在学术研究、科普传播中引用时，
          须注明「双墩刻符数据库」来源。
        </p>
        <p>
          <strong class="text-ink">技术声明：</strong>
          AI 识别结果基于条件扩散模型生成，仅供参考研究使用，
          不构成正式的考古学释读结论。
        </p>
      </div>
    </div>

    <!-- 团队成员 -->
    <div class="card p-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-6">👥 项目团队</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="text-center p-4">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center text-xl font-serif font-bold">
            杨
          </div>
          <p class="font-serif font-bold text-ink">杨天瑞</p>
          <p class="text-xs text-ink-light mt-1 font-ui">模型训练</p>
        </div>
        <div class="text-center p-4">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center text-xl font-serif font-bold">
            曾
          </div>
          <p class="font-serif font-bold text-ink">曾庆皓</p>
          <p class="text-xs text-ink-light mt-1 font-ui">前端与后端开发</p>
        </div>
        <div class="text-center p-4">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center text-xl font-serif font-bold">
            牛
          </div>
          <p class="font-serif font-bold text-ink">牛鹤霖</p>
          <p class="text-xs text-ink-light mt-1 font-ui">功能设计</p>
        </div>
        <div class="text-center p-4">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center text-xl font-serif font-bold">
            郭
          </div>
          <p class="font-serif font-bold text-ink">郭怡嘉</p>
          <p class="text-xs text-ink-light mt-1 font-ui">数据采集</p>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-border text-center">
        <p class="text-sm text-ink-light font-ui">
          指导教师：<span class="text-ink font-serif">赵洋</span>
          &nbsp;&nbsp;教授 · 合肥工业大学计算机与信息学院
        </p>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 3: 验证**

`npm run dev` → `/ai`，输入文字 → 点击发送 → 加载动画 → 结果展示。
`/about` 完整内容呈现。

---

### Task 13: 响应式适配与动效收尾

**Files:**
- Modify: `shuangdun-frontend/src/components/NavBar.vue`（添加移动端汉堡菜单）
- Modify: `shuangdun-frontend/src/App.vue`（无额外修改，验证即可）

- [ ] **Step 1: 更新 NavBar 添加移动端菜单**

在 NavBar.vue 的 `<script setup>` 中添加：

```js
const menuOpen = ref(false)
function toggleMenu() { menuOpen.value = !menuOpen.value }
// 路由变化时关闭菜单
import { watch } from 'vue'
watch(() => route.path, () => { menuOpen.value = false })
```

在 template 中，桌面端链接保持不变，添加移动端汉堡按钮和下拉菜单：

```vue
<!-- 移动端汉堡按钮 -->
<button @click="toggleMenu" class="md:hidden w-10 h-10 flex items-center justify-center text-terracotta">
  <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
  <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
</button>

<!-- 移动端下拉菜单 -->
<Transition name="slide">
  <div v-if="menuOpen" class="absolute top-16 left-0 right-0 bg-cream border-b border-border shadow-lg md:hidden">
    <div class="flex flex-col p-4 gap-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="px-4 py-3 rounded font-ui text-center"
        :class="isActive(item.path) ? 'bg-terracotta text-cream' : 'text-ink-light hover:bg-paper'"
      >
        {{ item.label }}
      </router-link>
    </div>
  </div>
</Transition>
```

添加对应的 style：

```css
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
```

桌面端链接添加 `class="hidden md:flex"`。

- [ ] **Step 2: 创建 moveIn 过渡动画（ResultCard）**

AI结果出现时使用交错动画。在 ResultPanel.vue 中添加：

```vue
<TransitionGroup name="result" tag="div" class="space-y-4">
  <ResultCard v-for="(result, i) in results" ... />
</TransitionGroup>
```

```css
.result-enter-active { transition: all 0.4s ease; }
.result-leave-active { transition: all 0.2s ease; }
.result-enter-from { opacity: 0; transform: translateX(30px); }
```

- [ ] **Step 3: 全页面响应式验证**

`npm run dev`，使用浏览器 DevTools 在三种断点下检查：
- ≥1024px：AI 页左右分栏、资源库 4 列
- 768-1023px：AI 页上下堆叠、资源库 3 列
- <768px：单栏、资源库 2 列、汉堡菜单
