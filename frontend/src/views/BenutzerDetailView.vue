<template>
  <div class="detail-container" v-if="benutzer">
    <h1>Benutzerdetails</h1>
    <p><strong>Name:</strong> {{ benutzer.vorname }} {{ benutzer.nachname }}</p>
    <p><strong>E-Mail:</strong> {{ benutzer.email }}</p>
    <p><strong>Rolle:</strong> {{ benutzer.istAdmin ? 'Admin' : 'User' }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const benutzer = ref(null)
const route = useRoute()

onMounted(async () => {
  const res = await axios.get(`https://mangashop-backend.onrender.com/benutzer/${route.params.id}`)
  benutzer.value = res.data
})
</script>

<style scoped>
    .detail-container { 
      max-width: 600px; 
      margin: auto; 
      padding: 2rem;
    }
</style>
