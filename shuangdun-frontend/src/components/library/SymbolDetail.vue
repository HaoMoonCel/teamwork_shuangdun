<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && symbol"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div
          class="bg-cream rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-cream flex justify-between items-center p-4 border-b border-border z-10"
          >
            <h2 class="font-serif font-bold text-xl text-ink">
              {{ symbol.name }}
            </h2>
            <button
              @click="$emit('close')"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-paper transition-colors text-ink-light"
            >
              ✕
            </button>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Left: large image -->
              <div
                class="bg-paper rounded-lg p-8 flex items-center justify-center min-h-[300px]"
              >
                <img
                  :src="symbol.image"
                  :alt="symbol.name"
                  class="w-full h-auto max-h-[400px] object-contain cursor-zoom-in hover:scale-150 transition-transform duration-300 origin-center"
                />
              </div>
              <!-- Right: metadata -->
              <div class="space-y-4">
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >释读名称</span
                  >
                  <p class="text-2xl font-serif font-bold text-ink">
                    {{ symbol.name }}
                  </p>
                </div>
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >按意义分类</span
                  >
                  <p class="text-ink">{{ symbol.category }}</p>
                </div>
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >按形态分类</span
                  >
                  <p class="text-ink">{{ symbol.formType }}</p>
                </div>
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >年代</span
                  >
                  <p class="text-ink">{{ symbol.era }}</p>
                </div>
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >出处</span
                  >
                  <p class="text-ink">{{ symbol.source }}</p>
                </div>
                <div>
                  <span
                    class="text-xs font-ui text-ink-light uppercase tracking-wider"
                    >详细描述</span
                  >
                  <p class="text-ink leading-relaxed">
                    {{ symbol.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  symbol: { type: Object, default: null },
  visible: { type: Boolean, default: false },
})
defineEmits(['close'])
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
