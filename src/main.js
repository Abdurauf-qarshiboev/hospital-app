import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import notification from "@/components/layouts/notification.vue"
const app = createApp(App)
app.use(router)
app.mount('#app')
