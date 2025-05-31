<template>
  <div class="admin-blog-liste">
    <h1>Blogbeiträge verwalten</h1>

    <table v-if="blogs.length > 0">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Erstellt</th>
          <th>Status</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog in blogs" :key="blog.id">
          <td>{{ blog.titel }}</td>
          <td>{{ formatDate(blog.createdAt) }}</td>
          <td>{{ blog.aktiv ? 'Aktiv' : 'Inaktiv' }}</td>
          <td>
            <router-link :to="`/admin/blog/${blog.id}`" class="btn btn-edit">Bearbeiten</router-link>
            <button class="btn btn-toggle" @click="toggleStatus(blog)">
              {{ blog.aktiv ? 'Deaktivieren' : 'Aktivieren' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Keine Blogbeiträge gefunden.</p>

    <router-link to="/admin/blog/neu" class="btn btn-new">➕ Neuer Beitrag</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const blogs = ref([])

const fetchBlogs = async () => {
  try {
    const res = await axios.get('/blog')
    blogs.value = res.data || []
  } catch (err) {
    console.error('❌ Fehler beim Laden der Blogbeiträge:', err)
  }
}

const toggleStatus = async (blog) => {
  try {
    await axios.patch(`/blog/${blog.id}`, { aktiv: !blog.aktiv })
    blog.aktiv = !blog.aktiv
  } catch (err) {
    console.error('❌ Fehler beim Umschalten des Status:', err)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE')
}

onMounted(fetchBlogs)
</script>

<style scoped>
.admin-blog-liste {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  color: #333;
}

.btn {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #4a5043;
  color: white;
}

.btn-toggle {
  background-color: #ddd;
}

.btn-new {
  display: inline-block;
  background-color: #4a5043;
  color: white;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 6px;
}
</style>
