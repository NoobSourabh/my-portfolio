import AboutContent from '../../components/about/AboutContent';
import AboutAnimations from '../../components/about/AboutAnimations';
import AboutEnhancements from '../../components/about/AboutEnhancements';

export const metadata = {
  title: 'About — Sourabh Chouhan - Frontend Developer',
  description: 'About Sourabh Chouhan - Frontend Developer focused on responsive web apps, UI engineering, and AI automation.',
};

export default function AboutPage() {
  return (
    <>
      <style>{`
        html[data-about-enhancing] [data-about-page] {
          visibility: hidden;
        }
      `}</style>
      <div data-about-page>
        <AboutContent />
        <AboutEnhancements />
        <AboutAnimations />
      </div>
    </>
  );
}
