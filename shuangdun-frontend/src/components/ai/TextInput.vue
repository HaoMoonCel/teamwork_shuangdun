<template>
  <div>
    <div class="relative">
      <textarea
        v-model="text"
        class="w-full bg-paper border border-border rounded-lg p-4 font-serif text-lg text-ink resize-none
               focus:outline-none focus:border-terracotta transition-colors
               placeholder:text-ink-light/40"
        rows="4"
        placeholder="请输入一个或多个汉字，例如：日"
        :disabled="disabled"
        @input="onInput"
      ></textarea>
      <span
        class="absolute bottom-3 right-3 text-xs text-ink-light/60 font-ui"
      >
        {{ text.length }}/50
      </span>
    </div>
    <p class="text-xs text-ink-light/60 mt-3 font-ui">
      💡
      提示：输入你想查询的现代汉字（如「日」「月」「山」），AI
      将在数据库中匹配最相似的双墩刻符
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['input-change'])

const text = ref('')

function onInput() {
  if (text.value.length > 50) {
    text.value = text.value.slice(0, 50)
  }
  emit('input-change', { type: 'text', value: text.value })
}
</script>
