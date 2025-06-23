import { createApp } from "vue";
import App from "@/renderer/App.vue";
import "../types";
import "./index.css";


const app = createApp(App);
app.mount("#app");
