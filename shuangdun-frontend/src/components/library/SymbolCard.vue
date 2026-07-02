<template>
  <div
    class="card p-4 cursor-pointer group hover:border-terracotta transition-all duration-300"
    @click="$emit('click', symbol)"
  >
    <div
      class="aspect-square bg-paper rounded overflow-hidden mb-3 flex items-center justify-center relative"
    >
      <img
        :src="symbol.image"
        :alt="symbol.name"
        class="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
      />
      <div
        class="absolute top-2 right-2 bg-terracotta/80 text-cream text-xs px-2 py-0.5 rounded font-ui"
      >
        {{ symbol.formType }}
      </div>
    </div>
    <h3 class="font-serif font-bold text-lg text-ink text-center">
      {{ symbol.name }}
    </h3>
    <p class="text-ink-light text-xs text-center mt-1 font-ui">
      {{ symbol.category }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  symbol: { type: Object, required: true },
})
defineEmits(['click'])
</script>
