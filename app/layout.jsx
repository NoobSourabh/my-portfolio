import Script from 'next/script';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SvgTemplates from '../components/SvgTemplates';
import ScrollAnimations from '../components/ScrollAnimations';
import ScrollToTop from '../components/ScrollToTop';

const siteTitle = 'Sourabh Chouhan — Frontend Developer';
const siteDescription =
  'Sourabh Chouhan - Frontend Developer portfolio showcasing responsive web apps, landing pages, and AI projects.';
const faviconImage = '/images/mascot%20Background%20Removed.png';
const shareImage = '/images/mascot.png';

function getMetadataBase() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  return new URL(url);
}

export const metadata = {
  metadataBase: getMetadataBase(),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [{ url: faviconImage, type: 'image/png' }],
    shortcut: faviconImage,
    apple: faviconImage,
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Sourabh Chouhan',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    images: [
      {
        url: shareImage,
        width: 1254,
        height: 1254,
        alt: 'Sourabh Chouhan portfolio mascot',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: [shareImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div id="main">
          <div className="framer-3wnNZ framer-1u2jidb" data-layout-template="true" style={{ minHeight: '100vh', width: 'auto' }}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
        <ScrollToTop />
        <ScrollAnimations />
        <SvgTemplates />
        <Script
          id="about-enhancing"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "if (window.location.pathname.startsWith('/about')) document.documentElement.dataset.aboutEnhancing = 'true';",
          }}
        />
      </body>
    </html>
  );
}
