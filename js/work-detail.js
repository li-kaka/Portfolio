(() => {
  'use strict';

  const { text, translateTree } = window.PortfolioLanguage;
  const allWorksGrid = document.querySelector('[data-all-works]');
  const currentProjectId = document.body.dataset.projectId;

  if (!allWorksGrid || !currentProjectId) return;

  const projects = [
{
      id: '04',
      image: 'image/optimized/mockup04-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 1012,
    },
{
      id: '03',
      image: 'image/optimized/mockup03-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 919,
    },
{
      id: '07',
      image: 'image/optimized/mockup07-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 1012,
    },
{
      id: '01',
      image: 'image/optimized/mockup01-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 919,
    },
{
      id: '06',
      image: 'image/optimized/mockup06-v2-1600.webp?v=20261012-inage-sea',
      width: 1600,
      height: 1012,
    },
{
      id: '05',
      image: 'image/optimized/mockup05-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 1012,
    },
{
      id: '02',
      image: 'image/optimized/mockup02-1600.webp?v=20261012-ordered',
      width: 1600,
      height: 919,
    },
{
      id: '08',
      image: 'image/optimized/mockup08-v3-1600.webp?v=20261015-mockup08',
      width: 1600, height: 1012,
    }
  ];

  projects
    .filter((project) => project.id !== currentProjectId)
    .forEach((project) => {
      const link = document.createElement('a');
      const image = document.createElement('img');
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      const meta = document.createElement('small');

      link.className = 'work-preview';
      link.href = `work${project.id}.html`;
      link.setAttribute('aria-label', text('ui.details', { title: text(`project.${project.id}.name`) }));

      image.src = project.image.replace('-1600.webp', '-600.webp');
      image.srcset = project.image.includes('-1600.webp') ? `${image.getAttribute('src')} 600w, ${project.image.replace('-1600.webp', '-960.webp')} 960w` : '';
      image.sizes = '(max-width: 620px) calc(100vw - 96px), (max-width: 820px) 32vw, 400px';
      image.width = project.width;
      image.height = project.height;
      image.alt = text('ui.mockupAlt', { title: text(`project.${project.id}.name`) });
      image.loading = 'lazy';
      image.decoding = 'async';

      copy.className = 'work-preview-copy';
      title.dataset.i18n = `project.${project.id}.name`;
      title.textContent = text(title.dataset.i18n);
      meta.dataset.i18n = `project.${project.id}.meta`;
      meta.textContent = text(meta.dataset.i18n);
      copy.append(title, meta);
      link.append(image, copy);
      allWorksGrid.append(link);
    });
  document.addEventListener('portfolio:languagechange', () => {
    translateTree(allWorksGrid);
    allWorksGrid.querySelectorAll('a').forEach((link) => {
      const id = link.getAttribute('href').match(/work(\d+)/)[1];
      const title = text(`project.${id}.name`);
      link.setAttribute('aria-label', text('ui.details', { title }));
      link.querySelector('img').alt = text('ui.mockupAlt', { title });
    });
  });
})();
