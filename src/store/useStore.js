import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    cartItems: [],
    total: 0
  }),

  getters: {
    cartCount: (state) => state.cartItems.length,
    cartTotal: (state) => Number(state.total.toFixed(2))
  }
})
