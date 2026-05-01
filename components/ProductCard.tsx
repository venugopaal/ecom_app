"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/slices/cartSlice'
import type { Product } from '../types'
import { RootState } from '../store'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((s: RootState) => s.cart)
  const [showNotif, setShowNotif] = useState(false)
  
  // Calculate total items in cart
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(add({ productId: product.id, quantity: 1 }))
    setShowNotif(true)
    setTimeout(() => setShowNotif(false), 3000)
  }

  return (
    <article className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-lg dark:hover:shadow-neutral-700/50 transition-shadow duration-200 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          width={300} 
          height={250} 
          className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
          priority={false}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-base leading-tight text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">${product.price.toFixed(2)}</span>
            </div>
            <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded flex items-center gap-1">
              <span>★</span>
              <span>{product.ratings.toFixed(1)}</span>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 px-3 rounded font-medium transition-all duration-200 text-sm ${
              product.stock === 0
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white dark:bg-blue-700 dark:hover:bg-blue-800'
            }`}
          >
            Add to Cart
          </button>
          
          <div className={`mt-2 text-xs text-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded font-medium animate-pulse transition-opacity ${
            showNotif ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'
          }`}>
            ✓ Added to cart
            <div className="text-green-600 dark:text-green-300 font-bold mt-1">
              {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
