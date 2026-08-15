<template>
  <div
    class="card p-4 flex gap-4 items-start transition-all duration-300"
    :class="[
      highlight ? 'border-seal ring-1 ring-seal' : '',
      selectable ? 'cursor-pointer hover:border-terracotta' : '',
      expanded ? 'border-terracotta' : '',
    ]"
    @click="selectable && $emit('select')"
  >
    <div
      class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold font-ui text-sm"
      :class="highlight ? 'bg-seal text-cream' : 'bg-terracotta text-cream'"
    >
      {{ rank }}
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="font-serif font-bold text-lg text-ink">
          {{ result.name }}
        </h3>
        <span class="text-xs font-ui text-ink-light">{{
          result.category
        }}</span>
        <span
          v-if="highlight"
          class="text-xs font-ui text-seal border border-seal rounded px-1.5 py-0.5"
        >
          最可能
        </span>
      </div>
      <!-- Comparison view -->
      <div class="flex items-center gap-4 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-ui text-ink-light">刻符</span>
          <img
            :src="result.image"
            class="w-12 h-12 object-contain bg-paper rounded border border-border"
          />
        </div>
        <span class="text-terracotta text-xl">→</span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-ui text-ink-light">现代汉字</span>
          <span class="text-3xl font-serif text-ink">{{ result.name }}</span>
        </div>
      </div>
      <!-- Confidence bar -->
      <div class="flex items-center gap-2">
        <div class="flex-1 h-2 bg-paper rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-1000"
            :class="confidenceColor"
            :style="{ width: (result.confidence * 100) + '%' }"
          ></div>
        </div>
        <span
          class="text-sm font-ui font-bold text-ink min-w-[3rem] text-right"
        >
          {{ (result.confidence * 100).toFixed(0) }}%
        </span>
      </div>
      <!-- uncertain 选中后展开字符说明 -->
      <p
        v-if="expanded && result.description"
        class="mt-3 text-sm text-ink-light font-ui leading-relaxed"
      >
        {{ result.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: { type: Object, required: true },
  rank: { type: Number, required: true },
  highlight: { type: Boolean, default: false },
  selectable: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
})
defineEmits(['select'])

const confidenceColor = computed(() => {
  const c = props.result.confidence
  if (c >= 0.8) return 'bg-seal'
  if (c >= 0.5) return 'bg-terracotta'
  return 'bg-terracotta/50'
})
</script>
