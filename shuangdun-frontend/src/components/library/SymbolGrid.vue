<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
