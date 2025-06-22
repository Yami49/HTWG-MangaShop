<template>
  <div class="checkout-container">
    <h1>Zur Kasse</h1>

    <form @submit.prevent="absendenBestellung" class="checkout-form">
      <fieldset>
        <legend>Lieferadresse</legend>

        <label>
          Vorname:
          <input v-model="adresse.vorname" required />
        </label>

        <label>
          Nachname:
          <input v-model="adresse.nachname" required />
        </label>

        <label>
          Straße & Hausnummer:
          <input v-model="adresse.strasse" required />
        </label>

        <label>
          PLZ:
          <input v-model="adresse.plz" required />
        </label>

        <label>
          Ort:
          <input v-model="adresse.ort" required />
        </label>

        <label>
          Land:
          <input v-model="adresse.land" required />
        </label>
      </fieldset>

      <fieldset>
        <legend>Zahlungsart</legend>
        <label>
          <input type="radio" value="paypal" v-model="zahlungsmethode" required />
          PayPal
        </label>
        <label>
          <input type="radio" value="kreditkarte" v-model="zahlungsmethode" />
          Kreditkarte
        </label>
        <label>
          <input type="radio" value="ueberweisung" v-model="zahlungsmethode" />
          Überweisung (Vorkasse)
        </label>
      </fieldset>

      <div class="summary">
        <h2>Zusammenfassung</h2>
        <ul>
          <li v-for="item in warenkorb.items" :key="item.id">
            {{ item.name }} x{{ item.menge }} – {{ (item.preis * item.menge).toFixed(2) }} €
          </li>
        </ul>
        <p class="total">Gesamt: <strong>{{ totalAmount.toFixed(2) }} €</strong></p>
      </div>

      <button type="submit" class="btn btn-primary">Jetzt bestellen</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWarenkorbStore } from '@/stores/warenkorb'
import { useBenutzerStore } from '@/stores/benutzer' // falls du den User brauchst

const router = useRouter()
const warenkorb = useWarenkorbStore()
const benutzerStore = useBenutzerStore()

const adresse = ref({
  vorname: '',
  nachname: '',
  strasse: '',
  plz: '',
  ort: '',
  land: ''
})

const zahlungsmethode = ref('paypal')

const totalAmount = computed(() =>
  warenkorb.items.reduce((sum, item) => sum + item.preis * item.menge, 0)
)

const absendenBestellung = async () => {
  try {
    const bestellung = await warenkorb.abschicken({
      adresse: adresse.value,
      zahlung: zahlungsmethode.value
    })

    router.push({
      name: 'OrderSuccess',
      query: {
        orderId: bestellung.id,
        email: benutzerStore.email
      }
    })
  } catch (error) {
    console.error('Fehler beim Abschicken der Bestellung:', error)
    alert('Es gab ein Problem beim Abschicken der Bestellung.')
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #5a3d85;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

label {
  display: block;
  margin-bottom: 15px;
}

input[type='text'],
input[type='email'],
input[type='number'] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.total {
  margin-top: 15px;
  font-size: 1.2rem;
}

.btn-primary {
  padding: 12px;
  background-color: #5a3d85;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3f2a63;
}
</style>