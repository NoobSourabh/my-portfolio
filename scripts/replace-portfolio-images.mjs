import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const cardSizes = '(max-width: 809px) 100vw, 50vw';
const aboutGallerySizes =
  '(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw';

const cardImages = [
  ['moji.png', 'moji.webp', 'Moji AI Motion Graphics'],
  ['aifilms.png', 'aifilms.webp', 'AI Films Responsive Landing Page'],
  ['banana.png', 'banana.webp', 'Banana Shake Landing Page & Chrome Extension'],
  ['sprout.png', 'sprout.webp', 'Sprout AI Brain'],
];

const imgStyle =
  'style={{ "display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover" }}';

function cardReplacement(png, webp, alt, { lazy = true, priority = false } = {}) {
  const lazyAttr = lazy ? ' loading="lazy"' : '';
  const from = `<img decoding="async"${lazyAttr} width="1232" height="928" src="/images/${png}" alt="${alt}" ${imgStyle} />`;
  const priorityAttr = priority ? ' priority' : '';
  const to = `<OptimizedImage src="/images/${webp}" alt="${alt}" sizes="${cardSizes}"${priorityAttr} />`;
  return [from, to];
}

function aboutGalleryReplacement(png, webp, alt) {
  const from = `<img decoding="async" loading="lazy" width="1232" height="928" sizes="${aboutGallerySizes}" src="/images/${png}" alt="${alt}" ${imgStyle} />`;
  const to = `<OptimizedImage src="/images/${webp}" alt="${alt}" sizes="${aboutGallerySizes}" />`;
  return [from, to];
}

function transformFile(relativePath, replacements, { addImport = true } = {}) {
  const filePath = path.join(root, relativePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (!changed) {
    console.log(`No changes: ${relativePath}`);
    return;
  }

  if (addImport && !content.includes("import OptimizedImage from '../OptimizedImage'") && !content.includes("import OptimizedImage from '../../OptimizedImage'")) {
    const importPath = relativePath.startsWith('components/about/')
      ? "import OptimizedImage from '../OptimizedImage';\n\n"
      : relativePath.startsWith('components/work/')
        ? "import OptimizedImage from '../OptimizedImage';\n\n"
        : "import OptimizedImage from '../OptimizedImage';\n\n";
    content = importPath + content;
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${relativePath}`);
}

const cardReplacements = cardImages.flatMap(([png, webp, alt]) => [
  cardReplacement(png, webp, alt, { lazy: true }),
  cardReplacement(png, webp, alt, { lazy: false }),
]);

transformFile('components/home/SelectedWorkSection.jsx', cardReplacements);
transformFile('components/work/WorkContent.jsx', cardReplacements);
transformFile('components/work/AtlasFinanceContent.jsx', cardReplacements);

transformFile('components/about/AboutContent.jsx', [
  [
    `<img decoding="async" width="1232" height="928" src="/images/frog.png" alt="Sourabh Chouhan, Frontend Developer" ${imgStyle} />`,
    `<OptimizedImage src="/images/frog.webp" alt="Sourabh Chouhan, Frontend Developer" sizes="100vw" priority />`,
  ],
  aboutGalleryReplacement('pinterest.png', 'pinterest.webp', 'Pinterest project preview'),
  aboutGalleryReplacement('pinterst.png', 'pinterst.webp', 'Pinterest project detail'),
]);
