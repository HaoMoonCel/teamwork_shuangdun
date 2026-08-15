<template>
  <div
    v-if="symbols.length === 0"
    class="col-span-full text-center py-16 text-ink-light font-ui"
  >
    没有符合条件的刻符，试试调整筛选条件。
  </div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <SymbolCard
      v-for="symbol in symbols"
      :key="symbol.id"
      :symbol="symbol"
      @click="$emit('select', symbol)"
    />
  </div>
</template>

<script setup>
import SymbolCard from './SymbolCard.vue'

defineProps({
  symbols: { type: Array, required: true },
})
defineEmits(['select'])
</script>
