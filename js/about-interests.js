(() => {
  'use strict';

  const portrait = document.querySelector('.profile-portrait');
  const preview = portrait?.querySelector('.profile-interest-image');
  const original = portrait?.querySelector('img:first-child');
  const buttons = document.querySelectorAll('[data-interest-image]');
  const resetButton = document.querySelector('[data-interest-reset]');
  if (!portrait || !preview || !original) return;

  const originalSource = original.getAttribute('src');
  const originalAlt = original.alt;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const images = new Map();
  let currentImage = original;
  let activeButton = null;
  let fillTimer = 0;
  let generation = 0;
  let direction = 1;
  let animations = [];

  const prepareImage = (source) => {
    if (!images.has(source)) {
      images.set(source, new Promise((resolve) => {
        const image = new Image();
        image.onload = async () => {
          try { await image.decode(); } catch { /* Loaded images can still display. */ }
          resolve(true);
        };
        image.onerror = () => resolve(false);
        image.src = source;
      }));
    }
    return images.get(source);
  };

  const showImage = (source, alt) => {
    if (currentImage.getAttribute('src') === source) return;
    animations.forEach((animation) => animation.cancel());
    animations = [];
    const outgoing = currentImage;
    const incoming = outgoing === original ? preview : original;
    incoming.removeAttribute('srcset');
    incoming.removeAttribute('sizes');
    incoming.src = source;
    incoming.alt = alt;
    incoming.removeAttribute('aria-hidden');
    outgoing.setAttribute('aria-hidden', 'true');
    incoming.style.opacity = '1';
    incoming.style.zIndex = '2';
    outgoing.style.opacity = '0';
    outgoing.style.zIndex = '1';
    currentImage = incoming;
    const from = direction * 100;
    direction *= -1;
    if (reducedMotion.matches) return;
    const timing = { duration: 460, easing: 'cubic-bezier(.22,.75,.22,1)' };
    animations = [
      incoming.animate([
        { transform: `translateX(${from}%)`, opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 }
      ], timing),
      outgoing.animate([
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(${-from}%)`, opacity: 0 }
      ], timing)
    ];
  };

  const reset = () => {
    generation += 1;
    window.clearTimeout(fillTimer);
    activeButton?.classList.remove('is-pressing');
    activeButton?.setAttribute('aria-pressed', 'false');
    activeButton = null;
    resetButton?.setAttribute('aria-pressed', 'true');
    showImage(originalSource, originalAlt);
  };

  const start = (button) => {
    if (activeButton === button) return;
    generation += 1;
    window.clearTimeout(fillTimer);
    activeButton?.classList.remove('is-pressing');
    activeButton?.setAttribute('aria-pressed', 'false');
    activeButton = button;
    resetButton?.setAttribute('aria-pressed', 'false');
    const currentGeneration = generation;
    button.classList.add('is-pressing');
    button.setAttribute('aria-pressed', 'true');
    fillTimer = window.setTimeout(async () => {
      const ready = await prepareImage(button.dataset.interestImage);
      if (!ready || currentGeneration !== generation || activeButton !== button) return;
      showImage(button.dataset.interestImage, button.textContent.trim());
    }, 240);
    prepareImage(button.dataset.interestImage);
  };

  buttons.forEach((button) => {
    button.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') start(button); });
    button.addEventListener('focus', () => start(button));
    button.addEventListener('click', () => start(button));
  });
  resetButton?.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') reset(); });
  resetButton?.addEventListener('focus', reset);
  resetButton?.addEventListener('click', reset);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) animations.forEach((animation) => animation.cancel());
  });
})();
