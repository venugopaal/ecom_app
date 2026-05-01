import { getProductById } from '../../../lib/data'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '../../../components/ProductCard'
import AddToCartButton from '../../../components/AddToCartButton'
import { getProducts } from '../../../lib/data'

type Props = { params: Promise<{ id: string }> }

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Product not found</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const allProducts = await getProducts()
  const relatedProducts = allProducts
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
          <span className="text-neutral-400">/</span>
          <Link href={`/?category=${product.category}`} className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400">{product.category}</Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-600 dark:text-neutral-400 line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              width={600} 
              height={500}
              className="w-full h-auto object-contain max-h-96"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col">
            <div>
              <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-lg">
                  <span>★</span>
                  <span className="font-semibold">{product.ratings.toFixed(1)}</span>
                  <span className="text-sm ml-1">(128 reviews)</span>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{product.description}</p>

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">${product.price.toFixed(2)}</span>
                  <span className="text-lg text-neutral-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold px-2 py-1 rounded">Save 17%</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Stock Available:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Category:</span>
                  <span className="text-neutral-900 dark:text-white font-medium">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <AddToCartButton productId={product.id} stock={product.stock} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Related Products</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">You might also like these items</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
