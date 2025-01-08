import fs from "fs";
import path from "path";
import matter from "gray-matter";
import imageSize from "image-size";

export interface NewsMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	image?: {
		url: string;
		width: number;
		height: number;
	};
}

export interface NewsContent extends NewsMeta {
	content: string;
}

const publicImageBasePath = "/images";
const newsDirectory = path.join(process.cwd(), "src", "content", "news");
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"];

function getImageDimensions(imagePath: string): {
	width: number;
	height: number;
} {
	const { width, height } = imageSize(imagePath);
	return { width: width || 0, height: height || 0 };
}

function findImage(slug: string):
	| {
			url: string;
			width: number;
			height: number;
	  }
	| undefined {
	const publicImagePath = path.join("public", "images", slug, "assets");

	for (const ext of imageExtensions) {
		const imagePath = path.join(publicImagePath, `title${ext}`);
		if (fs.existsSync(imagePath)) {
			const dimensions = getImageDimensions(imagePath);
			if (dimensions) {
				return {
					url: `${publicImageBasePath}/${slug}/assets/title${ext}`,
					width: dimensions.width,
					height: dimensions.height,
				};
			}
		}
	}
}

export function getAllNews(): NewsMeta[] {
	const articleFolders = fs
		.readdirSync(newsDirectory)
		.filter((folder) =>
			fs.statSync(path.join(newsDirectory, folder)).isDirectory(),
		);

	const allNews = articleFolders.map((folderName) => {
		const articlePath = path.join(newsDirectory, folderName, "article.md");

		if (!fs.existsSync(articlePath)) {
			throw new Error(`Article file not found: ${articlePath}`);
		}

		const fileContent = fs.readFileSync(articlePath, "utf-8");
		const { data } = matter(fileContent);

		const image = findImage(folderName);

		return {
			slug: folderName,
			description: data.description || "Description",
			title: data.title || "Untitled",
			date: data.date || "Unknown date",
			image,
		} as NewsMeta;
	});

	return allNews;
}

export function getNewsBySlug(slug: string): NewsContent {
	const folderPath = path.join(newsDirectory, slug);
	const articlePath = path.join(folderPath, "article.md");

	if (!fs.existsSync(articlePath)) {
		throw new Error(`Article file not found: ${articlePath}`);
	}

	const fileContent = fs.readFileSync(articlePath, "utf-8");
	const { data, content } = matter(fileContent);

	const image = findImage(slug);

	return {
		slug,
		title: data.title || "Untitled",
		description: data.description || "Description",
		date: data.date || "Unknown date",
		image,
		content,
	} as NewsContent;
}
