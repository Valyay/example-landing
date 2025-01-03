import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNews, NewsMeta } from "@/lib/news";

export default function Page() {
	const news = getAllNews();

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Latest News</h1>
			<ul className="space-y-6">
				{news.map((item: NewsMeta) => (
					<li key={item.slug} className="bg-white rounded-lg shadow p-4">
						<div className="mb-4">
							<Image
								src={item.imageUrl}
								alt={item.title}
								width={800}
								height={400}
								className="rounded-md"
							/>
						</div>

						<h2 className="text-xl font-semibold mb-2">{item.title}</h2>

						<p className="text-gray-700 mb-2">{item.excerpt}</p>

						<span className="text-gray-500 text-sm block mb-4">
							{item.date}
						</span>

						<Link
							href={`/${item.slug}`}
							className="text-blue-600 hover:underline">
							Read more
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
