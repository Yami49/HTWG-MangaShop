import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// ✅ API-Base konfigurieren
axios.defaults.baseURL =
  import.meta.env.PROD ? '/' : 'http://localhost:1337'
axios.defaults.withCredentials = true

// (Optional) in globalProperties verfügbar machen
// app.config.globalProperties.$axios = axios

console.log(`>> Mode: ${import.meta.env.MODE}`)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
