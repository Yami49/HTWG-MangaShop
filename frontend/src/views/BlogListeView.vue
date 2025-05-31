<template>
  <div class="blog-list">
    <h1>Aktuelle Blogbeiträge</h1>
    <div v-if="blogs.length > 0">
      <div class="blog-card" v-for="blog in blogs" :key="blog.id">
        <h3>{{ blog.titel }}</h3>
        <p>{{ blog.inhalt }}</p>
      </div>
    </div>
    <p v-else>Keine Blogbeiträge verfügbar.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const blogs = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/blog')
    blogs.value = data || []
  } catch (err) {
    console.error('Fehler beim Laden der Blogbeiträge:', err)
  }
})
</script>

<style scoped>
.blog-list {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.blog-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: #f9f9f9;
}
</style>
