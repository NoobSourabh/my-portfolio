import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function depthFromComponents(filePath) {
  return path.relative(componentsDir, filePath).split(path.sep).length;
}

for (const filePath of walk(componentsDir)) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('src="/images/')) {
    continue;
  }

  const updated = content.replace(
    /src="(\/images\/[^"]+)"/g,
    (_, assetPath) => `src={withBasePath('${assetPath}')}`,
  );

  if (updated === content) {
    continue;
  }

  let next = updated;
  const sitePathsImport = /import \{([^}]*)\} from '((?:\.\.\/)+lib\/site-paths)';/;

  if (sitePathsImport.test(next)) {
    next = next.replace(sitePathsImport, (_, imports, modulePath) => {
      if (imports.includes('withBasePath')) {
        return `import {${imports}} from '${modulePath}';`;
      }
      const trimmed = imports.trim().replace(/,\s*$/, '');
      return `import { ${trimmed}, withBasePath } from '${modulePath}';`;
    });
  } else {
    const importLine =
      depthFromComponents(filePath) > 2
        ? "import { withBasePath } from '../../../lib/site-paths';"
        : "import { withBasePath } from '../../lib/site-paths';";
    next = `${importLine}\n\n${next.replace(/^\n+/, '')}`;
  }

  fs.writeFileSync(filePath, next);
  console.log(`Updated ${path.relative(process.cwd(), filePath)}`);
}
