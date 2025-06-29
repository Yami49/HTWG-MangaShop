// /stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useWarenkorbStore } from '@/stores/warenkorb'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      if (this.user !== null) return this.user

      try {
        const response = await axios.get('/profil', { withCredentials: true })
        this.user = response.data?.data || null
        return this.user
      } catch (error) {
        console.warn('⚠️ Benutzer nicht eingeloggt oder Session abgelaufen')
        this.user = null
        return null
      }
    },

    async signIn(email, passwort) {
      try {
        const response = await axios.post('/login', { email, passwort }, { withCredentials: true })
        this.user = response.data?.data || null

        const warenkorb = useWarenkorbStore()
        await warenkorb.loadFromServer() // Warenkorb nach Login laden

        if (this.user?.istAdmin) {
          router.push('/admin/benutzer')
        } else {
          router.push('/profil')
        }
      } catch (error) {
        console.error('❌ Login fehlgeschlagen:', error.response?.data?.error || error.message)
      }
    },

    async signUp(userData) {
      try {
        const response = await axios.post(
          '/register',
          {
            email: userData.email,
            passwort: userData.passwort,
            vorname: userData.vorname,
            nachname: userData.nachname,
          },
          { withCredentials: true },
        )

        this.user = response.data?.data || null

        const warenkorb = useWarenkorbStore()
        await warenkorb.loadFromServer() // Warenkorb nach Registrierung laden

        router.push('/profil')
      } catch (error) {
        console.error(
          '❌ Registrierung fehlgeschlagen:',
          error.response?.data?.error || error.message,
        )
      }
    },

    async logout() {
      try {
        await axios.get('/logout', { withCredentials: true })
      } catch (err) {
        console.warn('⚠️ Logout fehlgeschlagen:', err)
      }

      // Benutzer und Warenkorb leeren
      const warenkorb = useWarenkorbStore()
      warenkorb.items = []

      this.user = null
      router.push('/login')
    },
  },
})
