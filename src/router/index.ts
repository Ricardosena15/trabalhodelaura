import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Perguntas',
      name: 'Perguntas',
      component: () => import('../components/Perguntas.vue'),
    },
    {
      path: '/Classificacao',
      name: 'Classificacao',
      component: () => import('../components/Classificacao.vue'),
    },
    {
      path: '/Configuracao',
      name: 'Configuracao',
      component: () => import('../components/Configuracao.vue'),
    },
  ],
})

export default router