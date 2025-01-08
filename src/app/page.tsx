import React from "react";
import { getAllNews, NewsMeta } from "@/lib/news";
import { NewsItem } from "@/components/NewsItem";

export default function Page() {
	const news = getAllNews();

	return (
		<>
			<h1 className="mb-8 text-center text-4xl font-bold sm:text-left">
				Latest News
			</h1>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{news.map((item: NewsMeta) => (
					<NewsItem key={item.slug} item={item} />
				))}
			</ul>
		</>
	);
}
