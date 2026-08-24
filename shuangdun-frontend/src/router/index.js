import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('@/pages/ResourceLibrary.vue'),
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/pages/AIRecognition.vue'),
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/pages/UsageGuide.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/pages/FeedbackPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
