<template>
  <div class="text-center py-8">
    <label
      class="card p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-terracotta transition-colors border-dashed"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <div class="text-5xl">🖼️</div>
      <p class="text-ink-light font-ui">拖拽图像到此处，或点击上传</p>
      <p class="text-xs text-ink-light/60 font-ui">支持 JPG、PNG 格式</p>
      <input
        type="file"
        accept="image/jpeg,image/png"
        class="hidden"
        @change="onFileChange"
        ref="fileInput"
      />
      <span class="btn-primary text-sm mt-2">选择文件</span>
    </label>
    <div v-if="preview" class="mt-4">
      <img
        :src="preview"
        class="max-h-40 mx-auto rounded border border-border"
      />
      <p class="text-xs text-ink-light mt-2 font-ui">已选择：{{ fileName }}</p>
    </div>
    <p class="text-xs text-ink-light/60 mt-3 font-ui">
      💡 提示：建议上传清晰的刻符照片或手绘图形，背景尽量简洁
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['input-change'])
const fileInput = ref(null)
const preview = ref(null)
const fileName = ref('')

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (ev) => {
      preview.value = ev.target.result
    }
    reader.readAsDataURL(file)
    emit('input-change', { type: 'image', value: file })
  }
}

function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.match(/image\/(jpeg|png)/)) {
    const dt = new DataTransfer()
    dt.items.add(file)
    fileInput.value.files = dt.files
    const event = new Event('change', { bubbles: true })
    fileInput.value.dispatchEvent(event)
  }
}
</script>
