import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
			exclude: [
				"node_modules/",
				"vite.config.ts",
				"src/test/setup.ts",
				"**/*.d.ts",
			],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
	},
});
