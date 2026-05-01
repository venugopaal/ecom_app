"use client"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove, updateQuantity } from '../store/slices/cartSlice'
import type { RootState } from '../store'

export default function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((s: RootState) => s.cart)
  const [showNotif, setShowNotif] = useState(false)
  
  const productCartCount = cartItems.find(item => item.productId === productId)?.quantity || 0
  
  const handleAddToCart = () => {
    dispatch(add({ productId, quantity: 1 }))
    setShowNotif(true)
    setTimeout(() => setShowNotif(false), 3000)
  }
  
  const handleRemoveFromCart = () => {
    if (productCartCount > 1) {
      // Decrease quantity by 1
      dispatch(updateQuantity({ productId, quantity: productCartCount - 1 }))
    } else {
      // Remove completely if quantity is 1
      dispatch(remove(productId))
    }
  }

  return (
    <div className="space-y-3 mt-auto">
      {productCartCount > 0 ? (
        <div className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 text-base overflow-hidden">
          <button
            onClick={handleRemoveFromCart}
            className="flex-1 py-3 px-4 hover:bg-blue-700 transition-colors active:scale-95"
          >
            −
          </button>
          <span className="flex-1 text-center font-bold py-3">
            {productCartCount}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 py-3 px-4 transition-colors active:scale-95 ${
              stock === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            +
          </button>
        </div>
      ) : (
        <button 
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200 ${
            stock === 0
              ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white'
          }`}
        >
          {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      )}
      
      <button 
        type="button"
        className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors"
      >
        Add to Wishlist
      </button>
      
      {showNotif && (
        <div className="text-sm text-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-lg font-medium animate-pulse">
          ✓ Added to cart!
        </div>
      )}
    </div>
  )
}
