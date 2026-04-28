import { NextResponse } from 'next/server'
import products from '../../../../data/products.json'

export async function GET(req: Request, context: any) {
  const params = await context.params
  const id = params?.id
  const found = products.find((p: any) => p.id === id)
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(found)
}
