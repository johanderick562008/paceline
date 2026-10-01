import { create } from 'zustand'

interface UiState {
  cartOpen: boolean
  searchOpen: boolean
  /** Latest polite status message, rendered in a visually subtle toast + aria-live region. */
  toast: { id: number; message: string } | null
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  notify: (message: string) => void
  dismissToast: () => void
}

let toastId = 0

export const useUi = create<UiState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  toast: null,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  notify: (message) => set({ toast: { id: ++toastId, message } }),
  dismissToast: () => set({ toast: null }),
}))
