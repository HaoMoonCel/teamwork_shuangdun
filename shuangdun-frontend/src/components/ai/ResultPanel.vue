<template>
  <div class="card p-6 h-full">
    <!-- Empty state -->
    <div
      v-if="!loading && !view"
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
      <p class="text-ink-light font-ui">
        {{ pendingMode === 'generate' ? 'AI 正在生成刻符图...' : 'AI 正在识别...' }}
      </p>
      <p class="text-xs text-ink-light/60 mt-2 font-ui">
        {{
          pendingMode === 'generate'
            ? '扩散模型逐张采样，4 张约需 9 秒，请稍候'
            : '正在匹配双墩刻符数据库'
        }}
      </p>
    </div>

    <!-- Error state（契约第五节错误形状：code + message） -->
    <div
      v-if="!loading && view?.mode === 'error'"
      class="h-full flex flex-col items-center justify-center text-center py-16"
    >
      <div class="text-5xl mb-4">⚠️</div>
      <h3 class="font-serif font-bold text-lg text-ink mb-2">请求失败</h3>
      <p class="text-ink-light text-sm font-ui mb-3">
        {{ view.error.message }}
      </p>
      <span class="text-xs font-ui text-ink-light/50 border border-border rounded px-2 py-1">
        {{ view.error.code }}
      </span>
    </div>

    <!-- Recognize results -->
    <div v-if="!loading && view?.mode === 'recognize'" class="space-y-4">
      <h3 class="font-serif font-bold text-lg text-ink mb-4">
        识别结果 — 共 {{ view.data.results.length }} 个匹配
      </h3>

      <!-- uncertain 提示条（契约第三节：top-1 < 0.5，展开列表让用户确认） -->
      <div
        v-if="view.data.status === 'uncertain'"
        class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3"
      >
        <p class="text-sm font-ui text-amber-900">
          ⚠️ 识别置信度较低（top-1
          {{ (view.data.results[0].confidence * 100).toFixed(0) }}%），请点击选择最符合的字符
        </p>
      </div>

      <TransitionGroup name="result" tag="div" class="space-y-4">
        <ResultCard
          v-for="(result, i) in view.data.results"
          :key="result.char"
          :result="result"
          :rank="result.rank"
          :highlight="view.data.status === 'ok' && i === 0"
          :selectable="view.data.status === 'uncertain'"
          :expanded="selectedChar === result.char"
          @select="selectedChar = result.char"
        />
      </TransitionGroup>
      <p class="text-xs text-ink-light/60 text-center mt-4 font-ui">
        ⚡ 推理耗时 {{ view.data.queryTimeMs }}ms ｜ ⚠️ 以上为 AI 模型匹配结果，仅供参考
      </p>
    </div>

    <!-- Generate results -->
    <div v-if="!loading && view?.mode === 'generate'">
      <GenerateResult :data="view.data" @regenerate="$emit('regenerate')" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ResultCard from './ResultCard.vue'
import GenerateResult from './GenerateResult.vue'

const props = defineProps({
  view: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  pendingMode: { type: String, default: null },
})
defineEmits(['regenerate'])

// uncertain 模式下用户点选的字符
const selectedChar = ref(null)

// 新一轮结果到来时清空选择
watch(
  () => props.view?.data,
  () => {
    selectedChar.value = null
  }
)
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
