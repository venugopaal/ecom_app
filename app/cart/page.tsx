"use client"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useMemo } from 'react'
import CartItem from '../../components/CartItem'
import products from '../../data/products.json'
import { useDispatch } from 'react-redux'
import { updateQuantity, remove, clear } from '../../store/slices/cartSlice'

export default function CartPage(){
  const items = useSelector((s: RootState) => s.cart)
  const dispatch = useDispatch()

  const detailed = useMemo(() => items.map(i => ({ item: i, product: products.find((p:any)=>p.id===i.productId) })), [items])

  const total = detailed.reduce((acc, cur) => acc + (cur.product?.price || 0) * cur.item.quantity, 0)

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <div className="mt-4">
        {detailed.length === 0 && <div>Your cart is empty</div>}
        {detailed.map(({ item, product }) => product && (
          <CartItem key={item.productId} product={product} quantity={item.quantity} onChange={(q)=>dispatch(updateQuantity({ productId: item.productId, quantity: q }))} onRemove={()=>dispatch(remove(item.productId))} />
        ))}
      </div>
      <div className="mt-4">
        <div className="font-medium">Total: ${total.toFixed(2)}</div>
        <div className="mt-2 flex gap-2">
          <a href="/checkout" className="px-4 py-2 bg-green-600 text-white rounded">Checkout</a>
          <button onClick={()=>dispatch(clear())} className="px-4 py-2 border">Clear</button>
        </div>
      </div>
    </div>
  )
}
