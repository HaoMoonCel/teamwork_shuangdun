<template>
  <div class="card p-6 h-full">
    <!-- Empty state -->
    <div
      v-if="!loading && !results"
      class="h-full flex flex-col items-center justify-center text-center py-16"
    >
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="font-serif font-bold text-xl text-ink mb-2">等待识别</h3>
      <p class="text-ink-light text-sm font-ui">
        在左侧输入汉字或上传图像，<br />AI 将为您匹配最相似的双墩刻符。
      </p>
    </div>

    <!-- Loading state -->
    <div
      v-if="loading"
      class="h-full flex flex-col items-center justify-center py-16"
    >
      <div class="relative w-20 h-20 mb-6">
        <div class="absolute inset-0 border-4 border-paper rounded-full"></div>
        <div
          class="absolute inset-0 border-4 border-transparent border-t-terracotta rounded-full animate-spin"
        ></div>
      </div>
      <p class="text-ink-light font-ui">AI 正在分析中...</p>
      <p class="text-xs text-ink-light/60 mt-2 font-ui">
        正在匹配双墩刻符数据库
      </p>
    </div>

    <!-- Results -->
    <div v-if="!loading && results" class="space-y-4">
      <h3 class="font-serif font-bold text-lg text-ink mb-4">
        识别结果 — 共 {{ results.length }} 个匹配
      </h3>
      <TransitionGroup name="result" tag="div" class="space-y-4">
        <ResultCard
          v-for="(result, i) in results"
          :key="result.symbolId"
          :result="result"
          :rank="i + 1"
        />
      </TransitionGroup>
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

<style scoped>
.result-enter-active {
  transition: all 0.4s ease;
}
.result-leave-active {
  transition: all 0.2s ease;
}
.result-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>
