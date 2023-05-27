import type { App } from "vue";
import * as components from "./index";
import { Person, type PersonOptsType } from "./js/person";

export const Odyssey = {
	install: (app: App) => {
		for (const i in components) {
			app.component(i, (<any>components)[i]);
		}
	},
};

export { Person, type PersonOptsType };
