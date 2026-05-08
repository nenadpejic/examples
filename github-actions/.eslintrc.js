export default [
	{
		ignores: ["dist/**/*", "node_modules/**/*", "coverage/**/*"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: require("@typescript-eslint/parser"),
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				React: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
			react: require("eslint-plugin-react"),
			"react-hooks": require("eslint-plugin-react-hooks"),
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/explicit-function-return-types": "off",
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
