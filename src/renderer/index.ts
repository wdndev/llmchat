/// <reference path="../types/index.ts" />
import { createApp } from "vue";
import App from "@/renderer/App.vue";
import "./index.css";

const app = createApp(App);
app.mount("#app");
