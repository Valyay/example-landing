import fs from "fs";
import path from "path";
import { IMAGE_EXTENSIONS } from "../constants";

function deleteFolderSync(folderPath: string) {
	if (fs.existsSync(folderPath)) {
		fs.rmSync(folderPath, { recursive: true, force: true });
		console.log(`Deleted folder: ${folderPath}`);
	}
}

function copyImagesSync(src: string, dest: string) {
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
			if (
				IMAGE_EXTENSIONS.some((ext) => entry.name.toLowerCase().endsWith(ext))
			) {
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
