import type { NewsMeta } from "@/lib/news";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const NewsItem: FC<{ item: NewsMeta }> = ({ item }) => (
	<li className="flex flex-col">
		<Link
			href={`/${item.slug}`}
			className="flex h-full flex-col rounded-lg bg-white p-4 shadow transition-[transform,box-shadow] duration-200 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
			<h2 className="mb-2 grow text-2xl font-semibold text-gray-800 sm:text-xl">
				{item.title}
			</h2>
			<div className="relative aspect-[16/9]">
				{item.titleImage ? (
					<Image
						src={item.titleImage.url}
						alt={item.title}
						fill
						className="rounded-md object-cover"
					/>
				) : (
					<div className="h-full rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"></div>
				)}
			</div>
		</Link>
	</li>
);
