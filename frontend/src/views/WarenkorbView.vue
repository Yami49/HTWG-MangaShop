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
            <th scope="col">Produkt</th>
            <th scope="col">Menge</th>
            <th scope="col">Einzelpreis (€)</th>
            <th scope="col">Gesamt (€)</th>
            <th scope="col">Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in warenkorb.items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <input
                type="number"
                v-model.number="item.menge"
                min="1"
                max="1000"
                @change="handleQuantityChange(item)"
                class="quantity-input"
                aria-label="Menge ändern"
              />
            </td>
            <td>{{ (item.preis ?? 0).toFixed(2) }}</td>
            <td>{{ ((item.preis ?? 0) * item.menge).toFixed(2) }}</td>
            <td>
              <button class="btn btn-secondary" @click="remove(item.id)" aria-label="Entfernen">Entfernen</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <p>Gesamt: <strong>{{ totalAmount.toFixed(2) }} €</strong></p>
        <button class="btn btn-primary" @click="goToCheckout" :disabled="totalAmount <= 0">Zur Kasse</button>
        <button
          class="btn btn-danger"
          @click="confirm('Warenkorb wirklich leeren?') && warenkorb.clearCart()"
        >
          Warenkorb leeren
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWarenkorbStore } from '@/stores/warenkorb'
import { useRouter } from 'vue-router'

const warenkorb = useWarenkorbStore()
const router = useRouter()

const remove = (id) => {
  warenkorb.removeFromCart(id)
}

const handleQuantityChange = (item) => {
  if (!item.menge || item.menge < 1) {
    item.menge = 1
  } else if (item.menge > 1000) {
    item.menge = 1000
  }
  warenkorb.updateQuantity(item.id, item.menge)
}

const goToCheckout = () => {
  router.push('/checkout')
}

// Fallback falls warenkorb.totalAmount im Store nicht vorhanden ist
const totalAmount = computed(() =>
  warenkorb.items.reduce((sum, item) => sum + (item.preis ?? 0) * item.menge, 0)
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
}

.quantity-input {
  width: 80px;
  padding: 6px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
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