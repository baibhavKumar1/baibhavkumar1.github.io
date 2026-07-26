import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "out");
const docsDir = path.join(rootDir, "docs");

// Ensure .nojekyll in out
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

// Copy static export from out/ to root
fs.copyFileSync(path.join(outDir, "index.html"), path.join(rootDir, "index.html"));
fs.copyFileSync(path.join(outDir, "404.html"), path.join(rootDir, "404.html"));
fs.copyFileSync(path.join(outDir, ".nojekyll"), path.join(rootDir, ".nojekyll"));

const outNext = path.join(outDir, "_next");
const rootNext = path.join(rootDir, "_next");

if (fs.existsSync(outNext)) {
  if (fs.existsSync(rootNext)) {
    fs.rmSync(rootNext, { recursive: true, force: true });
  }
  fs.cpSync(outNext, rootNext, { recursive: true });
}

// Remove docs directory if present
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}

// FIX: Convert ALL absolute /_next/ asset paths to relative ./_next/ asset paths across all static HTML & JS files
// This guarantees CSS & JS load cleanly on GitHub Pages, file://, or any subpath hosting!
["index.html", "404.html"].forEach((file) => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replaceAll('href="/_next/', 'href="./_next/');
    content = content.replaceAll('src="/_next/', 'src="./_next/');
    content = content.replaceAll('"/_next/', '"./_next/');
    content = content.replaceAll('\\"/_next/', '\\"./_next/');
    fs.writeFileSync(filePath, content);
  }
});

console.log("Successfully exported static build to root (/) with fully resolved relative asset paths & .nojekyll!");
