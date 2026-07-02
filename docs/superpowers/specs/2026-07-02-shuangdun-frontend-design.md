# 双墩刻符 AI 破译 — 前端 Demo 设计文档

> 日期：2026-07-02 | 状态：已确认

## 1. 项目概述

基于条件扩散模型的双墩刻符AI破译项目的配套网站前端原型。双墩刻符是安徽蚌埠出土的新石器时代刻划符号群，距今约7300年，对甲骨文和汉字的形成起到重要作用。

### 1.1 Demo 范围

带模拟交互的前端原型：包含 Vue 组件、路由切换、mock 数据、模拟 AI 生成过程的完整前端交互体验。

### 1.2 技术选型

| 项 | 选择 |
|---|------|
| 构建工具 | Vite |
| 前端框架 | Vue 3 (Composition API) |
| 路由 | Vue Router 4 |
| 样式方案 | Tailwind CSS（自定义古风主题） |
| 状态管理 | reactive/ref + provide/inject（demo 阶段不需要 Pinia） |

---

## 2. 视觉设计系统

### 2.1 配色方案

以陶土、宣纸、墨迹、印章为灵感：

| 角色 | 色值 | 用途 |
|------|------|------|
| 背景基色 | `#F5F0E8` 宣纸白 | 全局背景 |
| 卡片/面板 | `#FFFEFA` 米白 | 内容容器 |
| 主色调 | `#8B5E3C` 陶土棕 | 导航栏、按钮、标题 |
| 强调色 | `#C23B22` 印章朱红 | 重要按钮、高亮、标记 |
| 文字主色 | `#3C2415` 墨褐 | 正文文字 |
| 文字辅色 | `#7A6455` 浅褐 | 辅助说明 |
| 边框/分隔 | `#D4C5B2` 浅陶 | 边框、分割线 |
| AI 渐变 | `#8B5E3C → #C23B22` | AI 交互区专属渐变 |

### 2.2 字体方案

| 层级 | 字体 | 用途 |
|------|------|------|
| 展示标题 | Noto Serif SC / Source Han Serif | Hero 大标题、页面主标题 |
| 正文 | Noto Serif SC | 所有正文内容 |
| UI 文字 | system-ui | 按钮、标签等界面文字 |

### 2.3 视觉元素

- 页面背景使用宣纸纹理（CSS subtle pattern 或 SVG）
- 卡片使用细边框 + 微阴影，模仿古书函套质感
- 分隔线使用云纹/回纹装饰线条
- 按钮 hover 效果仿印章按压（轻微缩放+颜色加深）

---

## 3. 页面结构

### 3.1 路由设计

| 路径 | 组件 | 名称 |
|------|------|------|
| `/` | HomePage | 首页 |
| `/library` | ResourceLibrary | 刻符资源库 |
| `/ai` | AIRecognition | AI 识别 |
| `/about` | AboutPage | 关于项目 |

### 3.2 页面布局

#### 首页 (`/`)

纵向滚动式单页：

1. **Hero 区**：全屏高度，大标题「探寻七千年前的文字密码」+ 刻符装饰背景 + 两个 CTA 按钮 [探索资源库] [体验AI识别]
2. **刻符介绍区**：左文右图布局，介绍双墩刻符历史渊源与考古发展
3. **功能入口卡片**：三张卡片横向排列，分别跳转资源库、AI识别、关于项目
4. **使用指南**：三步图示说明

#### 刻符资源库 (`/library`)

1. **筛选栏**：按符号形态分类 + 按符号意义分类，下拉选择
2. **刻符网格**：响应式网格展示刻符卡片（图片 + 名称）
3. **详情模态框**：点击卡片弹出，展示高清大图 + 缩放 + 元信息
4. **批量导出**：底部 [批量导出 ZIP] 按钮 + 免责声明

#### AI 识别 (`/ai`)

左右分栏布局：

1. **左侧输入区**：Tab 切换「图像上传」和「文字输入」两种模式
   - 图像模式：上传区域 + 实时提示
   - 文字模式：输入框 + 实时辅助提示
2. **处理动画**：发送后显示「处理中...」加载状态
3. **右侧结果区**：Top 5 匹配结果列表
   - 每项包含：相似度评分、基本信息卡片、刻符与汉字对比视图

#### 关于项目 (`/about`)

单栏文档式：

1. 项目背景（中华文明探源工程 + 双墩刻符保护）
2. 数据声明（素材来源、版权归属、使用规范）
3. 团队成员 + 指导教师

---

## 4. 组件架构

