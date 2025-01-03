import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NewsMeta {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	imageUrl: string;
}

interface NewsContent extends NewsMeta {
	content: string;
}

const newsDirectory = path.join(process.cwd(), "src", "content", "news");

export function getAllNews(): NewsMeta[] {
	const filenames = fs
		.readdirSync(newsDirectory)
		.filter((file) => file.endsWith(".md"));

	const allNews = filenames.map((filename) => {
		const filePath = path.join(newsDirectory, filename);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(fileContent);

		const slug = filename.replace(/\.md$/, "");

		return {
			slug,
			title: data.title,
			excerpt: data.excerpt,
			date: data.date,
			imageUrl: data.imageUrl,
		} as NewsMeta;
	});

	return allNews.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getNewsBySlug(slug: string): NewsContent {
	const filePath = path.join(newsDirectory, `${slug}.md`);

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	return {
		slug,
		title: data.title,
		excerpt: data.excerpt,
		date: data.date,
		imageUrl: data.imageUrl,
		content,
	} as NewsContent;
}
