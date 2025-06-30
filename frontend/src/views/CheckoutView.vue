<template>
  <div class="checkout-container">
    <h1>Zur Kasse</h1>

    <form @submit.prevent="absendenBestellung" class="checkout-form">
      <fieldset>
        <legend>Lieferadresse</legend>

        <label>
          Vorname:
          <input
            v-model="adresse.vorname"
            required
            pattern="^[A-Za-zÄÖÜäöüß\s\-]{2,40}$"
            title="Nur Buchstaben, Leerzeichen und Bindestrich erlaubt."
          />
        </label>

        <label>
          Nachname:
          <input
            v-model="adresse.nachname"
            required
            pattern="^[A-Za-zÄÖÜäöüß\s\-]{2,40}$"
            title="Nur Buchstaben, Leerzeichen und Bindestrich erlaubt."
          />
        </label>

        <label>
          Straße & Hausnummer:
          <input
            v-model="adresse.strasse"
            required
            pattern="^[A-Za-zÄÖÜäöüß0-9\s\.,\-]{3,60}$"
            title="Buchstaben, Zahlen, Leerzeichen und ,.- erlaubt."
          />
        </label>

        <label>
          PLZ:
          <input
            v-model="adresse.plz"
            required
            pattern="^\d{4,6}$"
            title="4–6-stellige Postleitzahl."
          />
        </label>

        <label>
          Ort:
          <input
            v-model="adresse.ort"
            required
            pattern="^[A-Za-zÄÖÜäöüß\s\-]{2,50}$"
            title="Nur Buchstaben, Leerzeichen und Bindestrich erlaubt."
          />
        </label>

        <label>
          Land:
          <input
            v-model="adresse.land"
            required
            pattern="^[A-Za-zÄÖÜäöüß\s\-]{2,50}$"
            title="Nur Buchstaben, Leerzeichen und Bindestrich erlaubt."
          />
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
        <p class="total">
          Gesamt: <strong>{{ totalAmount.toFixed(2) }} €</strong>
        </p>
      </div>

      <div>
    <button
      type="submit"
      class="category-button"
      :disabled="!istAdresseGueltig"
      @click.prevent="zeigeHinweis = !istAdresseGueltig"
    >
      Jetzt bestellen
    </button>

    <p v-if="!istAdresseGueltig && zeigeHinweis" class="text-red-500 mt-2">
      Bitte fülle alle Adressfelder korrekt aus.
    </p>
  </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWarenkorbStore } from '@/stores/warenkorb'
import { useUserStore } from '@/stores/user'
import '@/assets/main.css'

const router = useRouter()
const warenkorb = useWarenkorbStore()
const benutzerStore = useUserStore()

const adresse = ref({
  vorname: '',
  nachname: '',
  strasse: '',
  plz: '',
  ort: '',
  land: '',
})

const zahlungsmethode = ref('paypal')

const totalAmount = computed(() =>
  warenkorb.items.reduce((sum, item) => sum + item.preis * item.menge, 0),
)

const istAdresseGueltig = computed(() => {
  const name = /^[A-Za-zÄÖÜäöüß\s\-]{2,40}$/
  const strasse = /^[A-Za-zÄÖÜäöüß0-9\s\.,\-]{3,60}$/
  const plz = /^\d{4,6}$/

  return (
    name.test(adresse.value.vorname) &&
    name.test(adresse.value.nachname) &&
    strasse.test(adresse.value.strasse) &&
    plz.test(adresse.value.plz) &&
    name.test(adresse.value.ort) &&
    name.test(adresse.value.land)
  )
})

const absendenBestellung = async () => {
  try {
    const bestellung = await warenkorb.abschicken({
      adresse: adresse.value,
      zahlung: zahlungsmethode.value,
    })

    router.push({
      name: 'OrderSuccess',
      query: {
        orderId: bestellung.id,
        email: benutzerStore.email,
      },
    })
  } catch (error) {
    console.error(
      'Fehler beim Abschicken der Bestellung:',
      error?.response?.data || error.message || error,
    )
    alert('❌ Es gab ein Problem beim Abschicken der Bestellung.')
  }
}

export default {
  data() {
    return {
      zeigeHinweis: false,
    }
  },
  props: {
    istAdresseGueltig: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.checkout-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: #333;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

fieldset {
  border: none;
  padding: 0;
}

legend {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #5a3d85;
}

label {
  display: block;
  margin-bottom: 1.2rem;
  color: #333;
  font-weight: 500;
}

input[type='text'],
input[type='email'],
input[type='number'] {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #5a3d85;
  outline: none;
}

input[type='radio'] {
  margin-right: 8px;
}

.summary {
  background-color: #f4f4fa;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.summary h2 {
  margin-bottom: 1rem;
  color: #444;
}

.summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary li {
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #333;
}

.total {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
}

.btn-primary {
  align-self: flex-start;
  padding: 14px 24px;
  background-color: #5a3d85;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #3f2a63;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 1rem;
  }

  .btn-primary {
    width: 100%;
    text-align: center;
  }
}
</style>
