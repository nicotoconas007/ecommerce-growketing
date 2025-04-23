<script setup>
import { useCart } from '../composables/useCart';
import CartItemControls from '../components/cart/CartItemControls.vue';

const { cartItems, cartTotal, getItemSubtotal, cartCount } = useCart();
</script>

<template>
  <div class="cart">
    <h1>Carrito de Compras</h1>
    <div v-if="cartCount === 0" class="empty-cart">
      <p>No hay productos en el carrito</p>
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.thumbnail" :alt="item.title" class="item-image" />
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <p class="item-price">${{ item.price }}</p>
          <p class="item-subtotal">Subtotal: ${{ getItemSubtotal(item) }}</p>
        </div>
        <CartItemControls :item="item" />
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
}

.cart-item :deep(.custom-button) {
  width: auto;
  min-width: 40px;
  padding: 0.5rem;
}

.quantity-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.price-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: 1rem;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #42b983;
}

.cart-total {
  margin-top: 2rem;
  text-align: right;
  padding: 1rem;
  border-top: 2px solid #ddd;
}

.item-subtotal {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
