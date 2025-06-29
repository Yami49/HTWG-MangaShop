<template>
  <header class="header">
    <div class="logo-container">
      <router-link to="/">
        <img src="@/components/icons/MangashopIcon.png" alt="MangaShop Logo" class="logo-image" />
      </router-link>
      <h1 class="logo-text">MangaShop</h1>
    </div>

    <nav class="nav-icons">
      <router-link to="/warenkorb" class="btn-cart" title="Warenkorb"> 🛒 </router-link>
      <router-link to="/login" class="btn-cart" title="Login"> 👤 </router-link>

      <button @click="logout" class="logout-button">Logout</button>
    </nav>
  </header>
</template>

<script setup>
// keine Logik notwendig – statisch
</script>

<style scoped>
.header {
  background-color: #4c1d95;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  background: none;
  border: none;
  color: #444;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 12px;
  transition: color 0.2s ease;
}

.logout-button:hover {
  color: #e74c3c;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  margin: 0;
}

.nav-icons button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
}
</style>
