// /stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      if (!this.user) {
        try {
          const response = await axios.get('/profil')
          this.user = response.data?.data || null
          return this.user
        } catch (error) {
          console.error('❌ Fehler beim Laden des Benutzerprofils:', error)
          this.user = null
          return null
        }
      }
    },

    async signIn(email, passwort) {
      try {
        const response = await axios.post('/login', { email, passwort })
        this.user = response.data?.data || null

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
        const response = await axios.post('/register', {
          email: userData.email,
          passwort: userData.passwort,
          vorname: userData.vorname,
          nachname: userData.nachname,
        })
        this.user = response.data?.data || null
        router.push('/profil')
      } catch (error) {
        console.error('❌ Registrierung fehlgeschlagen:', error.response?.data?.error || error.message)
      }
    },

    async logout() {
      try {
        await axios.get('/logout')
      } catch (err) {
        console.warn('⚠️ Logout fehlgeschlagen:', err)
      }
      this.user = null
      router.push('/login')
    },
  },
})