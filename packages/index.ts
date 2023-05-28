// import Box from "./box/index.vue";

// export { Box };

// export { default as Box } from "./box/index.vue";

import type { App } from "vue";
import * as components from "./components/index";
// import { Person, type PersonOptsType } from "./js/person";

export const Odyssey = {
	install: (app: App) => {
		for (const i in components) {
			app.component(i, (<any>components)[i]);
		}
	},
};

// export { Person, type PersonOptsType };
