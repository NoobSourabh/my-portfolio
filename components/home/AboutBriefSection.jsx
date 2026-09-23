import ScrollIntro from '../ScrollIntro';
import { withBasePath } from '../../lib/site-paths';

const tools = [
  ['React', withBasePath('/images/tools/react.svg')],
  ['TypeScript', withBasePath('/images/tools/typescript.svg')],
  ['Next.js', withBasePath('/images/tools/nextjs.svg')],
  ['JavaScript', withBasePath('/images/tools/javascript.svg')],
  ['GitHub', withBasePath('/images/tools/git-github.svg')],
  ['Tailwind CSS', withBasePath('/images/tools/tailwindcss.svg')],
  ['GSAP', withBasePath('/images/tools/gsap.svg')],
  ['Framer Motion', withBasePath('/images/tools/framer-motion.svg')],
  ['HTML5', withBasePath('/images/tools/html5.svg')],
  ['CSS3', withBasePath('/images/tools/css3.svg')],
  ['Redux', withBasePath('/images/tools/redux.svg')],
  ['Zustand', withBasePath('/images/tools/zustand.svg')],
  ['VS Code', withBasePath('/images/tools/vscode.svg')],
  ['Cursor', withBasePath('/images/tools/cursor.svg')],
  ['Windsurf', withBasePath('/images/tools/windsurf.svg')],
  ['Antigravity', withBasePath('/images/tools/antigravity.svg')],
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
            <ScrollIntro />
            <a className="about-orbit__cta" href={withBasePath('/about')}>About Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
