import type { App, Component } from "vue";
import * as components from "./components";
import { Person, type PersonOptsType } from "./js/person";

const obj: { [key: string]: Component } = components;

export const Odyssey = {
	install: (app: App) => {
		for (const i in obj) {
			app.component(i, obj[i]);
		}
	},
};

export { Person, type PersonOptsType };
