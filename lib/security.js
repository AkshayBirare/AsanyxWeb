/**
 * Minimal in-memory rate limiter for public form endpoints.
 * Prevents email-abuse per SEC-002. Resets on server restart.
 * Not a replacement for a real IP-block/edge captcha, but adequate as first line of defense.
 */

const BUCKETS = new Map() // key -> [timestamp, ...]

/**
 * @param {Request} req Next.js request
 * @param {string} bucket Logical bucket name (e.g. 'form')
 * @param {number} limit Max requests
 * @param {number} windowMs Rolling window in ms
 * @returns {{ok:boolean, retryAfter:number}}
 */
export function rateLimit(req, bucket = 'form', limit = 8, windowMs = 10 * 60 * 1000) {
  const ip =
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown'
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const arr = (BUCKETS.get(key) || []).filter(t => now - t < windowMs)
  if (arr.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - arr[0])) / 1000)
    return { ok: false, retryAfter }
  }
  arr.push(now)
  BUCKETS.set(key, arr)
  // Opportunistic housekeeping: drop empty buckets
  if (BUCKETS.size > 5000) {
    for (const [k, v] of BUCKETS) {
      if (!v.length || now - v[v.length - 1] > windowMs) BUCKETS.delete(k)
    }
  }
  return { ok: true, retryAfter: 0 }
}

/**
 * Validates a URL string is safe to store and render as an <a href>.
 * Only http(s) is allowed. Blocks javascript:, data:, vbscript:, file:, etc.
 * @param {string} raw
 * @returns {string|null} normalized URL or null if invalid
 */
export function safeHttpUrl(raw) {
  if (!raw || typeof raw !== 'string') return null
  const trimmed = raw.trim()
  if (trimmed.length === 0 || trimmed.length > 2000) return null
  let u
  try { u = new URL(trimmed) } catch { return null }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
  return u.toString()
}

/** Basic honeypot check — if the hidden `_hp` field is filled, the caller is a bot. */
export function isHoneypotFilled(body) {
  return typeof body?._hp === 'string' && body._hp.trim().length > 0
}
