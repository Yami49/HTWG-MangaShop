<template>
  <div class="kontakt-container">
    <h1>Kontakt</h1>

    <form @submit.prevent="absenden">
      <div class="form-group">
        <label for="name">Name*</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">E-Mail*</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="nachricht">Nachricht*</label>
        <textarea id="nachricht" v-model="form.nachricht" required></textarea>
      </div>

      <button type="submit">Absenden</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({
  name: '',
  email: '',
  nachricht: ''
})

const successMessage = ref('')
const errorMessage = ref('')

const absenden = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await axios.post('https://mangashop-backend.onrender.com/kontakt', {
      name: form.name,
      email: form.email,
      nachricht: form.nachricht
    })

    successMessage.value = `Danke für Ihre Nachricht, ${form.name}!`
    form.name = ''
    form.email = ''
    form.nachricht = ''
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Nachricht konnte nicht gesendet werden.'
  }
}
</script>

<style scoped>
.kontakt-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.success {
  margin-top: 1rem;
  color: #27ae60;
}

.error {
  margin-top: 1rem;
  color: #e74c3c;
}
</style>
