import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CartItemControls from '../CartItemControls.vue'
import { useCart } from '../../composables/useCart'
import { useAlert } from '../../composables/useAlert'

vi.mock('../../composables/useCart', () => ({
  useCart: vi.fn()
}))

vi.mock('../../composables/useAlert', () => ({
  useAlert: vi.fn()
}))

describe('CartItemControls.vue', () => {
  const mockItem = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    quantity: 2
  }

  const mockUpdateQuantity = vi.fn()
  const mockRemoveFromCart = vi.fn()
  const mockShowAlert = vi.fn()

  beforeEach(() => {
    useCart.mockReturnValue({
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart
    })
    useAlert.mockReturnValue({ showAlert: mockShowAlert })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('incrementa la cantidad al hacer clic en el botón +', async () => {
    const wrapper = mount(CartItemControls, {
      props: {
        item: mockItem
      }
    })

    const incrementButton = wrapper.find('.quantity-btn:last-child')
    await incrementButton.trigger('click')

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, mockItem.quantity + 1)
  })

  it('decrementa la cantidad al hacer clic en el botón -', async () => {
    const wrapper = mount(CartItemControls, {
      props: {
        item: mockItem
      }
    })

    const decrementButton = wrapper.find('.quantity-btn:first-child')
    await decrementButton.trigger('click')

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, mockItem.quantity - 1)
  })

  it('no decrementa la cantidad si es 1', async () => {
    const itemWithQuantityOne = { ...mockItem, quantity: 1 }
    const wrapper = mount(CartItemControls, {
      props: {
        item: itemWithQuantityOne
      }
    })

    const decrementButton = wrapper.find('.quantity-btn:first-child')
    await decrementButton.trigger('click')

    expect(mockUpdateQuantity).not.toHaveBeenCalled()
  })

  it('elimina el producto del carrito al hacer clic en el botón Eliminar', async () => {
    const wrapper = mount(CartItemControls, {
      props: {
        item: mockItem
      }
    })

    const removeButton = wrapper.findComponent({ name: 'Button' })
    await removeButton.trigger('click')

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.id)
    expect(mockShowAlert).toHaveBeenCalledWith('Producto eliminado del carrito', 'error')
  })

  it('muestra la cantidad correcta del producto', () => {
    const wrapper = mount(CartItemControls, {
      props: {
        item: mockItem
      }
    })

    const quantityDisplay = wrapper.find('.quantity')
    expect(quantityDisplay.text()).toBe(mockItem.quantity.toString())
  })
}) 