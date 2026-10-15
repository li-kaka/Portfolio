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
    const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / distance));
    const opacity = 1 - Math.min(1, Math.max(0, (progress - 0.18) / 0.52));
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
