import { symbols } from './symbols.js'
import { datasetFiles } from './datasetFiles.js'
import { apiGetChars, apiRecognize, apiGenerate, isRealApiEnabled } from './aiApi.js'

/**
 * AI 识别页 · 模拟数据层（M1 模拟版）
 *
 * 本文件镜像杨的接口约定（杨-接口约定.md v1.1）的响应形状：
 *   mockGetChars    ↔ GET  /api/chars      —— 可用字库的唯一事实来源
 *   mockRecognize   ↔ POST /api/recognize  —— 刻符图 → 汉字
 *   mockGenerate    ↔ POST /api/generate   —— 汉字 → 刻符图
 *
 * M2 接入真算法时：只把 mock* 实现换成真实 fetch（形状不变），
 * normalize* 与页面代码保持不变，即「只换数据源，不动页面结构」。
 */

// ===== 模拟配置 =====

/** 识别结果触发 uncertain（top-1 < 0.5）的概率；文件名含 "uncertain" 可强制触发 */
const UNCERTAIN_CHANCE = 0.2
/** 模拟生成耗时（单张，毫秒），真服务约 2.3s/张 */
const GENERATE_MS_PER_IMAGE = 2100
/** 模拟网络延迟（毫秒） */
const NETWORK_DELAY_MS = 800

// ===== 字库（唯一事实来源）=====

// 与 /api/chars 一致：37 个字符，按 Unicode 码点升序（契约第二节）
export const SUPPORTED_CHARS = [...new Set(symbols.map((s) => s.name))].sort()

/**
 * 字库同步（镜像 GET /api/chars）
 */
export async function mockGetChars() {
  return { chars: SUPPORTED_CHARS }
}

// ===== 工具函数 =====

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 读取刻符图片（dataset 路径）并转为裸 base64。
 * 与契约一致：返回不含 `data:` 前缀（契约第七节注意事项 2），
 * 由页面归一化时自行拼接，渲染路径与真接口完全一致。
 */
async function imagePathToBase64(path) {
  const res = await fetch(path)
  const blob = await res.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.readAsDataURL(blob)
  })
}

/**
 * 按 seed 语义取字符数据集中的第 n 张图：
 * 第 i 张用 seed + i（契约第四节 seed 语义），取模落到具体文件。
 */
function pickDatasetImage(char, seed, index) {
  const images = datasetFiles[char] || []
  if (images.length === 0) return null
  return images[(seed + index) % images.length]
}

// ===== 汉字 → 刻符图生成（镜像 POST /api/generate）=====

/**
 * @param {string} character 单个汉字，须在 37 字范围内
 * @param {number} count 生成数量 1~8，默认 4
 * @param {number|null} seed 请求级随机种子；缺省自动生成。count 张图采样种子为 seed..seed+count-1
 * @returns {Promise<{character: string, images: {index, base64}[], seed: number, queryTimeMs: number}>}
 * @throws {{code: string, message: string}} 契约错误形状（UNSUPPORTED_CHAR）
 */
export async function mockGenerate(character, count = 4, seed = null) {
  if (!SUPPORTED_CHARS.includes(character)) {
    throw {
      code: 'UNSUPPORTED_CHAR',
      message: `当前字库不支持'${character}'，共支持${SUPPORTED_CHARS.length}个字符`,
    }
  }
  const safeCount = Math.min(8, Math.max(1, count))
  const usedSeed = seed ?? Math.floor(Math.random() * 1000)

  // 模拟真算法 2 秒级生成耗时
  await delay(NETWORK_DELAY_MS + 1000)

  const images = []
  for (let i = 0; i < safeCount; i++) {
    const base64 = await imagePathToBase64(pickDatasetImage(character, usedSeed, i))
    images.push({ index: i, base64 })
  }

  return {
    character,
    images,
    seed: usedSeed,
    queryTimeMs: 800 + safeCount * GENERATE_MS_PER_IMAGE,
  }
}

// ===== 刻符图 → 汉字识别（镜像 POST /api/recognize）=====

/**
 * 演示技巧（仅模拟层）：
 * - 上传文件名形如「日_0001_hand.png」（数据集文件）时，按文件名前缀返回该字为 top-1
 *   高置信，演示「识别对了」的效果；
 * - 文件名含 "uncertain" 强制返回 uncertain 状态，便于可控演示 top-3 确认流程；
 * - 其余情况随机 top-3，并有一定概率触发 uncertain。
 *
 * @param {File} imageFile 上传的图片文件
 * @returns {Promise<{status: 'ok'|'uncertain', results: {rank, char, confidence}[], queryTimeMs: number}>}
 */
