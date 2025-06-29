<template>
  <div class="blog-detail" v-if="blog">
    <h1>{{ blog.titel }}</h1>
    <p class="meta">Veröffentlicht am {{ formatDate(blog.createdAt) }}</p>
    <div class="inhalt">
      <p>{{ blog.inhalt }}</p>
    </div>
  </div>

  <div v-else class="loading">
    <p>Lade Blogbeitrag...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const blog = ref(null)

const fetchBlog = async () => {
  try {
    const { data } = await axios.get(`/blog/${route.params.id}`)
    blog.value = data
  } catch (err) {
    console.error('❌ Fehler beim Laden des Blogbeitrags:', err)
  }
}

onMounted(fetchBlog)

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  color: #333;
}

.meta {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.inhalt p {
  line-height: 1.6;
  white-space: pre-line;
  color: #333;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
