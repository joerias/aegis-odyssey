import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.less";
// import { Odyssey } from "../packages/entry";
import "../dist/style.css";
import { Odyssey } from "../dist/aegis-odyssey.es.js";

createApp(App).use(Odyssey).mount("#app");
