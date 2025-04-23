import { describe, it, expect } from 'vitest'
import { useStore } from '../../store/useStore'
import { storeToRefs } from 'pinia'
import { useCart } from '../useCart'

vi.mock('../../store/useStore', () => ({
  useStore: vi.fn()
}))

vi.mock('pinia', () => ({
  storeToRefs: vi.fn()
}))

describe('useCart', () => {
  const mockStore = {
    cartItems: [],
    total: 0,
    cartCount: 0
  }

  beforeEach(() => {
    useStore.mockReturnValue(mockStore)
    storeToRefs.mockReturnValue({
      cartItems: { value: mockStore.cartItems },
      cartCount: { value: mockStore.cartCount },
      cartTotal: { value: mockStore.total }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockStore.cartItems = []
    mockStore.total = 0
    mockStore.cartCount = 0
  })

  it('agrega un nuevo producto al carrito', () => {
    const { addToCart } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)

    expect(mockStore.cartItems).toHaveLength(1)
    expect(mockStore.cartItems[0]).toEqual({
      ...product,
      quantity: 1
    })
  })

  it('incrementa la cantidad si el producto ya está en el carrito', () => {
    const { addToCart } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)
    addToCart(product)

    expect(mockStore.cartItems).toHaveLength(1)
    expect(mockStore.cartItems[0].quantity).toBe(2)
  })

  it('elimina un producto del carrito', () => {
    const { addToCart, removeFromCart } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)
    removeFromCart(product.id)

    expect(mockStore.cartItems).toHaveLength(0)
  })

  it('actualiza la cantidad de un producto', () => {
    const { addToCart, updateQuantity } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)
    updateQuantity(product.id, 5)

    expect(mockStore.cartItems[0].quantity).toBe(5)
  })

  it('calcula correctamente el subtotal de un item', () => {
    const { addToCart, getItemSubtotal } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)
    const subtotal = getItemSubtotal(mockStore.cartItems[0])

    expect(subtotal).toBe(99.99)
  })

  it('calcula correctamente el total del carrito', () => {
    const { addToCart } = useCart()
    const products = [
      { id: 1, title: 'Product 1', price: 99.99 },
      { id: 2, title: 'Product 2', price: 49.99 }
    ]

    products.forEach(product => addToCart(product))

    expect(mockStore.total).toBe(149.98)
  })

  it('limpia el carrito correctamente', () => {
    const { addToCart, clearCart } = useCart()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99
    }

    addToCart(product)
    clearCart()

    expect(mockStore.cartItems).toHaveLength(0)
    expect(mockStore.total).toBe(0)
  })
}) 