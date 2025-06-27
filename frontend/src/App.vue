<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/HeaderComponente.vue'
import Footer from '@/components/FooterComponente.vue'
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #2D0E46;
  color: white;
}
</style>
