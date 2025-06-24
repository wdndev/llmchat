import { createApp } from "vue";
import { createPinia} from 'pinia'

import App from "@/renderer/App.vue";
import "./index.css";
import { i18n } from '@/renderer/i18n'
import router from '@/renderer/router'


const app = createApp(App);
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount("#app");
