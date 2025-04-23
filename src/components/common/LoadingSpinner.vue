<script setup>
const props = defineProps({
  size: {
    type: String,
    default: '40px'
  },
  color: {
    type: String,
    default: '#42b983'
  }
});
</script>

<template>
  <div class="loading-spinner" :style="{ width: size, height: size, borderTopColor: color }"></div>
</template>

<style scoped>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 