"use client"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useMemo } from 'react'
import CartItem from '../../components/CartItem'
import products from '../../data/products.json'
import { useDispatch } from 'react-redux'
import { updateQuantity, remove, clear } from '../../store/slices/cartSlice'
import Link from 'next/link'

export default function CartPage() {
  const items = useSelector((s: RootState) => s.cart)
  const dispatch = useDispatch()

  const detailed = useMemo(() => items.map(i => ({ item: i, product: products.find((p: any) => p.id === i.productId) })), [items])

  const subtotal = detailed.reduce((acc, cur) => acc + (cur.product?.price || 0) * cur.item.quantity, 0)
  const shipping = detailed.length > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Shopping Cart</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            {detailed.length === 0 ? 'Your cart is empty' : `${detailed.length} item${detailed.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {detailed.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-12 text-center">
            <svg className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">Start shopping to add items to your cart.</p>
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {detailed.map(({ item, product }) => product && (
                    <CartItem 
                      key={item.productId} 
                      product={product} 
                      quantity={item.quantity} 
                      onChange={(q) => {
                        if (q > 0) {
                          dispatch(updateQuantity({ productId: item.productId, quantity: q }))
                        }
                      }} 
                      onRemove={() => dispatch(remove(item.productId))} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <Link href="/" className="flex-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors">
                  Continue Shopping
                </Link>
                <button 
                  onClick={() => dispatch(clear())} 
                  className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 sticky top-20">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 border-b border-neutral-200 dark:border-neutral-700 pb-4">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-lg font-bold text-neutral-900 dark:text-white mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200"
                >
                  Proceed to Checkout
                </Link>

                <button className="w-full mt-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
