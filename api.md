# API 接口约定

> 字符翻译算法（杨）· M1 交付物 · v1.1 · 2026-08-12

---

## 概述

本项目提供两个 AI 服务端点：

| 端点 | 方向 | 功能 |
|------|------|------|
| `POST /api/recognize` | 刻符图 → 汉字 | 上传刻符图片，识别对应的现代汉字 |
| `POST /api/generate` | 汉字 → 刻符 | 输入汉字，生成对应风格的刻符图片 |
| `GET /api/chars` | 元数据 | 返回当前支持的 37 个汉字列表，作为可用字库的唯一事实来源 |

服务独立部署于 GPU 实例，前端通过 HTTP 调用。服务端已启用 CORS，允许任意来源跨域请求。

---

## 一、跨域配置（CORS）

- **策略**：服务端启用 CORS，`Access-Control-Allow-Origin: *`
- **允许的方法**：`GET`、`POST`、`OPTIONS`
- **允许的请求头**：`Content-Type`、`Authorization`
- **实现**：Flask-CORS，`CORS(app, resources={r"/api/*": {"origins": "*"}})`

前端无需配置 vite proxy，直接 fetch 服务端公网地址即可。

---

## 二、字符列表

```
GET /api/chars
```

此端点返回当前模型支持的完整字库，是**可用字符的唯一事实来源**。前端应在首次加载时调用此接口同步字库，据此过滤输入面板中不可用的汉字。

**响应**

