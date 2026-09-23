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
        <div className="testimonial-card__mark" aria-hidden="true" />
      </div>
      <div className="backed-card__copy">
        <h3>Trusted by growing teams</h3>
        <p>Worked with startups and teams to design and build React &amp; Next.js apps that support real business goals.</p>
      </div>
      <div className="testimonial-stack">
        <blockquote className="testimonial-bubble testimonial-bubble--dark">
          “Working with Sourabh was smooth from start to finish. He understood our goals...”
        </blockquote>
        <blockquote className="testimonial-bubble testimonial-bubble--light">
          “Sourabh has a great eye for detail and a strong sense of structure. Our new...”
        </blockquote>
      </div>
    </article>
  );
}

export default function BackedByWorkSection() {
  return (
    <section className="backed-by-work-section" aria-labelledby="backed-by-work-title">
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
