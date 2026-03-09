import { createApp } from "vue";
import { createPinia } from "pinia";
import { useGameStore } from "./stores/gameStore";

import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
useGameStore();
