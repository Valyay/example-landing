import React from "react";
import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-white shadow">
			<div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
				<Link
					href="/"
					className="text-xl font-semibold text-gray-800 hover:text-blue-600">
					MyWebsite
				</Link>
			</div>
		</header>
	);
}
