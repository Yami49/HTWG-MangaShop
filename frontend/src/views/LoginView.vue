<template>
  <div class="form-container">
    <h1>Anmeldung</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="E-Mail" required />
      <input v-model="passwort" type="password" placeholder="Passwort" required />
      <button type="submit">Einloggen</button>
    </form>
    <p v-if="fehler" class="error">{{ fehler }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const passwort = ref('')
const fehler = ref('')
const router = useRouter()

const login = async () => {
  try {
    await axios.post('http://localhost:1337/login', { email: email.value, passwort: passwort.value })
    router.push('/profil')
  } catch (err) {
    fehler.value = 'Login fehlgeschlagen'
    console.error(err)
  }
}
</script>

<style scoped>
    .form-container { max-width: 400px; margin: auto; padding: 2rem }
    input { margin-bottom: 1rem; width: 100%; padding: 0.5rem }
    button { width: 100%; padding: 0.5rem }
    .error { color: red }
</style>
