# 算法服务接入说明

> 给前端（曾）· 双墩刻符 · 2026-08-16

---

## 1. 公网地址

```
https://u919570-a13f-50bc7928.bjb1.seetacloud.com:8443
```

---

## 2. 接入步骤（3 分钟）

1. 复制 `.env.example` → `.env.local`
2. 填入地址：

```
VITE_AI_API_URL=https://u919570-a13f-50bc7928.bjb1.seetacloud.com:8443
```

3. 重启 dev server（`npm run dev`）

完成后页面自动切真算法，无需改任何页面代码。

---

## 3. 接口一览

| 端点 | 方法 | 方向 | 说明 |
|------|------|------|------|
| `/api/chars` | GET | 元数据 | 返回 37 字库（可用字符的唯一事实来源） |
| `/api/recognize` | POST | 刻符 → 汉字 | `multipart/form-data`，字段 `image` |
| `/api/generate` | POST | 汉字 → 刻符 | `application/json`，字段 `character`、`count` |

- `generate` 请求：`{ "character": "日", "count": 4 }`，`count` 取值 1~8，默认 4
- 详细字段、响应格式、错误码见仓库 `api.md`（v1.2）

---

## 4. 验证服务是否在线

浏览器打开：

```
https://u919570-a13f-50bc7928.bjb1.seetacloud.com:8443/api/chars
```

看到 37 个字的 JSON 即在线。

> 注意：直接访问根地址（不带 `/api/chars`）会显示 Not Found，这是正常的，根路径无内容，前端不会访问根路径。

---

## 5. 注意事项

- **CORS 已启用**，前端无需配置代理，直接 fetch 即可
- **单线程串行处理**：`generate` 4 张约 9 秒，8 张约 18~24 秒，请求会排队，前端超时建议设 30 秒以上
- `generate` 返回的 `base64` 为**裸数据**（不含 `data:` 前缀），前端自行拼接 `"data:image/png;base64," + item.base64`
- 若接口长时间 502 / 连接失败，大概率是算法实例已关机，联系杨重启
