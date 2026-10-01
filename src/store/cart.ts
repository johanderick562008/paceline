import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProduct } from '../data/products'
import type { CartLine } from '../types'

export const MAX_QUANTITY = 10

interface CartState {
  lines: CartLine[]
  add: (productId: string, size?: string, quantity?: number) => void
  setQuantity: (productId: string, size: string | undefined, quantity: number) => void
  remove: (productId: string, size?: string) => void
  clear: () => void
}

const same = (line: CartLine, productId: string, size?: string) => line.productId === productId && line.size === size

/** Demo bag — lives only in this browser's localStorage. No order is ever sent anywhere. */
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (productId, size, quantity = 1) =>
        set((s) => {
          const product = getProduct(productId)
          if (!product?.available) return s
          const existing = s.lines.find((l) => same(l, productId, size))
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                same(l, productId, size) ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l,
              ),
            }
          }
          return { lines: [...s.lines, { productId, size, quantity: Math.min(MAX_QUANTITY, quantity) }] }
        }),
      setQuantity: (productId, size, quantity) =>
        set((s) => ({
          lines:
            quantity < 1
              ? s.lines.filter((l) => !same(l, productId, size))
              : s.lines.map((l) => (same(l, productId, size) ? { ...l, quantity: Math.min(MAX_QUANTITY, quantity) } : l)),
        })),
      remove: (productId, size) => set((s) => ({ lines: s.lines.filter((l) => !same(l, productId, size)) })),
      clear: () => set({ lines: [] }),
    }),
    { name: 'paceline-cart' },
  ),
)

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0)
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (getProduct(l.productId)?.price ?? 0) * l.quantity, 0)
}
