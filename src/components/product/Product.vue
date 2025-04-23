<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Button from '../common/Button.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import { useCart } from '../../composables/useCart';
import { useAlert } from '../../composables/useAlert';
    
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isDetailView: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const imageLoaded = ref(false);
const { addToCart } = useCart();
const { showAlert } = useAlert();

const handleProductClick = () => {
  if (!props.isDetailView) {
    router.push(`/products/${props.product.id}`);
  }
};

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleAddToCart = (e) => {
  e.stopPropagation();
  addToCart(props.product);
  showAlert('Producto agregado al carrito', 'success');
};
</script>

<template>
  <div>
    <div class="product-card" @click="handleProductClick" :class="{ 'cursor-pointer': !isDetailView }">
      <div class="image-container">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="product-image"
          loading="lazy"
          @load="handleImageLoad"
          :class="{ 'loaded': imageLoaded }"
        />
        <div v-if="!imageLoaded" class="image-placeholder">
          <LoadingSpinner size="30px" />
        </div>
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ product.title }}</h2>
        <div class="product-details">
          <p class="product-price">${{ product.price }}</p>
          <div class="product-meta">
            <span class="product-rating">⭐ {{ product.rating }}</span>
            <span class="product-stock">Stock: {{ product.stock }}</span>
          </div>
          <template v-if="isDetailView">
            <p class="product-description">{{ product.description }}</p>
            <p class="product-brand">{{ product.brand }}</p>
            <p class="product-category">{{ product.category }}</p>
          </template>
        </div>
        <Button label="Agregar al carrito" :onClick="handleAddToCart" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.cursor-pointer {
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-image.loaded {
  opacity: 1;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-info {
  padding: 1rem 0;
}

.product-title {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.product-details {
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.product-rating,
.product-stock {
  font-size: 0.9rem;
  color: #666;
}

.product-brand,
.product-category {
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style>
