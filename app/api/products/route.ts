import { NextResponse } from 'next/server'
import products from '../../../data/products.json'

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}
