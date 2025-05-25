<template>
    <div class="product-detail" v-if="produkt">
      <BackButton />
      <h2 class="page-title">{{ produkt.titel }}</h2>
  
      <div class="product-info">
        <div class="product-section">
          <p><strong>Beschreibung:</strong> {{ produkt.beschreibung || 'Keine Angabe' }}</p>
          <p><strong>Preis:</strong> {{ produkt.preis.toFixed(2) }} €</p>
          <p><strong>Kategorie:</strong> {{ produkt.kategorie?.name || 'Unbekannt' }}</p>
        </div>
      </div>
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
    max-width: 700px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .page-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  </style>
  