import Script from 'next/script';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SvgTemplates from '../components/SvgTemplates';
import ScrollAnimations from '../components/ScrollAnimations';
import ScrollToTop from '../components/ScrollToTop';

export const metadata = {
  title: 'Sourabh Chouhan — Frontend Developer',
  description: 'Sourabh Chouhan - Frontend Developer portfolio showcasing responsive web apps, landing pages, and AI projects.',
  icons: {
    icon: '/favicon.png',
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
