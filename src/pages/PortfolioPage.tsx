import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AboutSection } from '@/components/sections/AboutSection';
import { BrandLogosSection } from '@/components/sections/BrandLogosSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MediaKitSection } from '@/components/sections/MediaKitSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';

export function PortfolioPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <BrandLogosSection />
        <ServicesSection />
        <MediaKitSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

