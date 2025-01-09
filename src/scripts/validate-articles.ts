#!/usr/bin/env ts-node
/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { IMAGE_EXTENSIONS } from "../constants";

const CONTENT_DIR = path.join(__dirname, "../content/news");
const VALID_FOLDER_NAME = /^[a-z0-9-]+$/;
const VALID_DATE = /^\d{4}-\d{2}-\d{2}$/;

let errorCount = 0;

function reportError(message: string): void {
	console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
	errorCount += 1;
}

function validateFolderName(folderName: string): void {
	if (!VALID_FOLDER_NAME.test(folderName)) {
		reportError(
			`Folder name "${folderName}" is invalid. Use only lowercase letters, digits, and hyphens.`,
		);
	}
}

interface ArticleFrontMatter {
	title?: string;
	date?: string;
	description?: string;
}

function validateFrontMatter(
	frontMatter: ArticleFrontMatter,
	filePath: string,
): void {
	const { title, date, description } = frontMatter;

	if (!title) {
		reportError(`Missing "title" in front matter: ${filePath}`);
	}
	if (!date || !VALID_DATE.test(date)) {
		reportError(`Invalid or missing "date" in front matter: ${filePath}`);
	}
	if (!description) {
		reportError(`Missing "description" in front matter: ${filePath}`);
	}
}

function validateNoImagesOutsideAssets(folderPath: string): void {
	const topLevelFiles = fs.readdirSync(folderPath, { withFileTypes: true });

	for (const file of topLevelFiles) {
		// Skip the article.md file and the assets folder
		if (file.name === "article.md" || file.name === "assets") {
			continue;
		}
		// If it's a file (not a directory) with an image extension, error out
		if (file.isFile()) {
			const ext = path.extname(file.name).toLowerCase();
			if (IMAGE_EXTENSIONS.includes(ext)) {
				reportError(
					`Image file "${file.name}" is outside the "assets" folder. Move it into assets/.`,
				);
			}
		}
	}
}

function validateImagesInAssets(assetsPath: string): void {
	const items = fs.readdirSync(assetsPath, { withFileTypes: true });

	let titleImageCount = 0;

	for (const item of items) {
		if (!item.isFile()) {
			reportError(
				`Non-file item "${item.name}" found in "assets" folder: ${assetsPath}`,
			);
		}
		const ext = path.extname(item.name).toLowerCase();
		if (!IMAGE_EXTENSIONS.includes(ext)) {
			reportError(
				`Unsupported image extension "${ext}" in file: ${path.join(assetsPath, item.name)}`,
			);
		}

		// Check if filename starts with "title" (e.g. "title.jpg")
		const baseName = path.basename(item.name, ext).toLowerCase();
		if (baseName === "title") {
			titleImageCount += 1;
		}
	}

	// Exactly one title image is required
	if (titleImageCount === 0) {
		reportError(
			`Missing title image (title.jpg, title.png, etc.) in ${assetsPath}`,
		);
	} else if (titleImageCount > 1) {
		reportError(
			`Multiple title images found in ${assetsPath}. Only one "title.<ext>" allowed.`,
		);
	}
}

function validateArticleFolder(folderPath: string): void {
	const folderName = path.basename(folderPath);

	// Folder name
	validateFolderName(folderName);

	// Must contain article.md
	const articlePath = path.join(folderPath, "article.md");
	if (!fs.existsSync(articlePath)) {
		reportError(`Missing "article.md" in folder: ${folderName}`);
		return;
	}

	// Validate front matter
	const fileContent = fs.readFileSync(articlePath, "utf-8");
	const { data } = matter(fileContent) as { data: ArticleFrontMatter };
	validateFrontMatter(data, articlePath);

	// No images outside the assets folder
	validateNoImagesOutsideAssets(folderPath);

	const assetsPath = path.join(folderPath, "assets");
	if (fs.existsSync(assetsPath)) {
		validateImagesInAssets(assetsPath);
	} else {
		// reportError(`Missing "assets" folder in article folder: ${folderName}`);
	}
}

function main(): void {
	console.log("\x1b[34m[INFO]\x1b[0m Starting article validation...");

	if (!fs.existsSync(CONTENT_DIR)) {
		console.warn(
			'\x1b[33m[WARNING]\x1b[0m No "news" directory found. Skipping validation.',
		);
		process.exit(0);
	}

	const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
	const folders = entries
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	if (folders.length === 0) {
		console.warn(
			'\x1b[33m[WARNING]\x1b[0m No article folders found in "news" directory.',
		);
		process.exit(0);
	}

	folders.forEach((folder) => {
		const folderPath = path.join(CONTENT_DIR, folder);
		validateArticleFolder(folderPath);
	});

	if (errorCount > 0) {
		console.error(
			`\n\x1b[31m[FAIL]\x1b[0m Found ${errorCount} validation error${errorCount > 1 ? "s" : ""}.`,
		);
		process.exit(1);
	} else {
		console.log("\x1b[32m[SUCCESS]\x1b[0m All articles passed validation!");
	}
}

// Run the script if this file is executed directly
if (require.main === module) {
	main();
}
