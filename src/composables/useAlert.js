import { ref } from 'vue'

const alerts = ref([])

export function useAlert() {
  const showAlert = (message, type = 'success', duration = 2000) => {
    const id = Date.now()
    alerts.value.push({ id, message, type, duration })
    
    setTimeout(() => {
      alerts.value = alerts.value.filter(alert => alert.id !== id)
    }, duration + 300)
  }

  return {
    alerts,
    showAlert
  }
} 