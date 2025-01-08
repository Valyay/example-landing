import React from "react";
import { getAllNews, NewsMeta } from "@/lib/news";
import { NewsItem } from "@/components/NewsItem";

export default function Page() {
	const news = getAllNews();

	return (
		<>
			<h1 className="mb-6 text-4xl font-bold">Latest News</h1>
			<ul className="space-y-6">
				{news.map((item: NewsMeta) => (
					<NewsItem key={item.slug} item={item} />
				))}
			</ul>
		</>
	);
}
