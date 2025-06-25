<template>
  <div class="cart">
    <h1 class="cart-title">Ihr Warenkorb</h1>

    <div v-if="warenkorb.items.length === 0" class="empty-cart">
      <p>Ihr Warenkorb ist leer.</p>
      <RouterLink to="/" class="btn btn-primary">Zurück zum Shop</RouterLink>
    </div>

    <div v-else class="cart-content">
      <table class="cart-table" role="table">
        <thead>
          <tr>
            <th>Bild</th>
            <th>Produkt</th>
            <th>Menge</th>
            <th>Einzelpreis (€)</th>
            <th>Gesamt (€)</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in warenkorb.items" :key="item.id">
            <td>
              <img :src="item.image" alt="Produktbild" class="thumbnail" />
            </td>
            <td>
              <div class="produkt-info">
                <strong>{{ item.name }}</strong>
                <p class="beschreibung">{{ item.beschreibung }}</p>
                <p class="kategorie" v-if="item.kategorie">Kategorie: {{ item.kategorie }}</p>
                <router-link :to="`/produkt/${item.produktId}`" class="link">Details ansehen</router-link>
              </div>
            </td>
            <td>
              <input
                type="number"
                v-model.number="item.menge"
                min="1"
                max="1000"
                @change="handleQuantityChange(item)"
                class="quantity-input"
              />
            </td>
            <td>{{ item.preis.toFixed(2) }}</td>
            <td>{{ (item.preis * item.menge).toFixed(2) }}</td>
            <td>
              <button class="btn btn-secondary" @click="remove(item.id)">Entfernen</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <p>Gesamt: <strong>{{ totalAmount.toFixed(2) }} €</strong></p>
        <button class="btn btn-primary" @click="goToCheckout" :disabled="totalAmount <= 0">Zur Kasse</button>
        <button class="btn btn-danger" @click="leeren()">Warenkorb leeren</button>
      </div>
      <router-link to="/checkout" class="btn btn-primary">co</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useWarenkorbStore } from '@/stores/warenkorb'
import { useRouter } from 'vue-router'

const warenkorb = useWarenkorbStore()
const router = useRouter()

onMounted(async () => {
  try {
    await warenkorb.loadFromServer()
  } catch (err) {
    alert('❌ Fehler beim Laden des Warenkorbs.')
    console.error(err)
  }
})

const handleQuantityChange = async (item) => {
  if (!item.menge || item.menge < 1) item.menge = 1
  if (item.menge > 1000) item.menge = 1000

  try {
    await warenkorb.updateQuantity(item.id, item.menge)
    console.log(`🔁 Menge von "${item.name}" auf ${item.menge} aktualisiert`)
  } catch (err) {
    alert('❌ Fehler beim Aktualisieren der Menge.')
    console.error(err)
  }
}

const remove = async (id) => {
  try {
    await warenkorb.removeFromCart(id)
    console.log('🗑️ Produkt wurde aus dem Warenkorb entfernt.')
  } catch (err) {
    alert('❌ Fehler beim Entfernen des Produkts.')
    console.error(err)
  }
}

const leeren = () => {
  if (confirm('Warenkorb wirklich leeren?')) {
    warenkorb.clearCart()
  }
}

const goToCheckout = () => {
  router.push('/checkout')
}

const totalAmount = computed(() =>
  warenkorb.items.reduce((sum, item) => sum + (item.preis || 0) * item.menge, 0)
)
</script>

<style scoped>
.cart {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.cart-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #4a5043;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  vertical-align: middle;
}

.thumbnail {
  width: 60px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.quantity-input {
  width: 70px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.produkt-info {
  text-align: left;
  max-width: 200px;
}

.beschreibung {
  font-size: 0.85rem;
  color: #666;
  margin: 4px 0;
}

.kategorie {
  font-size: 0.8rem;
  color: #999;
  font-style: italic;
}

.link {
  font-size: 0.8rem;
  color: #3498db;
  text-decoration: underline;
  display: inline-block;
  margin-top: 4px;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 20px;
}

.cart-summary p {
  font-size: 1.4rem;
  margin: 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #4a5043;
  color: white;
}

.btn-secondary {
  background-color: #dcdcdc;
  color: #333;
}

.btn-danger {
  background-color: #c0392b;
  color: white;
}
</style>