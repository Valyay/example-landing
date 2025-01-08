import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNews, NewsMeta } from "@/lib/news";

export default function Page() {
	const news = getAllNews();

	return (
		<>
			<h1 className="mb-6 text-4xl font-bold">Latest News</h1>
			<ul className="space-y-6">
				{news.map((item: NewsMeta) => (
					<li key={item.slug}>
						<Link
							href={`/${item.slug}`}
							className="block rounded-lg bg-white p-4 shadow transition-[transform,box-shadow] duration-200 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
							<h2 className="mb-2 text-2xl font-semibold">{item.title}</h2>
							{item.image ? (
								<div className="mb-6">
									<Image
										src={item.image.url}
										alt={item.title}
										width={800}
										height={400}
										className="rounded-md"
									/>
								</div>
							) : (
								<div className="mb-6 h-[400px] rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"></div>
							)}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
