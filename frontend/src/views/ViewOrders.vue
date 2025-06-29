<template>
  <div class="orders-container">
    <h1>Meine Bestellungen</h1>

    <div v-if="loading" class="status-message">Lade Bestellungen...</div>
    <div v-else-if="bestellungen.length === 0" class="status-message">
      Du hast bisher keine Bestellungen aufgegeben.
    </div>

    <table v-else class="orders-table">
      <thead>
        <tr>
          <th>Bestellnummer</th>
          <th>Datum</th>
          <th>Status</th>
          <th>Gesamt (€)</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in bestellungen" :key="order.id">
          <td>#{{ order.id }}</td>
          <td>{{ formatDate(order.datum) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.gesamt.toFixed(2) }}</td>
          <td>
            <RouterLink :to="{ name: 'OrderDetail', params: { id: order.id } }" class="btn">
              Details
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const bestellungen = ref([])
const loading = ref(true)
const router = useRouter()

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const ladeBestellungen = async () => {
  try {
    const response = await fetch('/api/bestellungen/meine')
    if (!response.ok) throw new Error('Fehler beim Laden')

    const data = await response.json()
    bestellungen.value = data
  } catch (err) {
    console.error('Bestellungen konnten nicht geladen werden:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  ladeBestellungen()
})
</script>

<style scoped>
.orders-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #5a3d85;
}

.status-message {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 40px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.orders-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.btn {
  padding: 8px 12px;
  background-color: #5a3d85;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
}

.btn:hover {
  background-color: #3f2a63;
}
</style>
