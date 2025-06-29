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
              <img :src="`https://mangashop-backend.onrender.com${item.image}`" alt="Produktbild" class="thumbnail" />
            </td>
            <td>
              <div class="produkt-info">
                <strong>{{ item.name }}</strong>
                <p class="beschreibung">{{ item.beschreibung }}</p>
                <p class="kategorie" v-if="item.kategorie">Kategorie: {{ item.kategorie }}</p>
                <router-link :to="`/produkt/${item.produkt.produktId}`" class="link">Details ansehen</router-link>
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
  max-width: 1200px;
  margin: 3rem auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cart-title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  margin-top: 60px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fafafa;
  border-radius: 10px;
  overflow: hidden;
}

.cart-table th,
.cart-table td {
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #eee;
  color:#333;
}

.cart-table th {
  background-color: #f2f2f2;
  font-weight: 600;
  font-size: 0.95rem;
  color: #555;
  text-transform: uppercase;
}

.thumbnail {
  width: 60px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}

.quantity-input {
  width: 70px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  text-align: center;
}

.produkt-info {
  text-align: left;
  max-width: 220px;
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
  font-size: 0.85rem;
  color: #3498db;
  text-decoration: underline;
  display: inline-block;
  margin-top: 4px;
}

.cart-summary {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
}

.cart-summary p {
  font-size: 1.4rem;
  margin: 0;
  color: #333;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #27ae60;
  color: white;
}

.btn-primary:hover {
  background-color: #1e874c;
}

.btn-secondary {
  background-color: #bdc3c7;
  color: #2c3e50;
}

.btn-secondary:hover {
  background-color: #a7b1b5;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .cart-table th, .cart-table td {
    font-size: 0.85rem;
    padding: 10px;
  }

  .cart-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .produkt-info {
    max-width: 100%;
  }
}

</style>