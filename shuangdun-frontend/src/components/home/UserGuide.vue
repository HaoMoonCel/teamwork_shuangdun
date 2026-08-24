<template>
  <!-- 快速上手：第三板块，居中布局，等宽三卡，紧凑克制 -->
  <section class="bg-[#F0EBE1]">
    <div class="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <h2 class="text-center font-sans font-bold text-2xl md:text-3xl text-[#3A2E24]">
        快速上手
      </h2>
      <p class="mt-2 text-center font-sans text-base md:text-lg text-[#6B5D4F]">
        三步探索双墩刻符
      </p>

      <!-- 三个紧凑入口卡片：等宽，无编号圆、无连接线 -->
      <div class="grid md:grid-cols-3 gap-4 md:gap-5 mt-8">
        <router-link
          v-for="card in cards"
          :key="card.title"
          :to="card.path"
          class="group block rounded-lg bg-[#F7F2E9] border border-[#D9C7A3]/60 px-5 py-5 text-center transition-colors duration-200 hover:border-[#B08D5A]"
        >
          <h3 class="font-sans text-lg md:text-xl font-bold text-[#3A2E24]">
            {{ card.title }}
          </h3>
          <p class="mt-2 mx-auto max-w-[26ch] font-sans text-sm md:text-base text-[#6B5D4F] leading-relaxed">
            {{ card.desc }}
          </p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { title: 'AI刻符匹配', desc: '输入汉字或上传图像，AI检索相似双墩刻符', path: '/ai' },
  { title: '浏览资源库', desc: '按分类筛选刻符，查看高清大图', path: '/library' },
  { title: '分享与反馈', desc: '分享你的发现，让平台和你一起成长', path: '/about' },
]
</script>
