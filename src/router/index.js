import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recherche',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/lecture/:id',
      name: 'lecture',
      component: () => import('../views/LectureView.vue'),
    },
  ],
})

export default router
