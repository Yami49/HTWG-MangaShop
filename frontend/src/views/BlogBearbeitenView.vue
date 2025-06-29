<template>
  <div class="blog-bearbeiten">
    <h1>Blogbeitrag bearbeiten</h1>

    <div v-if="blog">
      <form @submit.prevent="updateBlog">
        <label for="titel">Titel*</label>
        <input id="titel" v-model="blog.titel" type="text" maxlength="100" required />

        <label for="inhalt">Inhalt*</label>
        <textarea id="inhalt" v-model="blog.inhalt" maxlength="1000" rows="10" required></textarea>

        <label>
          <input type="checkbox" v-model="blog.aktiv" />
          Aktiv
        </label>

        <div class="actions">
          <button type="submit" class="btn">Änderungen speichern</button>
          <button type="button" class="btn-secondary" @click="deleteBlog">Löschen</button>
        </div>
      </form>
    </div>
    <p v-else>Lade Blogbeitrag...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const blog = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const { data } = await axios.get(`/admin/blog/${route.params.id}`)
    blog.value = data
  } catch (err) {
    console.error('❌ Fehler beim Laden des Beitrags:', err)
  }
})

const updateBlog = async () => {
  try {
    await axios.patch(`/admin/blog/${blog.value.id}`, blog.value)
    router.push('/admin/blog')
  } catch (err) {
    console.error('❌ Fehler beim Aktualisieren:', err)
  }
}

const deleteBlog = async () => {
  if (!confirm('Diesen Beitrag wirklich löschen?')) return
  try {
    await axios.delete(`/admin/blog/${blog.value.id}`)
    router.push('/admin/blog')
  } catch (err) {
    console.error('❌ Fehler beim Löschen:', err)
  }
}
</script>

<style scoped>
.blog-bearbeiten {
  max-width: 700px;
  margin: 4rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

label {
  display: block;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input[type='text']:focus,
textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

input[type='checkbox'] {
  margin-right: 8px;
  transform: scale(1.2);
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #c0392b;
}

p {
  text-align: center;
  color: #666;
}
</style>
