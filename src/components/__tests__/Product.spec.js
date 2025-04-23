import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Product from '../product/Product.vue'
import { useRouter } from 'vue-router'
import { useCart } from '../../composables/useCart'
import { useAlert } from '../../composables/useAlert'

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../composables/useCart', () => ({
  useCart: vi.fn()
}))

vi.mock('../../composables/useAlert', () => ({
  useAlert: vi.fn()
}))

describe('Product.vue', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    thumbnail: 'test-image.jpg',
    rating: 4.5,
    stock: 10,
    description: 'Test description',
    brand: 'Test Brand',
    category: 'Test Category'
  }

  const mockRouter = {
    push: vi.fn()
  }

  const mockAddToCart = vi.fn()
  const mockShowAlert = vi.fn()

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter)
    useCart.mockReturnValue({ addToCart: mockAddToCart })
    useAlert.mockReturnValue({ showAlert: mockShowAlert })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza correctamente los datos del producto', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    expect(wrapper.text()).toContain(mockProduct.title)
    expect(wrapper.text()).toContain(mockProduct.price)
    expect(wrapper.text()).toContain(mockProduct.rating)
    expect(wrapper.text()).toContain(mockProduct.stock)
  })

  it('navega al detalle del producto al hacer clic en la tarjeta', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    await wrapper.find('.product-card').trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith(`/products/${mockProduct.id}`)
  })

  it('no navega al detalle si isDetailView es true', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        isDetailView: true
      }
    })

    await wrapper.find('.product-card').trigger('click')
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('agrega producto al carrito y muestra alerta al hacer clic en el botón', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
    expect(mockShowAlert).toHaveBeenCalledWith('Producto agregado al carrito', 'success')
  })

  it('muestra el spinner de carga mientras la imagen se carga', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    expect(wrapper.find('.image-placeholder').exists()).toBe(true)
    expect(wrapper.find('.product-image').classes()).not.toContain('loaded')
  })

  it('muestra la imagen cuando se carga', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    await wrapper.find('.product-image').trigger('load')
    expect(wrapper.find('.image-placeholder').exists()).toBe(false)
    expect(wrapper.find('.product-image').classes()).toContain('loaded')
  })
}) 