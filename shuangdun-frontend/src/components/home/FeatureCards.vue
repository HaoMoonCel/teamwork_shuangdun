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
        <h3 class="text-xl font-serif font-bold text-ink mb-3">
          {{ feature.title }}
        </h3>
        <p class="text-ink-light text-sm leading-relaxed">
          {{ feature.description }}
        </p>
        <span
          class="inline-block mt-4 text-sm font-ui text-terracotta group-hover:text-seal transition-colors"
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
    icon: '📚',
    title: '刻符资源库',
    description:
      '浏览完整的双墩刻符数字档案，支持按形态、意义多维度筛选，查看高清刻符图像与详细解读。',
    path: '/library',
  },
  {
    icon: '🤖',
    title: 'AI 智能识别',
    description:
      '输入汉字或上传图像，体验基于条件扩散模型的双墩刻符 AI 生成与匹配功能。',
    path: '/ai',
  },
  {
    icon: 'ℹ️',
    title: '关于项目',
    description:
      '了解项目背景、数据来源与团队成员，共同守护中华文字起源的重要遗产。',
    path: '/about',
  },
]
</script>
