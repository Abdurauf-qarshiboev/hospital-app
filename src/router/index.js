import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "defaultLayout",
      component: () => import("@/layouts/defaultLayout.vue"),
      children: [
        {
          path: '',
          name: 'homepage',
          component: () => import('@/views/defaults/dashboard-page.vue')
        },
        {
          path: 'departments',
          name: 'departments',
          component: () => import('@/views/defaults/departments-page.vue')
        },
        {
          path: 'specs',
          name: 'specs',
          component: () => import('@/views/defaults/specs-page.vue')
        },
        {
          path: 'positions',
          name: 'positions',
          component: () => import('@/views/defaults/positions-page.vue')
        },
      ],
    },
    {
      path: "/auth",
      name: "authLayout",
      component: () => import("@/layouts/authLayout.vue"),
      children: [
        {
          path: "signup",
          name: "signUp",
          component: () => import("@/views/auth/signUp-page.vue"),
        },
        {
          path: "",
          name: "logIn",
          component: () => import("@/views/auth/logIn-page.vue"),
        },
      ],
    },
  ],
});

export default router
