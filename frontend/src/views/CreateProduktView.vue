<template>
  <div class="create-article">
    <h2 class="page-title">Neues Produkt erstellen</h2>

    <!-- PRODUKT-FORMULAR -->
    <form @submit.prevent="createOrUpdateProdukt" class="form-container">
      <div class="form-group">
        <label class="form-label">Titel</label>
        <input v-model="titel" type="text" class="form-control" maxlength="100" required />
      </div>

      <div class="form-group">
        <label class="form-label">Beschreibung</label>
        <textarea v-model="beschreibung" class="form-control" maxlength="1000" rows="4" />
      </div>

      <div class="form-group">
        <label class="form-label">Preis in €</label>
        <input v-model="preis" type="number" class="form-control" min="0" step="0.01" required />
      </div>

      <div class="form-group">
        <label class="form-label">Kategorie</label>
        <select v-model="kategorie" class="form-control" required>
          <option disabled value="">Bitte wählen</option>
          <option v-for="kat in kategorien" :key="kat.id" :value="kat.id">{{ kat.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Bild (optional)</label>
        <input type="file" @change="handleBild" class="form-control" accept="image/*" />
        <img v-if="vorschauBild" :src="vorschauBild" class="image-preview" />
      </div>

      <button type="submit" class="btn btn-primary w-100" :disabled="ladevorgang">
        {{ ladevorgang ? 'Speichern...' : (editId ? 'Änderungen speichern' : 'Produkt erstellen') }}
      </button>
    </form>

    <!-- FILTER -->
    <hr />
    <h3 class="subheading">Vorhandene Produkte</h3>

    <form @submit.prevent="loadProdukte" class="filter-form">
      <input v-model="filterTitel" type="text" placeholder="Titel suchen..." />
      <select v-model="filterKategorie">
        <option value="">Alle Kategorien</option>
        <option v-for="kat in kategorien" :key="kat.id" :value="kat.id">{{ kat.name }}</option>
      </select>
      <input v-model.number="filterMaxPreis" type="number" placeholder="Max. Preis (€)" />
      <button class="btn btn-secondary" type="submit">🔍 Suchen</button>
    </form>

    <!-- PRODUKT-TABELLE -->
    <div v-if="produkte.length">
      <table class="produkt-tabelle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bild</th>
            <th>Titel</th>
            <th>Preis</th>
            <th>Kategorie</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in produkte" :key="p.id">
            <td>{{ p.id }}</td>
            <td>
              <img :src="p.image" alt="Bild" width="50" height="50" style="object-fit: cover" />
            </td>
            <td>{{ p.titel }}</td>
            <td>{{ p.preis }} €</td>
            <td>{{ p.kategorie?.name || '—' }}</td>
            <td>
              <button class="btn btn-small btn-edit" @click="startEdit(p)">✏️</button>
              <button class="btn btn-small btn-delete" @click="deleteProdukt(p.produktId)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-produkte">Noch keine Produkte vorhanden.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const titel = ref('')
const beschreibung = ref('')
const preis = ref('')
const kategorie = ref('')
const kategorien = ref([])
const bildDatei = ref(null)
const vorschauBild = ref(null)
const ladevorgang = ref(false)
const produkte = ref([])
const editId = ref(null)

const filterTitel = ref('')
const filterKategorie = ref('')
const filterMaxPreis = ref(null)

onMounted(async () => {
  await loadKategorien()
  await loadProdukte()
})

const loadKategorien = async () => {
  try {
    const res = await axios.get('/kategorie')
    kategorien.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err)
  }
}

const loadProdukte = async () => {
  try {
    const params = {}
    if (filterTitel.value.trim()) params.search = filterTitel.value.trim()
    if (filterKategorie.value) params.kategorie = filterKategorie.value
    if (filterMaxPreis.value != null && !isNaN(filterMaxPreis.value)) {
      params.preis = filterMaxPreis.value
    }

    const res = await axios.get('/produkt', { params })
    produkte.value = res.data.produkte || res.data.products || []
  } catch (err) {
    console.error('Fehler beim Laden der Produkte:', err)
  }
}

const handleBild = (e) => {
  const file = e.target.files[0]
  if (file) {
    bildDatei.value = file
    vorschauBild.value = URL.createObjectURL(file)
  }
}

const createOrUpdateProdukt = async () => {
  if (!kategorie.value) return alert('Bitte eine Kategorie auswählen.')
  ladevorgang.value = true

  const formData = new FormData()
  formData.append('titel', titel.value.trim())
  formData.append('beschreibung', beschreibung.value.trim())
  formData.append('preis', parseFloat(preis.value))
  formData.append('kategorie', kategorie.value)
  if (bildDatei.value) formData.append('image', bildDatei.value)

  try {
    if (editId.value) {
      await axios.patch(`/produkt/${editId.value}`, formData)
    } else {
      await axios.post('/produkt', formData)
    }
    await loadProdukte()
    resetForm()
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    alert(err.response?.data?.error || 'Fehler beim Speichern des Produkts.')
  } finally {
    ladevorgang.value = false
  }
}

const deleteProdukt = async (id) => {
  if (confirm('Produkt wirklich löschen?')) {
    try {
      await axios.delete(`/produkt/${id}`)
      await loadProdukte()
    } catch (err) {
      console.error('Fehler beim Löschen:', err)
    }
  }
}

const startEdit = (produkt) => {
  editId.value = produkt.produktId
  titel.value = produkt.titel
  beschreibung.value = produkt.beschreibung
  preis.value = produkt.preis
  kategorie.value = produkt.kategorie?.id || ''
  bildDatei.value = null
  vorschauBild.value = produkt.image
}

const resetForm = () => {
  titel.value = ''
  beschreibung.value = ''
  preis.value = ''
  kategorie.value = ''
  bildDatei.value = null
  vorschauBild.value = null
  editId.value = null
}
</script>

<style scoped>
.create-article {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.page-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #777;
}
.subheading {
  margin-top: 40px;
  font-size: 1.4rem;
  color: #777;
}
.form-container {
  display: grid;
  gap: 20px;
  color: #777;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-label {
  font-weight: bold;
  margin-bottom: 6px;
}
.form-control {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.filter-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.filter-form input,
.filter-form select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-primary {
  background-color: #4caf50;
  color: white;
}
.btn-secondary {
  background-color: #007bff;
  color: white;
}
.btn-small {
  padding: 4px 8px;
  margin-right: 4px;
}
.btn-edit {
  background-color: #ffc107;
}
.btn-delete {
  background-color: #dc3545;
  color: white;
}
.image-preview {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ddd;
  margin-top: 10px;
}
.produkt-tabelle {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color: #777;
}
.produkt-tabelle th,
.produkt-tabelle td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.no-produkte {
  text-align: center;
  color: #777;
  margin-top: 30px;
}
</style>
