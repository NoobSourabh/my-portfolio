import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

if (!basePath) {
  console.log('No NEXT_PUBLIC_BASE_PATH set — skipping export path prefix.');
  process.exit(0);
}

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.txt', '.webmanifest']);

export function prefixExportContent(content) {
  const bp = basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return content
    .replace(
      /\b(src|href|poster|content|action)=(["'])\/(?!\/)(?!myportfolio\/)/gi,
      (_, attr, quote) => `${attr}=${quote}${basePath}/`,
    )
    .replace(/url\((["']?)\/(?!\/)(?!myportfolio\/)/g, (_, quote) => `url(${quote}${basePath}/`)
    .replace(/\bfetch\((["'])\/(?!\/)(?!myportfolio\/)/g, (_, quote) => `fetch(${quote}${basePath}/`)
    .replace(/(["'])\/(?!\/)(?!myportfolio\/)/g, (_, quote) => `${quote}${basePath}/`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!textExtensions.has(ext)) {
      continue;
    }

    const original = fs.readFileSync(fullPath, 'utf8');
    const updated = prefixExportContent(original);

    if (updated !== original) {
      fs.writeFileSync(fullPath, updated);
    }
  }
}

walk(outDir);
console.log(`Prefixed root-relative asset paths in out/ with ${basePath}`);
