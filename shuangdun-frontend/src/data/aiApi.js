/**
 * AI 真算法服务接入层（M2 预留）
 *
 * 按 杨-接口约定.md v1.1 实现真实 HTTP 调用，函数签名与 aiResults.js 的
 * mock 完全一致，由 aiResults.js 统一出口按环境变量自动切换。
 *
 * 启用方式（联调时）：在 shuangdun-frontend/.env.local 中写入
 *   VITE_AI_API_URL=http://<杨的服务器公网地址>
 * 后重启 dev server（`.env.local` 已被仓库 .gitignore 忽略，不会入库）。
 * 地址为空（默认）时本层不可用，页面自动走模拟数据。
 *
 * CORS：契约第六节已说明服务端启用 CORS（Access-Control-Allow-Origin: *），
 * 前端无需 vite proxy，直接 fetch 公网地址即可。
 */

const AI_API_BASE = (import.meta.env.VITE_AI_API_URL || '').replace(/\/+$/, '')

/** 是否已配置真接口地址（未配置则走 mock） */
export const isRealApiEnabled = !!AI_API_BASE

/** 契约错误形状（第五节）：{ code, message } */
function toApiError(code, message) {
  return { code, message }
}

/**
 * 统一请求：超时控制 + 错误归一化。
 * 非 2xx → 解析响应体的 {code, message} 抛契约错误形状；
 * 网络异常 → NETWORK_ERROR；超时 → TIMEOUT。
 */
async function request(path, options, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${AI_API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
    })
    let body = null
    try {
      body = await res.json()
    } catch {
      // 非 JSON 响应
    }
    if (!res.ok) {
      throw toApiError(
        body?.code || 'MODEL_ERROR',
        body?.message || `服务返回异常状态（HTTP ${res.status}）`
      )
    }
    return body
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw toApiError('TIMEOUT', 'AI 服务响应超时，请稍后重试')
    }
    if (err?.code) throw err
    throw toApiError('NETWORK_ERROR', '无法连接 AI 服务，请确认服务已启动')
  } finally {
    clearTimeout(timer)
  }
}

/** GET /api/chars —— 可用字库的唯一事实来源 */
export async function apiGetChars() {
  return request('/api/chars', {}, 15000)
}

/** POST /api/recognize —— 刻符图 → 汉字（multipart/form-data） */
export async function apiRecognize(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  return request('/api/recognize', { method: 'POST', body: formData }, 15000)
}

/**
 * POST /api/generate —— 汉字 → 刻符图（application/json）
 *
 * 注意：契约请求字段仅 character / count，seed 目前是响应回显字段，
 * 「换一批」= 重新请求（服务端生成新 seed）。
 * 若杨后续把 seed 开放为可选请求参数（用于复现/指定种子），在此把 seed
 * 追加进请求体即可，页面与 aiResults.js 无需改动。
 */
export async function apiGenerate(character, count = 4) {
  const body = { character, count }
  return request(
    '/api/generate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    // 单实例串行 + count 张串行采样，count=8 时约 18~24s，超时留足
    60000
  )
}
