<template>
  <div class="flex h-full flex-col">
    <h3 class="font-serif font-bold text-lg text-ink mb-1 shrink-0">
      生成结果 — “{{ data.character }}”的刻符
    </h3>
    <p class="text-xs text-ink/80 font-ui mb-3 shrink-0">
      共生成 {{ data.images.length }} 张刻符图
    </p>

    <!-- 四张刻符：2×2 网格填满整个结果区域，四个方块各占四分之一 -->
    <div class="flex-1 grid grid-cols-2 grid-rows-2 gap-4 min-h-0">
      <div
        v-for="img in data.images"
        :key="img.index"
        class="bg-white rounded-lg border border-border flex items-center justify-center overflow-hidden"
      >
        <img
          :src="img.src"
          :alt="`${data.character} 刻符 ${img.index + 1}`"
          class="w-3/4 h-3/4 object-contain"
        />
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between gap-4 shrink-0">
      <span class="text-xs text-ink/80 font-ui">AI 生成 · 白底黑字风格</span>
      <button
        class="btn-seal text-sm px-4 py-2"
        @click="$emit('regenerate')"
      >
        换一批
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Object, required: true },
})
defineEmits(['regenerate'])
</script>
