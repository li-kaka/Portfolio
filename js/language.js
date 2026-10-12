(() => {
  'use strict';

  const languages = ['ja', 'en', 'zh-Hant'];
  let language = 'ja';
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (languages.includes(saved)) language = saved;
  } catch { /* The site also works when browser storage is unavailable. */ }

  function text(key, values = {}, locale = language) {
    const copy = window.PORTFOLIO_COPY[key];
    const value = copy?.[locale] ?? copy?.ja ?? key;
    if (Array.isArray(value)) return value;
    return value.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
  }

  function writeLines(element, value) {
    element.replaceChildren();
    value.split('\n').forEach((line, index) => {
      if (index) element.append(document.createElement('br'));
      element.append(document.createTextNode(line));
    });
  }

  function translateTree(scope = document) {
    scope.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = text(element.dataset.i18n, {}, element.dataset.i18nLang || language);
      if (Array.isArray(value)) {
        element.replaceChildren(...value.map((paragraph) => {
          const node = document.createElement('p');
          writeLines(node, paragraph);
          return node;
        }));
      } else writeLines(element, value);
    });
    ['alt', 'aria-label'].forEach((attribute) => {
      scope.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
        element.setAttribute(attribute, text(element.getAttribute(`data-i18n-${attribute}`)));
      });
    });
  }

  const toggle = document.querySelector('[data-language-toggle]');
  const options = document.querySelector('#language-options');
  const picker = document.querySelector('.language-picker');

  function applyLanguage() {
    document.documentElement.lang = language;
    translateTree();
    toggle.setAttribute('aria-label', text('ui.chooseLanguage'));
    options.setAttribute('aria-label', text('ui.chooseLanguage'));
    options.querySelectorAll('button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.languageOption === language));
    });
    const id = document.body.dataset.projectId;
    const title = id ? text(`project.${id}.name`) : '';
    document.querySelectorAll('[data-i18n-lang]').forEach((element) => {
      element.lang = element.dataset.i18nLang;
    });
    document.querySelector('meta[name="description"]').content = id
      ? text(`project.${id}.overview`) : text('home.description');
    if (id) {
      document.querySelectorAll('[data-project-image]').forEach((image) => {
        image.alt = text('ui.mockupAlt', { title });
      });
      document.querySelectorAll('[data-design-image]').forEach((image) => {
        const src = image.getAttribute('src');
        const type = /mobile|moblie/.test(src) ? 'mobile' : /quiz_result/.test(src)
          ? 'result' : /quiz/.test(src) ? 'quiz' : /navigation/.test(src) ? 'navigation' : 'desktop';
        image.alt = text(`ui.${type}Alt`, { title });
        const part = src.match(/-part(\d+)/);
        if (part) image.alt += text('ui.part', {
          part: Number(part[1]), total: image.parentElement.querySelectorAll('[data-design-image]').length
        });
      });
      document.querySelectorAll('.project-live-link').forEach((link) => {
        link.setAttribute('aria-label', text('ui.liveLabel', { title }));
      });
    }
  }

  function closeOptions() {
    options.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    options.hidden = !options.hidden;
    toggle.setAttribute('aria-expanded', String(!options.hidden));
    if (!options.hidden) options.querySelector('[aria-pressed="true"]').focus();
  });
  options.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language-option]');
    if (!button) return;
    language = button.dataset.languageOption;
    try { localStorage.setItem('portfolio-language', language); } catch { /* Optional preference. */ }
    applyLanguage();
    document.dispatchEvent(new CustomEvent('portfolio:languagechange'));
    closeOptions();
    toggle.focus();
  });
  document.addEventListener('pointerdown', (event) => {
    if (!picker.contains(event.target)) closeOptions();
  });
  picker.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeOptions();
      toggle.focus();
    }
  });
  picker.addEventListener('focusout', (event) => {
    if (!picker.contains(event.relatedTarget)) closeOptions();
  });

  window.PortfolioLanguage = { text, translateTree };
  applyLanguage();
})();
