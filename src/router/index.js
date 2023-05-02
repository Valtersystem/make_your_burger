import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,

  },
  {
    path: '/Orders',
    name: 'orders',
 
    component: () => import(/* webpackChunkName: "about" */ '../views/Pedidos.vue')
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
