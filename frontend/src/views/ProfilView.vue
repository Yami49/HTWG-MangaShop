<template>
  <div class="profil-container" v-if="profil">
    <h1>Mein Profil</h1>
    <p><strong>Vorname:</strong> {{ profil.vorname }}</p>
    <p><strong>Nachname:</strong> {{ profil.nachname }}</p>
    <p><strong>E-Mail:</strong> {{ profil.email }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const profil = ref(null)

onMounted(async () => {
  const res = await axios.get('https://mangashop-backend.onrender.com/profil')
  profil.value = res.data.data
})
</script>

<style scoped>
.profil-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}
</style>
