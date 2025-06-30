# HTWG MangaShop 📚

Willkommen beim **HTWG MangaShop** – einer modernen Full-Stack-Webanwendung zur Präsentation und Verwaltung eines fiktiven Online-Manga-Shops. Entwickelt im Rahmen eines Hochschulprojekts an der HTWG Konstanz.

---

## 🎯 Projektziele

- Kunden können gezielt nach Manga-Titeln oder Genres suchen
- Übersichtlicher Bestellprozess mit Auswahl der Zahlungsmethode
- Kaufoptionen: digitale und physische Produkte
- Zugriff auf Blogbeiträge mit Empfehlungen & Neuheiten
- Admin-Funktionen zur Benutzer-, Produkt- und Inhaltsverwaltung

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
- 🧠 Admin-Dashboard mit Übersicht über Nutzer & Produkte

---

## 🧠 Technologien im Einsatz

| Technologie     | Beschreibung                                          |
|-----------------|-------------------------------------------------------|
| Vue.js          | Modernes Frontend-Framework für UI-Komponenten        |
| Pinia           | State Management für globale App-Zustände             |
| Sails.js        | Backend-Framework auf Node.js-Basis (inkl. Policies)  |
| MongoDB         | Dokumentenbasierte NoSQL-Datenbank                    |
| Tailwind CSS    | Utility-First CSS Framework                           |
| Render.com      | Hosting-Plattform für Frontend und Backend            |
| MongoDB Atlas   | Cloudbasierter MongoDB-Service                        |

---

## 🚀 Deployments

- **Frontend**: [https://mangashop-frontend.onrender.com](https://mangashop-frontend.onrender.com)
- **Backend**: [https://mangashop-backend.onrender.com](https://mangashop-backend.onrender.com)

---

## ✨ Hauptfunktionen

### 🔹 Für Benutzer
- Registrierung & Login
- Produkte durchsuchen, in Warenkorb legen & kaufen
- Eigene Profilansicht
- Blogbeiträge lesen

### 🔸 Für Admins
- Benutzer verwalten (CRUD)
- Produkte & Kategorien verwalten
- Blogbeiträge veröffentlichen & moderieren
- Bestellstatus verwalten
  
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

## 📦 Implementierte Use Cases (technisch)

| Use Case                         | Route/API                        | Policy       |
|----------------------------------|----------------------------------|--------------|
| Benutzer registrieren            | `POST /register`                | Öffentlich   |
| Benutzer anmelden                | `POST /login`                   | Öffentlich   |
| Profil anzeigen                  | `GET /profil`                   | isLoggedIn   |
| Produkte anzeigen/suchen        | `GET /produkte`                 | Öffentlich   |
| Blogbeiträge lesen              | `GET /blog/public`              | Öffentlich   |
| Produkte kaufen (Checkout)      | `POST /checkout`                | isLoggedIn   |
| Produkte verwalten              | `POST/PATCH/DELETE /produkt`    | isAdmin      |
| Kategorien verwalten            | `POST/PATCH/DELETE /kategorie`  | isAdmin      |
| Benutzer verwalten              | `GET/DELETE /benutzer/:id`      | isAdmin      |
| Blog verwalten                  | `POST/PATCH/DELETE /blog`       | isAdmin      |

---

## 🧠 Architektur

```txt
Frontend (Vue + Pinia)
│
├── REST API (Axios)
│
└── Backend (Sails.js)
     ├── Controller (z. B. Benutzer, Produkt)
     ├── Services
     ├── Policies (isLoggedIn, isAdmin)
     └── MongoDB (User, Produkt, Bestellung, etc.)
```
---

## 🛠 Optimierungen

### 🔍 SEO
- Dynamische `<title>` via [`vue-meta`](https://github.com/nuxt/vue-meta)
- Sitemap & `robots.txt`
- Sprechende URLs (z. B. `/produkt/naruto-1` statt `/produkt/123`)

### ⚡ Performance
- Lazy Loading von Komponenten
- API-Paging bei Listen
- Bildoptimierung (z. B. via `loading="lazy"`)
- Minimiertes JavaScript/CSS-Bundle (via Vite)

### 🔐 Sicherheit
- Passwort-Hashing mit `bcrypt`
- Session-Management für Authentifizierung
- Zugriffskontrolle über Policies (`isAdmin`, `isLoggedIn`, `isOwnerOrAdmin`)

### 📱 Responsiveness & UI/UX
- Mobile-First Design mit Tailwind CSS & Bootstrap
- Intuitive Navigation & Benutzerführung
- Komponentenbasierte UI-Struktur

---

## 🖼 Mockups / Wireflows

- [Figma Wireframes & Design](https://www.figma.com/design/L1eFVP79NdbG1Zg5JfPtdr/Wireflow-User-DB?node-id=3-2)

---

## 🚀 Projekt starten

### Voraussetzungen
- Node.js (v16+ empfohlen)
- npm
- MongoDB lokal oder remote (z. B. MongoDB Atlas)
- 
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
