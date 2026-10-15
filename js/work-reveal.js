(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cards = [...document.querySelectorAll('.works-overview-card, .work-preview')];
  const mockups = document.querySelectorAll('.works-overview-card img, .work-preview img, [data-project-card] img');

  const masks = new Map();
  const deviceMask = (image) => {
    const source = image.currentSrc || image.src;
    if (masks.has(source)) return masks.get(source);
    const canvas = document.createElement('canvas');
    const ratio = Math.min(1, 640 / image.naturalWidth);
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    // Exclude transparent padding and soft cast shadows from the reflection.
    for (let offset = 3; offset < pixels.data.length; offset += 4) {
      pixels.data[offset] = Math.max(0, (pixels.data[offset] - 240) * 17);
    }
    context.putImageData(pixels, 0, 0);
    const mask = canvas.toDataURL();
    masks.set(source, mask);
    return mask;
  };

  mockups.forEach((image) => {
    const surface = document.createElement('span');
    surface.className = 'work-mockup';
    image.before(surface);
    surface.append(image);
    const syncReflection = () => {
      if (!image.naturalWidth) return;
      try {
        const mask = deviceMask(image);
        if (mask) surface.style.setProperty('--mockup-mask', `url("${mask}")`);
      } catch {
        // A failed mask leaves the reflection invisible instead of lighting the rectangle.
        surface.style.removeProperty('--mockup-mask');
      }
    };
    image.addEventListener('load', syncReflection);
    if (image.complete) syncReflection();
  });

  if (!cards.length || reducedMotion.matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach(async ({ target: card }) => {
      observer.unobserve(card);
      const image = card.querySelector('img');
      try { await image?.decode(); } catch { /* Reveal even if an image cannot decode. */ }
      card.classList.add('is-work-visible');
    });
  }, { threshold: .12 });

  cards.forEach((card, index) => {
    card.style.setProperty('--work-delay', `${[40, 230, 110, 360, 170, 70, 290, 140][index % 8]}ms`);
    card.style.setProperty('--work-duration', `${[1500, 1800, 1650, 1950][index % 4]}ms`);
    card.style.setProperty('--work-flicker', index % 2 ? 'work-lamp-b' : 'work-lamp-a');
    card.classList.add('has-work-reveal');
    observer.observe(card);
    card.addEventListener('focusin', () => {
      card.classList.remove('has-work-reveal');
      observer.unobserve(card);
    });
  });
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    cards.forEach((card) => card.classList.remove('has-work-reveal'));
  });
})();
