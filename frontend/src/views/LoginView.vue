<template>
  <div class="form-container">
    <h1>Anmeldung</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="E-Mail" required />
      <input v-model="passwort" type="password" placeholder="Passwort" required />
      <button type="submit">Einloggen</button>
    </form>
    <p class="info">
      <router-link to="/register">Registriere dich hier</router-link>
    </p>
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
    await axios.post('https://mangashop-backend.onrender.com/login', { email: email.value, passwort: passwort.value })
    router.push('/profil')
  } catch (err) {
    fehler.value = 'Login fehlgeschlagen'
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
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 500;
}
</style>

