<template>
  <div class="nachricht-detail">
    <h1>📧 Nachricht im Detail</h1>

    <div v-if="nachricht">
      <p><strong>Name:</strong> {{ nachricht.name }}</p>
      <p><strong>E-Mail:</strong> {{ nachricht.email }}</p>
      <p><strong>Nachricht:</strong></p>
      <p>{{ nachricht.nachricht }}</p>
    </div>

    <p v-else>Nachricht wird geladen...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const nachricht = ref(null)

const laden = async () => {
  try {
    const res = await axios.get(`https://mangashop-backend.onrender.com/nachrichten/${route.params.id}`)
    nachricht.value = res.data.data
  } catch (err) {
    console.error('❌ Fehler beim Laden der Nachricht:', err)
  }
}

onMounted(laden)
</script>

<style scoped>
.nachricht-detail {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
</style>
