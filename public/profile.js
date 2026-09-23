function getBasePath() {
  return document.querySelector('meta[name="base-path"]')?.content ?? '';
}

function asset(path) {
  const base = getBasePath();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!base || normalized.startsWith(`${base}/`) || normalized === base) {
    return normalized;
  }
  return `${base}${normalized}`;
}

(async function hydrateProfile() {
  try {
    const response = await fetch(asset('/profile.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Profile data could not be loaded.');
    const data = await response.json();

    document.title = data.site.title;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    data.textBindings.forEach(function (binding) {
      textNodes.forEach(function (node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style')) return;
        if (node.nodeValue.includes(binding.from)) {
          node.nodeValue = node.nodeValue.replaceAll(binding.from, binding.to);
        }
      });
    });

    data.linkBindings.forEach(function (binding) {
      document.querySelectorAll(binding.selector).forEach(function (link) {
        if (binding.matchText && link.textContent.trim() !== binding.matchText) return;
        link.href = binding.href;
        if (binding.text) link.textContent = binding.text;
      });
    });

    data.imageBindings.forEach(function (binding) {
      document.querySelectorAll(binding.selector).forEach(function (image) {
        image.src = asset(binding.src);
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
        image.alt = binding.alt;
        if (binding.objectPosition) image.style.objectPosition = binding.objectPosition;
      });
    });

    function removeProfileMetrics() {
      document.querySelectorAll('[data-framer-name="Card Wrapper"]').forEach(function (wrapper) {
        const text = wrapper.textContent.replace(/\s+/g, ' ').trim();
        if (text.includes('Hired') && text.includes('Rating') && text.includes('Followers')) {
          wrapper.remove();
        }
      });

      document.querySelectorAll('a[href*="contra.com"]').forEach(function (link) {
        if (link.textContent.trim() === 'Hire me on Contra') {
          link.closest('p')?.parentElement?.remove();
        }
      });
    }

    function injectGithubActivityComponent() {
      const style = document.createElement('style');
      style.dataset.githubActivityStyles = 'true';
      style.textContent = `
        [data-framer-name="Top Freelancer"] [data-framer-name="Content"] {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }
        [data-framer-name="Top Freelancer"] [data-framer-name="Visuals"] {
          display: flex !important;
          flex: 1 1 auto !important;
          flex-direction: column !important;
          min-height: 0;
        }
        [data-github-activity] {
          width: 100%;
          min-height: 174px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          margin-top: auto;
          padding: 18px;
          overflow: hidden;
          border-radius: 18px;
          color: #fff;
          background: #10141b;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
        }
        .github-activity__header,
        .github-activity__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .github-activity__eyebrow,
        .github-activity__footer span {
          margin: 0;
          color: rgba(255,255,255,.58);
          font: 500 10px/1.3 "DM Sans", sans-serif;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .github-activity__status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #bdee63;
          font: 500 11px/1.3 "DM Sans", sans-serif;
        }
        .github-activity__status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #bdee63;
          box-shadow: 0 0 12px rgba(189,238,99,.8);
        }
        .github-activity__grid {
          display: grid;
          grid-template-columns: repeat(18, minmax(0, 1fr));
          gap: 5px;
        }
        .github-activity__cell {
          aspect-ratio: 1;
          min-width: 0;
          border-radius: 3px;
          background: #202b38;
        }
        .github-activity__cell[data-level="1"] { background: #315c51; }
        .github-activity__cell[data-level="2"] { background: #639257; }
        .github-activity__cell[data-level="3"] {
          background: #bdee63;
          box-shadow: 0 0 10px rgba(189,238,99,.28);
        }
        .github-activity__footer span:last-child { text-align: right; }
        @media (max-width: 809.98px) {
          [data-github-activity] { min-height: 156px; padding: 15px; }
          .github-activity__grid { gap: 4px; }
        }
      `;
      document.head.appendChild(style);

      const activityPattern = [
        0,1,0,2,1,0,0,1,2,1,0,1,3,2,1,0,1,2,
        1,2,1,0,1,2,1,0,2,1,3,1,2,0,1,2,1,0,
        0,1,2,1,0,1,2,3,1,0,1,2,1,0,2,1,3,1,
        1,0,1,2,1,3,2,1,0,1,2,1,0,2,1,3,2,1,
        0,1,2,0,1,2,1,0,1,3,2,1,0,1,2,1,0,2,
        1,3,2,1,0,1,2,1,0,2,1,3,1,2,0,1,2,1,
        0,1,0,2,1,0,1,2,1,3,2,1,0,1,2,1,0,1
      ];

      document.querySelectorAll('[data-framer-name="Top Freelancer"]').forEach(function (card) {
        const visuals = card.querySelector('[data-framer-name="Visuals"]');
        if (!visuals || visuals.dataset.githubActivityReady === 'true') return;
        visuals.dataset.githubActivityReady = 'true';

        const component = document.createElement('div');
        component.dataset.githubActivity = 'true';
        component.setAttribute('role', 'img');
        component.setAttribute('aria-label', 'GitHub activity heatmap');
        component.innerHTML = `
          <div class="github-activity__header">
            <p class="github-activity__eyebrow">Activity</p>
            <span class="github-activity__status"><i class="github-activity__status-dot"></i>Active</span>
          </div>
          <div class="github-activity__grid" aria-hidden="true"></div>
          <div class="github-activity__footer">
            <span>18 public repos</span>
            <span>GitHub / NoobSourabh</span>
          </div>
        `;
        const grid = component.querySelector('.github-activity__grid');
        activityPattern.forEach(function (level) {
          const cell = document.createElement('span');
          cell.className = 'github-activity__cell';
          cell.dataset.level = level;
          grid.appendChild(cell);
        });
        visuals.appendChild(component);
      });
    }

    function injectImpactSummitCard() {
      if (document.querySelector('[data-impact-summit-card]')) return;

      const luziaTitle = [...document.querySelectorAll('p')].find(function (node) {
        const card = node.closest('[data-framer-name="Featured Template"]');
        return node.textContent.trim() === 'My Luzia got featured!' && card && card.getBoundingClientRect().width > 0;
      });
      const luziaCard = luziaTitle && luziaTitle.closest('[data-framer-name="Featured Template"]');
      const content = luziaCard && luziaCard.parentElement;
      if (!content) return;

      const style = document.createElement('style');
      style.dataset.impactSummitStyles = 'true';
      style.textContent = `
        [data-impact-summit-card] {
          width: 100%;
          min-width: 0;
          min-height: 0;
          aspect-ratio: .72;
          align-self: stretch;
          display: flex;
          flex: none;
          flex-direction: column;
          overflow: hidden;
          background: #f7f7f7;
          border-radius: 40px;
          padding: 0 0 28px;
        }
        .impact-summit-card__logo-header {
          display: flex;
          align-items: center;
          padding: 40px 40px 0;
        }
        .impact-summit-card__logo {
          display: block;
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .impact-summit-card__copy {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px 40px 0;
        }
        .impact-summit-card__title {
          margin: 0;
          color: #111;
          font: 500 24px/1.1 "DM Sans", sans-serif;
          letter-spacing: -.02em;
        }
        .impact-summit-card__description {
          max-width: 34ch;
          margin: 0;
          color: #51565e;
          font: 400 16px/1.4 "DM Sans", sans-serif;
        }
        .impact-summit-gallery {
          position: relative;
          height: 36%;
          min-height: 148px;
          margin: auto 12px 0;
          overflow: hidden;
          border-radius: 18px;
          background: #10141b;
        }
        .impact-summit-track {
          display: flex;
          width: max-content;
          height: 100%;
          animation: impactSummitTrain 24s linear infinite;
          will-change: transform;
        }
        .impact-summit-sequence {
          display: flex;
          flex: none;
          gap: 10px;
          height: 100%;
          padding-right: 10px;
        }
        .impact-summit-track img {
          display: block;
          width: 190px;
          height: 100%;
          flex: 0 0 190px;
          border-radius: 12px;
          object-fit: cover;
        }
        @keyframes impactSummitTrain {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .impact-summit-track { animation: none; }
        }
        @media (max-width: 809.98px) {
          [data-impact-summit-card] { aspect-ratio: .78; padding-bottom: 18px; }
          .impact-summit-card__logo-header { padding: 28px 28px 0; }
          .impact-summit-card__copy { padding: 20px 28px 0; }
          .impact-summit-card__title { font-size: 22px; }
          .impact-summit-gallery { min-height: 132px; margin: auto 10px 0; }
          .impact-summit-track img { width: 170px; flex-basis: 170px; }
        }
      `;
      document.head.appendChild(style);

      const card = document.createElement('article');
      card.dataset.impactSummitCard = 'true';
      card.innerHTML = `
        <div class="impact-summit-card__logo-header">
          <img class="impact-summit-card__logo" src="${asset('/images/rsenl transparent logo.svg')}" alt="RSENL AI Labs" />
        </div>
        <div class="impact-summit-card__copy">
          <h3 class="impact-summit-card__title">Represented RSENL AI Labs at the India AI Impact Summit 2026.</h3>
          <p class="impact-summit-card__description">A snapshot of the ideas, people, and emerging AI experiences that shaped the summit.</p>
        </div>
        <div class="impact-summit-gallery" role="region" aria-label="AI summit moments">
          <div class="impact-summit-track">
            <div class="impact-summit-sequence">
              <img src="${asset('/images/india-ai-summit-stage.png')}" alt="AI summit stage with an abstract light installation" loading="lazy" />
              <img src="${asset('/images/india-ai-summit-exhibition.png')}" alt="AI exhibition installation with visitors in silhouette" loading="lazy" />
              <img src="${asset('/images/india-ai-summit-demo.png')}" alt="People exploring an interactive AI demonstration" loading="lazy" />
            </div>
            <div class="impact-summit-sequence" aria-hidden="true">
              <img src="${asset('/images/india-ai-summit-stage.png')}" alt="" loading="lazy" />
              <img src="${asset('/images/india-ai-summit-exhibition.png')}" alt="" loading="lazy" />
              <img src="${asset('/images/india-ai-summit-demo.png')}" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      `;
      content.insertBefore(card, luziaCard);
      document.querySelectorAll('[data-framer-name="Featured Template"]').forEach(function (template) {
        if (template.textContent.includes('My Luzia got featured!')) template.remove();
      });
    }

    function initBackedByWorkReveal(attempt) {
      const heading = [...document.querySelectorAll('h2')].find(function (node) {
        return node.textContent.trim() === 'Backed by real work.';
      });
      if (!heading || heading.dataset.backedRevealReady === 'true') return;

      const section = heading.closest('section');
      const cardGroup = [...section.querySelectorAll('[data-framer-name="Content"]')].find(function (group) {
        const cards = group.querySelectorAll(':scope > [data-framer-name="Featured Template"], :scope > [data-framer-name="Top Freelancer"], :scope > [data-framer-name="Trusted by Many"]');
        const rect = group.getBoundingClientRect();
        return cards.length === 3 && rect.width > 0 && rect.height > 0;
      });

      if (!cardGroup) {
        if ((attempt || 0) < 24) {
          window.setTimeout(function () { initBackedByWorkReveal((attempt || 0) + 1); }, 100);
        }
        return;
      }

      const cards = cardGroup.querySelectorAll(':scope > [data-framer-name="Featured Template"], :scope > [data-framer-name="Top Freelancer"], :scope > [data-framer-name="Trusted by Many"]');

      heading.dataset.backedRevealReady = 'true';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger) return;

      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.set(cards, { autoAlpha: 0, x: -48, y: 10 });
      window.gsap.to(cards, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.58,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true
        }
      });
    }

    removeProfileMetrics();
    injectGithubActivityComponent();
    injectImpactSummitCard();
    initBackedByWorkReveal(0);
  } catch (error) {
    console.error(error);
  }
})();
