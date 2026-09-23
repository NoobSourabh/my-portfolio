'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const summitImages = [
  '/images/india-ai-summit-stage.png',
  '/images/india-ai-summit-exhibition.png',
  '/images/india-ai-summit-demo.png',
];

const activityPattern = [
  0, 1, 0, 2, 1, 0, 0, 1, 2, 1, 0, 1, 3, 2, 1, 0, 1, 2,
  1, 2, 1, 0, 1, 2, 1, 0, 2, 1, 1, 3, 1, 2, 0, 1, 2, 1, 0,
  0, 1, 2, 1, 0, 2, 3, 1, 2, 1, 0, 1, 2, 1, 0, 2, 1, 3,
  1, 0, 1, 2, 1, 2, 0, 1, 3, 1, 0, 2, 1, 2, 1, 0, 1, 2,
  2, 1, 0, 1, 2, 0, 1, 2, 1, 3, 1, 0, 2, 1, 2, 0, 1, 2,
  1, 2, 1, 0, 1, 3, 2, 1, 0, 1, 2, 1, 0, 2, 1, 2, 1, 0,
  0, 1, 2, 1, 3, 1, 0, 2, 1, 0, 1, 2, 1, 2, 0, 1, 2, 1,
];

function SummitGallery() {
  const sequence = summitImages.map((src, index) => (
    <img key={`${src}-${index}`} src={src} alt="India AI Impact Summit" />
  ));

  return (
    <div className="summit-gallery" aria-label="India AI Impact Summit highlights">
      <div className="summit-gallery__track">
        <div className="summit-gallery__sequence">{sequence}</div>
        <div className="summit-gallery__sequence" aria-hidden="true">
          {summitImages.map((src, index) => (
            <img key={`${src}-duplicate-${index}`} src={src} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SummitCard() {
  return (
    <article className="backed-card summit-card">
      <div className="backed-card__topline">
        <img src="/images/rsenl transparent logo.svg" alt="RSENL AI Labs" />
      </div>
      <div className="backed-card__copy">
        <h3>Represented RSENL AI Labs at the India AI Impact Summit 2026.</h3>
        <p>A snapshot of the ideas, people, and emerging AI experiences that shaped the summit.</p>
      </div>
      <SummitGallery />
    </article>
  );
}

function GithubActivityCard() {
  return (
    <article className="backed-card github-card">
      <div className="backed-card__topline">
        <img className="github-card__logo" src="/images/tools/git-github.svg" alt="GitHub" />
      </div>
      <div className="backed-card__copy">
        <h3>Top contributor</h3>
        <p>Contributing to the Banana Shake Chrome extension open-source project and RSENL AI LABS projects on GitHub.</p>
      </div>
      <div className="github-activity" aria-label="GitHub activity summary">
        <div className="github-activity__header">
          <span>Activity</span>
          <span className="github-activity__status"><i />Active</span>
        </div>
        <div className="github-activity__grid" aria-hidden="true">
          {activityPattern.map((level, index) => (
            <span key={index} className={`github-activity__cell level-${level}`} />
          ))}
        </div>
        <div className="github-activity__footer">
          <span>18 PUBLIC REPOS</span>
          <span>GITHUB / NOO<strong>BSOURABH</strong></span>
        </div>
      </div>
    </article>
  );
}

function TestimonialCard() {
  return (
    <article className="backed-card testimonial-card">
      <div className="backed-card__topline">
        <div className="testimonial-card__mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#111" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>
      </div>
      <div className="backed-card__copy">
        <h3>Trusted by growing teams</h3>
        <p>Worked with startups and teams to design and build React &amp; Next.js apps that support real business goals.</p>
      </div>
      <div className="testimonial-stack">
        <blockquote className="testimonial-bubble testimonial-bubble--dark">
          “Working with Sourabh was smooth from start to finish. He understood our goals quickly and delivered a frontend that feels clear, modern, and easy to manage.”
        </blockquote>
        <blockquote className="testimonial-bubble testimonial-bubble--light">
          “Sourabh’s attention to detail really stood out. The frontend he built not only looks great, but also performs well and is easy for our team to update.”
        </blockquote>
      </div>
    </article>
  );
}

export default function BackedByWorkSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headline = section.querySelector('.backed-by-work-section__headline');
      const cards = section.querySelectorAll('.backed-card');

      if (headline) {
        gsap.fromTo(
          headline.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 55, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.querySelector('.backed-by-work-grid') || section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="backed-by-work-section" aria-labelledby="backed-by-work-title">
      <div className="backed-by-work-section__inner">
        <div className="backed-by-work-section__headline">
          <h2 id="backed-by-work-title">Backed by real work.</h2>
          <p>A few highlights that reflect the quality, trust, and results behind my work.</p>
        </div>
        <div className="backed-by-work-grid">
          <SummitCard />
          <GithubActivityCard />
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
}