```
App.vue
├── NavBar.vue                    ← 全局顶部导航
├── <RouterView>
│   ├── HomePage.vue
│   │   ├── HeroSection.vue       ← Hero 大标题 + 刻符装饰
│   │   ├── HistoryIntro.vue      ← 历史渊源图文介绍
│   │   ├── FeatureCards.vue      ← 三大功能入口卡片
│   │   └── UserGuide.vue         ← 使用步骤指引
│   │
│   ├── ResourceLibrary.vue
│   │   ├── FilterBar.vue         ← 多维筛选栏
│   │   ├── SymbolGrid.vue        ← 刻符卡片网格
│   │   │   └── SymbolCard.vue    ← 单张刻符卡片
│   │   └── SymbolDetail.vue      ← 高清详情模态框
│   │
│   ├── AIRecognition.vue
│   │   ├── InputPanel.vue        ← 左侧输入区
│   │   │   ├── ImageUpload.vue   ← 图像上传 tab
│   │   │   └── TextInput.vue     ← 文字输入 tab
│   │   └── ResultPanel.vue       ← 右侧结果区
│   │       └── ResultCard.vue    ← 单条匹配结果
│   │
│   └── AboutPage.vue
│
└── FooterBar.vue                 ← 全局底部
```

---

## 5. Mock 数据设计

### 5.1 刻符资源数据

```js
// 每一条刻符记录
{
  id: 'sd_001',
  name: '日',              // 释读名称
  image: '/mock/symbols/sd_001.png',
  category: '天文',        // 按意义分类
  formType: '象形',        // 按形态分类
  description: '双墩刻符中的"日"字，呈圆形...',
  era: '新石器时代中期',
  source: '双墩遗址出土陶片'
}
```

### 5.2 AI 识别 Mock 结果

```js
// 单次识别结果
{
  query: '日',             // 用户输入
  results: [
    { symbol: 'sd_001', name: '日', similarity: 0.95, image: '...' },
    { symbol: 'sd_045', name: '旦', similarity: 0.82, image: '...' },
    { symbol: 'sd_078', name: '明', similarity: 0.67, image: '...' },
    { symbol: 'sd_112', name: '星', similarity: 0.51, image: '...' },
    { symbol: 'sd_203', name: '晶', similarity: 0.38, image: '...' },
  ]
}
```

---

## 6. 交互细节

### 6.1 AI 识别流程

```
用户输入 → 点击发送 → 输入区禁用 + 显示"处理中"动画（2s）
→ 右侧结果区滑入显示 Top 5 → 用户可点击结果卡片查看对比详情
```

### 6.2 资源库筛选

```
选择筛选项 → 网格内容平滑过渡 → 卡片重新排列
点击卡片 → 模态框从卡片位置缩放展开 → 显示高清大图
```

### 6.3 导航行为

```
导航栏固定顶部 → 当前页高亮 → 页面切换使用 fade 过渡
滚动时导航栏添加半透明背景
```

---

## 7. 响应式策略

| 断点 | 布局调整 |
|------|---------|
| ≥1024px | 完整布局：AI 页左右分栏、资源库 4 列网格 |
| 768-1023px | AI 页上下堆叠、资源库 3 列网格 |
| <768px | 单栏、资源库 2 列网格、导航改为汉堡菜单 |

---

## 8. 项目文件结构

```
shuangdun-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── FooterBar.vue
│   │   ├── home/
│   │   │   ├── HeroSection.vue
│   │   │   ├── HistoryIntro.vue
│   │   │   ├── FeatureCards.vue
│   │   │   └── UserGuide.vue
│   │   ├── library/
│   │   │   ├── FilterBar.vue
│   │   │   ├── SymbolGrid.vue
│   │   │   ├── SymbolCard.vue
│   │   │   └── SymbolDetail.vue
│   │   └── ai/
│   │       ├── InputPanel.vue
│   │       ├── ImageUpload.vue
│   │       ├── TextInput.vue
│   │       ├── ResultPanel.vue
│   │       └── ResultCard.vue
│   ├── pages/
│   │   ├── HomePage.vue
│   │   ├── ResourceLibrary.vue
│   │   ├── AIRecognition.vue
│   │   └── AboutPage.vue
│   ├── data/
│   │   ├── symbols.js          # 刻符 mock 数据
│   │   └── aiResults.js        # AI 识别 mock 结果
│   └── assets/
│       └── styles/
│           └── base.css         # 全局样式 + 纹理
└── public/
    └── mock/
        └── symbols/            # 刻符 mock 图片
```
