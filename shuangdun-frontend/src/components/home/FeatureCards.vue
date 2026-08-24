<template>
  <section class="page-section bg-cream/50">
    <h2 class="section-title">探索双墩刻符</h2>
    <p class="section-subtitle">多维度了解七千年前的刻划符号</p>

    <div class="grid md:grid-cols-3 gap-8 mt-8">
      <router-link
        v-for="feature in features"
        :key="feature.path"
        :to="feature.path"
        class="card p-8 group cursor-pointer text-center hover:border-terracotta/60 transition-colors"
      >
        <!-- 内置 SVG 线稿图标（与大事记线稿风格统一） -->
        <div
          class="w-16 h-16 mx-auto mb-5 flex items-center justify-center text-terracotta"
        >
          <!-- 陶片线稿 -->
          <svg
            v-if="feature.key === 'library'"
            class="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M10 26 L18 10 L36 14 L40 30 L28 40 L14 36 Z"
              stroke-linejoin="round"
            />
            <path d="M20 20 L28 22" stroke-linecap="round" />
            <path d="M19 25 L31 27" stroke-linecap="round" />
            <path d="M21 30 L27 31" stroke-linecap="round" />
          </svg>
          <!-- 放大镜 + 刻符线稿 -->
          <svg
            v-else-if="feature.key === 'ai'"
            class="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="21" cy="21" r="12" stroke-linejoin="round" />
            <path d="M21 14 V28" stroke-linecap="round" />
            <path d="M14 21 H28" stroke-linecap="round" />
            <path d="M16 27.5 L26 27.5" stroke-linecap="round" />
            <path d="M30.5 30.5 L40 40" stroke-linecap="round" />
          </svg>
          <!-- 团队线稿 -->
          <svg
            v-else
            class="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="18" cy="17" r="6" stroke-linejoin="round" />
            <path
              d="M8 38 C8 31 12.7 27 18 27 C23.3 27 28 31 28 38"
              stroke-linecap="round"
            />
            <circle cx="31" cy="19" r="4.5" stroke-linejoin="round" />
            <path d="M30 27.5 C35 26.5 40 30 40 36" stroke-linecap="round" />
          </svg>
        </div>

        <h3 class="text-xl font-serif font-bold text-ink mb-3">
          {{ feature.title }}
        </h3>
        <p class="text-ink-light text-base leading-relaxed">
          {{ feature.description }}
        </p>
        <span
          class="inline-block mt-4 text-base font-ui text-terracotta group-hover:text-ink transition-colors"
        >
          了解更多 →
        </span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    key: 'library',
    title: '刻符资源库',
    description:
      '浏览完整的双墩刻符数字档案，支持按形态、意义多维度筛选，查看高清刻符图像与详细解读。',
    path: '/library',
  },
  {
    key: 'ai',
    title: '刻符智能识别',
    description:
      '输入汉字或上传图像，匹配最相似的双墩刻符，查看生成与比对结果。',
    path: '/ai',
  },
  {
    key: 'about',
    title: '关于项目',
    description:
      '了解项目背景、数据来源与团队成员，共同守护中华文字起源的重要遗产。',
    path: '/about',
  },
]
</script>
