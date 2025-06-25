<template>
  <div class="product-detail" v-if="produkt">
    <h2 class="page-title">{{ produkt.titel }}</h2>

    <div class="product-info">
      <div class="product-section">
        <p><strong>Beschreibung:</strong> {{ produkt.beschreibung || 'Keine Angabe' }}</p>
        <p><strong>Preis:</strong> {{ produkt.preis?.toFixed(2) }} €</p>
        <p><strong>Kategorie:</strong> {{ produkt.kategorie?.name || 'Unbekannt' }}</p>
        <p><strong>Lagerbestand:</strong> {{ produkt.quantity ?? '–' }}</p>
      </div>
      <div class="product-image" v-if="produkt.bild">
        <img :src="produkt.bild" :alt="produkt.titel" />
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>⏳ Produkt wird geladen...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const produkt = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await axios.get(`/produkt/${route.params.id}`)
    produkt.value = res.data
  } catch (err) {
    console.error('Fehler beim Laden des Produkts:', err)
  }
})
</script>

<style scoped>
.product-detail {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #222;
  font-family: Arial, sans-serif;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #111;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-section p {
  margin: 8px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.product-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #444;
  font-style: italic;
}
</style>s