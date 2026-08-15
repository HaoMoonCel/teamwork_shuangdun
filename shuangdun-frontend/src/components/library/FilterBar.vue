<template>
  <div class="card p-5 mb-8">
    <div class="flex items-center justify-between mb-5">
      <div>
        <span class="font-serif font-bold text-ink">筛选刻符</span>
        <span class="mt-1 block h-[2px] w-6 bg-gold"></span>
      </div>
      <button
        v-if="!isAllSelected"
        class="text-xs font-ui text-terracotta hover:text-seal transition-colors"
        @click="reset"
      >
        ↺ 重置筛选
      </button>
    </div>

    <div class="flex flex-col gap-5">
      <!-- 意义分类 -->
      <div>
        <span class="block text-sm font-ui text-ink-light mb-2">按意义分类</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="c in symbolCategories"
            :key="c.value"
            class="px-4 py-1.5 rounded-full border text-sm font-ui transition-colors"
            :class="
              category === c.value
                ? 'bg-terracotta text-cream border-terracotta'
                : 'bg-paper text-ink-light border-border hover:border-terracotta hover:text-terracotta'
            "
            @click="setCategory(c.value)"
          >
            {{ c.label }}
          </button>
        </div>
      </div>

      <!-- 形态分类 -->
      <div>
        <span class="block text-sm font-ui text-ink-light mb-2">按形态分类</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="f in formTypes"
            :key="f.value"
            class="px-4 py-1.5 rounded-full border text-sm font-ui transition-colors"
            :class="
              formType === f.value
                ? 'bg-terracotta text-cream border-terracotta'
                : 'bg-paper text-ink-light border-border hover:border-terracotta hover:text-terracotta'
            "
            @click="setFormType(f.value)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { symbolCategories, formTypes } from '@/data/symbols.js'

const emit = defineEmits(['filter-change'])
const category = ref('all')
const formType = ref('all')

const isAllSelected = computed(
  () => category.value === 'all' && formType.value === 'all'
)

function setCategory(value) {
  category.value = value
  emitFilter()
}

function setFormType(value) {
  formType.value = value
  emitFilter()
}

function reset() {
  category.value = 'all'
  formType.value = 'all'
  emitFilter()
}

function emitFilter() {
  emit('filter-change', {
    category: category.value,
    formType: formType.value,
  })
}
</script>
