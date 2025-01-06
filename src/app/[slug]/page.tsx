import React from "react";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import Image from "next/image";
import md from "markdown-it";

export async function generateStaticParams() {
	const news = getAllNews();
	return news.map((item) => ({ slug: item.slug }));
}

export default async function NewPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = getNewsBySlug(slug);

	return (
		<>
			<h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
			<div className="mb-6 text-gray-600">
				<span className="mr-2 text-sm">{article.date}</span>
			</div>

			{article.imageUrl ? (
				<div className="mb-6">
					<Image
						src={article.imageUrl}
						alt={article.title}
						width={800}
						height={400}
						className="rounded shadow"
					/>
				</div>
			) : (
				<p className="italic text-gray-500">Image does not exist</p>
			)}

			<article
				dangerouslySetInnerHTML={{ __html: md().render(article.content) }}
				className="prose prose-base whitespace-pre-wrap"></article>
		</>
	);
}
