import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
	{
		ignores: [
			"coverage/**",
			"dist/**",
			"node_modules/**"
		]
	},
	js.configs.recommended,
	{
		files: ["*.js", "scripts/**/*.mjs", "src/**/*.{js,jsx}", "test/**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser,
				...globals.es2024,
				...globals.node
			}
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			],
			"react-refresh/only-export-components": "off"
		}
	},
	{
		files: ["test/**/*.{js,jsx}"],
		languageOptions: {
			globals: {
				...globals.jest
			}
		}
	}
];
