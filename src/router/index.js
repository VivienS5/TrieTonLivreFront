import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/lecture/:id',
      name: 'lecture',
      component: () => import('../views/LectureView.vue'),
    },
    {
      path: '/recherche/:search',
      name: 'recherche',
      component: () => import('../views/RechercheView.vue'),
    },
  ],
})

export default router
