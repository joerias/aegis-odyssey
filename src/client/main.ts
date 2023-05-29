import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.less";
// 本地源代码调试
import { Odyssey } from "../";
// 本地编译后调试
// import "../../dist/style.css";
// import { Odyssey } from "../../dist/aegis-odyssey.es.js";
// npm正式发布后调试

createApp(App).use(Odyssey).mount("#app");
