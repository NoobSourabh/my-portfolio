import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SvgTemplates from '../components/SvgTemplates';
import ScrollAnimations from '../components/ScrollAnimations';

export const metadata = {
  title: 'Sourabh Chouhan — Frontend Developer',
  description: 'Sourabh Chouhan - Frontend Developer portfolio showcasing responsive web apps, landing pages, and AI projects.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="main">
          <div className="framer-3wnNZ framer-1u2jidb" data-layout-template="true" style={{ minHeight: '100vh', width: 'auto' }}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
        <ScrollAnimations />
        <SvgTemplates />
      </body>
    </html>
  );
}
