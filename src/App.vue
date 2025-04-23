<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAlert } from './composables/useAlert'
import Alert from './components/common/Alert.vue'

const { alerts } = useAlert()
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Productos</RouterLink> |
      <RouterLink to="/cart">Carrito</RouterLink>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>

    <div class="alerts-container">
      <Alert
        v-for="alert in alerts"
        :key="alert.id"
        :message="alert.message"
        :type="alert.type"
        :duration="alert.duration"
      />
    </div>
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: #f8f9fa;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.alerts-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
