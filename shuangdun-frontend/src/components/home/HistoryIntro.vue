<template>
  <section
    class="page-section bg-cream/40 overflow-hidden"
    ref="sectionRef"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-seal font-ui text-sm tracking-widest mb-3">
          从偶然发现到学术认定
        </p>
        <h2 class="text-4xl md:text-5xl font-serif font-black text-ink mb-4">
          刻符溯源
        </h2>
        <p class="text-ink-light max-w-2xl mx-auto leading-relaxed">
          双墩刻符的发现，将中国文字起源的探索向前推进了近四千年。
          这不仅是考古学上的重大突破，更是理解中华文明多元一体格局的关键线索。
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Water ripple SVG path (desktop horizontal / mobile vertical) -->
        <svg
          class="absolute hidden md:block left-1/2 top-0 -translate-x-1/2 h-full"
          width="4"
          viewBox="0 0 4 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 L2 800"
            stroke="#8B5E3C"
            stroke-width="1.5"
            stroke-dasharray="6 8"
            opacity="0.3"
          />
          <path
            d="M2 60 Q15 120 2 180 Q-11 240 2 300 Q15 360 2 420 Q-11 480 2 540 Q15 600 2 660 Q-11 720 2 780"
            stroke="#8B5E3C"
            stroke-width="2"
            fill="none"
            opacity="0.6"
          >
            <animate
              attributeName="d"
              values="
                M2 60 Q15 120 2 180 Q-11 240 2 300 Q15 360 2 420 Q-11 480 2 540 Q15 600 2 660 Q-11 720 2 780;
                M2 60 Q-11 120 2 180 Q15 240 2 300 Q-11 360 2 420 Q15 480 2 540 Q-11 600 2 660 Q15 720 2 780;
                M2 60 Q15 120 2 180 Q-11 240 2 300 Q15 360 2 420 Q-11 480 2 540 Q15 600 2 660 Q-11 720 2 780"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        <div class="space-y-16 md:space-y-24 relative">
          <!-- Timeline Item 1: 1985 Discovery -->
          <TimelineItem
            :index="0"
            :side="'left'"
            :year="'1985 年'"
            :title="'文物普查中的偶然发现'"
            :icon="'🔎'"
            :visible="visibleItems[0]"
          >
            <p>
              蚌埠市博物馆在第二次全国文物普查中，于淮上区小蚌埠镇双墩村北
              首次发现该遗址。遗址中心面积约12,000平方米，地表散落大量陶片、
              石器，一场跨越七千年的对话由此开启。
            </p>
            <div class="mt-4 flex gap-3 text-xs text-ink-light font-ui">
              <span class="bg-paper px-2 py-1 rounded">📍 安徽蚌埠</span>
              <span class="bg-paper px-2 py-1 rounded">📅 8月5日</span>
            </div>
          </TimelineItem>

          <!-- Timeline Item 2: Excavations -->
          <TimelineItem
            :index="1"
            :side="'right'"
            :year="'1986 — 1992'"
            :title="'三次考古发掘'"
            :icon="'⛏️'"
            :visible="visibleItems[1]"
          >
            <p>
              安徽省文物考古研究所先后于1986年秋、1991年春及1992年秋进行三次
              抢救性发掘，总面积约375平方米。发掘集中在遗址东南部凹沟内，
              出土陶器、石器、骨角器、蚌器等大量文物。
            </p>
            <div class="mt-4 p-3 bg-paper rounded-lg border border-border">
              <p class="text-xs text-terracotta font-ui font-bold mb-1">
                ⭐ 关键发现
              </p>
              <p class="text-xs text-ink-light">
                陶碗外底部圈足内发现大量刻划符号——位置隐蔽、非装饰用途，
                暗示其具有记事或表意的实用功能。
              </p>
            </div>
          </TimelineItem>

          <!-- Timeline Item 3: Carbon Dating -->
          <TimelineItem
            :index="2"
            :side="'left'"
            :year="'碳十四测定'"
            :title="'确证距今 7300 年'"
            :icon="'🔬'"
            :visible="visibleItems[2]"
          >
            <p>
              经碳十四科学测年，双墩遗址绝对年代为距今约<strong>7300—7100年</strong>，
              属新石器时代中期文化遗存。这一结果比龙山文化早2000余年，
              将安徽可考历史上溯至七千年前。
            </p>
            <div class="mt-4 flex items-center gap-4 text-sm">
              <div class="text-center">
                <span class="block text-3xl font-serif font-black text-seal">~7300</span>
                <span class="text-xs text-ink-light font-ui">年前</span>
              </div>
              <div class="h-8 w-px bg-border"></div>
              <div class="text-xs text-ink-light leading-relaxed">
                比甲骨文早<br /><strong class="text-terracotta text-base">≈4000</strong> 年
              </div>
              <div class="h-8 w-px bg-border"></div>
              <div class="text-xs text-ink-light leading-relaxed">
                比半坡遗址早<br /><strong class="text-terracotta text-base">>1000</strong> 年
              </div>
            </div>
          </TimelineItem>

          <!-- Timeline Item 4: 630 Symbols -->
          <TimelineItem
            :index="3"
            :side="'right'"
            :year="'630 余件刻符'"
            :title="'新石器时代刻符数量之最'"
            :icon="'🏺'"
            :visible="visibleItems[3]"
          >
            <p>
              双墩遗址共出土<strong>630余件</strong>陶器刻划符号，涵盖日月山川、动植物等
              写实类，渔猎农耕、养蚕编织等生产生活类，以及计数记事类符号。
              其内容之丰富、数量之庞大，为国内同时期遗址之冠。
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="cat in ['日月星辰', '山川地理', '动植物', '渔猎', '农耕', '编织', '计数符号']"
                :key="cat"
                class="text-xs bg-terracotta/5 text-terracotta px-2 py-1 rounded-full font-ui border border-terracotta/10"
              >
                {{ cat }}
              </span>
            </div>
          </TimelineItem>

          <!-- Timeline Item 5: Academic Recognition -->
          <TimelineItem
            :index="4"
            :side="'left'"
            :year="'学术认定'"
            :title="'汉字起源的重要源头'"
            :icon="'📜'"
            :visible="visibleItems[4]"
          >
            <p>
              北京大学李伯谦教授指出：双墩刻符已具备表意功能，是<strong>中国文字起源的重要源头之一</strong>。
              清华大学李学勤教授认为：双墩的发现"为文字起源的学术理论提供了一次重新检讨的机会"。
              双墩刻符被学界认定为处于"<strong>语段文字阶段</strong>"，已具备原始文字性质。
            </p>
            <div class="mt-4">
              <span class="inline-block bg-seal text-cream text-xs px-3 py-1 rounded-full font-ui">
                🏛️ 2013年 全国重点文物保护单位
              </span>
            </div>
          </TimelineItem>
        </div>
      </div>

      <!-- Footer note -->
      <div class="mt-16 text-center">
        <p class="text-xs text-ink-light/60 font-ui">
          资料来源：蚌埠双墩新石器时代遗址发掘报告 · 中国文字博物馆 ·
          北京大学古代文明研究中心
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionRef = ref(null)
const visibleItems = ref([false, false, false, false, false])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          // Stagger the reveals
          setTimeout(() => {
            visibleItems.value[index] = true
          }, index * 150)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  // Observe timeline items
  const items = sectionRef.value?.querySelectorAll('[data-index]')
  items?.forEach((item) => observer.observe(item))
})
</script>
