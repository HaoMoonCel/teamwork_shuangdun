<template>
  <div
    class="card p-4 cursor-pointer group hover:border-gold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    @click="$emit('click', symbol)"
  >
    <div
      class="aspect-square bg-paper/60 rounded-md overflow-hidden mb-3 flex items-center justify-center relative border border-border/50 group-hover:border-gold/50 transition-colors"
    >
      <img
        :src="thumbnailUrl"
        :alt="symbol.name"
        class="w-[70%] h-[70%] object-contain group-hover:scale-110 transition-transform duration-500"
      />
      <!-- 形态分类印章 -->
      <span
        class="absolute top-2 right-2 bg-seal text-cream text-xs px-1.5 py-1 rounded-sm font-serif leading-none tracking-widest shadow-sm"
      >
        {{ symbol.formType }}
      </span>
    </div>
    <div class="text-center">
      <h3
        class="font-serif font-bold text-xl text-ink group-hover:text-terracotta transition-colors"
      >
        {{ symbol.name }}
      </h3>
      <p class="text-ink/80 text-xs mt-1.5 font-ui tracking-wider">
        {{ symbol.category }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFirstDatasetImage } from '@/data/symbols.js'

const props = defineProps({
  symbol: { type: Object, required: true },
})
defineEmits(['click'])

const thumbnailUrl = computed(() => getFirstDatasetImage(props.symbol))
</script>
