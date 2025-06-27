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
    <p class="info">
      <router-link to="/login">Du hast bereits ein Konto? Zum Login</router-link>
    </p>
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
    await axios.post('https://mangashop-backend.onrender.com/register', form)
    router.push('/login')
  } catch (err) {
    fehler.value = 'Registrierung fehlgeschlagen'
    console.error(err)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

input {
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 500;
}
</style>

