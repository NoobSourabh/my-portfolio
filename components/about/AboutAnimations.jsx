'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORD_CLASS = 'gsap-scroll-word';

function splitWords(element) {
  const text = element.textContent.trim();
  if (!text || element.dataset.scrollWordsSplit) return [];

  element.dataset.scrollWordsSplit = 'true';
  element.setAttribute('aria-label', text);
  element.replaceChildren(...text.split(/(\s+)/).filter(Boolean).map((part) => {
    if (/^\s+$/.test(part)) return document.createTextNode(part);
    const word = document.createElement('span');
    word.className = WORD_CLASS;
    word.textContent = part;
    word.setAttribute('aria-hidden', 'true');
    return word;
  }));

  return [...element.querySelectorAll(`.${WORD_CLASS}`)];
}

function restoreText(element) {
  if (!element?.dataset.scrollWordsSplit) return;
  element.textContent = element.getAttribute('aria-label') || element.textContent;
  element.removeAttribute('aria-label');
  delete element.dataset.scrollWordsSplit;
}

export default function AboutAnimations() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    let frameId;
    let context;
    let initialized = false;
    const animatedText = [];

    const initialize = () => {
      if (initialized) return;
      initialized = true;

      // AboutEnhancements has finished replacing the exported placeholder copy.
      // Deferring one frame gives the browser final text metrics before triggers measure.
      frameId = requestAnimationFrame(() => {
        const page = document.querySelector('[data-about-page] .framer-U12Cq');
        if (!page) return;

        context = gsap.context(() => {
          const heroHeading = page.querySelector('.framer-1tlnafg h1');
          const heroParagraph = page.querySelector('.framer-1tlnafg p');

          const heroTimeline = gsap.timeline();
          [heroHeading, heroParagraph].filter(Boolean).forEach((element, index) => {
            const words = splitWords(element);
            if (!words.length) return;
            animatedText.push(element);
            heroTimeline.fromTo(
              words,
              { autoAlpha: 0, yPercent: 45, filter: 'blur(8px)' },
              {
                autoAlpha: 1,
                yPercent: 0,
                filter: 'blur(0px)',
                duration: 0.48,
                stagger: 0.035,
                ease: 'power3.out',
              },
              index === 0 ? 0 : '-=0.15',
            );
          });

          ['[id="1"]', '[id="2"]', '[data-framer-name="3"]'].forEach((selector) => {
            const section = page.querySelector(selector);
            if (!section) return;

            const textElements = [...section.querySelectorAll(':scope h2, :scope p')]
              .filter((element) => element.getClientRects().length > 0);
            const words = textElements.flatMap((element) => {
              const split = splitWords(element);
              if (split.length) animatedText.push(element);
              return split;
            });
            if (!words.length) return;

            gsap.fromTo(
              words,
              { autoAlpha: 0, yPercent: 45, filter: 'blur(8px)' },
              {
                autoAlpha: 1,
                yPercent: 0,
                filter: 'blur(0px)',
                duration: 0.48,
                stagger: 0.035,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 88%',
                  once: true,
                },
              },
            );
          });
        }, page);

        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('about-copy-ready', initialize);
    if (window.__aboutCopyReady) initialize();

    return () => {
      window.removeEventListener('about-copy-ready', initialize);
      cancelAnimationFrame(frameId);
      context?.revert();
      animatedText.forEach(restoreText);
    };
  }, []);

  return null;
}
