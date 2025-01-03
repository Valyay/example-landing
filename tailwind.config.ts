import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("@tailwindcss/typography")],
};

export default config;
