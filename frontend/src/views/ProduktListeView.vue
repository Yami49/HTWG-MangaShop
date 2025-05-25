<template>
    <div class="produkt-list-view">
      <h2 class="title">Unsere Manga-Produkte</h2>
  
      <div v-if="produkte.length" class="produkt-grid">
        <div v-for="p in produkte" :key="p.id" class="produkt-card">
          <img :src="p.image" class="produkt-image" alt="Produktbild" />
          <div class="produkt-details">
            <h3>{{ p.titel }}</h3>
            <p class="preis">{{ Number(p.preis).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</p>
            <p class="beschreibung">{{ p.beschreibung }}</p>
            <p class="kategorie">{{ p.kategorie?.name || '-' }}</p>
          </div>
        </div>
      </div>
  
      <div v-else class="no-produkte">Noch keine Produkte verfügbar.</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  
  const produkte = ref([])
  
  onMounted(async () => {
    try {
      const res = await axios.get('/produkt')
      produkte.value = res.data.produkte || res.data.products || res.data // fallback
    } catch (err) {
      console.error('Fehler beim Laden der Produkte:', err)
    }
  })
  </script>
  
  <style scoped>
  .produkt-list-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  .produkt-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .produkt-card {
    width: 250px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: #fefefe;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  .produkt-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .produkt-details {
    padding: 15px;
  }
  .produkt-details h3 {
  color: #222; /* oder z. B. #333, #000 etc. */
  font-size: 1.2rem;
  margin-bottom: 8px;
  }
  .preis {
    font-weight: bold;
    margin: 5px 0;
    color: #555;
  }
  .beschreibung {
    font-size: 0.9em;
    color: #555;
  }
  .kategorie {
    margin-top: 8px;
    font-style: italic;
    color: #888;
  }
  .no-produkte {
    text-align: center;
    margin-top: 40px;
    font-style: italic;
    color: #666;
  }
  </style>