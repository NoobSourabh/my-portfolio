// Warms the browser cache for below-the-fold home assets and the about page
// as soon as the hero video starts playing, while bandwidth is idle.

const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// About-page images rendered through next/image, with the `sizes` values used there.
const ABOUT_IMAGES = [
  { src: '/images/frog.webp', sizes: '100vw' },
  { src: '/images/pinterest.webp', sizes: '(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw' },
  { src: '/images/pinterst.webp', sizes: '(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw' },
];

function evaluateSizes(sizes) {
  const viewportWidth = window.innerWidth;
  for (const entry of sizes.split(',').map((part) => part.trim())) {
    const match = entry.match(/^\((.+)\)\s+(\S+)$/);
    if (match && !window.matchMedia(`(${match[1]})`).matches) continue;
    const value = match ? match[2] : entry;
    if (value.endsWith('vw')) return (parseFloat(value) / 100) * viewportWidth;
    if (value.endsWith('px')) return parseFloat(value);
    return viewportWidth;
  }
  return viewportWidth;
}

function pickDeviceWidth(cssWidth) {
  const needed = cssWidth * (window.devicePixelRatio || 1);
  return DEVICE_SIZES.find((width) => width >= needed) ?? DEVICE_SIZES[DEVICE_SIZES.length - 1];
}

// Reuse the quality param from an already-rendered next/image URL so the
// preloaded URL matches byte-for-byte what the about page will request.
function detectOptimizerQuality() {
  const img = document.querySelector('img[src*="/_next/image"]');
  const match = (img?.currentSrc || img?.src || '').match(/[?&]q=(\d+)/);
  return match ? match[1] : '75';
}

// Force-loads every home page image that is still lazy/pending by re-selecting
// the same src/srcset candidate in an off-DOM Image, which the browser dedupes
// against the real element's eventual request.
function warmHomeImages() {
  document.querySelectorAll('img').forEach((img) => {
    if (!img.src || img.complete) return;
    const preloader = new Image();
    if (img.sizes) preloader.sizes = img.sizes;
    if (img.srcset) preloader.srcset = img.srcset;
    preloader.src = img.src;
  });
}

function warmAboutImages() {
  const quality = detectOptimizerQuality();
  ABOUT_IMAGES.forEach(({ src, sizes }) => {
    const width = pickDeviceWidth(evaluateSizes(sizes));
    const preloader = new Image();
    preloader.src = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  });
}

let started = false;

export function preloadSiteAssets() {
  if (started || typeof window === 'undefined') return;
  started = true;
  if (navigator.connection?.saveData) return;
  warmHomeImages();
  warmAboutImages();
}
