import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NewsMeta {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	imageUrl?: string;
}

export interface NewsContent extends NewsMeta {
	content: string;
}

const newsDirectory = path.join(process.cwd(), "src", "content", "news");

const publicImageBasePath = "/images";

function findImage(slug: string): string | undefined {
	const publicImagePath = path.join("public", "images", slug, "assets");
	const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"];

	for (const ext of imageExtensions) {
		const imagePath = path.join(publicImagePath, `title${ext}`);
		if (fs.existsSync(imagePath)) {
			return `${publicImageBasePath}/${slug}/assets/title${ext}`;
		}
	}
	return undefined;
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

		const imageUrl = findImage(folderName);

		return {
			slug: folderName,
			title: data.title || "Untitled",
			excerpt: data.excerpt || "No description",
			date: data.date || "Unknown date",
			imageUrl,
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

	const imageUrl = findImage(slug);

	return {
		slug,
		title: data.title || "Untitled",
		excerpt: data.excerpt || "No description",
		date: data.date || "Unknown date",
		imageUrl,
		content,
	} as NewsContent;
}
