<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger'].includes(value)
  }
});
</script>

<template>
  <button 
    class="custom-button" 
    :class="variant"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.custom-button {
  padding: 0.75rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.primary {
  background-color: #42b983;
}

.primary:hover {
  background-color: #3aa876;
}

.danger {
  background-color: #dc3545;
}

.danger:hover {
  background-color: #c82333;
}
</style>
