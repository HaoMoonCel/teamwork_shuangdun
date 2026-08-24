<template>
  <div class="page-section max-w-4xl mx-auto">
    <h1 class="section-title">平台使用指南</h1>
    <p class="section-subtitle">全部详细操作说明</p>

    <!-- 快速上手 -->
    <section class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">一、快速上手</h2>
      <ol class="list-decimal list-inside space-y-3 text-ink-light leading-relaxed">
        <li><strong class="text-ink">AI 刻符匹配</strong>：进入<strong class="text-ink">刻符识别</strong>页面，输入一个汉字，或上传刻符图片，AI 将检索最相似的双墩刻符并给出匹配结果。</li>
        <li><strong class="text-ink">浏览资源库</strong>：进入<strong class="text-ink">资源库</strong>页面，按分类筛选刻符，点击任意刻符可查看高清大图与详细解读。</li>
        <li><strong class="text-ink">分享与反馈</strong>：在<strong class="text-ink">关于</strong>页面了解项目背景，通过联系方式分享你的发现与建议。</li>
      </ol>
    </section>

    <!-- AI 刻符识别 -->
    <section class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">二、AI 刻符识别</h2>
      <div class="space-y-3 text-ink-light leading-relaxed">
        <p><strong class="text-ink">输入方式一：文字。</strong>在输入框中键入一个汉字（暂不支持词组），点击<strong class="text-ink">匹配</strong>，AI 将基于刻符数据库生成与该汉字最相近的双墩刻符候选。</p>
        <p><strong class="text-ink">输入方式二：图片。</strong>点击上传按钮选择刻符图片，AI 将识别图片中的刻符并返回最相似的匹配结果。</p>
        <p><strong class="text-ink">注意事项：</strong>单次仅支持 1 个汉字；图片建议清晰、背景简单；识别结果基于模型生成，仅供参考研究，不构成正式考古学释读结论。</p>
      </div>
    </section>

    <!-- 资源库 -->
    <section class="card p-8 mb-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">三、资源库</h2>
      <div class="space-y-3 text-ink-light leading-relaxed">
        <p><strong class="text-ink">浏览与筛选：</strong>资源库按类别整理双墩刻符，可通过顶部分类标签快速筛选。</p>
        <p><strong class="text-ink">查看详情：</strong>点击刻符卡片进入详情，查看高清图像、编号与文字解读。</p>
        <p><strong class="text-ink">使用规范：</strong>本站素材版权归相关文博单位所有，禁止商业用途；学术引用请注明<strong class="text-ink">双墩刻符数据库</strong>来源。</p>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="card p-8">
      <h2 class="text-xl font-serif font-bold text-terracotta mb-4">四、常见问题</h2>
      <div class="space-y-3 text-ink-light leading-relaxed">
        <p><strong class="text-ink">问：匹配结果不准确？</strong>答：刻符识别基于条件扩散模型生成，结果受图像质量与字库范围影响，可更换图片或输入其他汉字重试。</p>
        <p><strong class="text-ink">问：为什么只能输入单个汉字？</strong>答：为保证匹配质量，当前版本限定单字识别，后续将支持词组与整句。</p>
        <p><strong class="text-ink">问：如何反馈问题？</strong>答：请通过<strong class="text-ink">关于</strong>页面的联系方式提交反馈，我们会持续优化。</p>
      </div>
    </section>
  </div>
</template>
