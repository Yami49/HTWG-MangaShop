<template>
  <div class="order-detail-container">
    <h1>Bestellung #{{ bestellung?.id }}</h1>

    <div v-if="loading" class="status-message">Lade Bestelldaten...</div>
    <div v-else-if="!bestellung" class="status-message error">Bestellung nicht gefunden.</div>
    <div v-else class="order-content">
      <section class="section">
        <h2>Status</h2>
        <p><strong>{{ bestellung.status }}</strong> – bestellt am {{ formatDate(bestellung.datum) }}</p>
      </section>

      <section class="section">
        <h2>Lieferadresse</h2>
        <p>
          {{ bestellung.adresse.vorname }} {{ bestellung.adresse.nachname }}<br />
          {{ bestellung.adresse.strasse }}<br />
          {{ bestellung.adresse.plz }} {{ bestellung.adresse.ort }}<br />
          {{ bestellung.adresse.land }}
        </p>
      </section>

      <section class="section">
        <h2>Zahlungsart</h2>
        <p>{{ bestellung.zahlung }}</p>
      </section>

      <section class="section">
        <h2>Artikel</h2>
        <table class="items-table">
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Menge</th>
              <th>Einzelpreis (€)</th>
              <th>Gesamt (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bestellung.produkte" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.menge }}</td>
              <td>{{ item.preis.toFixed(2) }}</td>
              <td>{{ (item.preis * item.menge).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="total">Gesamtbetrag: <strong>{{ bestellung.gesamt.toFixed(2) }} €</strong></p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bestellung = ref(null)
const loading = ref(true)

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const ladeBestellung = async () => {
  try {
    const response = await fetch(`/api/bestellungen/${route.params.id}`)
    if (!response.ok) throw new Error('Nicht gefunden')
    bestellung.value = await response.json()
  } catch (err) {
    console.error('Fehler beim Laden der Bestellung:', err)
    bestellung.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  ladeBestellung()
})
</script>

<style scoped>
.order-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #5a3d85;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
}

.status-message {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-top: 40px;
}

.status-message.error {
  color: #c0392b;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.items-table th,
.items-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.items-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.total {
  text-align: right;
  margin-top: 15px;
  font-size: 1.2rem;
}
</style>