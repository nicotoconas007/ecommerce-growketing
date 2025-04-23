<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
})
</script>

<template>
  <Transition name="alert">
    <div v-if="isVisible" :class="['alert', `alert-${type}`]">
      <span class="alert-message">{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.alert {
  padding: 12px 20px;
  border-radius: 4px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  min-width: 300px;
}

.alert-success {
  background-color: #4caf50;
}

.alert-error {
  background-color: #f44336;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style> 