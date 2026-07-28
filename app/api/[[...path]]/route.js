import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'asanyx'

let cached = global._mongo
if (!cached) cached = global._mongo = { client: null, promise: null }

async function getDb() {
  if (cached.client) return cached.client.db(dbName)
  if (!cached.promise) {
    cached.promise = new MongoClient(uri).connect().then((c) => { cached.client = c; return c })
  }
  const c = await cached.promise
  return c.db(dbName)
}

function ok(data = {}) { return NextResponse.json({ ok: true, ...data }) }
function fail(error, status = 400) { return NextResponse.json({ ok: false, error }, { status }) }

export async function GET(request, { params }) {
  const p = (params?.path || []).join('/')
  try {
    if (!p || p === '') return ok({ message: 'ASANYX Analytics API', version: '1.0.0' })
    if (p === 'health') return ok({ status: 'healthy' })
    if (p === 'blog') {
      const db = await getDb()
      const posts = await db.collection('blog_posts').find({}).sort({ createdAt: -1 }).limit(50).toArray()
      return ok({ posts: posts.map(({ _id, ...r }) => r) })
    }
    if (p === 'contacts') {
      const db = await getDb()
      const rows = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      return ok({ items: rows.map(({ _id, ...r }) => r) })
    }
    return fail('Not found', 404)
  } catch (e) {
    return fail(e.message || 'Server error', 500)
  }
}

export async function POST(request, { params }) {
  const p = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    const db = await getDb()

    if (p === 'contact') {
      const { name, email, company, phone, service, message } = body
      if (!name || !email || !message) return fail('Name, email and message are required')
      const doc = { id: uuidv4(), name, email, company: company || '', phone: phone || '', service: service || '', message, source: 'contact_form', createdAt: new Date().toISOString() }
      await db.collection('contacts').insertOne(doc)
      return ok({ id: doc.id })
    }

    if (p === 'consultation') {
      const { name, email, company, phone, preferredTime, topic } = body
      if (!name || !email) return fail('Name and email are required')
      const doc = { id: uuidv4(), name, email, company: company || '', phone: phone || '', preferredTime: preferredTime || '', topic: topic || '', source: 'consultation', createdAt: new Date().toISOString() }
      await db.collection('contacts').insertOne(doc)
      return ok({ id: doc.id })
    }

    if (p === 'newsletter') {
      const { email } = body
      if (!email) return fail('Email is required')
      await db.collection('newsletter').updateOne({ email }, { $set: { email, updatedAt: new Date().toISOString() }, $setOnInsert: { id: uuidv4(), createdAt: new Date().toISOString() } }, { upsert: true })
      return ok()
    }

    if (p === 'careers/apply') {
      const { name, email, phone, role, message, resumeUrl } = body
      if (!name || !email) return fail('Name and email are required')
      const doc = { id: uuidv4(), name, email, phone: phone || '', role: role || 'General', message: message || '', resumeUrl: resumeUrl || '', createdAt: new Date().toISOString() }
      await db.collection('applications').insertOne(doc)
      return ok({ id: doc.id })
    }

    if (p === 'resources/download') {
      const { title, email } = body
      if (!title) return fail('Title is required')
      await db.collection('downloads').insertOne({ id: uuidv4(), title, email: email || '', createdAt: new Date().toISOString() })
      return ok()
    }

    return fail('Not found', 404)
  } catch (e) {
    return fail(e.message || 'Server error', 500)
  }
}
