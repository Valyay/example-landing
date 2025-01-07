import React from "react";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import Image from "next/image";
import MarkdownContent from "@/components/MarkdownContent";

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

			{article.image && (
				<div className="mb-6">
					<Image
						src={article.image.url}
						alt={article.title}
						width={article.image.width}
						height={article.image.height}
						className="rounded shadow"
					/>
				</div>
			)}

			<article>
				<MarkdownContent content={article.content} />
			</article>
		</>
	);
}
