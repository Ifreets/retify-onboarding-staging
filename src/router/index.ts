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
          children: [
            {
              path: '',
              component: () => import('@/views/HomeView/order/Order.vue'),
            },
            {
              path: ':id',
              component: () => import('@/views/HomeView/order/OrderDetail.vue'),
            },
          ],
        },
        {
          path: 'customer',
          children: [
            {
              path: '',
              component: () => import('@/views/HomeView/customer/Customer.vue'),
            },
            {
              path: ':id',
              component: () => import('@/views/HomeView/customer/CustomerDetail.vue'),
            },
          ]
        },
      ],
    },
  ],
})

export default router
