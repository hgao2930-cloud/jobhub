import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const routes = [
  // 登录页（独立）
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },

  // 主系统（带布局）
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/login'
      },
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'jobs',
        component: () => import('@/views/Jobs.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router