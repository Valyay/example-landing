import path from "node:path";

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
	`prettier --write ${filenames.join(" ")}`;

const buildTscCommand = () => `tsc -p tsconfig.json --noEmit`;

const buildCheckArticlesCommand = () => `pnpm run check-articles`;

const config = {
	"*.{ts,tsx}": [buildTscCommand, buildPrettierCommand],
	"*.{js,mjs,jsx}": [buildPrettierCommand, buildEslintCommand],
	"*.{json,md,mdx,html,css}": [buildPrettierCommand],
	"src/content/news/**/*": [buildCheckArticlesCommand],
};

export default config;
