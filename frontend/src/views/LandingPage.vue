<template>
  <div class="landing-page">
    <header class="hero">
      <h1>Willkommen im MangaVersum!</h1>
      <p>Entdecke neue Welten, epische Geschichten und deine Lieblingshelden.</p>
      <RouterLink to="/shop" class="btn-primary">Jetzt stöbern</RouterLink>
    </header>

    <section class="highlights">
      <h2>Unsere Empfehlungen</h2>
      <div class="highlight-grid">
        <div v-for="manga in empfohleneManga" :key="manga.id" class="manga-card">
          <img :src="manga.cover" :alt="manga.titel" />
          <h3>{{ manga.titel }}</h3>
          <p>{{ manga.beschreibung }}</p>
          <RouterLink :to="{ name: 'ProductDetail', params: { id: manga.id } }" class="btn-link">
            Mehr erfahren
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Beispiel: Empfohlene Manga (kann später aus API kommen)
const empfohleneManga = ref([])

onMounted(() => {
  empfohleneManga.value = [
    {
      id: 1,
      titel: 'One Piece Vol. 1',
      cover: '/images/onepiece1.jpg',
      beschreibung: 'Das legendäre Abenteuer von Monkey D. Ruffy beginnt!',
    },
    {
      id: 2,
      titel: 'Attack on Titan',
      cover: '/images/aot.jpg',
      beschreibung: 'Eine düstere Zukunft. Eine letzte Hoffnung. Titanen greifen an.',
    },
    {
      id: 3,
      titel: 'Demon Slayer',
      cover: '/images/demonslayer.jpg',
      beschreibung: 'Ein Junge, ein Schwert und ein düsteres Schicksal.',
    },
  ]
})
</script>

<style scoped>
.landing-page {
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.hero {
  text-align: center;
  background: linear-gradient(135deg, #f5f0ff, #e9e1ff);
  padding: 60px 20px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  color: #5a3d85;
}

.hero p {
  font-size: 1.2rem;
  margin: 15px 0;
}

.btn-primary {
  background-color: #5a3d85;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  margin-top: 15px;
}

.btn-primary:hover {
  background-color: #3f2a63;
}

.highlights h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #444;
}

.highlight-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.manga-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.manga-card img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 10px;
}

.manga-card h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.btn-link {
  color: #5a3d85;
  font-weight: bold;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
