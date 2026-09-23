'use client';

import { useEffect } from 'react';

const aboutCopy =
  'I’m a frontend developer who enjoys turning ideas into clear, responsive, and purposeful digital experiences. I’m currently exploring AI automation and automated image-generation pipelines for clients such as clothing brands—creating AI-powered photoshoot and catalogue imagery that can replace manual photoshoots and reduce production costs by up to 90%. I’m also deepening my backend development skills with the goal of becoming a full-stack developer.';

const developmentCopy =
  'I combine product thinking with frontend development to build responsive, accessible interfaces using React and Next.js. I care about clear structure, thoughtful interactions, and reusable systems that make digital products easier to understand, use, and maintain.';

const collaborationCopy =
  'I work closely with clients and teams from early concepts through launch, translating business goals into reliable frontend experiences. Alongside React and Next.js, I’m exploring backend development and AI automations so I can contribute across the stack and build smarter workflows that save time and reduce production costs.';

export default function AboutEnhancements() {
  useEffect(() => {
    const firstSection = document.getElementById('1');
    const firstParagraph = firstSection?.querySelector('p');
    if (firstParagraph) firstParagraph.textContent = aboutCopy;

    const secondSection = document.getElementById('2');
    const secondParagraph = secondSection?.querySelector('p');
    if (secondParagraph) secondParagraph.textContent = developmentCopy;

    const thirdSection = document.querySelector('[data-framer-name="3"]');
    const thirdParagraph = thirdSection?.querySelector('p');
    if (thirdParagraph) thirdParagraph.textContent = collaborationCopy;

    const workSection = [...document.querySelectorAll('section')].find(
      (section) => section.dataset.framerName === 'Work Experiences',
    );

    if (workSection) {
      const removedExperienceRoles = new Set([
        'Senior Web Designer',
        'Web & Product Designer',
        'Freelance Web Designer',
        'UI / UX Designer',
        'Junior Digital Designer',
      ]);

      workSection.querySelectorAll('p').forEach((node) => {
        if (!removedExperienceRoles.has(node.textContent.trim())) return;
        const rowVariant = node.closest('.ssr-variant');
        const divider = rowVariant?.nextElementSibling;
        rowVariant?.remove();
        if (divider?.dataset.framerName === 'Divider') divider.remove();
      });

      workSection.querySelectorAll('p').forEach((node) => {
        const value = node.textContent.trim();
        if (value === 'Freelance Web Designer') node.textContent = 'Frontend Developer';
        if (value === 'Self-employed') node.textContent = 'Self-Employed, Freelance';
        if (value === '2019 - Present') node.textContent = 'May 2024 - Aug 2024';
      });

      const experienceContent = workSection.querySelector('[data-framer-name="Content"]');
      if (experienceContent) {
        const createExperienceEntry = (key, role, company, period) => {
          const entry = document.createElement('div');
          entry.dataset.aboutExperience = key;
          entry.className = 'about-experience-entry';
          entry.innerHTML = `
            <p class="about-experience-entry__role">${role}</p>
            <p class="about-experience-entry__company">${company}</p>
            <p class="about-experience-entry__period">${period}</p>
          `;
          return entry;
        };

        if (!experienceContent.querySelector('[data-about-experience="rsenl"]')) {
          const firstTimelineRow = experienceContent.querySelector('.ssr-variant');
          const rsenlEntry = createExperienceEntry(
            'rsenl',
            'Frontend Developer',
            'RSENL AI Labs',
            'Sept 2025 - Present',
          );
          if (firstTimelineRow) firstTimelineRow.before(rsenlEntry);
          else experienceContent.appendChild(rsenlEntry);
        }

        if (!experienceContent.querySelector('[data-about-experience="freelance"]')) {
          const rsenlEntry = experienceContent.querySelector('[data-about-experience="rsenl"]');
          const freelanceEntry = createExperienceEntry(
            'freelance',
            'Frontend Developer',
            'Self-Employed, Freelance',
            'May 2024 - Aug 2024',
          );
          if (rsenlEntry) rsenlEntry.after(freelanceEntry);
          else experienceContent.appendChild(freelanceEntry);
        }

        if (!experienceContent.querySelector('[data-about-experience="ecell"]')) {
          experienceContent.appendChild(
            createExperienceEntry(
              'ecell',
              'Graphic Designer',
              'Entrepreneurship Cell, IET DAVV',
              '2021 - 2022',
            ),
          );
        }
        if (!experienceContent.querySelector('[data-about-experience="student"]')) {
          experienceContent.appendChild(
            createExperienceEntry(
              'student',
              'B.E. Information Technology Student',
              'Institute of Engineering & Technology, DAVV, Indore',
              '2020 - 2024',
            ),
          );
        }
      }
    }

    const progress = [...document.querySelectorAll('[data-framer-name="No"]')].find(
      (element) => element.getBoundingClientRect().width > 0,
    );
    const progressFrame = progress?.querySelector('[data-framer-name="01"]');
    const contentSections = [
      document.getElementById('1'),
      document.getElementById('2'),
      document.querySelector('[data-framer-name="3"]'),
    ].filter(Boolean);

    if (!progress || !progressFrame || contentSections.length !== 3) return undefined;

    progress.classList.add('about-scroll-progress');
    progressFrame.classList.add('about-scroll-progress__frame');
    [...progressFrame.children].forEach((child) => {
      child.setAttribute('aria-hidden', 'true');
    });

    let current = progressFrame.querySelector('[data-about-current-step]');
    if (!current) {
      current = document.createElement('span');
      current.dataset.aboutCurrentStep = 'true';
      current.setAttribute('aria-live', 'polite');
      progressFrame.appendChild(current);
    }

    const updateProgress = () => {
      const focusLine = window.scrollY + window.innerHeight * 0.38;
      let activeIndex = 0;
      contentSections.forEach((section, index) => {
        if (section.getBoundingClientRect().top + window.scrollY <= focusLine) activeIndex = index;
      });
      current.textContent = `0${activeIndex + 1}`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return null;
}
