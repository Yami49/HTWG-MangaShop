// stores/warenkorb.js
import { defineStore } from 'pinia'

export const useWarenkorbStore = defineStore('warenkorb', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('warenkorbItems')) || [],
  }),

  getters: {
    /**
     * @description Berechnet den Gesamtwert des Warenkorbs
     */
    totalAmount: (state) => {
      return state.items.reduce((total, item) => total + item.preis * item.menge, 0)
    },

    /**
     * @description Zählt alle Artikelmengen zusammen
     */
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.menge, 0)
    },

    /**
     * @description Prüft, ob ein Produkt bereits im Warenkorb ist
     */
    isInCart: (state) => (produktId) => {
      return state.items.some(item => item.id === produktId)
    },
  },

  actions: {
    /**
     * @description Produkt zum Warenkorb hinzufügen oder Menge erhöhen
     */
    addToCart(produkt, menge) {
      const existing = this.items.find(item => item.id === produkt.id)
      if (existing) {
        existing.menge += menge
      } else {
        this.items.push({
          id: produkt.id,
          name: produkt.titel || produkt.name || 'Unbenanntes Produkt',
          preis: produkt.preis,
          bild: produkt.bild || '', // optional
          menge: menge,
        })
      }
      this.saveCart()
    },

    /**
     * @description Produkt aus dem Warenkorb entfernen
     */
    removeFromCart(produktId) {
      this.items = this.items.filter(item => item.id !== produktId)
      this.saveCart()
    },

    /**
     * @description Menge eines Produkts im Warenkorb aktualisieren
     */
    updateQuantity(produktId, menge) {
      const item = this.items.find(item => item.id === produktId)
      if (item) {
        item.menge = menge
        this.saveCart()
      }
    },

    /**
     * @description Warenkorb vollständig leeren
     */
    clearCart() {
      this.items = []
      this.saveCart()
    },

    /**
     * @description Warenkorb im lokalen Speicher sichern
     */
    saveCart() {
      localStorage.setItem('warenkorbItems', JSON.stringify(this.items))
    },
  },
})
