<template>
    <header class="header">
        <div class="logo-container">
            <img src="@/components/icons/MangashopIcon.png" alt="MangaShop Logo" class="logo-image" />
            <h1 class="logo-text">MangaShop</h1>
        </div>
  
      <nav class="nav-icons">
        <button title="Suchen">🔍</button>
        <button title="Warenkorb">🛒</button>
        <button title="Benutzerkonto">👤</button>
      </nav>
    </header>
  </template>
  
  <script setup>
  // keine Logik notwendig – statisch
  </script>
  
  <style scoped>
.header {
  background-color: #4C1D95;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  