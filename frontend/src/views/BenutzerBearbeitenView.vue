<template>
  <div class="edit-user">
    <h2>Benutzer bearbeiten</h2>

    <div v-if="user">
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

onMounted(async () => {
  const { data } = await axios.get(`/benutzer/${route.params.id}`)
  user.value = data.data
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

  await axios.patch(`/benutzer/${user.value.id}`, payload)
  router.push('/admin')
}

const deleteUser = async () => {
  await axios.delete(`/benutzer/${user.value.id}`)
  router.push('/admin')
}
</script>
