<template>
  <div class="bg-cream border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
    <!-- Year + icon -->
    <div class="flex items-center gap-3 mb-3">
      <span class="text-2xl">{{ icon }}</span>
      <div>
        <span class="text-xs font-ui text-seal tracking-widest uppercase">{{ year }}</span>
        <h3 class="text-lg font-serif font-bold text-ink leading-tight">{{ title }}</h3>
      </div>
    </div>

    <!-- Content -->
    <div class="text-sm text-ink-light leading-relaxed">
      <slot />
    </div>
  </div>
</template>
