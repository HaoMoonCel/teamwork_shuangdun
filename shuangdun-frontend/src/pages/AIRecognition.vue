<template>
  <div class="page-section">
    <h1 class="section-title">AI 智能识别</h1>
    <p class="section-subtitle">输入汉字，匹配双墩刻符</p>

    <div class="grid lg:grid-cols-2 gap-8 min-h-[600px]">
      <InputPanel
        :disabled="loading"
        :supported-chars="supportedChars"
        @submit="onSubmit"
      />
      <ResultPanel
        :view="view"
        :loading="loading"
        @regenerate="onRegenerate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputPanel from '@/components/ai/InputPanel.vue'
import ResultPanel from '@/components/ai/ResultPanel.vue'
import {
  getChars,
  recognize,
  generate,
  normalizeRecognize,
  normalizeGenerate,
} from '@/data/aiResults.js'

const loading = ref(false)
// 统一结果视图：{ mode: 'recognize' | 'generate' | 'error', data }
const view = ref(null)
// 可用字库（契约第七节注意事项 6：首次加载同步 /api/chars，过滤输入面板）
const supportedChars = ref([])

onMounted(async () => {
  const resp = await getChars()
  supportedChars.value = resp.chars
})

async function onSubmit(input) {
  loading.value = true
  view.value = null
  try {
    if (input.type === 'text') {
      const char = input.value.trim()
      // /api/generate 单字语义 + 字库范围校验（契约第四/五节）
      if (char.length !== 1) {
        view.value = {
          mode: 'error',
          error: { code: 'INVALID_PARAM', message: '每次请输入 1 个汉字' },
        }
        return
      }
      if (!supportedChars.value.includes(char)) {
        view.value = {
          mode: 'error',
          error: {
            code: 'UNSUPPORTED_CHAR',
            message: `当前字库不支持'${char}'，共支持${supportedChars.value.length}个字符`,
          },
        }
        return
      }
      const resp = await generate(char, 4)
      view.value = { mode: 'generate', data: normalizeGenerate(resp) }
    } else {
      if (!input.value) return
      const resp = await recognize(input.value)
      view.value = { mode: 'recognize', data: normalizeRecognize(resp) }
    }
  } catch (err) {
    view.value = {
      mode: 'error',
      error: err?.code
        ? err
        : { code: 'MODEL_ERROR', message: '服务暂时不可用，请稍后重试' },
    }
  } finally {
    loading.value = false
  }
}

/** 换一批：传新 seed 重新生成（mock 按 seed 语义取另一组；真接口重新请求即生成新 seed） */
async function onRegenerate() {
  if (!view.value || view.value.mode !== 'generate') return
  const { character, seed } = view.value.data
  loading.value = true
  try {
    const resp = await generate(character, 4, seed + 8)
    view.value = { mode: 'generate', data: normalizeGenerate(resp) }
  } catch (err) {
    view.value = {
      mode: 'error',
      error: err?.code
        ? err
        : { code: 'MODEL_ERROR', message: '服务暂时不可用，请稍后重试' },
    }
  } finally {
    loading.value = false
  }
}
</script>
