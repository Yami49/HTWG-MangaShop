<template>
  <div class="edit-user">
    <h2>Benutzer bearbeiten</h2>

    <div v-if="loading">Benutzerdaten werden geladen...</div>

    <div v-else-if="error">
      <p style="color: red">Fehler beim Laden: {{ error }}</p>
    </div>

    <div v-else-if="user">
      <form @submit.prevent="saveUser">
        <label>Email</label>
        <input v-model="user.email" type="email" required />

        <label>Vorname</label>
        <input v-model="user.vorname" type="text" required />

        <label>Nachname</label>
        <input v-model="user.nachname" type="text" required />

        <label>Admin?</label>
        <input type="checkbox" v-model="user.istAdmin" />

        <hr />

        <label>Neues Passwort (optional)</label>
        <input v-model="newPassword" type="password" />

        <button type="submit">Speichern</button>
        <button type="button" @click="deleteUser">Löschen</button>
      </form>
    </div>

    <div v-else>
      <p>Kein Benutzer gefunden.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const user = ref(null)
const newPassword = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`/benutzer/${route.params.id}`)
    console.log('Benutzer geladen:', res.data)
    user.value = res.data || null
  } catch (err) {
    console.error('Fehler beim Laden des Benutzers:', err)
    error.value = err.response?.data?.error || 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
})

const saveUser = async () => {
  const payload = {
    email: user.value.email,
    vorname: user.value.vorname,
    nachname: user.value.nachname,
    istAdmin: user.value.istAdmin,
  }

  if (newPassword.value) {
    payload.passwort = newPassword.value
  }

  try {
    await axios.patch(`/benutzer/${user.value.id}`, payload)
    router.push('/admin/benutzer')
  } catch (err) {
    console.error('❌ Fehler beim Speichern:', err)
    alert('Speichern fehlgeschlagen.')
  }
}

const deleteUser = async () => {
  try {
    await axios.delete(`/benutzer/${user.value.id}`)
    router.push('/admin/benutzer')
  } catch (err) {
    console.error('❌ Fehler beim Löschen:', err)
    alert('Löschen fehlgeschlagen.')
  }
}
</script>

<style scoped>
.edit-user {
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.edit-user h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

label {
  font-weight: 600;
  color: #444;
  margin-bottom: 0.3rem;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4a5043;
  outline: none;
}

input[type='checkbox'] {
  transform: scale(1.2);
  margin-left: 0.5rem;
}

button {
  padding: 0.75rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button[type='submit'] {
  background-color: #4a5043;
  color: #fff;
}

button[type='submit']:hover {
  background-color: #3d4438;
}

button[type='button'] {
  background-color: #e0e0e0;
  color: #333;
}

button[type='button']:hover {
  background-color: #ccc;
}
</style>