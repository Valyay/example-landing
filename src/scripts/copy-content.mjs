import fs from "fs";
import path from "path";

function deleteFolderSync(folderPath) {
	if (fs.existsSync(folderPath)) {
		fs.rmSync(folderPath, { recursive: true, force: true });
		console.log(`Deleted folder: ${folderPath}`);
	}
}

function copyImagesSync(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyImagesSync(srcPath, destPath);
		} else {
			if (/\.(png|jpg|jpeg|webp|gif)$/i.test(entry.name)) {
				fs.copyFileSync(srcPath, destPath);
				console.log(`Copied image: ${srcPath} -> ${destPath}`);
			}
		}
	}
}

function copyImages() {
	const srcDir = path.join(process.cwd(), "src", "content", "news");
	const destDir = path.join(process.cwd(), "public", "images");

	deleteFolderSync(destDir);

	if (!fs.existsSync(srcDir)) {
		console.error(`Source directory not found: ${srcDir}`);
		process.exit(1);
	}

	console.log(`Copying images from ${srcDir} to ${destDir}...`);
	copyImagesSync(srcDir, destDir);
	console.log("Image copy completed!");
}

copyImages();
