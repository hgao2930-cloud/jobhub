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
        redirect: '/dashboard'
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

router.beforeEach((to, from, next)=>{
  const token = localStorage.getItem('token')
  if(to.path !== '/login' && !token){
    next('/login')
  }
  else{
    next()
  }
})
export default router