import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateProduktView from '@/views/CreateProduktView.vue'
import KategorieVerwaltenView from '@/views/KategorieVerwaltenView.vue'
import ProduktDetailView from '@/views/ProduktDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/produkt-erstellen',
    name: 'ProduktErstellen',
    component: CreateProduktView
  },
  {
    path: '/kategorien',
    name: 'KategorienVerwalten',
    component: KategorieVerwaltenView
  },
  {
    path: '/produkt',
    name: 'ProduktListe',
    component: () => import('@/views/ProduktListeView.vue')
  },  
  {
    path: '/produkt/:id',
    name: 'ProduktDetail',
    component: ProduktDetailView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router