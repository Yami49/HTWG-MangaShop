<template>
  <div class="admin-container">
    <h1>Benutzerübersicht</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Rolle</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in benutzer" :key="b.id">
          <td>{{ b.vorname }} {{ b.nachname }}</td>
          <td>{{ b.email }}</td>
          <td>{{ b.istAdmin ? 'Admin' : 'User' }}</td>
          <td><router-link :to="`/admin/benutzer/${b.id}`" class="cta-button">Details</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import '@/assets/main.css'

const benutzer = ref([])

const laden = async () => {
  const res = await axios.get('https://mangashop-backend.onrender.com/benutzer')
  benutzer.value = res.data.benutzer
}

onMounted(laden)
</script>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
