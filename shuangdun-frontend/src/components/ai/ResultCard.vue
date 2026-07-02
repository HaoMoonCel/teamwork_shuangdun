<template>
  <div class="card p-4 flex gap-4 items-start">
    <div
      class="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta text-cream flex items-center justify-center font-bold font-ui text-sm"
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
      <!-- Similarity bar -->
      <div class="flex items-center gap-2">
        <div class="flex-1 h-2 bg-paper rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-1000"
            :class="similarityColor"
            :style="{ width: (result.similarity * 100) + '%' }"
          ></div>
        </div>
        <span
          class="text-sm font-ui font-bold text-ink min-w-[3rem] text-right"
        >
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
