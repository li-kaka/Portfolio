(() => {
  'use strict';

  const root = document.documentElement;
  const heading = document.querySelector('.dream-heading');
  const header = document.querySelector('.site-header');
  const loader = document.querySelector('.home-loader');
  const bar = loader?.querySelector('progress');
  if (!heading || !loader || !bar) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const homeLink = document.querySelector('.site-nav a[href="#home"]');
  const surfaces = [...document.querySelectorAll('.site-header, main, .site-footer, .skip-link')];
  let running = false;
  let hasPlayed = false;
  let runId = 0;
  let deadline;
  let animation;
  let headerAnimation;
  let previousInert = [];
  let keyboardPlayback = false;

  const imageReady = (image) => new Promise((resolve) => {
    if (image.complete) return resolve();
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });

  const finish = () => {
    if (!running) return;
    const restoreFocus = keyboardPlayback && document.activeElement === document.body;
    running = false;
    runId += 1;
    window.clearTimeout(deadline);
    animation?.cancel();
    animation = null;
    headerAnimation?.cancel();
    headerAnimation = null;
    root.classList.remove('is-home-loading', 'is-home-intro');
    loader.hidden = true;
    surfaces.forEach((surface, index) => { surface.inert = previousInert[index]; });
    if (restoreFocus) homeLink?.focus({ preventScroll: true });
    document.dispatchEvent(new Event('portfolio:introend'));
  };

  const play = async (keyboard = false) => {
    if (running) return;
    keyboardPlayback = keyboard;
    const replay = hasPlayed;
    hasPlayed = true;
    running = true;
    const id = ++runId;
    previousInert = surfaces.map((surface) => surface.inert);
    surfaces.forEach((surface) => { surface.inert = true; });
    root.classList.add('is-home-loading', 'is-home-intro');
    window.scrollTo({ top: 0, behavior: 'instant' });
    loader.hidden = false;
    bar.value = 0;
    bar.style.setProperty('--progress-duration', replay ? '200ms' : '1200ms');
    const jobs = [...document.querySelectorAll('.dream-backdrop img, .dream-foreground')].map(imageReady);
    if (document.fonts) jobs.push(document.fonts.ready);
    bar.max = jobs.length || 1;
    let completed = 0;
    deadline = window.setTimeout(finish, 6000);
    try {
      await Promise.allSettled(jobs.map((job) => job.then(() => {
        if (id === runId) bar.value = ++completed;
      })));
      if (id !== runId) return;
      if (!jobs.length) bar.value = 1;
      if (!reducedMotion.matches) {
        animation = loader.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: replay ? 250 : 350, delay: replay ? 200 : 1250
        });
        await animation.finished;
      }
      if (id !== runId) return;
      loader.hidden = true;
      root.classList.remove('is-home-loading');
      heading.style.transform = 'scale(1)';
      heading.style.opacity = '1';
      if (!reducedMotion.matches) {
        animation = heading.animate([
          { transform: 'scale(.16)', opacity: 0 },
          { transform: 'scale(.4)', opacity: .65, offset: .35 },
          { transform: 'scale(1)', opacity: 1 }
        ], { duration: replay ? 1100 : 2300, easing: 'cubic-bezier(.2,.65,.25,1)' });
        headerAnimation = header?.animate([
          { opacity: 0 },
          { opacity: .65, offset: .35 },
          { opacity: 1 }
        ], { duration: replay ? 1100 : 2300, easing: 'cubic-bezier(.2,.65,.25,1)' });
        await Promise.all([animation.finished, headerAnimation?.finished]);
      }
    } catch (error) {
      if (error.name !== 'AbortError') console.error('Portfolio intro:', error);
    } finally {
      if (id === runId) finish();
    }
  };

  document.addEventListener('keydown', (event) => {
    if (running && event.key === 'Escape') { keyboardPlayback = true; finish(); }
    if (running && event.key === 'Tab') {
      event.preventDefault();
      keyboardPlayback = true;
      finish();
    }
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finish(); });
  document.querySelectorAll('.site-nav a[href="#home"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      history.replaceState(null, '', '#home');
      play(event.detail === 0);
    });
  });

  if (!location.hash || location.hash === '#home') play();
  else root.classList.remove('is-home-loading', 'is-home-intro');
})();
