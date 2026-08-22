import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'asanyx_admin'
const MAX_AGE_SECONDS = 60 * 60 * 8   // 8h session

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function verifyCredentials(email, password) {
  const expEmail = process.env.ADMIN_EMAIL
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64
  const hash = b64 ? Buffer.from(b64, 'base64').toString('utf8') : (process.env.ADMIN_PASSWORD_HASH || '')
  if (!expEmail || !hash) return false
  if (!email || !password) return false
  if (email.toLowerCase() !== expEmail.toLowerCase()) return false
  try {
    return await bcrypt.compare(password, hash)
  } catch {
    return false
  }
}

export async function issueSessionCookie(email) {
  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecretKey())

  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 0 })
}

export async function getSession() {
  try {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, getSecretKey())
    if (payload?.role !== 'admin') return null
    return payload
  } catch {
    return null
  }
}
