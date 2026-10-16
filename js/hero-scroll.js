(() => {
  'use strict';

  const hero = document.querySelector('.dream-hero');
  const heading = hero?.querySelector('.dream-heading');
  if (!hero || !heading) return;

  const scrollCue = hero.querySelector('.hero-scroll-cue');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let framePending = false;

  const render = () => {
    framePending = false;
    if (document.documentElement.classList.contains('is-home-intro')) return;
    if (scrollCue) {
      const visible = hero.getBoundingClientRect().top > -80;
      scrollCue.style.opacity = visible ? '1' : '0';
      scrollCue.style.visibility = visible ? 'visible' : 'hidden';
    }
    if (reducedMotion.matches) {
      heading.style.removeProperty('transform');
      heading.style.removeProperty('opacity');
      heading.style.removeProperty('z-index');
      heading.parentElement.style.zIndex = '2';
      return;
    }
    const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
    const scrollDistance = Math.max(0, -hero.getBoundingClientRect().top);
    const progress = Math.min(1, scrollDistance / distance);
    // Keep the title visible until Work starts entering the viewport.
    const fadeStart = Math.max(0, distance - window.innerHeight * 0.24);
    const fadeEnd = distance + window.innerHeight * 0.26;
    const opacity = 1 - Math.min(1, Math.max(0, (scrollDistance - fadeStart) / (fadeEnd - fadeStart)));
    heading.parentElement.style.zIndex = '2';
    heading.style.transform = `scale(${1 + progress * 3})`;
    heading.style.opacity = String(opacity);
  };

  const schedule = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(render);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  document.addEventListener('portfolio:introend', schedule);
  render();
})();
