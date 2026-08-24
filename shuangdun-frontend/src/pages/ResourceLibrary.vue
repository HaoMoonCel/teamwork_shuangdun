<template>
  <div class="page-section relative overflow-hidden">
    <!-- 装饰背景刻符 -->
    <div
      class="absolute -top-8 -right-4 opacity-[0.04] select-none pointer-events-none leading-none"
    >
      <span class="text-[18rem] font-serif text-ink">刻</span>
    </div>

    <header class="relative text-center mb-10">
      <p
        class="flex items-center justify-center gap-3 text-[11px] font-ui uppercase tracking-[0.4em] text-ochre"
      >
        <span class="inline-block h-px w-6 bg-gold"></span>
        <span>Shuangdun Symbol Archive</span>
        <span class="inline-block h-px w-6 bg-gold"></span>
      </p>
      <h1
        class="mt-4 text-4xl md:text-5xl font-serif font-bold text-ink tracking-[0.04em]"
      >
        刻符资源库
      </h1>
      <p class="mt-3 text-ink-light">浏览双墩刻符数字档案</p>
      <span class="mt-5 mx-auto block h-[2px] w-10 bg-gold"></span>
    </header>

    <FilterBar @filter-change="onFilterChange" />

    <div class="flex items-center gap-3 mb-4">
      <span class="h-px flex-1 bg-border"></span>
      <p class="text-sm font-ui text-ink-light">
        共
        <strong class="text-terracotta font-serif text-base">{{ filteredSymbols.length }}</strong>
        个刻符
      </p>
      <span class="h-px flex-1 bg-border"></span>
    </div>

    <SymbolGrid :symbols="filteredSymbols" @select="openDetail" />

    <!-- Batch download -->
    <div class="mt-12 pt-8 border-t border-border text-center">
      <button class="btn-secondary" @click="downloadZip">
        📥 批量导出 ZIP
      </button>
      <p class="text-xs text-ink-light mt-3 font-ui">
        ⚠️
        所有刻符图像资料仅供学术研究与科普传播使用，禁止用于商业用途。 引用时请注明“双墩刻符数据库”来源。
      </p>
    </div>

    <SymbolDetail
      :symbol="selectedSymbol"
      :visible="detailVisible"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { symbols, filterSymbols } from '@/data/symbols.js'
import FilterBar from '@/components/library/FilterBar.vue'
import SymbolGrid from '@/components/library/SymbolGrid.vue'
import SymbolDetail from '@/components/library/SymbolDetail.vue'

const filters = ref({ category: 'all', formType: 'all' })
const selectedSymbol = ref(null)
const detailVisible = ref(false)

const filteredSymbols = computed(() => {
  return filterSymbols(symbols, filters.value.category, filters.value.formType)
})

function onFilterChange(f) {
  filters.value = f
}

function openDetail(symbol) {
  selectedSymbol.value = symbol
  detailVisible.value = true
}

function downloadZip() {
  alert('Demo 提示：批量导出功能将在正式版本中提供。')
}
</script>
