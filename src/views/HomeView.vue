<script setup>
import Product from '../components/product/Product.vue';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
import { useProducts } from '../composables/useProducts';

const { products, isLoading, error, fetchProducts } = useProducts();

fetchProducts();
</script>

<template>
  <div class="home">
    <h1>Productos</h1>
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner />
      <p>Cargando productos...</p>
    </div>
    <div v-else-if="error" class="error-container">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else-if="products.length === 0" class="empty-products">
      <p>No se encontraron productos</p>
    </div>
    <div v-else class="products-grid">
      <Product v-for="product in products" :key="product.id" :product="product" :isDetailView="false" />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
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

.empty-products {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  max-width: 1800px;
  margin: 0 auto;
}

@media (max-width: 1600px) {
  .products-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1300px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>