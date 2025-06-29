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
            <router-link :to="`/admin/blog/${blog.id}`" class="btn btn-edit"
              >Bearbeiten</router-link
            >
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
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background-color: #fefefe;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

th,
td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f4f6f8;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
}

td {
  font-size: 0.95rem;
  color: #333;
}

tr:last-child td {
  border-bottom: none;
}

.btn {
  padding: 8px 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2d80b3;
}

.btn-toggle {
  background-color: #bdc3c7;
  color: #2c3e50;
}

.btn-toggle:hover {
  background-color: #95a5a6;
}

.btn-new {
  display: inline-block;
  background-color: #27ae60;
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-new:hover {
  background-color: #219150;
}

p {
  text-align: center;
  color: #777;
  font-style: italic;
}
</style>
