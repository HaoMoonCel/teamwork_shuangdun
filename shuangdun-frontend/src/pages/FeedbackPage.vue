<template>
  <div class="page-section max-w-3xl mx-auto">
    <h1 class="section-title">分享与反馈</h1>
    <p class="section-subtitle">分享你的发现，让平台和你一起成长</p>

    <div class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">意见建议</h2>
      <p class="text-ink-light leading-relaxed mb-5">
        如果你对双墩刻符有新的发现、对平台功能有建议，或在使用中遇到问题，
        欢迎通过下方表单提交。我们会认真阅读每一条反馈。
      </p>
      <form class="space-y-5" @submit.prevent="onSubmit">
        <div>
          <label for="fb-name" class="block text-sm font-ui text-ink mb-2">称呼（选填）</label>
          <input
            id="fb-name"
            v-model="form.name"
            type="text"
            placeholder="你的称呼"
            class="w-full rounded-md border border-[#D9C7A3] bg-[#FDFAF3] px-4 py-2.5 font-sans text-ink outline-none transition-colors focus:border-[#B08D5A]"
          />
        </div>
        <div>
          <label for="fb-msg" class="block text-sm font-ui text-ink mb-2">内容</label>
          <textarea
            id="fb-msg"
            v-model="form.message"
            rows="5"
            required
            placeholder="写下你的发现、建议或问题…"
            class="w-full rounded-md border border-[#D9C7A3] bg-[#FDFAF3] px-4 py-2.5 font-sans text-ink outline-none transition-colors focus:border-[#B08D5A]"
          ></textarea>
        </div>
        <button
          type="submit"
          class="rounded-full bg-terracotta px-7 py-2.5 font-ui text-cream transition-colors hover:bg-[#9A5B38]"
        >
          提交反馈
        </button>
        <p v-if="submitted" class="text-sm font-ui text-[#7A6A55]">
          已收到你的反馈，感谢支持！
        </p>
      </form>
    </div>

    <div class="card p-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">其他联系方式</h2>
      <p class="text-ink-light leading-relaxed">
        也可通过“关于”页面了解项目团队与联系方式，直接与我们沟通。
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', message: '' })
const submitted = ref(false)

function onSubmit() {
  submitted.value = true
  form.message = ''
}
</script>
