import HeroSection from '../components/home/HeroSection';
import AboutBriefSection from '../components/home/AboutBriefSection';
import BackedByWorkSection from '../components/home/BackedByWorkSection';
import SelectedWorkSection from '../components/home/SelectedWorkSection';
import ServicesSection from '../components/home/ServicesSection';

export const metadata = {
  title: 'Sourabh Chouhan — Frontend Developer',
  description: 'Sourabh Chouhan - Frontend Developer portfolio showcasing responsive web apps, landing pages, and AI projects.',
};

export default function HomePage() {
  return (
    <div
      data-framer-root=""
      className="framer-pNPRd framer-kZscH framer-xIMGr framer-S9Z77 framer-HmoXg framer-r7dCw framer-72rtr7"
      style={{ minHeight: '100vh', width: 'auto', display: 'contents' }}
    >
      <HeroSection />
      <AboutBriefSection />
      <SelectedWorkSection />
      <ServicesSection />
      <BackedByWorkSection />
    </div>
  );
}
