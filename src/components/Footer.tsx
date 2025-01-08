export default function Footer() {
	return (
		<footer className="mt-8 bg-gray-50">
			<div className="mx-auto max-w-screen-xl p-4 text-right text-sm text-gray-600">
				© {new Date().getFullYear()} MyWebsite. All rights reserved.
			</div>
		</footer>
	);
}
