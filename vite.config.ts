import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Delete from "rollup-plugin-delete";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		vue(),
		dts({
			outputDir: "dist",
			staticImport: true,
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "aegis-odyssey",
			fileName: (format) => `aegis-odyssey.${format}.js`,
		},
		rollupOptions: {
			external: ["vue", "ElementPlus"],
			output: {
				globals: {
					vue: "Vue",
					ElementPlus: "ElementPlus",
				},
			},
			plugins: [
				Delete({
					targets: ["dist/*.{ico,svg}"],
					hook: "generateBundle",
				}),
			],
		},
	},
});
