import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border rounded p-3 bg-white dark:bg-neutral-900">
      <Link href={`/product/${product.id}`}>
        <Image src={product.images[0]} alt={product.name} width={300} height={200} className="object-cover" />
      </Link>
      <h3 className="mt-2 font-medium">{product.name}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">${product.price.toFixed(2)}</p>
    </article>
  )
}
