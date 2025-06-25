// stores/warenkorb.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useWarenkorbStore = defineStore('warenkorb', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalAmount: (state) =>
      state.items.reduce((total, item) => total + item.preis * item.menge, 0),

    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.menge, 0),

    isInCart: (state) => (produktId) =>
      state.items.some((item) => item.produktId === produktId),

    cartIsEmpty: (state) => state.items.length === 0,
  },

  actions: {
    async loadFromServer() {
      try {
        const res = await axios.get('/warenkorb', { withCredentials: true })
        this.items = (res.data.produkte || []).map(item => ({
          id: item.id,
          produktId: item.produkt?.id,
          name: item.produkt?.titel || 'Unbekannt',
          preis: item.produkt?.preis || 0,
          image: item.produkt?.bild || '',
          menge: item.menge
        }))
      } catch (err) {
        console.error('❌ Fehler beim Laden des Warenkorbs:', err?.response?.data || err.message || err)
        this.items = []
      }
    },

    async addToCart(produktId, menge = 1) {
      try {
        await axios.post('/warenkorb', {
          produkt: produktId,
          menge
        }, { withCredentials: true })
        await this.loadFromServer()
      } catch (err) {
        console.error('❌ Fehler beim Hinzufügen zum Warenkorb:', err)
        throw err
      }
    },

    async updateQuantity(itemId, menge) {
      try {
        await axios.patch(`/warenkorb/${itemId}`, {
          menge
        }, { withCredentials: true })
        await this.loadFromServer()
      } catch (err) {
        console.error('❌ Fehler beim Aktualisieren der Menge:', err)
      }
    },

    async removeFromCart(itemId) {
      try {
        await axios.delete(`/warenkorb/${itemId}`, { withCredentials: true })
        await this.loadFromServer()
      } catch (err) {
        console.error('❌ Fehler beim Entfernen aus dem Warenkorb:', err)
      }
    },

    async clearCart() {
      try {
        await axios.delete('/warenkorb', { withCredentials: true })
        this.items = []
      } catch (err) {
        console.error('❌ Fehler beim Leeren des Warenkorbs:', err)
      }
    }
  }
})