<template>
  <div class="card p-6 h-full flex flex-col">
    <!-- Tab bar -->
    <div class="flex border-b border-border mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-4 py-2 font-ui text-sm transition-colors border-b-2 -mb-px"
        :class="
          activeTab === tab.key
            ? 'border-terracotta text-terracotta'
            : 'border-transparent text-ink-light hover:text-terracotta'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content area -->
    <div class="flex-1">
      <ImageUpload
        v-if="activeTab === 'image'"
        @input-change="onInput"
      />
      <TextInput
        v-else
        :disabled="disabled"
        @input-change="onInput"
      />
    </div>

    <!-- Submit button -->
    <button
      class="btn-seal w-full mt-4 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="!canSubmit || disabled"
      @click="onSubmit"
    >
      {{ disabled ? '处理中...' : '发送识别' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageUpload from './ImageUpload.vue'
import TextInput from './TextInput.vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])

const activeTab = ref('text')
const currentInput = ref(null)

const tabs = [
  { key: 'text', label: '📝 文字输入' },
  { key: 'image', label: '📷 图像上传' },
]

const canSubmit = computed(() => {
  if (!currentInput.value) return false
  if (currentInput.value.type === 'text')
    return currentInput.value.value.trim().length > 0
  return currentInput.value.value !== null
})

function onInput(data) {
  currentInput.value = data
}

function onSubmit() {
  if (canSubmit.value && !props.disabled) {
    emit('submit', currentInput.value)
  }
}
</script>
