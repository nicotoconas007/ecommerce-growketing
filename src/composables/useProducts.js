import { ref } from 'vue'
import axios from 'axios'

export function useProducts() {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await axios.get('https://dummyjson.com/products')
      products.value = res.data.products
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`)
      return res.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching product:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById
  }
} 