<template>
  <div class="produkt-list-view">
    <h2 class="title">Unsere Manga-Produkte</h2>

    <div v-if="produkte.length" class="produkt-grid">
      <div v-for="p in produkte" :key="p.id" class="produkt-card">
        <img
          :src="`https://mangashop-backend.onrender.com${p.bild}`"
          class="produkt-image"
          alt="Produktbild"
        />
        <div class="produkt-details">
          <h3>{{ p.titel }}</h3>
          <p class="preis">
            {{ Number(p.preis).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}
          </p>
          <p class="beschreibung">{{ p.beschreibung }}</p>
          <p class="kategorie">{{ p.kategorie?.name || '-' }}</p>

          <div class="button-group">
            <router-link :to="`/produkt/${p.produktId}`" class="category-button"
              >Anschauen</router-link
            >
            <button class="cta-button" @click="inWarenkorb(p)">In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-produkte">Noch keine Produkte verfügbar.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useWarenkorbStore } from '@/stores/warenkorb'
import { useUserStore } from '@/stores/user'
import '@/assets/main.css'

const produkte = ref([])
const warenkorb = useWarenkorbStore()
const user = useUserStore()

onMounted(async () => {
  try {
    const res = await axios.get('/produkt')
    produkte.value = res.data.produkte || res.data.products || res.data
  } catch (err) {
    console.error('❌ Fehler beim Laden der Produkte:', err)
  }
})

async function inWarenkorb(produkt) {
  if (!user.user) {
    alert('🛑 Bitte logge dich ein, um Produkte in den Warenkorb zu legen.')
    return
  }

  try {
    await axios.post(
      '/warenkorb',
      {
        produkt: produkt.id,
        menge: 1,
      },
      { withCredentials: true },
    )

    await warenkorb.loadFromServer() // Server-Warenkorb neu laden
    alert(`✅ "${produkt.titel}" wurde zum Warenkorb hinzugefügt`)
  } catch (err) {
    console.error('❌ Fehler beim Hinzufügen zum Warenkorb:', err)
    alert('Fehler beim Hinzufügen zum Warenkorb.')
  }
}
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
  color: #222;
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
.button-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}
.anschauen-btn {
  background-color: #3498db;
  color: white;
}
.warenkorb-btn {
  background-color: #2ecc71;
  color: white;
}
</style>
