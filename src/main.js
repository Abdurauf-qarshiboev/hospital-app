import '@/assets/main.css'
import VueCookies from "vue-cookies";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import notification from "@/components/layouts/notification.vue"
import headPart from './components/layouts/headPart.vue'
import defaultInput from "./components/layouts/defaultInput.vue"; 
import selectList from "./components/layouts/selectList.vue";
import modalDialog from "./components/dashboard/modalDialog.vue";
import confirmDialog from "@/components/dashboard/confirmDialog.vue";
import phoneInput from "./components/layouts/phoneInput.vue";

const app = createApp(App)

app.component("el-phone", phoneInput);
app.component("el-input", defaultInput);
app.component("el-select", selectList);
app.component("el-dialog", modalDialog);
app.component("el-confirm", confirmDialog);
app.component('notification',notification)
app.component('headPart', headPart)

app.use(router)
app.use(VueCookies, { expires: "1d" });

import { store } from "./store";
app.use(store);

app.mount('#app')
