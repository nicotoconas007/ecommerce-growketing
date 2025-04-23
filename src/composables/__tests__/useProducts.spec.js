import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useProducts } from '../useProducts'
import axios from 'axios'

vi.mock('axios')

describe('useProducts', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      thumbnail: 'test1.jpg'
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 149.99,
      thumbnail: 'test2.jpg'
    }
  ]

  const mockProduct = {
    id: 1,
    title: 'Test Product 1',
    price: 99.99,
    thumbnail: 'test1.jpg',
    description: 'Test description',
    rating: 4.5,
    stock: 10
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('inicializa con el estado correcto', () => {
    const { products, isLoading, error } = useProducts()

    expect(products.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('obtiene todos los productos correctamente', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        products: mockProducts
      }
    })

    const { products, isLoading, error, fetchProducts } = useProducts()

    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)

    await fetchProducts()

    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products')

    expect(products.value).toEqual(mockProducts)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('maneja errores al obtener productos', async () => {
    const errorMessage = 'Network Error'
    axios.get.mockRejectedValueOnce(new Error(errorMessage))

    const { products, isLoading, error, fetchProducts } = useProducts()

    await fetchProducts()

    expect(products.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(errorMessage)
  })

  it('obtiene un producto por ID correctamente', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockProduct
    })

    const { isLoading, error, fetchProductById } = useProducts()

    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)

    const result = await fetchProductById(1)

    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products/1')

    expect(result).toEqual(mockProduct)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('maneja errores al obtener un producto por ID', async () => {
    const errorMessage = 'Product not found'
    axios.get.mockRejectedValueOnce(new Error(errorMessage))

    const { isLoading, error, fetchProductById } = useProducts()

    const result = await fetchProductById(999)

    expect(result).toBe(null)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(errorMessage)
  })
}) 