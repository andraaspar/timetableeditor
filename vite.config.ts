import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

const IS_DEV = true

// https://vite.dev/config/
export default defineConfig({
	mode: IS_DEV ? "development" : "production",

	base: "./",

	plugins: [svelte()],

	server: {
		port: 8080,
	},
})
