<template>
  <section
    class="min-h-screen flex flex-col relative overflow-hidden bg-[#E8DECB] bg-paper-texture"
  >
    <!-- 背景图：铺得更宽，右侧浓、向左迅速转淡直至消失 -->
    <img
      :src="images.main.src"
      :alt="images.main.alt"
      class="hero-bg-image"
      aria-hidden="true"
    />

    <!-- 底部过渡：向下一个板块（时间轴）的暖色底平滑淡出，消除两图间的硬切 -->
    <div class="hero-transition" aria-hidden="true"></div>

    <!-- 上半部分：文案 + 三个入口模块作为一个整体，纵向居中并略微上提 -->
    <div
      class="relative z-10 w-full px-6 md:px-12 pt-20 pb-6 md:pb-8 flex-1 flex flex-col items-end justify-center"
    >
      <!-- 每个文字元素都是 flex 列的子项（items-end 贴右），
           段落 max-w-xl 仍控制阅读宽度，盒子本身在右侧 -->
      <p
        class="font-sans text-2xl md:text-3xl tracking-[0.22em] text-[#57463A] mb-4 text-right"
      >
        新石器时代 · 距今约 <strong class="font-bold">7300</strong> 年
      </p>
      <h1
        class="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-[#3A3632] mb-6 leading-[1.2] tracking-[0.02em] text-right"
      >
        探寻七千年前的文字密码
      </h1>
      <p
        class="font-sans text-2xl md:text-3xl text-[#56524D] whitespace-nowrap leading-normal text-right"
      >
        双墩刻符为早期刻符群，早于甲骨文四千年，是汉字起源关键证据
      </p>

      <!-- 三个入口模块：等宽横排，中间一张轻微下沉 8px，与文字同一右基准 -->
      <div
        class="flex flex-col md:flex-row items-start gap-6 md:gap-8 mt-6 md:mt-8 w-full md:w-[54rem]"
      >
          <router-link
            v-for="(feature, i) in features"
            :key="feature.path"
            :to="feature.path"
            class="entry-card group w-full md:w-auto md:flex-1"
            :class="[offsetClasses[i]]"
          >
            <h3 class="text-2xl font-sans font-bold text-ink mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-ink-light text-base leading-relaxed">
              {{ feature.description }}
            </p>
            <span
              class="mt-5 inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-base font-ui text-terracotta border border-terracotta/40 transition-colors group-hover:bg-terracotta group-hover:text-cream group-hover:border-terracotta"
            >
              进入 <span aria-hidden="true">→</span>
            </span>
          </router-link>
        </div>
    </div>
  </section>
</template>

<script setup>
import { heroImages as images } from '../../config/siteImages'

const features = [
  {
    key: 'ai',
    title: '刻符智能识别',
    description: '输入汉字或上传图像，AI检索相似双墩刻符',
    path: '/ai',
  },
  {
    key: 'library',
    title: '刻符资源库',
    description: '按分类筛选刻符，查看高清大图',
    path: '/library',
  },
  {
    key: 'feedback',
    title: '分享与反馈',
    description: '分享你的发现，让平台和你一起成长',
    path: '/feedback',
  },
]

/* 轻微错落：仅中间一张向下偏移 8px，其余对齐；卡片等宽、间距宽松 */
const offsetClasses = ['', 'entry-card--mid', '']
</script>

<style scoped>
/* 入口卡片：72% 半透明白底 + 8px 毛玻璃，无实线边框、柔和浅阴影。
   悬停：底色透明度微微提升、轻微上浮、标题变色 + 暖色投影，交互清晰可感知 */
.entry-card {
  background-color: rgba(255, 255, 255, 0.72);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow:
    0 1px 3px rgba(60, 40, 20, 0.08),
    0 6px 18px rgba(60, 40, 20, 0.07);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.entry-card:hover {
  background-color: rgba(255, 255, 255, 0.85);
  transform: translateY(-4px);
  box-shadow:
    0 2px 6px rgba(60, 40, 20, 0.1),
    0 12px 28px rgba(139, 94, 60, 0.22);
}
.entry-card:hover h3 {
  color: #8b5e3c;
}

/* 中间一张：常态下沉 8px；悬停上浮时仍保持相对错落（-4px） */
.entry-card--mid {
  transform: translateY(8px);
}
.entry-card--mid:hover {
  transform: translateY(4px);
}

/* 背景图：镜像反转铺左 80%
   - transform: scaleX(-1) 水平镜像，元素整体（含遮罩）随镜像翻转，
     因此遮罩仍写 to left（局部右侧浓），镜像后呈现"布局左侧浓、向右渐淡"，
     与文字区（右侧）保持干净分界 */
.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 80%;
  object-fit: cover;
  object-position: center;
  transform: scaleX(-1);
  mix-blend-mode: multiply;
  opacity: 0.95;
  pointer-events: none;
  user-select: none;
  -webkit-mask-image: linear-gradient(
    to left,
    #000 45%,
    rgba(0, 0, 0, 0.35) 68%,
    transparent 90%
  );
  mask-image: linear-gradient(
    to left,
    #000 45%,
    rgba(0, 0, 0, 0.35) 68%,
    transparent 90%
  );
}

/* 底部过渡：与时间轴板块的边界色 #c3a17c 平滑衔接（渐变加长、终态饱和，消除硬切） */
.hero-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14rem;
  background: linear-gradient(
    to bottom,
    rgba(195, 161, 124, 0) 0%,
    #c3a17c 100%
  );
  pointer-events: none;
  user-select: none;
}
</style>
