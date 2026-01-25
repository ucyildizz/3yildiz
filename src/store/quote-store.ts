import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuoteItem } from '@/types/database'

interface QuoteStore {
  items: QuoteItem[]
  addItem: (item: QuoteItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getItem: (productId: string) => QuoteItem | undefined
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id && i.variant === item.variant
          )

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id && i.variant === item.variant
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }

          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getItem: (productId) => {
        return get().items.find((item) => item.product_id === productId)
      },
    }),
    {
      name: 'ucyildiz-quote-cart',
    }
  )
)
