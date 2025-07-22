import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/onboarding',
    },
    {
      path: '/onboarding',
      component: () => import('@/views/Onboarding.vue'),
    },
    {
      path: '/home',
      redirect: '/home/order',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: 'order',
          component: () => import('@/views/HomeView/Orders.vue'),
        },
      ],
    },
  ],
})

export default router
