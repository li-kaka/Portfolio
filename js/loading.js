(() => {
  'use strict';

  const root = document.documentElement;
  const loader = document.querySelector('[data-loader]');
  if (!loader || !root.classList.contains('is-loading')) return;

  const image = document.querySelector('.hero-image, .detail-hero-image');
  const startedAt = performance.now();
  let finished = false;

  const finishLoading = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(maximumWait);
    // A short entrance is enough; the line is decorative, not a download percentage.
    window.setTimeout(() => {
      loader.classList.add('is-leaving');
      window.setTimeout(() => {
        root.classList.remove('is-loading');
        window.clearTimeout(window.portfolioLoadingFallback);
        window.dispatchEvent(new Event('portfolio:ready'));
        loader.remove();
      }, 400);
    }, Math.max(0, 1600 - (performance.now() - startedAt)));
  };

  const maximumWait = window.setTimeout(finishLoading, 2200);
  if (!image || image.complete) finishLoading();
  else {
    image.addEventListener('load', finishLoading, { once: true });
    image.addEventListener('error', finishLoading, { once: true });
  }
})();
