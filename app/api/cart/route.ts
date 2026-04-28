import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ items: [] })
}

export async function POST(req: Request) {
  // Echo back for demo
  const payload = await req.json()
  return NextResponse.json({ ok: true, data: payload })
}