```json
{
  "chars": [
    "一", "七", "三", "丘", "丝", "中", "二", "井", "人", "仓",
    "八", "十", "叶", "圈", "山", "房", "日", "束", "根", "桥",
    "水", "田", "甲", "癸", "矢", "箭", "糸", "网", "花", "草",
    "虫", "虹", "豕", "钩", "阜", "鱼", "鹿"
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `chars` | string[] | 按 Unicode 码点升序排列（U+4E00 ~ U+9E7F），共 37 个字符 |

---

## 三、刻符图 → 汉字识别

```
POST /api/recognize
Content-Type: multipart/form-data
```

### 请求

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `image` | File | 是 | 刻符图片，PNG / JPG，内部自动缩放至 96×96 |

### 响应

```json
{
  "status": "ok",
  "results": [
    { "rank": 1, "char": "日", "confidence": 0.94 },
    { "rank": 2, "char": "田", "confidence": 0.03 },
    { "rank": 3, "char": "甲", "confidence": 0.01 }
  ],
  "queryTimeMs": 12
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | string | `"ok"` — 最高置信度 ≥ 0.5，可直接采用第一结果 |
| | | `"uncertain"` — 最高置信度 ＜ 0.5，建议展示 top-3 让用户确认 |
| `results` | array | 按置信度降序排列，最多 3 个 |
| `results[].rank` | integer | 排名，从 1 开始 |
| `results[].char` | string | 识别出的现代汉字 |
| `results[].confidence` | number | 置信度，0~1。softmax 概率值，所有 37 个字符的置信度之和为 1 |
| `queryTimeMs` | integer | 推理耗时，单位毫秒（单次 CPU→GPU→CPU 前向约 5~15ms） |

### status 取值

| 值 | 触发条件 | 建议前端行为 |
|------|------|------|
| `"ok"` | top-1 confidence ≥ 0.5 | 直接展示第一结果 |
| `"uncertain"` | top-1 confidence ＜ 0.5 | 展开 top-3 列表，让用户从中选择 |

---

## 四、汉字 → 刻符生成

```
POST /api/generate
Content-Type: application/json
```

### 请求

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `character` | string | 是 | — | 要生成刻符的汉字，须在 37 字范围内 |
| `count` | integer | 否 | 4 | 生成数量，取值范围 1~8 |

### 响应

```json
{
  "character": "日",
  "images": [
    { "index": 0, "base64": "iVBORw0KGgoAAAANSUhEUgAA..." },
    { "index": 1, "base64": "iVBORw0KGgoAAAANSUhEUgAA..." },
    { "index": 2, "base64": "iVBORw0KGgoAAAANSUhEUgAA..." },
    { "index": 3, "base64": "iVBORw0KGgoAAAANSUhEUgAA..." }
  ],
  "seed": 42,
  "queryTimeMs": 8950
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `character` | string | 回显请求的汉字 |
| `images` | array | 生成的刻符图片，列表长度 = 请求的 count |
| `images[].index` | integer | 图片序号，从 0 开始 |
| `images[].base64` | string | **裸 base64 字符串，不含 `data:` 前缀**。前端使用时自行拼接：`"data:image/png;base64," + item.base64` |
| `seed` | integer | 本次请求的随机种子。`count` 张图的采样种子为 `seed`、`seed+1`、…、`seed+count-1`，指定 `seed` 即可完整复现该次请求的所有图片 |
| `queryTimeMs` | integer | 本次请求总耗时（毫秒） |

### 生成规格

| 属性 | 值 |
|------|------|
| 图像格式 | PNG |
| 分辨率 | 96 × 96 像素 |
| 色彩空间 | RGB，白底黑字风格 |

### 性能预估

| count | 预估耗时 |
|------|------|
| 1 | ~2.3 秒 |
| 4 | ~9 秒 |
| 8 | ~18~24 秒 |

单实例串行处理请求。并发请求排队执行，后续请求需等待前序完成。

### seed 语义

`seed` 是请求级种子：

- 一次请求生成 `count` 张图片：第 0 张用 `seed`，第 1 张用 `seed+1`，……，第 `count-1` 张用 `seed + count - 1`
- 前端"换一批"时传新 seed（如 +8），即可获得另一组不重复的结果
- 前端"复现"时传相同的 `character + seed + count`，即可得到完全相同的图片组

---

## 五、错误响应

错误通过 HTTP 状态码区分，所有端点返回格式统一：

```json
{
  "code": "UNSUPPORTED_CHAR",
  "message": "当前字库不支持'龙'，共支持37个字符"
}
```

### 错误码

| HTTP 状态码 | code | 说明 |
|------|------|------|
| 400 | `UNSUPPORTED_CHAR` | 输入的汉字不在 37 字范围内 |
| 400 | `INVALID_IMAGE` | 上传的图片格式不支持或无法解析 |
| 400 | `INVALID_PARAM` | 请求参数超出取值范围 |
| 500 | `MODEL_ERROR` | 模型推理异常 |

---

## 六、技术说明

### 识别端点（POST /api/recognize）

- 模型架构：ContentEncoder（冻结，FontDiffuser 训练产出）+ MLP 分类头（独立训练）
- 流程：96×96 输入 → ContentEncoder 提取 256 维视觉特征 → MLP 映射到 37 字符概率分布 → softmax → 取 top-3
- 推理速度：单次前向约 5~15ms
- 模型权重：
  - ContentEncoder：`content_encoder.pth`（FontDiffuser checkpoint 40000 步）
  - 分类头：`classifier_head.pth`（验证准确率 90.99%）

### 生成端点（POST /api/generate）

- 模型架构：FontDiffuser（UNet + StyleEncoder + ContentEncoder + BERT 文本注入）
- 采样方式：DDPM 50 步 + Classifier-Free Guidance（scale=3.0）
- 推理速度：单张约 2~3 秒（RTX 4090），`count` 张串行采样
- 模型权重：`total_model.pth`（FontDiffuser checkpoint 40000 步）
- 生成主体：FontDiffuser 扩散模型（UNet + StyleEncoder + ContentEncoder + BERT 文本注入，DDPM 50 步 + CFG），负责刻符图生成
- 正确性保障：生成结果经识别模型自检（top-1 == 目标字），认对即输出；22 个字由扩散模型直接生成
- 兜底：15 个扩散生成不可靠字（148 张评测中认对率 ≤50%，含三/丘/钩等旋转歧义、拓扑闭合字）直接返回数据集标准刻符，100% 正确

### 服务部署

- 框架：Flask + Flask-CORS
- 运行环境：AutoDL GPU 实例（RTX 4090）
- Python：`/root/miniconda3/bin/python`
- 并发模型：单线程，请求串行处理

---

## 七、前端对接说明

### 端点的对应关系

| 前端输入模式 | 调用的 API |
|------|------|
| 📝 文字输入 — 用户输入汉字 | `POST /api/generate` — 生成刻符图展示 |
| 📷 图像上传 — 用户上传/手绘刻符 | `POST /api/recognize` — 识别为汉字 |

### 字段对应

| API 返回字段 | 前端用途 |
|------|------|
| `results[].char` | 展示识别的汉字，**按字符串值匹配**本地 `symbols.js` 中的条目以获取分类、描述等元数据 |
| `results[].confidence` | 展示置信度百分比、相似度进度条 |
| `images[].base64` | 前端拼接 `"data:image/png;base64," + item.base64` 后渲染为 `<img>` |
| `status` | 决定展示逻辑：`"ok"` 直接展示，`"uncertain"` 展开列表让用户选 |
| `queryTimeMs` | 可选展示"推理耗时"，用于答辩演示 |

### 注意事项

1. `confidence` 是真实的 softmax 概率，所有可能值的和为 1
2. 生成端点返回的 `base64` 是**裸数据**，不含 `data:` 前缀；前端自行拼接
3. 字符元数据（分类、描述等）由前端 `symbols.js` 维护，API 不负责返回
4. 前端应处理 `status: "uncertain"` 的情况，展开 top-3 列表供用户确认
5. **映射按 `char` 字符串值，不要按数组下标**：`/api/chars` 返回的列表顺序（Unicode 码点）与前端 `symbols.js` 顺序不同，识别结果关联本地详情时必须按字符值匹配
6. 前端首次加载时调用 `GET /api/chars` 同步可用字库，据此过滤输入面板中不可用的汉字，避免用户输入不支持的字
7. 服务端已启用 CORS，前端无需配置代理，直接 fetch 公网地址即可

---

## 八、后续扩展（M2+）

以下能力不在 M1 合约范围内，可在后续迭代中增加：

- `generate` 端点增加风格参数（笔画粗细、对比度、纹理噪点），支持参数对比演示
- `recognize` 端点支持批量识别（一次上传多张图）
- 增加 `POST /api/both` — 输入汉字，同时返回生成的刻符图和识别置信度，用于双向验证展示
