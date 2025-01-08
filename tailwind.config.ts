import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import typographyConfig from "./typography-config";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			typography: typographyConfig,
		},
	},
	plugins: [typography],
};

export default config;
