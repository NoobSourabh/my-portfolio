'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TEXT_SELECTORS = [
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
  { container: '.services-cta-wrapper .framer-1ev7gqr', cards: ':scope > div' },
  { container: '.backed-by-work-grid', cards: ':scope > .backed-card' },
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
      const visibleElements = (selector) => [...document.querySelectorAll(selector)]
        .filter((element) => element.getClientRects().length > 0);
      const heroEyebrow = visibleElements('#hero .framer-1ns3x67 p');
      const heroHeading = visibleElements('#hero .framer-14dkztq h1');
      const heroDescription = visibleElements('#hero .framer-10y77co p');
      const heroButtons = visibleElements('#hero .framer-1luurh7 a');

      if (heroEyebrow.length || heroHeading.length || heroDescription.length || heroButtons.length) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero .framer-mklr9n',
            start: 'top 88%',
            once: true,
          },
        });
        const textFrom = { autoAlpha: 0, y: 24, filter: 'blur(10px)' };
        const textTo = { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.72, ease: 'power3.out' };

        heroTimeline
          .fromTo(heroEyebrow, textFrom, textTo)
          .fromTo(heroHeading, textFrom, { ...textTo, duration: 0.82 }, '-=0.12')
          .fromTo(heroDescription, textFrom, { ...textTo, duration: 0.72 }, '-=0.12')
          .fromTo(
            heroButtons,
            { autoAlpha: 0, y: 16, scale: 0.96, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.62, stagger: 0.14, ease: 'power3.out' },
            '-=0.08'
          );
      }

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

      const heroVisualRow = document.querySelector('#hero .framer-1a1apuj');
      const adarshTestimonial = heroVisualRow?.querySelector('.framer-q9d11');
      const heroPortrait = heroVisualRow?.querySelector('.framer-1l0q9pj');
      if (heroVisualRow && (adarshTestimonial || heroPortrait)) {
        const visualTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroVisualRow,
            start: 'top 70%',
            once: true,
          },
        });

        if (adarshTestimonial) {
          visualTimeline.fromTo(
            adarshTestimonial,
            { autoAlpha: 0, x: -110, filter: 'blur(10px)' },
            { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
          );
        }

        if (heroPortrait) {
          visualTimeline.fromTo(
            heroPortrait,
            { autoAlpha: 0, x: 140, scale: 0.01, transformOrigin: '50% 50%' },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.95, ease: 'back.out(1.25)', force3D: true },
            adarshTestimonial ? '-=0.35' : 0
          );
        }
      }

      CARD_GROUPS.forEach(({ container: containerSelector, cards: cardSelector }) => {
        document.querySelectorAll(containerSelector).forEach((container) => {
          if (!container.getClientRects().length) return;
          const cards = [...container.querySelectorAll(cardSelector)];
          if (!cards.length) return;
          const isBackedGrid = container.matches('.backed-by-work-grid');

          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 84%',
              once: true,
            },
          });

          cards.forEach((card, index) => {
            const distance = isBackedGrid ? 48 : 72;
            const x = index === 0 ? -distance : index === 2 ? distance : 0;
            const y = index === 1 ? distance : 0;
            if (isBackedGrid) gsap.set(card, { willChange: 'transform, opacity' });

            cardTimeline.fromTo(
              card,
              {
                autoAlpha: 0,
                x,
                y,
                ...(isBackedGrid ? {} : { scale: 0.97, filter: 'blur(10px)' }),
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                ...(isBackedGrid ? {} : { scale: 1, filter: 'blur(0px)' }),
                duration: isBackedGrid ? 0.64 : 0.78,
                ease: 'power3.out',
                ...(isBackedGrid ? { onComplete: () => gsap.set(card, { clearProps: 'willChange' }) } : {}),
              },
              index * (isBackedGrid ? 0.24 : 0.16)
            );
          });
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
