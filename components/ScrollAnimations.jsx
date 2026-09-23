'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TEXT_SELECTORS = [
  '#hero .framer-mklr9n h1',
  '#hero .framer-mklr9n p',
  '.services-cta-wrapper .framer-15wi7qe h2',
  '.services-cta-wrapper .framer-15wi7qe p',
  '.backed-by-work-section__headline h2',
  '.backed-by-work-section__headline p',
  '.framer-18we12h .framer-1pc8r1o h2',
  '.framer-U12Cq .framer-1tlnafg h1',
  '.framer-U12Cq main h2',
  '.framer-Jv3Vh .framer-xxdpy0 h1',
  '.framer-Jv3Vh .framer-xxdpy0 p',
];

const CARD_GROUPS = [
  { selector: '.services-cta-wrapper .framer-1ev7gqr > div', axis: 'x' },
  { selector: '.backed-by-work-grid > .backed-card', axis: 'x' },
];

function splitWords(element) {
  const text = element.textContent.trim();
  if (!text || element.dataset.scrollWordsSplit) return [];

  element.dataset.scrollWordsSplit = 'true';
  element.setAttribute('aria-label', text);
  element.replaceChildren(...text.split(/(\s+)/).filter(Boolean).map((part) => {
    if (/^\s+$/.test(part)) return document.createTextNode(part);
    const word = document.createElement('span');
    word.className = 'gsap-scroll-word';
    word.textContent = part;
    word.setAttribute('aria-hidden', 'true');
    return word;
  }));
  return [...element.querySelectorAll('.gsap-scroll-word')];
}

export default function ScrollAnimations() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const uniqueText = new Set(TEXT_SELECTORS.flatMap((selector) => [...document.querySelectorAll(selector)]));
      const wordGroups = [];
      const normalTargets = [];

      uniqueText.forEach((element) => {
        if (element.closest('.framer-U12Cq')) {
          const words = splitWords(element);
          if (words.length) wordGroups.push({ trigger: element, words });
        } else normalTargets.push(element);
      });

      gsap.set(normalTargets, { autoAlpha: 0, y: 24, filter: 'blur(9px)' });
      normalTargets.forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      wordGroups.forEach(({ trigger, words }) => {
        gsap.fromTo(words,
          { autoAlpha: 0, yPercent: 45, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.48,
            stagger: 0.035,
            ease: 'power3.out',
            scrollTrigger: { trigger, start: 'top 88%', once: true },
          }
        );
      });

      CARD_GROUPS.forEach(({ selector, axis }) => {
        document.querySelectorAll(selector).forEach((card, index) => {
          const offset = axis === 'x' ? (index === 0 ? -64 : index === 2 ? 64 : 0) : 0;
          const y = axis === 'x' ? (index === 1 ? 56 : 0) : 56;
          gsap.fromTo(card,
            { autoAlpha: 0, x: offset, y, filter: 'blur(10px)' },
            {
              autoAlpha: 1, x: 0, y: 0, filter: 'blur(0px)',
              duration: 0.9, delay: index * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 86%', once: true },
            }
          );
        });
      });
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      context.revert();
    };
  }, [pathname]);

  return null;
}
