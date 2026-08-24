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
      <p class="text-xs text-ink/80 font-ui mb-2">
        字库支持（{{ supportedChars.length }} 字）· 点击快速选择：
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="c in supportedChars"
          :key="c"
          type="button"
          class="char-btn h-9 w-9 font-serif text-base disabled:opacity-50 disabled:cursor-not-allowed"
          :class="c === text ? 'is-selected' : 'is-idle'"
          :disabled="disabled"
          @click="selectChar(c)"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <p class="text-xs text-ink/80 mt-3 font-ui">
      提示：输入支持的汉字后，将生成对应风格的双墩刻符图
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

<style scoped>
/* 字库按钮：刻符风八边形（clip-path），选中即印章填充 */
.char-btn {
  clip-path: polygon(
    18% 0,
    82% 0,
    100% 18%,
    100% 82%,
    82% 100%,
    18% 100%,
    0 82%,
    0 18%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    filter 0.2s ease;
}
.char-btn.is-idle {
  background-color: #f5f0e8;
  color: #3a3632;
}
.char-btn.is-idle:hover {
  background-color: rgba(178, 106, 66, 0.16);
  color: #b26a42;
  filter: drop-shadow(0 1px 2px rgba(60, 40, 20, 0.28));
}
.char-btn.is-selected {
  background-color: #b26a42;
  color: #fffefa;
  filter: drop-shadow(0 1px 3px rgba(178, 106, 66, 0.45));
}
</style>
