import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
		settings: {
			next: {
				rootDir: "./src",
			},
		},
	}),
	...eslintPluginTailwind.configs["flat/recommended"],
];

export default eslintConfig;
