// Simple in-memory rate limiting
// For production, consider using Redis (e.g. Upstash) for persistence across deploys

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 60 seconds
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  })
}, 60000)

export function checkRateLimit(identifier: string): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const now = Date.now()
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5')
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 minutes

  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(identifier, { count: 1, resetTime })
    return { allowed: true, remaining: maxRequests - 1, resetTime }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }

  entry.count++
  rateLimitStore.set(identifier, entry)

  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime }
}
