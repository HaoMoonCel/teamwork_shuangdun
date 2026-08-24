<template>
  <div class="ai-page relative isolate min-h-[calc(100vh-6.25rem)] overflow-hidden">
    <!-- 背景：4.jpg（刻符浅浮雕） + 暖色渐变叠加，留出可读性 -->
    <div
      class="ai-bg absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center"
      aria-hidden="true"
    ></div>
    <div
      class="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style="background:
        linear-gradient(180deg, rgba(220,198,162,0.92) 0%, rgba(195,161,124,0.5) 45%, rgba(180,140,100,0.1) 100%);"
    ></div>

    <div class="page-section lg:max-w-[96rem] relative">
      <h1 class="section-title">刻符识别</h1>
      <p class="section-subtitle">输入汉字或上传刻符图片，AI将匹配相似双墩刻符</p>

      <div class="grid lg:grid-cols-2 gap-8 min-h-[600px] lg:min-h-[calc(100vh-24rem)]">
        <InputPanel
          :disabled="loading"
          :supported-chars="supportedChars"
          @submit="onSubmit"
        />
        <ResultPanel
          :view="view"
          :loading="loading"
          :pending-mode="pendingMode"
          @regenerate="onRegenerate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputPanel from '@/components/ai/InputPanel.vue'
import ResultPanel from '@/components/ai/ResultPanel.vue'
import aiBg from '../../pic/4.jpg'
import {
  getChars,
  recognize,
  generate,
  normalizeRecognize,
  normalizeGenerate,
  SUPPORTED_CHARS,
} from '@/data/aiResults.js'

const loading = ref(false)
// 统一结果视图：{ mode: 'recognize' | 'generate' | 'error', data }
const view = ref(null)
// 当前请求类型（loading 文案区分：生成慢约 9s，识别快约几十 ms）
const pendingMode = ref(null)
// 可用字库（契约固定 37 字）：先本地立即渲染，后端可达时再同步校准，
// 避免后端未启动时文字输入面板无字可选
const supportedChars = ref([...SUPPORTED_CHARS])
onMounted(async () => {
  try {
    const resp = await getChars()
    if (resp?.chars?.length) supportedChars.value = resp.chars
  } catch {
    // 后端不可达：保留本地字库，页面功能不中断
  }
})

async function onSubmit(input) {
  loading.value = true
  pendingMode.value = input.type === 'text' ? 'generate' : 'recognize'
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
  pendingMode.value = 'generate'
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

<style scoped>
/* 4.jpg 作为页面壁纸，背景层置于内容之下（-z-10） */
.ai-bg {
  background-image: url('../../pic/4.jpg');
  background-size: 108% 108%;
  background-position: center;
  background-repeat: no-repeat;
  /* 让中间的刻符纹样不抢视觉焦点，略微柔化 */
  filter: saturate(0.9) brightness(1.02);
}
</style>
