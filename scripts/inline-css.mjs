import fs from 'fs';
import path from 'path';

const outDir = path.resolve('out');
const cssDir = path.join(outDir, '_next', 'static', 'css');

if (!fs.existsSync(outDir)) {
  console.error("out directory does not exist!");
  process.exit(1);
}

const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
if (cssFiles.length === 0) {
  console.error("No CSS files found in out/_next/static/css");
  process.exit(1);
}

const cssContent = fs.readFileSync(path.join(cssDir, cssFiles[0]), 'utf-8');
const indexPath = path.join(outDir, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf-8');

// Replace link tag with inline style tag
const styleTag = `<style>${cssContent}</style>`;
htmlContent = htmlContent.replace(/<link rel="stylesheet" href="\/_next\/static\/css\/[^"]*" data-precedence="next"\/>/, styleTag);

// Also convert any relative scripts/links if needed
fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log(`✓ Successfully inlined ${cssFiles[0]} into out/index.html!`);

// Copy to root index.html so double clicking root index.html works anywhere
const rootIndexPath = path.resolve('index.html');
fs.writeFileSync(rootIndexPath, htmlContent, 'utf-8');
console.log(`✓ Successfully updated root index.html for direct offline viewing!`);
