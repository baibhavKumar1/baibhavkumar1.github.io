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

// Remove docs directory if present to keep root clean
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}

console.log("Successfully exported static build to root (/) with .nojekyll for GitHub Pages!");
