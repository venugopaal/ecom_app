import { NextResponse } from 'next/server'
import products from '../../../data/products.json'

export async function GET() {
  const cats = Array.from(new Set(products.map((p: any) => p.category)))
  return NextResponse.json(cats)
}
