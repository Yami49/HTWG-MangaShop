<template>
  <div class="admin-dashboard">
    <h1>Admin-Dashboard</h1>

    <!-- Benutzerverwaltung -->
    <section>
      <h2>Benutzer</h2>
      <input v-model="search" @input="fetchUsers" class="form-control" placeholder="Nach Benutzer suchen" />
      <table v-if="users.length" class="data-table">
        <thead>
          <tr>
            <th>E-Mail</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Admin</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td :data-label="'E-Mail'">{{ user.email }}</td>
<td :data-label="'Vorname'">{{ user.vorname }}</td>
<td :data-label="'Nachname'">{{ user.nachname }}</td>
<td :data-label="'Admin'">{{ user.istAdmin ? '✅' : '❌' }}</td>
<td :data-label="'Aktion'">
  <router-link :to="`/admin/benutzer/${user.id}`" class="btn">Bearbeiten</router-link>
</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Keine Benutzer gefunden.</p>
    </section>

    <!-- Produktverwaltung -->
    <section>
      <h2>Produkte</h2>
      <table v-if="produkte.length" class="data-table">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Preis</th>
            <th>Menge</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in produkte" :key="p.id">
            <td :data-label="'Titel'">{{ p.titel }}</td>
<td :data-label="'Preis'">{{ p.preis }} €</td>
<td :data-label="'Menge'">{{ p.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Keine Produkte vorhanden.</p>
    </section>

    <!-- Kategorien -->
    <section>
      <h2>Kategorien</h2>
      <ul v-if="kategorien.length" class="simple-list">
        <li v-for="k in kategorien" :key="k.id">📁 {{ k.name }}</li>
      </ul>
      <p v-else>Keine Kategorien gefunden.</p>
    </section>

    <section>
  <h2>Blogbeiträge</h2>
  <input v-model="blogSearch" @input="fetchBlogs" class="form-control" placeholder="Nach Blogtitel suchen" />
  <table v-if="blogs.length" class="data-table">
    <thead>
      <tr>
        <th>Titel</th>
        <th>Aktiv</th>
        <th>Erstellt am</th>
        <th>Aktion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b in blogs" :key="b.id">
        <td :data-label="'Titel'">{{ b.titel }}</td>
<td :data-label="'Aktiv'">{{ b.aktiv ? '✅' : '❌' }}</td>
<td :data-label="'Erstellt am'">{{ new Date(b.erstelltAm).toLocaleDateString() }}</td>
<td :data-label="'Aktion'">
  <router-link :to="`/admin/blog/${b.id}`" class="btn">Bearbeiten</router-link>
</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Keine Blogeinträge gefunden.</p>
</section>

<!-- Bestellübersicht -->
<section>
  <h2>Bestellungen</h2>
  <table v-if="bestellungen.length" class="data-table">
    <thead>
      <tr>
        <th>Bestell-ID</th>
        <th>Benutzer</th>
        <th>Gesamt (€)</th>
        <th>Status</th>
        <th>Produkte</th>
        <th>Adresse</th>
        <th>Zahlungsart</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b in bestellungen" :key="b.id">
        <td :data-label="'Bestell-ID'">{{ b.id }}</td>

<td :data-label="'Benutzer'">
  {{ b.benutzer?.vorname }} {{ b.benutzer?.nachname }}<br />
  <small>{{ b.benutzer?.email }}</small>
</td>

<td :data-label="'Gesamt (€)'">{{ b.gesamtpreis.toFixed(2) }} €</td>

<td :data-label="'Status'">
  <select v-model="b.status" @change="updateStatus(b.id, b.status)">
    <option value="offen">Offen</option>
    <option value="bezahlt">Bezahlt</option>
    <option value="versendet">Versendet</option>
    <option value="storniert">Storniert</option>
  </select>
</td>

<td :data-label="'Produkte'">
  <ul style="padding-left: 1rem; margin: 0;">
    <li v-for="p in b.artikel" :key="p.id">
      {{ p.menge }}x {{ p.produkt?.titel || 'Unbekannt' }}
    </li>
  </ul>
</td>

<td :data-label="'Adresse'">
  {{ b.adresse?.vorname }} {{ b.adresse?.nachname }}<br />
  {{ b.adresse?.strasse }}<br />
  {{ b.adresse?.plz }} {{ b.adresse?.ort }}<br />
  {{ b.adresse?.land }}
</td>

<td :data-label="'Zahlungsart'">{{ b.zahlung }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else style="color: black">Keine Bestellungen vorhanden.</p>
</section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const produkte = ref([])
const kategorien = ref([])
const search = ref('')
const blogs = ref([])
const blogSearch = ref('')
const bestellungen = ref([])

const fetchBestellungen = async () => {
  try {
    const res = await axios.get('/bestellung')
    bestellungen.value = res.data
  } catch (err) {
    console.error('❌ Fehler beim Laden der Bestellungen:', err)
  }
}

const updateStatus = async (id, neuerStatus) => {
  try {
    await axios.patch(`/bestellung/${id}/status`, { status: neuerStatus })
    await fetchBestellungen()
  } catch (err) {
    console.error('❌ Fehler beim Aktualisieren des Status:', err)
  }
}


const fetchBlogs = async () => {
  try {
    const res = await axios.get('/admin/blog')
    blogs.value = res.data.filter(blog =>
      blog.titel.toLowerCase().includes(blogSearch.value.toLowerCase())
    )
  } catch (err) {
    console.error('❌ Fehler beim Laden der Blogeinträge:', err)
  }
}

const fetchUsers = async () => {
  try {
    const { data } = await axios.get('/benutzer', {
      params: search.value ? { search: search.value } : {}
    })
    users.value = data.benutzer || []
  } catch (err) {
    console.error('❌ Fehler beim Laden der Benutzer:', err)
  }
}

const fetchProdukte = async () => {
  try {
    const res = await axios.get('/produkt')
    produkte.value = res.data.produkte || res.data.products || []
  } catch (err) {
    console.error('❌ Fehler beim Laden der Produkte:', err)
  }
}

const fetchKategorien = async () => {
  try {
    const res = await axios.get('/kategorie')
    kategorien.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error('❌ Fehler beim Laden der Kategorien:', err)
  }
}

onMounted(() => {
  fetchUsers()
  fetchProdukte()
  fetchKategorien()
  fetchBlogs()
  fetchBestellungen()
})
</script>

<style scoped>
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }

  .data-table,
  .data-table thead,
  .data-table tbody,
  .data-table th,
  .data-table td,
  .data-table tr {
    display: block;
    width: 100%;
  }

  .data-table thead {
    display: none;
  }

  .data-table tr {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    background-color: #fafafa;
  }

  .data-table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .data-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    top: 10px;
    font-weight: bold;
    text-align: left;
    white-space: nowrap;
  }

  .form-control {
    font-size: 1rem;
  }
}
</style>
