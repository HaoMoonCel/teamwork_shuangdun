<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-paper/90 backdrop-blur shadow-sm' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link
        to="/"
        class="flex items-center gap-2 text-terracotta hover:text-seal transition-colors"
      >
        <span class="text-2xl">🏺</span>
        <span class="text-lg font-serif font-bold hidden sm:inline"
          >双墩刻符 AI 破译</span
        >
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded font-ui text-sm transition-colors"
          :class="
            isActive(item.path)
              ? 'bg-terracotta text-cream'
              : 'text-ink-light hover:text-terracotta'
          "
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="toggleMenu"
        class="md:hidden w-10 h-10 flex items-center justify-center text-terracotta"
      >
        <svg
          v-if="!menuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div
        v-if="menuOpen"
        class="absolute top-16 left-0 right-0 bg-cream border-b border-border shadow-lg md:hidden"
      >
        <div class="flex flex-col p-4 gap-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-3 rounded font-ui text-center"
            :class="
              isActive(item.path)
                ? 'bg-terracotta text-cream'
                : 'text-ink-light hover:bg-paper'
            "
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/library', label: '资源库' },
  { path: '/ai', label: 'AI 识别' },
  { path: '/about', label: '关于' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false
  }
)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
