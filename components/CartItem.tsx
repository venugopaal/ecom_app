"use client"
import { useState } from 'react'
import type { Product } from '../types'

export default function CartItem({ product, quantity, onChange, onRemove }:{ product: Product; quantity:number; onChange:(q:number)=>void; onRemove:()=>void }){
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover" />
      <div className="flex-1">
        <div className="font-medium">{product.name}</div>
        <div className="text-sm text-neutral-600">${product.price.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(1, quantity-1))} className="px-2">-</button>
        <div>{quantity}</div>
        <button onClick={() => onChange(quantity+1)} className="px-2">+</button>
        <button onClick={onRemove} className="ml-4 text-sm text-red-600">Remove</button>
      </div>
    </div>
  )
}
