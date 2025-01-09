import fs from "fs";
import path from "path";
import matter from "gray-matter";
import imageSize from "image-size";
import { IMAGE_EXTENSIONS } from "../constants";

export interface NewsMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	titleImage?: {
		url: string;
		width: number;
		height: number;
	};
	otherImages?: {
		url: string;
		width: number;
		height: number;
	}[];
}

export interface NewsContent extends NewsMeta {
	content: string;
}

const publicImageBasePath = "/images";
const newsDirectory = path.join(process.cwd(), "src", "content", "news");

function getImageDimensions(imagePath: string) {
	const { width, height } = imageSize(imagePath);
	return { width: width || 0, height: height || 0 };
}

function replaceLocalAssetsPath(content: string, slug: string): string {
	const pattern = /\]\(\.\/assets\//g;
	return content.replace(pattern, `](${publicImageBasePath}/${slug}/assets/`);
}

function findTitleImage(
	slug: string,
): { url: string; width: number; height: number } | undefined {
	const publicImagePath = path.join("public", "images", slug, "assets");

	if (!fs.existsSync(publicImagePath)) {
		return undefined;
	}

	for (const ext of IMAGE_EXTENSIONS) {
		const imagePath = path.join(publicImagePath, `title${ext}`);
		if (fs.existsSync(imagePath)) {
			const { width, height } = getImageDimensions(imagePath);
			return {
				url: `${publicImageBasePath}/${slug}/assets/title${ext}`,
				width,
				height,
			};
		}
	}

	return undefined;
}

function findOtherImages(
	slug: string,
): { url: string; width: number; height: number }[] {
	const publicImagePath = path.join("public", "images", slug, "assets");
	const images: { url: string; width: number; height: number }[] = [];

	if (!fs.existsSync(publicImagePath)) {
		return images;
	}

	const files = fs.readdirSync(publicImagePath);
	for (const file of files) {
		const ext = path.extname(file).toLowerCase();

		if (!IMAGE_EXTENSIONS.includes(ext)) {
			continue;
		}

		if (file.toLowerCase().startsWith("title")) {
			continue;
		}

		const fullPath = path.join(publicImagePath, file);
		if (fs.existsSync(fullPath)) {
			const { width, height } = getImageDimensions(fullPath);
			images.push({
				url: `${publicImageBasePath}/${slug}/assets/${file}`,
				width,
				height,
			});
		}
	}

	return images;
}

export function getAllNews(): NewsMeta[] {
	const articleFolders = fs
		.readdirSync(newsDirectory)
		.filter((folder) =>
			fs.statSync(path.join(newsDirectory, folder)).isDirectory(),
		);

	const allNews = articleFolders.map((slug) => {
		const articlePath = path.join(newsDirectory, slug, "article.md");

		if (!fs.existsSync(articlePath)) {
			throw new Error(`Article file not found: ${articlePath}`);
		}

		const fileContent = fs.readFileSync(articlePath, "utf-8");
		const { data } = matter(fileContent);
		const titleImage = findTitleImage(slug);
		const otherImages = findOtherImages(slug);
		return {
			slug,
			description: data.description || "Description",
			title: data.title || "Untitled",
			date: data.date || "Unknown date",
			titleImage,
			otherImages,
		} as NewsMeta;
	});

	return allNews;
}

export function getNewsBySlug(slug: string): NewsContent {
	const folderPath = path.join(newsDirectory, slug);
	const articlePath = path.join(folderPath, "article.md");

	if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
		throw new Error(`Folder not found or not a directory: ${folderPath}`);
	}

	if (!fs.existsSync(articlePath)) {
		throw new Error(`Article file not found: ${articlePath}`);
	}

	const fileContent = fs.readFileSync(articlePath, "utf-8");
	const { data, content } = matter(fileContent);
	const titleImage = findTitleImage(slug);
	const otherImages = findOtherImages(slug);
	const updatedContent = replaceLocalAssetsPath(content, slug);

	return {
		slug,
		title: data.title || "Untitled",
		description: data.description || "Description",
		date: data.date || "Unknown date",
		titleImage,
		otherImages,
		content: updatedContent,
	} as NewsContent;
}
