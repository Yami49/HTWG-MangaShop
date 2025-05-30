<template>
  <footer class="footer">
    <p>
      © 2025 <strong>MangaShop</strong> –
      <router-link to="/impressum">Impressum</router-link> –
      <router-link to="/datenschutz">Datenschutz</router-link> –
      <router-link to="/kontakt">Kontakt</router-link>
    </p>
  </footer>
</template>

<script setup>
// statischer Footer – keine Logik nötig
</script>

<style scoped>
.footer {
  background-color: #6B21A8;
  color: white;
  text-align: center;
  padding: 1.5rem 1rem;
  font-size: 0.9rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer a {
  color: #ddd;
  text-decoration: underline;
  margin: 0 0.5rem;
}

.footer a:hover {
  color: #fff;
}
</style>
