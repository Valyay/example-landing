import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNews, NewsMeta } from "@/lib/news";

export default function Page() {
	const news = getAllNews();

	return (
		<div className="mx-auto max-w-3xl px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold">Latest News</h1>
			<ul className="space-y-6">
				{news.map((item: NewsMeta) => (
					<li key={item.slug} className="rounded-lg bg-white p-4 shadow">
						<div className="mb-4">
							<Image
								src={item.imageUrl}
								alt={item.title}
								width={800}
								height={400}
								className="rounded-md"
							/>
						</div>

						<h2 className="mb-2 text-xl font-semibold">{item.title}</h2>

						<p className="mb-2 text-gray-700">{item.excerpt}</p>

						<span className="mb-4 block text-sm text-gray-500">
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
