import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'users',
    meta: { layout: 'main' },
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/user',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('../views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
