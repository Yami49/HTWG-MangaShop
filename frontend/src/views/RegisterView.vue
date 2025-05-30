<template>
  <div class="form-container">
    <h1>Registrierung</h1>
    <form @submit.prevent="register">
      <input v-model="form.vorname" placeholder="Vorname" required />
      <input v-model="form.nachname" placeholder="Nachname" required />
      <input v-model="form.email" type="email" placeholder="E-Mail" required />
      <input v-model="form.passwort" type="password" placeholder="Passwort" required />
      <button type="submit">Registrieren</button>
    </form>
    <p v-if="fehler" class="error">{{ fehler }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const fehler = ref('')

const form = reactive({
  vorname: '',
  nachname: '',
  email: '',
  passwort: ''
})

const register = async () => {
  try {
    await axios.post('http://localhost:1337/register', form)
    router.push('/login')
  } catch (err) {
    fehler.value = 'Registrierung fehlgeschlagen'
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
