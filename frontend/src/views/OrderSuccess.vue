<template>
  <div class="success-container">
    <div class="success-box">
      <h1>Vielen Dank für deine Bestellung!</h1>
      <p class="message">
        Deine Manga-Auswahl macht sich bald auf den Weg zu dir. Wir haben dir eine
        Bestellbestätigung per E-Mail gesendet.
      </p>

      <div v-if="orderId" class="order-info">
        <p><strong>Bestellnummer:</strong> {{ orderId }}</p>
        <router-link to="/" class="btn">Zur Startseite</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Hole z. B. ?orderId=1234&email=user@example.com aus der URL
const route = useRoute()
const orderId = route.query.orderId || ''
const email = route.query.email || ''
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 30px;
}

.success-box {
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  text-align: center;
  color: #333;
}

h1 {
  color: #5a3d85;
  margin-bottom: 20px;
}

.message {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.order-info p {
  margin: 8px 0;
  font-size: 1rem;
}

.actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #5a3d85;
  color: white;
}

.btn-primary:hover {
  background-color: #3f2a63;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #c2c2c2;
}
</style>
