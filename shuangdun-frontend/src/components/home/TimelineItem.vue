<template>
  <div
    class="relative"
    :data-index="index"
  >
    <!-- Desktop: alternating layout around center line -->
    <div class="hidden md:grid md:grid-cols-[1fr_48px_1fr] gap-6 items-start">
      <!-- Left slot: card if side=left, otherwise empty -->
      <div v-if="side === 'left'" class="text-right">
        <div
          class="transition-all duration-700"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
        >
          <TimelineCard :year="year" :title="title" :icon="icon">
            <slot />
          </TimelineCard>
        </div>
      </div>
      <div v-else></div>

      <!-- Center node column -->
      <div class="flex justify-center pt-4">
        <div
          class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 delay-200"
          :class="[
            index === 0 ? 'bg-seal border-seal' :
            index === 4 ? 'bg-terracotta border-terracotta' :
            'bg-cream border-terracotta',
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          ]"
        >
          <div
            class="w-2 h-2 rounded-full"
            :class="[
              index === 0 || index === 4 ? 'bg-cream' : 'bg-terracotta'
            ]"
          ></div>
        </div>
      </div>

      <!-- Right slot: card if side=right, otherwise empty -->
      <div v-if="side === 'right'" class="text-left">
        <div
          class="transition-all duration-700"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
        >
          <TimelineCard :year="year" :title="title" :icon="icon">
            <slot />
          </TimelineCard>
        </div>
      </div>
      <div v-else></div>
    </div>

    <!-- Mobile: vertical timeline -->
    <div class="md:hidden pl-8 border-l-2 border-terracotta/20 relative">
      <div
        class="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-all duration-500"
        :class="[
          index === 0 ? 'bg-seal border-seal' :
          index === 4 ? 'bg-terracotta border-terracotta' :
          'bg-cream border-terracotta',
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        ]"
      ></div>
      <div
        class="pb-2 transition-all duration-700"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <TimelineCard :year="year" :title="title" :icon="icon">
          <slot />
        </TimelineCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import TimelineCard from './TimelineCard.vue'

defineProps({
  index: { type: Number, required: true },
  side: { type: String, required: true },
  year: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  visible: { type: Boolean, default: false },
})
</script>
