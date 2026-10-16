(() => {
  'use strict';

  const surfaces = [...document.querySelectorAll('.site-header, .page-section, .work-detail-main > article, .interest-button, .home-back-top')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const namespace = 'http://www.w3.org/2000/svg';
  const optics = document.createElementNS(namespace, 'svg');
  optics.setAttribute('aria-hidden', 'true');
  optics.setAttribute('width', '0');
  optics.setAttribute('height', '0');
  optics.style.position = 'absolute';
  optics.style.pointerEvents = 'none';
  const definitions = document.createElementNS(namespace, 'defs');
  optics.append(definitions);
  document.body.append(optics);

  // A neutral centre and curved displacement near the rim simulate a polished lens.
  // Only the backdrop is filtered: text and controls stay on a sharp foreground plane.
  const createLensMap = (width, height, radius) => {
    const ratio = Math.min(1, 640 / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(2, Math.round(width * ratio));
    canvas.height = Math.max(2, Math.round(height * ratio));
    const context = canvas.getContext('2d');
    if (!context) return null;
    const pixels = context.createImageData(canvas.width, canvas.height);
    const distance = (x, y) => {
      const qx = Math.abs(x - width / 2) - (width / 2 - radius);
      const qy = Math.abs(y - height / 2) - (height / 2 - radius);
      return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius;
    };
    const rim = Math.min(30, height * .32);
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const px = (x + .5) / ratio;
        const py = (y + .5) / ratio;
        const depth = distance(px, py);
        const strength = Math.pow(Math.max(0, 1 - Math.abs(depth) / rim), 1.5);
        const nx = distance(px + .5, py) - distance(px - .5, py);
        const ny = distance(px, py + .5) - distance(px, py - .5);
        const length = Math.hypot(nx, ny) || 1;
        const offset = (y * canvas.width + x) * 4;
        pixels.data[offset] = Math.round(128 + nx / length * strength * 120);
        pixels.data[offset + 1] = Math.round(128 + ny / length * strength * 120);
        pixels.data[offset + 2] = 128;
        pixels.data[offset + 3] = 255;
      }
    }
    context.putImageData(pixels, 0, 0);
    return canvas.toDataURL();
  };

  surfaces.forEach((surface, index) => {
    const header = surface.classList.contains('site-header');
    const filter = document.createElementNS(namespace, 'filter');
    filter.id = `glass-optics-${index}`;
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    filter.setAttribute('x', '0');
    filter.setAttribute('y', '0');
    filter.setAttribute('width', '100%');
    filter.setAttribute('height', '100%');
    const map = document.createElementNS(namespace, 'feImage');
    map.setAttribute('result', 'lens');
    map.setAttribute('x', '0');
    map.setAttribute('y', '0');
    map.setAttribute('width', '100%');
    map.setAttribute('height', '100%');
    map.setAttribute('preserveAspectRatio', 'none');
    const displacement = document.createElementNS(namespace, 'feDisplacementMap');
    displacement.setAttribute('in', 'SourceGraphic');
    displacement.setAttribute('in2', 'lens');
    displacement.setAttribute('scale', header ? '16' : '12');
    displacement.setAttribute('xChannelSelector', 'R');
    displacement.setAttribute('yChannelSelector', 'G');
    filter.append(map, displacement);
    definitions.append(filter);
    let previousSize = '';
    const updateLens = () => {
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      const size = `${width}:${height}`;
      if (!width || !height || size === previousSize) return;
      previousSize = size;
      const radius = Math.min(parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 18, height / 2);
      const source = createLensMap(width, height, radius);
      if (!source) return;
      map.setAttribute('href', source);
      surface.style.setProperty('--glass-filter', `url("#${filter.id}")`);
    };
    const observer = new ResizeObserver(updateLens);
    observer.observe(surface);
    updateLens();

    let pendingFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reset = () => {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = 0;
      ['--light-x', '--light-y'].forEach((property) => surface.style.removeProperty(property));
    };
    surface.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch' || !finePointer.matches || reducedMotion.matches) return;
      const bounds = surface.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      if (pendingFrame) return;
      pendingFrame = window.requestAnimationFrame(() => {
        surface.style.setProperty('--light-x', `${pointerX}px`);
        surface.style.setProperty('--light-y', `${pointerY}px`);
        pendingFrame = 0;
      });
    }, { passive: true });
    surface.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener('change', reset);
  });
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const links = [...nav.querySelectorAll('a')];
    const slider = document.createElement('span');
    slider.className = 'nav-slider';
    slider.setAttribute('aria-hidden', 'true');
    nav.prepend(slider);
    const slideTo = (link) => {
      if (!link) return;
      const inset = parseFloat(getComputedStyle(nav).getPropertyValue('--nav-slider-inset')) || 0;
      slider.style.width = `${link.offsetWidth}px`;
      slider.style.height = `${link.offsetHeight - inset * 2}px`;
      slider.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop + inset}px)`;
    };
    const showActive = () => slideTo(nav.querySelector('a.is-active') || links[0]);
    links.forEach((link) => {
      link.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') slideTo(link); });
      link.addEventListener('focus', () => slideTo(link));
    });
    nav.addEventListener('pointerleave', showActive);
    nav.addEventListener('focusout', (event) => { if (!nav.contains(event.relatedTarget)) showActive(); });
    const activeObserver = new MutationObserver(showActive);
    links.forEach((link) => activeObserver.observe(link, { attributes: true, attributeFilter: ['class'] }));
    new ResizeObserver(showActive).observe(nav);
    document.fonts?.ready.then(showActive);
    showActive();
  }
})();
