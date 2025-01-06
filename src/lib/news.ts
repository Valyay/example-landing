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

export function getAllNews(): NewsMeta[] {
	const articleFolders = fs
		.readdirSync(newsDirectory)
		.filter((folder) =>
			fs.statSync(path.join(newsDirectory, folder)).isDirectory(),
		);

	const allNews = articleFolders.map((folderName) => {
		const articlePath = path.join(newsDirectory, folderName, "article.md");
		const assetsPath = path.join(
			newsDirectory,
			folderName,
			"assets",
			"title.png",
		);

		if (!fs.existsSync(articlePath)) {
			throw new Error(`Файл статьи не найден: ${articlePath}`);
		}

		const fileContent = fs.readFileSync(articlePath, "utf-8");
		const { data } = matter(fileContent);

		const imageUrl = fs.existsSync(assetsPath)
			? `/${folderName}/assets/title.png`
			: undefined;

		return {
			slug: folderName,
			title: data.title || "Без названия",
			excerpt: data.excerpt || "Без описания",
			date: data.date || "Неизвестная дата",
			imageUrl,
		} as NewsMeta;
	});

	return allNews;
}

export function getNewsBySlug(slug: string): NewsContent {
	const folderPath = path.join(newsDirectory, slug);
	const articlePath = path.join(folderPath, "article.md");
	const assetsPath = path.join(folderPath, "assets", "title.png");

	if (!fs.existsSync(articlePath)) {
		throw new Error(`Файл статьи не найден: ${articlePath}`);
	}

	const fileContent = fs.readFileSync(articlePath, "utf-8");
	const { data, content } = matter(fileContent);

	const imageUrl = fs.existsSync(assetsPath)
		? `/${slug}/assets/title.png`
		: undefined;

	return {
		slug,
		title: data.title || "Без названия",
		excerpt: data.excerpt || "Без описания",
		date: data.date || "Неизвестная дата",
		imageUrl,
		content,
	} as NewsContent;
}
