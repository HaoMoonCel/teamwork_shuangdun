<template>
  <div class="page-section">
    <h1 class="section-title">刻符资源库</h1>
    <p class="section-subtitle">浏览双墩刻符数字档案</p>

    <FilterBar @filter-change="onFilterChange" />
    <SymbolGrid :symbols="filteredSymbols" @select="openDetail" />

    <!-- Batch download -->
    <div class="mt-12 pt-8 border-t border-border text-center">
      <button class="btn-secondary" @click="downloadZip">
        📥 批量导出 ZIP
      </button>
      <p class="text-xs text-ink-light mt-3 font-ui">
        ⚠️
        所有刻符图像资料仅供学术研究与科普传播使用，禁止用于商业用途。 引用时请注明「双墩刻符数据库」来源。
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
