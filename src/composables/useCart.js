import { useStore } from '../store/useStore'
import { storeToRefs } from 'pinia'

export function useCart() {
  const store = useStore()
  const { cartItems, cartCount, cartTotal } = storeToRefs(store)

  const addToCart = (product) => {
    const existingItemIndex = store.cartItems.findIndex(item => item.id === product.id)
    
    if (existingItemIndex !== -1) {
      store.cartItems = store.cartItems.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      store.cartItems = [...store.cartItems, { ...product, quantity: 1 }]
    }
    
    calculateTotal()
  }

  const removeFromCart = (productId) => {
    store.cartItems = store.cartItems.filter(item => item.id !== productId)
    calculateTotal()
  }

  const updateQuantity = (productId, quantity) => {
    store.cartItems = store.cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity }
        : item
    )
    calculateTotal()
  }

  const calculateTotal = () => {
    store.total = store.cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0)
  }

  const clearCart = () => {
    store.cartItems = []
    store.total = 0
  }

  const getItemSubtotal = (item) => Number((item.price * item.quantity).toFixed(2))

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemSubtotal
  }
} 