<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && symbol"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div
          class="bg-cream rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-cream flex justify-between items-center p-4 border-b border-gold/30 z-10"
          >
            <div class="flex items-center gap-3">
              <h2 class="font-serif font-bold text-xl text-ink">
                {{ symbol.name }}
              </h2>
              <span
                class="bg-seal text-cream text-xs px-1.5 py-1 rounded-sm font-serif leading-none tracking-widest"
              >
                {{ symbol.formType }}
              </span>
            </div>
            <button
              @click="$emit('close')"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-paper transition-colors text-ink-light"
            >
              ✕
            </button>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Left: metadata -->
              <div class="space-y-4">
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">释读名称</span>
                  <div class="flex items-center gap-3">
                    <p class="text-2xl font-serif font-bold text-ink">{{ symbol.name }}</p>
                    <span class="text-xs font-ui text-ink-light/70 border border-border rounded px-2 py-0.5">{{ symbol.id }}</span>
                  </div>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">按意义分类</span>
                  <p class="mt-1">
                    <span class="inline-block bg-paper text-ink border border-border rounded-full px-3 py-0.5 text-sm font-ui">{{ symbol.category }}</span>
                  </p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">按形态分类</span>
                  <p class="mt-1">
                    <span class="inline-block bg-terracotta/10 text-terracotta border border-terracotta/30 rounded-full px-3 py-0.5 text-sm font-ui">{{ symbol.formType }}</span>
                  </p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">年代</span>
                  <p class="text-ink">{{ symbol.era }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">出处</span>
                  <p class="text-ink">{{ symbol.source }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">详细描述</span>
                  <p class="text-ink leading-relaxed">{{ symbol.description }}</p>
                </div>
                <div>
                  <span class="text-xs font-ui text-ink-light uppercase tracking-wider">数据集</span>
                  <p class="text-ink">
                    共 <strong>{{ datasetCount }}</strong> 张手绘刻符图片
                  </p>
                </div>
              </div>

              <!-- Right: first sample large -->
              <div class="bg-paper rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                <img
                  :src="datasetImages[0]"
                  :alt="symbol.name"
                  class="max-w-full max-h-[400px] object-contain cursor-zoom-in hover:scale-150 transition-transform duration-300 origin-center"
                />
              </div>
            </div>

            <!-- Dataset grid — single pre-rendered image -->
            <div class="mt-8 pt-6 border-t border-border">
              <h3 class="font-serif font-bold text-lg text-ink mb-4">
                手绘数据集 — {{ datasetCount }} 张原始样本
              </h3>
              <p class="text-xs text-ink-light mb-4 font-ui">
                📜 以下为双墩刻符「{{ symbol.name }}」的全部手绘样本，每张来自独立的手绘采集
              </p>
              <a :href="gridUrl" target="_blank">
                <img
                  :src="gridUrl"
                  :alt="`${symbol.name} 全部手绘样本`"
                  class="w-full border border-border rounded cursor-pointer hover:shadow-lg transition-shadow"
                />
              </a>
              <p class="text-xs text-ink-light/60 mt-2 text-center font-ui">
                点击查看大图
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { getDatasetImages } from '@/data/symbols.js'

const props = defineProps({
  symbol: { type: Object, default: null },
  visible: { type: Boolean, default: false },
})
defineEmits(['close'])

const datasetImages = computed(() => getDatasetImages(props.symbol))

const datasetCount = computed(() => datasetImages.value.length)

const gridUrl = computed(() => `/dataset_grids/${props.symbol?.name}_grid.png`)
</script>

<style scoped>
.modal-enter-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > :deep(div:first-child) {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-leave-active > :deep(div:first-child) {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
}
.modal-enter-from > :deep(div:first-child) {
  transform: scale(0.95);
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-to > :deep(div:first-child) {
  transform: scale(0.95);
  opacity: 0;
}
</style>
