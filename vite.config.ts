import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import Delete from "rollup-plugin-delete";
import vitePluginDts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueSetupExtend(),
		vitePluginDts({
			outputDir: "dist",
			staticImport: true,
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "packages/entry.ts"),
			name: "aegis-odyssey",
			fileName: (format) => `aegis-odyssey.${format}.js`,
		},
		rollupOptions: {
			// 把不想打包进你的包的包排除掉
			external: ["vue"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
				},
			},
			plugins: [
				// 在build之后，再删除dist下面的.ico或.svg文件。项目里面/public下面的静态资源就可以不用编译进去了
				Delete({
					targets: ["dist/*.{ico,svg}"],
					hook: "generateBundle",
				}),
			],
		},
	},
});
