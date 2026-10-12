(() => {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('is-loading');
  // Reveal the page even if the deferred loading script cannot be loaded.
  window.portfolioLoadingFallback = window.setTimeout(() => {
    root.classList.remove('is-loading');
    window.dispatchEvent(new Event('portfolio:ready'));
  }, 3500);
})();
