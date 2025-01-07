import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.gray.700"),

						h1: {
							color: theme("colors.gray.800"),
							fontWeight: theme("fontWeight.extrabold"),
							fontSize: theme("fontSize.4xl")[0],
							lineHeight: theme("lineHeight.tight"),
							marginBottom: theme("spacing.4"),
						},
						h2: {
							color: theme("colors.gray.800"),
							fontWeight: theme("fontWeight.bold"),
							fontSize: theme("fontSize.3xl")[0],
							lineHeight: theme("lineHeight.tight"),
							marginTop: theme("spacing.8"),
							marginBottom: theme("spacing.4"),
						},
						h3: {
							color: theme("colors.gray.900"),
							fontWeight: theme("fontWeight.semibold"),
							fontSize: theme("fontSize.2xl")[0],
							marginTop: theme("spacing.6"),
							marginBottom: theme("spacing.2"),
						},
						p: {
							marginTop: theme("spacing.2"),
							marginBottom: theme("spacing.4"),
							lineHeight: theme("lineHeight.relaxed"),
							fontSize: theme("fontSize.base")[0],
						},
						a: {
							color: theme("colors.blue.600"),
							fontWeight: theme("fontWeight.medium"),
							textDecoration: "none",
							"&:hover": {
								textDecoration: "underline",
							},
						},
						blockquote: {
							color: theme("colors.gray.500"),
							borderLeftWidth: theme("borderWidth.4"),
							borderLeftColor: theme("colors.gray.400"),
							paddingLeft: theme("spacing.4"),
							fontStyle: "italic",
							marginTop: theme("spacing.4"),
							marginBottom: theme("spacing.4"),
						},
						code: {
							color: theme("colors.amber.600"),
							backgroundColor: theme("colors.gray.50"),
							padding: `${theme("spacing.1")} ${theme("spacing.2")}`,
							borderRadius: theme("borderRadius.md"),
							fontSize: theme("fontSize.sm")[0],
						},
						pre: {
							backgroundColor: theme("colors.gray.800"),
							color: theme("colors.gray.50"),
							padding: theme("spacing.4"),
							borderRadius: theme("borderRadius.lg"),
							overflowX: "auto",
							fontSize: theme("fontSize.sm")[0],
							lineHeight: theme("lineHeight.snug"),
						},
						ul: {
							listStyleType: "disc",
							paddingLeft: theme("spacing.6"),
							marginTop: theme("spacing.4"),
							marginBottom: theme("spacing.4"),
						},
						ol: {
							listStyleType: "decimal",
							paddingLeft: theme("spacing.6"),
							marginTop: theme("spacing.4"),
							marginBottom: theme("spacing.4"),
						},
						li: {
							marginTop: theme("spacing.1"),
							marginBottom: theme("spacing.1"),
							fontSize: theme("fontSize.base")[0],
						},
						strong: {
							fontWeight: theme("fontWeight.bold"),
						},
					},
				},
			}),
		},
	},
	plugins: [typography],
};

export default config;
