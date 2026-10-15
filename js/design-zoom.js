(() => {
  'use strict';
  const buttons = document.querySelectorAll('[data-design-zoom]');
  if (!buttons.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'design-dialog';
  dialog.setAttribute('aria-label', window.PortfolioLanguage.text('ui.zoom'));
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', window.PortfolioLanguage.text('ui.closeImage'));
  const image = document.createElement('img');
  dialog.append(close, image);
  document.body.append(dialog);
  buttons.forEach((button) => button.addEventListener('click', () => {
    const source = button.querySelector('img');
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    dialog.showModal();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('portfolio:languagechange', () => {
    dialog.setAttribute('aria-label', window.PortfolioLanguage.text('ui.zoom'));
    close.setAttribute('aria-label', window.PortfolioLanguage.text('ui.closeImage'));
  });
})();
