import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import router from '../index'

describe('Router', () => {
  it('debe tener la ruta home configurada correctamente', () => {
    const routes = router.getRoutes()
    const homeRoute = routes.find(route => route.name === 'home')

    expect(homeRoute).toBeDefined()
    expect(homeRoute.path).toBe('/')
    expect(homeRoute.name).toBe('home')
  })
})

  it('debe tener la ruta product-detail configurada correctamente', () => {
    const routes = router.getRoutes()
    const productDetailRoute = routes.find(route => route.name === 'product-detail')

    expect(productDetailRoute).toBeDefined()
    expect(productDetailRoute.path).toBe('/products/:id')
    expect(productDetailRoute.name).toBe('product-detail')
  })

  it('debe tener la ruta cart configurada correctamente', () => {
    const routes = router.getRoutes()
    const cartRoute = routes.find(route => route.name === 'cart')

    expect(cartRoute).toBeDefined()
    expect(cartRoute.path).toBe('/cart')
    expect(cartRoute.name).toBe('cart')
  })

  it('debe tener todas las rutas requeridas', () => {
    const routes = router.getRoutes()
    const requiredRoutes = ['home', 'product-detail', 'cart']
    
    const routeNames = routes.map(route => route.name)
    requiredRoutes.forEach(name => {
      expect(routeNames).toContain(name)
    })
  })

  it('debe cargar las rutas de forma lazy', () => {
    const routes = router.getRoutes()
    const homeRoute = routes.find(route => route.name === 'home')
    const productDetailRoute = routes.find(route => route.name === 'product-detail') 
    const cartRoute = routes.find(route => route.name === 'cart')

    expect(homeRoute.components.default).toBeTypeOf('function')
    expect(productDetailRoute.components.default).toBeTypeOf('function')
    expect(cartRoute.components.default).toBeTypeOf('function')
  })

