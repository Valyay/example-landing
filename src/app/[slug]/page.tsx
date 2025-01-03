import React from "react";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import Image from "next/image";

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
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-4">{article.title}</h1>
			<div className="mb-6 text-gray-600">
				<span className="text-sm mr-2">{article.date}</span>
			</div>

			<div className="mb-6">
				<Image
					src={article.imageUrl}
					alt={article.title}
					width={800}
					height={400}
					className="rounded-md"
				/>
			</div>

			<article className="prose prose-base whitespace-pre-wrap">
				{article.content}
			</article>
		</div>
	);
}
