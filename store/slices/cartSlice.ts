import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../../types'

const STORAGE_KEY = 'ecom_cart'

function load() {
  try {
    if (typeof window === 'undefined') return [] as CartItem[]
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : ([] as CartItem[])
  } catch {
    return [] as CartItem[]
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

const initialState: CartItem[] = load()

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ productId: string; quantity?: number }>) => {
      const { productId, quantity = 1 } = action.payload
      const found = state.find((i) => i.productId === productId)
      if (found) found.quantity += quantity
      else state.push({ productId, quantity })
      save(state)
    },
    remove: (state, action: PayloadAction<string>) => {
      const next = state.filter((i) => i.productId !== action.payload)
      save(next)
      return next
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const found = state.find((i) => i.productId === productId)
      if (found) found.quantity = quantity
      save(state)
    },
    clear: () => {
      save([])
      return [] as CartItem[]
    },
  },
})

export const { add, remove, updateQuantity, clear } = slice.actions
export default slice.reducer
