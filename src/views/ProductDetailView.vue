<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Product from '../components/product/Product.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const product = ref(null)
const { isLoading, error, fetchProductById } = useProducts()

onMounted(async () => {
  product.value = await fetchProductById(route.params.id)
})
</script>

<template>
  <div class="product-detail">
    <h1>Detalle del Producto</h1>
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner />
      <p>Cargando producto...</p>
    </div>
    <div v-else-if="error" class="error-container">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else-if="product">
      <Product :product="product" :isDetailView="true" />
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.error-container {
  color: #dc3545;
}
</style> 