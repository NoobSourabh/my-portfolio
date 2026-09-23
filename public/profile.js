(async function hydrateProfile() {
  try {
    const response = await fetch('/profile.json', { cache: 'no-store' });
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
        image.src = binding.src;
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
        image.alt = binding.alt;
      });
    });
  } catch (error) {
    console.error(error);
  }
})();
