<template>
  <div class="page-container">
    <!-- Hero Section -->
    <section class="hero">
      <h2 class="hero-title">Entdecke Manga-Welten<br />wie nie zuvor</h2>
      <router-link to="/produkt" class="cta-button">Jetzt stöbern</router-link>
      <img :src="heroGirl" alt="Anime Girl" class="hero-image" />
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="info-card">
        <img :src="boyImage" alt="Anime Boy" class="info-image" />
        <p>MangaShop ist dein Ort für Originale,<br />Fanartikel und vieles mehr.</p>
        <router-link to="/blog" class="cta-button">Blogbeiträge</router-link>
      </div>
    </section>

    <!-- Kategorien -->
    <section class="categories">
      <h3 class="section-title">Kategorien</h3>
      <div class="categories-buttons">
        <button class="category-button">Shōnen</button>
        <button class="category-button">Shōjo</button>
        <button class="category-button">Seinen</button>
        <button class="category-button">Kawaii</button>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <p>✅ Große Auswahl</p>
      <p>✅ Blog Artikel</p>
      <p>✅ Schneller Versand</p>
      <p>✅ Rezensionen lesen</p>
    </section>

    <!-- Call to Action -->
    <section class="call-to-action">
      <h3 class="section-title">Noch kein Konto?</h3>
      <p>Jetzt registrieren & Lieblingsmanga sichern!</p>
      <router-link to="/register" class="cta-button">Konto erstellen</router-link>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import '@/assets/main.css'
import heroGirl from '@/assets/images/girl.png'
import boyImage from '@/assets/images/boy.png'

const apiResponse = ref(null)

async function fetchApiData() {
  try {
    const response = await api.get('/api') // << API-Route hier korrigiert!
    apiResponse.value = response.data
  } catch (error) {
    apiResponse.value = error.message
  }
}
</script>

<style scoped></style>
