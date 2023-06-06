import { createApp } from "vue";
import type { Component } from "vue";
import App from "./App.vue";
// UI
import ElementPlus from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
// 本地样式
import "./style/index.less";
// 本地源代码调试
import { Odyssey } from "../";
// 本地编译后调试
// import "../../dist/style.css";
// import { Odyssey } from "../../dist/aegis-odyssey.es.js";
// npm正式发布后调试

// icon
const app = createApp(App);
const obj: { [key: string]: Component } = ElIcons;
for (const i in obj) {
	app.component(i, obj[i]);
}

app.use(ElementPlus).use(Odyssey).mount("#app");
