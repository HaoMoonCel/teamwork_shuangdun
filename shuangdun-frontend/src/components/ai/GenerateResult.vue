<template>
  <div>
    <h3 class="font-serif font-bold text-lg text-ink mb-1">
      生成结果 — 「{{ data.character }}」的刻符
    </h3>
    <p class="text-xs text-ink-light/60 font-ui mb-4">
      共生成 {{ data.images.length }} 张刻符图 ｜ seed {{ data.seed }} ｜ 推理耗时
      {{ data.queryTimeMs }}ms
    </p>

    <!-- 生成刻符图网格（契约生成规格：96×96 PNG，白底黑字） -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="img in data.images"
        :key="img.index"
        class="bg-white rounded-lg border border-border flex items-center justify-center p-4"
      >
        <img
          :src="img.src"
          :alt="`${data.character} 刻符 ${img.index + 1}`"
          class="w-24 h-24 object-contain"
        />
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between gap-4">
      <span class="text-xs text-ink-light/60 font-ui">✍️ AI 生成 · 白底黑字风格</span>
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
