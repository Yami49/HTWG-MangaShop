<template>
  <div class="admin-blog">
    <h1>Blogbeiträge verwalten</h1>

    <!-- Neuen Beitrag erstellen -->
    <form @submit.prevent="erstellen">
      <h3>Neuen Beitrag erstellen</h3>
      <input v-model="neuerTitel" placeholder="Titel" maxlength="100" required />
      <textarea v-model="neuerInhalt" placeholder="Inhalt" maxlength="1000" required />
      <label><input type="checkbox" v-model="istAktiv" /> Aktiv</label>
      <button type="submit">Erstellen</button>
    </form>

    <hr />

    <!-- Vorhandene Beiträge -->
    <div v-for="beitrag in blogs" :key="beitrag.id" class="blog-entry">
      <h3>{{ beitrag.titel }}</h3>
      <p>{{ beitrag.inhalt }}</p>
      <label>
        <input type="checkbox" v-model="beitrag.aktiv" @change="toggleAktiv(beitrag)" />
        Aktiv
      </label>
      <button @click="loeschen(beitrag.id)">Löschen</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const blogs = ref([])
const neuerTitel = ref('')
const neuerInhalt = ref('')
const istAktiv = ref(true)

const laden = async () => {
  const { data } = await axios.get('/admin/blog')
  blogs.value = data || []
}

onMounted(laden)

const erstellen = async () => {
  if (!neuerTitel.value || !neuerInhalt.value) return
  await axios.post('/admin/blog', {
    titel: neuerTitel.value,
    inhalt: neuerInhalt.value,
    aktiv: istAktiv.value,
  })
  neuerTitel.value = ''
  neuerInhalt.value = ''
  istAktiv.value = true
  await laden()
}

const toggleAktiv = async (blog) => {
  await axios.patch(`/admin/blog/${blog.id}`, { aktiv: blog.aktiv })
}

const loeschen = async (id) => {
  await axios.delete(`/admin/blog/${id}`)
  await laden()
}
</script>

<style scoped>
.admin-blog {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
input,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
}
.blog-entry {
  margin-top: 2rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}
</style>
