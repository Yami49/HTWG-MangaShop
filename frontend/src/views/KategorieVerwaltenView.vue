<template>
  <div class="kategorie-view">
    <h2 class="page-title">Kategorien verwalten</h2>

    <!-- Neue Kategorie hinzufügen -->
    <form @submit.prevent="createKategorie" class="form-inline">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="newKategorie.name"
          id="name"
          required
          placeholder="Name eingeben z.B. Shōnen"
        />
      </div>
      <div class="form-group">
        <label for="beschreibung">Beschreibung</label>
        <input
          v-model="newKategorie.beschreibung"
          id="beschreibung"
          placeholder="Beschreibung eingeben"
          maxlength="1000"
        />
      </div>
      <button class="btn btn-primary" type="submit">➕ Hinzufügen</button>
    </form>

    <hr />

    <!-- Kategorie-Tabelle -->
    <div v-if="kategorien.length">
      <table class="kategorie-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in kategorien" :key="k.id">
            <td>
              <span v-if="editId !== k.id">{{ k.name }}</span>
              <input v-else v-model="editKategorie.name" />
            </td>
            <td>
              <span v-if="editId !== k.id">{{ k.beschreibung }}</span>
              <input v-else v-model="editKategorie.beschreibung" />
            </td>
            <td>
              <template v-if="editId === k.id">
                <button class="btn btn-save" @click="saveEdit(k.id)">Speichern</button>
                <button class="btn btn-cancel" @click="cancelEdit">Abbrechen</button>
              </template>
              <template v-else>
                <button class="btn btn-edit" @click="startEdit(k)">Bearbeiten</button>
                <button class="btn btn-delete" @click="deleteKategorie(k.id)">Löschen</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-kategorie">Noch keine Kategorien vorhanden.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const kategorien = ref([])
const newKategorie = ref({ name: '', beschreibung: '' })
const editId = ref(null)
const editKategorie = ref({})

const loadKategorien = async () => {
  try {
    const res = await axios.get('/kategorie')
    console.log('API-Antwort:', res.data)

    if (Array.isArray(res.data)) {
      kategorien.value = res.data.filter((k) => k.name?.trim())
    } else {
      console.warn('⚠️ Erwartetes Array, aber erhalten:', res.data)
      kategorien.value = []
    }
  } catch (err) {
    console.error('❌ Fehler beim Laden der Kategorien:', err)
    kategorien.value = []
  }
}

onMounted(() => {
  loadKategorien()
})

const createKategorie = async () => {
  try {
    const trimmedName = newKategorie.value.name?.trim()
    if (!trimmedName) return

    await axios.post('/kategorie', {
      name: trimmedName,
      beschreibung: newKategorie.value.beschreibung?.trim() || '',
    })

    newKategorie.value = { name: '', beschreibung: '' }
    await loadKategorien()
  } catch (err) {
    console.error('❌ Fehler beim Erstellen der Kategorie:', err)
    Swal.fire({
      title: 'Fehler',
      text: err.response?.data?.error || 'Kategorie konnte nicht erstellt werden.',
      icon: 'error',
    })
  }
}

const startEdit = (k) => {
  editId.value = k.id
  editKategorie.value = { ...k }
}

const cancelEdit = () => {
  editId.value = null
  editKategorie.value = {}
}

const saveEdit = async (id) => {
  try {
    await axios.patch(`/kategorie/${id}`, {
      name: editKategorie.value.name?.trim(),
      beschreibung: editKategorie.value.beschreibung?.trim() || '',
    })
    editId.value = null
    await loadKategorien()
  } catch (err) {
    console.error('❌ Fehler beim Speichern:', err)
  }
}

const deleteKategorie = async (id) => {
  const confirmed = confirm('Kategorie wirklich löschen?')

  if (confirmed) {
    try {
      await axios.delete(`/kategorie/${id}`)
      await loadKategorien()
    } catch (err) {
      console.error('❌ Fehler beim Löschen:', err)
      alert('Fehler beim Löschen der Kategorie.')
    }
  }
}
</script>

<style scoped>
.kategorie-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.form-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: end;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.kategorie-table {
  width: 100%;
  border-collapse: collapse;
}

.kategorie-table th,
.kategorie-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.btn-edit {
  background-color: #3498db;
  color: #fff;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: #fff;
  margin-left: 8px;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-save {
  background-color: #2ecc71;
  color: #fff;
}

.btn-save:hover {
  background-color: #27ae60;
}

.btn-cancel {
  background-color: #95a5a6;
  color: #fff;
  margin-left: 8px;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}
</style>
