'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TEXT_SELECTORS = [
  '.services-cta-wrapper .framer-15wi7qe h2',
  '.services-cta-wrapper .framer-15wi7qe p',
  '.backed-by-work-section__headline h2',
  '.backed-by-work-section__headline p',
  '.framer-18we12h .framer-1pc8r1o h2',
  '.framer-Jv3Vh .framer-xxdpy0 h1',
  '.framer-Jv3Vh .framer-xxdpy0 p',
];

const CARD_GROUPS = [
  { container: '.services-cta-wrapper .framer-1ev7gqr', cards: ':scope > div' },
  { container: '.backed-by-work-grid', cards: ':scope > .backed-card' },
];

const MOBILE_MAX_WIDTH = 809.98;

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

export default function ScrollAnimations() {
  const pathname = usePathname();
  const lastPathRef = useRef(null);
  const heroVisualsAnimatedHereRef = useRef(false);

  useLayoutEffect(() => {
    const samePathReplay = lastPathRef.current === pathname;
    lastPathRef.current = pathname;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const isInitialHomeLoad = window.__portfolioHomeIntroEligible ??= window.location.pathname === '/';
    const shouldAnimateHeroVisuals = pathname === '/' && isInitialHomeLoad && (
      !window.__portfolioHeroVisualsPlayed || (heroVisualsAnimatedHereRef.current && samePathReplay)
    );

    if (shouldAnimateHeroVisuals) {
      window.__portfolioHeroVisualsPlayed = true;
      heroVisualsAnimatedHereRef.current = true;
    }

    const context = gsap.context((self) => {
      const visibleElements = (selector) => [...document.querySelectorAll(selector)]
        .filter((element) => element.getClientRects().length > 0);
      const uniqueText = new Set(
        TEXT_SELECTORS.flatMap((selector) => [...document.querySelectorAll(selector)])
          .filter((element) => element.getClientRects().length > 0)
      );
      const normalTargets = [];

      uniqueText.forEach((element) => {
        if (element.closest('.framer-U12Cq')) return;
        normalTargets.push(element);
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

      const heroVisualRow = document.querySelector('#hero .framer-1a1apuj');
      const adarshTestimonial = heroVisualRow?.querySelector('.framer-q9d11');
      const heroPortrait = heroVisualRow?.querySelector('.framer-1l0q9pj');
      if (shouldAnimateHeroVisuals && heroVisualRow && (adarshTestimonial || heroPortrait)) {
        const visualTimeline = gsap.timeline(
          isMobileViewport()
            ? { delay: 0.45 }
            : {
                scrollTrigger: {
                  trigger: heroVisualRow,
                  start: 'top 70%',
                  once: true,
                },
              }
        );

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