export async function mockRecognize(imageFile) {
  await delay(NETWORK_DELAY_MS)

  const name = (imageFile?.name || '').toLowerCase()
  const nameMatch = name.match(/^(.+?)_\d/)
  const guessedChar = nameMatch
    ? SUPPORTED_CHARS.find((c) => c === nameMatch[1])
    : null
  const forceUncertain = name.includes('uncertain')

  // 候选：文件名命中字库 → 该字为 top-1；否则随机打乱后取前 3
  let candidates = [...SUPPORTED_CHARS].sort(() => Math.random() - 0.5)
  if (guessedChar) {
    candidates = [guessedChar, ...candidates.filter((c) => c !== guessedChar)]
  }

  // 置信度：ok 时 top-1 ≥ 0.5；uncertain 时 top-1 < 0.5；
  // 三项之和恒为 1（softmax 语义，契约第七节注意事项 1）
  let top1
  if (forceUncertain || (!guessedChar && Math.random() < UNCERTAIN_CHANCE)) {
    top1 = 0.3 + Math.random() * 0.19 // 0.30 ~ 0.49
  } else {
    top1 = 0.9 + Math.random() * 0.07 // 0.90 ~ 0.97
  }
  const r1 = Math.round(top1 * 100) / 100
  const r2 = Math.round(((1 - top1) * (0.55 + Math.random() * 0.25)) * 100) / 100
  const r3 = Math.round((1 - r1 - r2) * 100) / 100 // 末项吸收四舍五入差值

  return {
    status: r1 >= 0.5 ? 'ok' : 'uncertain',
    results: [
      { rank: 1, char: candidates[0], confidence: r1 },
      { rank: 2, char: candidates[1], confidence: r2 },
      { rank: 3, char: candidates[2], confidence: r3 },
    ],
    queryTimeMs: 5 + Math.round(Math.random() * 10), // 5~15ms，镜像契约单次前向耗时
  }
}

// ===== 归一化层（页面消费层，M2 接真接口后保持不变）=====

const symbolByName = new Map(symbols.map((s) => [s.name, s]))

/**
 * 识别响应 → 页面数据。
 * 按 char 字符串值关联 symbols 元数据（契约第七节注意事项 5：
 * /api/chars 顺序与 symbols.js 顺序不同，必须按值匹配，不按下标）。
 */
export function normalizeRecognize(resp) {
  return {
    status: resp.status,
    queryTimeMs: resp.queryTimeMs,
    results: resp.results.map((r) => {
      const sym = symbolByName.get(r.char) || {}
      return {
        rank: r.rank,
        char: r.char,
        confidence: r.confidence,
        name: sym.name || r.char,
        image: sym.image || '',
        category: sym.category || '',
        description: sym.description || '',
      }
    }),
  }
}

/**
 * 生成响应 → 页面数据。
 * base64 拼接 `data:image/png;base64,` 前缀供 <img> 渲染（契约第七节注意事项 2）。
 */
export function normalizeGenerate(resp) {
  return {
    character: resp.character,
    seed: resp.seed,
    queryTimeMs: resp.queryTimeMs,
    images: resp.images.map((img) => ({
      index: img.index,
      src: `data:image/png;base64,${img.base64}`,
    })),
  }
}

// ===== 统一出口（页面只依赖 getChars/recognize/generate + normalize*）=====
// 已配置真接口地址（VITE_AI_API_URL，见 .env.example）时自动走真算法，
// 未配置则走上方模拟数据 —— M2 接入 = 配置地址，页面代码零改动。

/** 当前是否走真算法 */
export const useRealApi = isRealApiEnabled

/** 字库同步（GET /api/chars ｜ mockGetChars） */
export async function getChars() {
  return isRealApiEnabled ? apiGetChars() : mockGetChars()
}

/** 刻符图 → 汉字识别（POST /api/recognize ｜ mockRecognize） */
export async function recognize(imageFile) {
  return isRealApiEnabled ? apiRecognize(imageFile) : mockRecognize(imageFile)
}

/**
 * 汉字 → 刻符图生成（POST /api/generate ｜ mockGenerate）。
 * 真接口暂不支持指定 seed（契约请求字段仅 character/count），seed 仅 mock 使用。
 */
export async function generate(character, count = 4, seed = null) {
  return isRealApiEnabled
    ? apiGenerate(character, count)
    : mockGenerate(character, count, seed)
}
