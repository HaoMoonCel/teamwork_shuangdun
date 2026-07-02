import { symbols } from './symbols.js'

/**
 * Mock AI recognition — 2 second delay, returns Top 5 results
 */
export function getAIMockResult(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shuffled = [...symbols].sort(() => Math.random() - 0.5).slice(0, 5)
      const baseScores = [0.95, 0.82, 0.67, 0.51, 0.38]
      const results = shuffled.map((s, i) => ({
        symbolId: s.id,
        name: s.name,
        image: s.image,
        similarity: baseScores[i] + (Math.random() * 0.05 - 0.025),
        category: s.category,
        description: s.description,
      }))
      resolve({
        query,
        results: results.sort((a, b) => b.similarity - a.similarity),
        timestamp: Date.now(),
      })
    }, 2000)
  })
}
