<template>
  <div class="info-container">
    <section class="shipping-section">
      <h1>Versandinformationen</h1>
      <p>
        Wir sorgen dafür, dass deine Lieblingsmangas sicher und schnell bei dir ankommen. Hier
        findest du alle Details zu Versandarten, Lieferzeiten und Zustellung.
      </p>

      <div class="shipping-costs">
        <h2>Versandkosten</h2>
        <p>
          Innerhalb Deutschlands ist der Versand <strong>kostenlos</strong>, unabhängig vom
          Bestellwert. Für internationale Bestellungen gelten reduzierte Festpreise.
        </p>
        <ul>
          <li>Deutschland: 0,00 €</li>
          <li>EU: 4,90 €</li>
          <li>Weltweit: 9,90 €</li>
        </ul>
      </div>

      <div class="delivery-times">
        <h2>Lieferzeiten</h2>
        <ul>
          <li>Standardversand (DE): 2–5 Werktage</li>
          <li>EU-Versand: ca. 4–8 Werktage</li>
          <li>International: bis zu 14 Werktage</li>
        </ul>
        <p>
          Neuerscheinungen, Vorbestellungen oder Bundle-Angebote können längere Bearbeitungszeit
          benötigen.
        </p>
      </div>

      <div class="carriers">
        <h2>Versanddienstleister</h2>
        <p>
          Wir versenden mit DHL, Hermes oder UPS – je nach Größe und Zielregion. Alle Pakete sind
          selbstverständlich mit einer Sendungsverfolgung ausgestattet.
        </p>
      </div>
    </section>

    <section class="payment-section">
      <h1>Zahlungsoptionen</h1>
      <p>Du kannst ganz bequem zwischen mehreren Zahlungsmöglichkeiten wählen:</p>

      <div class="payment-methods">
        <h2>PayPal</h2>
        <p>Schnelle & sichere Zahlung per PayPal-Konto.</p>

        <h2>Kreditkarte</h2>
        <p>Wir akzeptieren Visa, MasterCard und American Express.</p>

        <h2>SEPA-Überweisung</h2>
        <p>Überweise den Betrag bequem von deinem Bankkonto – Versand nach Zahlungseingang.</p>

        <h2>Manga-Gutschein</h2>
        <p>Löse deinen Geschenkgutschein direkt im Bestellprozess ein.</p>
      </div>
    </section>

    <section class="support-section">
      <h1>Fragen oder Probleme?</h1>
      <p>
        Du hast eine Frage zu deiner Lieferung oder brauchst Hilfe bei der Zahlung? Unser Support
        hilft dir schnell und unkompliziert weiter.
      </p>
      <button @click="kontaktAufnehmen" class="btn-support">Support kontaktieren</button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const kontaktAufnehmen = () => {
  router.push({ name: 'Kontaktformular' })
}
</script>

<style scoped>
.info-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #2c2c2c;
  line-height: 1.7;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #5a3d85;
}

h2 {
  font-size: 1.3rem;
  margin-top: 25px;
  margin-bottom: 10px;
  color: #3d3d3d;
}

ul {
  margin-left: 20px;
  list-style-type: disc;
}

section {
  margin-bottom: 50px;
  background: #f8f8f8;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

.btn-support {
  background-color: #5a3d85;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.btn-support:hover {
  background-color: #3f2a63;
}
</style>
