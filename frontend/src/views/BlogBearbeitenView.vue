<template>
  <div class="blog-bearbeiten">
    <h1>Blogbeitrag bearbeiten</h1>

    <div v-if="blog">
      <form @submit.prevent="updateBlog">
        <label for="titel">Titel*</label>
        <input
          id="titel"
          v-model="blog.titel"
          type="text"
          maxlength="100"
          required
        />

        <label for="inhalt">Inhalt*</label>
        <textarea
          id="inhalt"
          v-model="blog.inhalt"
          maxlength="1000"
          rows="10"
          required
        ></textarea>

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
    const { data } = await axios.get(`/blog/${route.params.id}`)
    blog.value = data.data
  } catch (err) {
    console.error('❌ Fehler beim Laden des Beitrags:', err)
  }
})

const updateBlog = async () => {
  try {
    await axios.patch(`/blog/${blog.value.id}`, blog.value)
    router.push('/admin/blog')
  } catch (err) {
    console.error('❌ Fehler beim Aktualisieren:', err)
  }
}

const deleteBlog = async () => {
  if (!confirm('Diesen Beitrag wirklich löschen?')) return
  try {
    await axios.delete(`/blog/${blog.value.id}`)
    router.push('/admin/blog')
  } catch (err) {
    console.error('❌ Fehler beim Löschen:', err)
  }
}
</script>

<style scoped>
.blog-bearbeiten {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 10px 16px;
  background-color: #4a5043;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3d4438;
}

.btn-secondary {
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #bbb;
}
</style>
