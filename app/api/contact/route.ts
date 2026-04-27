import { NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

const messages: Array<ContactBody & { createdAt: string }> = []

export async function POST(req: Request) {
  let body: ContactBody
  try {
    body = (await req.json()) as ContactBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (body.message.length < 10) {
    return NextResponse.json({ error: 'Message too short' }, { status: 400 })
  }

  messages.push({ ...body, createdAt: new Date().toISOString() })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ count: messages.length })
}
