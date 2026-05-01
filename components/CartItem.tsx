"use client"
import Image from 'next/image'
import type { Product } from '../types'

export default function CartItem({ product, quantity, onChange, onRemove }: { product: Product; quantity: number; onChange: (q: number) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-700 py-4 last:border-b-0">
      {/* Product Image */}
      <div className="shrink-0 w-24 h-24">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          width={96} 
          height={96} 
          className="w-full h-full object-cover rounded-lg bg-neutral-100 dark:bg-neutral-800"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-neutral-900 dark:text-white truncate">{product.name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-neutral-900 dark:text-white">${product.price.toFixed(2)}</span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">each</span>
        </div>
      </div>

      {/* Quantity Controls & Remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={onRemove}
          className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
        >
          Remove
        </button>

        <div className="flex items-center border border-neutral-300 dark:border-neutral-600 rounded-lg">
          <button
            onClick={() => onChange(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-1 font-medium text-neutral-900 dark:text-white min-w-10 text-center">
            {quantity}
          </span>
          <button
            onClick={() => onChange(quantity + 1)}
            className="px-3 py-1 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Subtotal</div>
          <div className="text-lg font-bold text-neutral-900 dark:text-white">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
