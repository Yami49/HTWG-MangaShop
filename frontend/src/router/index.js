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
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('@/views/ImpressumView.vue')
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () => import('@/views/DatenschutzView.vue')
  },
  {
    path: '/kontakt',
    name: 'Kontakt',
    component: () => import('@/views/KontaktView.vue')
  },
  {
    path: '/nachrichten',
    name: 'NachrichtenListe',
    component: () => import('@/views/NachrichtenListeView.vue')
  },
  {
    path: '/nachrichten/:id',
    name: 'NachrichtDetail',
    component: () => import('@/views/NachrichtDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router