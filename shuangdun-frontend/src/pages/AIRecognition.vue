<template>
  <div class="page-section">
    <h1 class="section-title">AI 智能识别</h1>
    <p class="section-subtitle">输入汉字，匹配双墩刻符</p>

    <div class="grid lg:grid-cols-2 gap-8 min-h-[600px]">
      <InputPanel :disabled="loading" @submit="onSubmit" />
      <ResultPanel :results="results" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputPanel from '@/components/ai/InputPanel.vue'
import ResultPanel from '@/components/ai/ResultPanel.vue'
import { getAIMockResult } from '@/data/aiResults.js'

const loading = ref(false)
const results = ref(null)

async function onSubmit(input) {
  loading.value = true
  results.value = null

  const query = input.type === 'text' ? input.value : '图像识别'
  const data = await getAIMockResult(query)

  results.value = data.results
  loading.value = false
}
</script>
