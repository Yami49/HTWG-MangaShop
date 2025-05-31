<template>
  <div class="admin-dashboard">
    <h1>Benutzerverwaltung</h1>

    <!-- Suchfeld -->
    <div class="search-box">
      <input
        v-model="search"
        @input="fetchUsers"
        type="text"
        placeholder="Nach Name oder E-Mail suchen"
        class="form-control"
      />
    </div>

    <!-- Tabelle mit Benutzern -->
    <table class="user-table" v-if="users.length > 0">
      <thead>
        <tr>
          <th>E-Mail</th>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Admin</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.vorname }}</td>
          <td>{{ user.nachname }}</td>
          <td>{{ user.istAdmin ? '✅' : '❌' }}</td>
          <td>
            <router-link :to="`/admin/benutzer/${user.id}`" class="btn btn-primary">Bearbeiten</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Keine Benutzer gefunden.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const search = ref('')

const fetchUsers = async () => {
  try {
    const { data } = await axios.get('/benutzer', {
      params: search.value ? { search: search.value } : {},
    })
    users.value = data.benutzer || []
  } catch (error) {
    console.error('❌ Fehler beim Laden der Benutzer:', error)
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.admin-dashboard {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.form-control {
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-table th {
  background-color: #f8f9fa;
}

.btn {
  padding: 6px 12px;
  background-color: #4a5043;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

.btn:hover {
  background-color: #3b3f34;
}
</style>
