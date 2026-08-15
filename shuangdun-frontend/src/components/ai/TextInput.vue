<template>
  <div>
    <input
      v-model="text"
      type="text"
      maxlength="1"
      class="w-full bg-paper border border-border rounded-lg px-4 py-3 font-serif text-lg text-ink
             focus:outline-none focus:border-terracotta transition-colors
             placeholder:text-ink-light/40"
      placeholder="请输入 1 个汉字，例如：日"
      :disabled="disabled"
      @input="onInput"
    />

    <!-- 37 字快捷选择（契约第七节注意事项 6：按 /api/chars 字库过滤输入面板） -->
    <div class="mt-4">
      <p class="text-xs text-ink-light/70 font-ui mb-2">
        字库支持（{{ supportedChars.length }} 字）· 点击快速选择：
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="c in supportedChars"
          :key="c"
          type="button"
          class="w-9 h-9 rounded border font-serif text-base transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            c === text
              ? 'bg-terracotta text-cream border-terracotta'
              : 'bg-paper border-border text-ink hover:border-terracotta hover:text-terracotta'
          "
          :disabled="disabled"
          @click="selectChar(c)"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <p class="text-xs text-ink-light/60 mt-3 font-ui">
      💡 提示：输入支持的汉字后，AI 将生成对应风格的双墩刻符图
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  supportedChars: { type: Array, default: () => [] },
})
const emit = defineEmits(['input-change'])

const text = ref('')

function onInput() {
  // 只保留 1 个字符（IME 组合输入结束后自动截断，镜像 /api/generate 单字语义）
  if (text.value.length > 1) {
    text.value = text.value.slice(-1)
  }
  emit('input-change', { type: 'text', value: text.value })
}

function selectChar(c) {
  text.value = c
  emit('input-change', { type: 'text', value: c })
}
</script>
