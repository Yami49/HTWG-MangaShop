// stores/warenkorb.js
import { defineStore } from 'pinia'

export const useWarenkorbStore = defineStore('warenkorb', {
  state: () => ({
    items: (() => {
      try {
        return JSON.parse(localStorage.getItem('warenkorbItems')) || []
      } catch (e) {
        console.warn('Fehler beim Parsen von warenkorbItems:', e)
        return []
      }
    })(),
  }),

  getters: {
    /**
     * @description Berechnet den Gesamtwert des Warenkorbs
     */
    totalAmount: (state) =>
      state.items.reduce((total, item) => total + item.preis * item.menge, 0),

    /**
     * @description Zählt alle Artikelmengen zusammen
     */
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.menge, 0),

    /**
     * @description Prüft, ob ein Produkt bereits im Warenkorb ist
     */
    isInCart: (state) => (produktId) =>
      state.items.some((item) => item.id === produktId),

    /**
     * @description True, wenn Warenkorb leer ist
     */
    cartIsEmpty: (state) => state.items.length === 0,
  },

  actions: {
    /**
     * @description Produkt zum Warenkorb hinzufügen oder Menge erhöhen
     */
    addToCart(produkt, menge) {
      const existing = this.items.find((item) => item.id === produkt.id)
      if (existing) {
        existing.menge += menge
      } else {
        this.items.push({
          id: produkt.id,
          name: produkt.titel || produkt.name || 'Unbenanntes Produkt',
          preis: produkt.preis,
          image: produkt.image || produkt.bild || '', // einheitlich als "image"
          menge: menge,
        })
      }
      this.saveCart()
    },

    /**
     * @description Produkt aus dem Warenkorb entfernen
     */
    removeFromCart(produktId) {
      this.items = this.items.filter((item) => item.id !== produktId)
      this.saveCart()
    },

    /**
     * @description Menge eines Produkts im Warenkorb aktualisieren
     */
    updateQuantity(produktId, menge) {
      const item = this.items.find((item) => item.id === produktId)
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

    /**
     * @description Bestellung absenden und Warenkorb leeren
     */
    async abschicken(bestellDaten) {
      try {
        const response = await fetch('/api/bestellung', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produkte: this.items,
            adresse: bestellDaten.adresse,
            zahlung: bestellDaten.zahlung,
          }),
        })

        if (!response.ok)
          throw new Error('Fehler beim Abschicken der Bestellung')

        const result = await response.json()
        this.clearCart()
        return result
      } catch (error) {
        console.error('Fehler in warenkorb.abschicken():', error)
        throw error
      }
    },
  },
})