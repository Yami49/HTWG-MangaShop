<template>
  <div class="nachrichten-container">
    <h1>📨 Kontakt-Nachrichten</h1>

    <table v-if="nachrichten.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Vorschau</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in nachrichten" :key="n.id">
          <td>{{ n.name }}</td>
          <td>{{ n.email }}</td>
          <td>{{ n.nachricht.slice(0, 40) }}...</td>
          <td>
            <router-link :to="`/nachrichten/${n.id}`">Ansehen</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Keine Nachrichten vorhanden.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const nachrichten = ref([])

const laden = async () => {
  try {
    const res = await axios.get('http://localhost:1337/nachrichten')
    nachrichten.value = res.data.data
  } catch (err) {
    console.error('❌ Fehler beim Laden:', err)
  }
}

onMounted(laden)
</script>

<style scoped>
.nachrichten-container {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

router-link {
  color: #6B21A8;
}
</style>
