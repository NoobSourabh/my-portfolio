import Script from 'next/script';
import { basePath } from '../lib/site-paths';

const prefixRootPathsScript = `
(function () {
  var base = ${JSON.stringify(basePath)};
  if (!base) return;

  function prefixRootPaths(root) {
    var scope = root || document;
    scope.querySelectorAll('[href^="/"]:not([href^="//"]), [src^="/"]:not([src^="//"])').forEach(function (el) {
      var attr = el.hasAttribute('href') ? 'href' : 'src';
      var value = el.getAttribute(attr);
      if (!value || value.indexOf(base) === 0) return;
      el.setAttribute(attr, base + value);
    });
  }

  prefixRootPaths();
  window.__portfolioPrefixRootPaths = prefixRootPaths;
})();
`;

export default function BasePathBootstrap() {
  if (!basePath) {
    return null;
  }

  return (
    <Script id="base-path-bootstrap" strategy="beforeInteractive">
      {prefixRootPathsScript}
    </Script>
  );
}
