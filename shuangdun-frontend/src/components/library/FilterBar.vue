<template>
  <div class="card p-4 mb-8">
    <div class="flex flex-wrap gap-4 items-center">
      <div class="flex items-center gap-2">
        <label class="text-sm font-ui text-ink-light whitespace-nowrap"
          >按意义分类：</label
        >
        <select
          v-model="category"
          class="bg-paper border border-border rounded px-3 py-2 text-sm font-ui text-ink focus:outline-none focus:border-terracotta transition-colors"
          @change="emitFilter"
        >
          <option
            v-for="c in symbolCategories"
            :key="c.value"
            :value="c.value"
          >
            {{ c.label }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-ui text-ink-light whitespace-nowrap"
          >按形态分类：</label
        >
        <select
          v-model="formType"
          class="bg-paper border border-border rounded px-3 py-2 text-sm font-ui text-ink focus:outline-none focus:border-terracotta transition-colors"
          @change="emitFilter"
        >
          <option v-for="f in formTypes" :key="f.value" :value="f.value">
            {{ f.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { symbolCategories, formTypes } from '@/data/symbols.js'

const emit = defineEmits(['filter-change'])
const category = ref('all')
const formType = ref('all')

function emitFilter() {
  emit('filter-change', {
    category: category.value,
    formType: formType.value,
  })
}
</script>
