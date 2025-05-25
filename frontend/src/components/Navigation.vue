<template>
    <nav class="nav-bar">
      <router-link class="nav-link" to="/">🏠 Home</router-link>
      <router-link class="nav-link" to="/produkt-erstellen">➕ Produkt anlegen</router-link>
      <router-link class="nav-link" to="/produkt">📂 Produkte anschauen</router-link>
      <router-link class="nav-link" to="/kategorien">📂 Kategorien verwalten</router-link>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .nav-bar {
    display: flex;
    justify-content: center;
    gap: 2rem;
    background-color: #2c3e50;
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .nav-link {
    color: #ecf0f1;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 6px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;
  }
  
  .nav-link:hover {
    background-color: #34495e;
  }
  
  .router-link-active {
    background-color: #1abc9c;
  }
  </style>
  