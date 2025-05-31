<template>
  <div class="blog-erstellen">
    <h1>Neuen Blogbeitrag erstellen</h1>

    <form @submit.prevent="createBlog">
      <label for="titel">Titel*</label>
      <input
        id="titel"
        v-model="titel"
        type="text"
        maxlength="100"
        required
      />

      <label for="inhalt">Inhalt*</label>
      <textarea
        id="inhalt"
        v-model="inhalt"
        maxlength="1000"
        rows="10"
        required
      ></textarea>

      <label>
        <input type="checkbox" v-model="aktiv" />
        Aktiv veröffentlichen
      </label>

      <button type="submit" class="btn">Beitrag erstellen</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const titel = ref('')
const inhalt = ref('')
const aktiv = ref(true)
const router = useRouter()

const createBlog = async () => {
  try {
    await axios.post('/blog', {
      titel: titel.value,
      inhalt: inhalt.value,
      aktiv: aktiv.value
    })
    router.push('/admin/blog')
  } catch (err) {
    console.error('❌ Fehler beim Erstellen des Blogbeitrags:', err)
  }
}
</script>

<style scoped>
.blog-erstellen {
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

.btn {
  margin-top: 1.5rem;
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
</style>
