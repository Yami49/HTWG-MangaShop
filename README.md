# HTWG MangaShop 📚

Willkommen beim **HTWG MangaShop** – einer vollständigen Webanwendung zur Präsentation und Verwaltung eines fiktiven Online-Manga-Shops. Das Projekt demonstriert, wie moderne Webtechnologien wie **Vue.js** (Frontend) und **Sails.js** (Backend) kombiniert werden können, um eine skalierbare und funktionale Anwendung zu entwickeln.

---

## 🔐 Login-Daten für Demozugang

| Rolle    | E-Mail          | Passwort |
| -------- | --------------- | -------- |
| Admin    | admin@admin.com | admin    |
| Benutzer | user@user.com   | user     |

---

## 🧩 Überblick

HTWG MangaShop wurde im Rahmen eines Hochschulprojekts realisiert und enthält die zentralen Funktionalitäten eines typischen E-Commerce-Systems mit Fokus auf Mangas:

- 📦 Produkte (Mangas) verwalten
- 📚 Kategorien erstellen & zuweisen
- 🛒 Warenkorb & Checkout
- 🔐 Benutzerregistrierung & Rollenverwaltung
- 🧾 Bestellungen & Zahlungsarten
- 🧠 Admin-Panel mit Übersicht über Nutzer & Produkte

---

## ⚙️ Technologien im Einsatz

| Technologie | Beschreibung                                                |
| ----------- | ----------------------------------------------------------- |
| Vue.js      | Fortschrittliches JavaScript-Framework für das Frontend     |
| Pinia       | State Management im Vue-Frontend                            |
| Sails.js    | API-Framework auf Basis von Node.js für das Backend         |
| MySQL       | Relationale Datenbank zur Speicherung aller Anwendungsdaten |
| Cloudinary  | (optional) Externer Cloud-Dienst zur Bildverwaltung         |

---

## ✨ Hauptfunktionen

### 🔵 Frontend (Vue.js)

- Responsive Design mit Tailwind & Bootstrap-Elementen
- Benutzerfreundliche Navigation, Filter & Suche
- Komponentenbasierte Struktur (Produktkarte, Warenkorb, Checkout, etc.)
- Dynamische Inhalte über REST-API

### 🟡 Backend (Sails.js)

- Vollständig REST-konforme Endpunkte
- Authentifizierung & Autorisierung mit Session-Management
- Datenmodelle für Nutzer, Produkte, Kategorien, Zahlungen, Warenkorb etc.
- Zugriffsschutz mit Policies (`isAdmin`, `isLoggedIn`, `isOwnerOrAdmin`)

---

## 🚀 Projekt starten

### Voraussetzungen

- Node.js (v16+ empfohlen)
- npm (Node Package Manager)
- MySQL-Datenbank (lokal oder remote)
- (Optional) Cloudinary-Zugangsdaten, wenn externe Bilder verwendet werden

### Frontend starten

```bash
cd frontend
npm install
npm run dev

```

### Backend starten

```bash
cd backend
npm install
sails lift

```

Dieses Projekt wurde zu Studienzwecken an der HTWG Konstanz entwickelt.
Alle Inhalte, Texte und Strukturen unterliegen – sofern nicht anders angegeben – dem Urheberrecht des Autors.
Alle Rechte vorbehalten. Eine kommerzielle Nutzung oder Weiterverbreitung ist ohne ausdrückliche Genehmigung nicht gestattet.
