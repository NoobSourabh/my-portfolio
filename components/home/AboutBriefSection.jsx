const tools = [
  ['React', '/images/tools/react.svg'],
  ['TypeScript', '/images/tools/typescript.svg'],
  ['Next.js', '/images/tools/nextjs.svg'],
  ['JavaScript', '/images/tools/javascript.svg'],
  ['GitHub', '/images/tools/git-github.svg'],
  ['Tailwind CSS', '/images/tools/tailwindcss.svg'],
  ['GSAP', '/images/tools/gsap.svg'],
  ['Framer Motion', '/images/tools/framer-motion.svg'],
  ['HTML5', '/images/tools/html5.svg'],
  ['CSS3', '/images/tools/css3.svg'],
  ['Redux', '/images/tools/redux.svg'],
  ['Zustand', '/images/tools/zustand.svg'],
  ['VS Code', '/images/tools/vscode.svg'],
  ['Cursor', '/images/tools/cursor.svg'],
  ['Windsurf', '/images/tools/windsurf.svg'],
  ['Antigravity', '/images/tools/antigravity.svg'],
];

export default function AboutBriefSection() {
  return (
    <section className="about-orbit-section" aria-labelledby="about-brief-title">
      <div className="about-orbit-section__inner">
        <div className="about-orbit" aria-label="Frontend tools and technologies">
          <div className="about-orbit__ring">
            {tools.map(([name, src], index) => (
              <div
                className="about-orbit__node"
                key={name}
                style={{ '--orbit-angle': `${(360 / tools.length) * index}deg` }}
              >
                <div className="about-orbit__card">
                  <img src={src} alt={name} />
                </div>
              </div>
            ))}
          </div>

          <div className="about-orbit__content">
            <p>I build modern frontend experiences that are easy to use, fast to load, and simple to maintain.</p>
            <p><mark>The goal is simple: turn ideas into clear, accessible interfaces that feel great on every screen.</mark></p>
            <a href="/about">About Sourabh</a>
          </div>
        </div>
      </div>
    </section>
  );
}
