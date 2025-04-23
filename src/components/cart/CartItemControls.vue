<script setup>
import Button from '../common/Button.vue';
import { useCart } from '../../composables/useCart';
import { useAlert } from '../../composables/useAlert';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const { updateQuantity, removeFromCart } = useCart();

const { showAlert } = useAlert();

const incrementQuantity = () => {
  updateQuantity(props.item.id, props.item.quantity + 1);
};

const decrementQuantity = () => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.id, props.item.quantity - 1);
  }
};

const handleRemoveFromCart = () => {
  removeFromCart(props.item.id);
  showAlert('Producto eliminado del carrito', 'error');
};

</script>

<template>
  <div class="cart-controls">
    <div class="quantity-controls">
      <button class="quantity-btn" @click="decrementQuantity">-</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button class="quantity-btn" @click="incrementQuantity">+</button>
    </div>
    <Button 
      label="Eliminar" 
      :onClick="handleRemoveFromCart"
      variant="danger"
    />
  </div>
</template>

<style scoped>
.cart-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #42b983;
  background: white;
  color: #42b983;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.quantity-btn:hover {
  background: #42b983;
  color: white;
}

.quantity {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
}
</style> 