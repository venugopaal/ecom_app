import { getProductById } from '../../../lib/data'
import Image from 'next/image'

type Props = { params: { id: string } }

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id)
  if (!product) return <div className="p-4">Product not found</div>

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image src={product.images[0]} alt={product.name} width={600} height={400} className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-lg">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-neutral-600">{product.description}</p>
          <form action="/api/cart" method="post" className="mt-6">
            <input type="hidden" name="productId" value={product.id} />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
          </form>
        </div>
      </div>
    </div>
  )
}
