import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

import HomeView from '@/views/HomeView.vue'
import CreateProduktView from '@/views/CreateProduktView.vue'
import KategorieVerwaltenView from '@/views/KategorieVerwaltenView.vue'
import ProduktDetailView from '@/views/ProduktDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/produkt-erstellen',
    name: 'ProduktErstellen',
    component: CreateProduktView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/kategorien',
    name: 'KategorienVerwalten',
    component: KategorieVerwaltenView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/produkt',
    name: 'ProduktListe',
    component: () => import('@/views/ProduktListeView.vue'),
  },
  {
    path: '/produkt/:id',
    name: 'ProduktDetail',
    component: ProduktDetailView,
    props: true,
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('@/views/ImpressumView.vue'),
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () => import('@/views/DatenschutzView.vue'),
  },
  {
    path: '/kontakt',
    name: 'Kontakt',
    component: () => import('@/views/KontaktView.vue'),
  },
  {
    path: '/nachrichten',
    name: 'NachrichtenListe',
    component: () => import('@/views/NachrichtenListeView.vue'),
  },
  {
    path: '/nachrichten/:id',
    name: 'NachrichtDetail',
    component: () => import('@/views/NachrichtDetailView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('@/views/ProfilView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/benutzer',
    name: 'BenutzerListe',
    component: () => import('@/views/BenutzerListeView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/benutzer/:id',
    name: 'BenutzerBearbeiten',
    component: () => import('@/views/BenutzerBearbeitenView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/blog',
    name: 'BlogListe',
    component: () => import('@/views/BlogListeView.vue')
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetailView.vue'),
    props: true
  },
  {
    path: '/admin/blog',
    name: 'BlogAdminListe',
    component: () => import('@/views/BlogAdminListeView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/blog/neu',
    name: 'BlogErstellen',
    component: () => import('@/views/BlogErstellenView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/blog/:id',
    name: 'BlogBearbeiten',
    component: () => import('@/views/BlogBearbeitenView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true
  },
  {
    path: '/warenkorb',
    name: 'Warenkorb',
    component: () => import('@/views/WarenkorbView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Nutzer ggf. nachladen
  if (!userStore.user && to.meta.requiresAuth) {
    await userStore.fetchUser()
  }

  const user = userStore.user

  // Authentifizierung erforderlich
  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  // Adminrechte erforderlich
  if (to.meta.requiresAdmin && !user?.istAdmin) {
    return next('/profil')
  }

  next()
})

export default router