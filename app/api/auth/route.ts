import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body
    // simple mock: accept anything
    if (!username) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    return NextResponse.json({ token: 'mock-jwt-token', user: { id: 'u1', name: username } })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
