(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const { translateTree } = window.PortfolioLanguage;
  const text = (key, values = {}) => window.PortfolioLanguage.text(key, values, 'en');
  const projectKey = (project) => `project.${project.url.match(/work(\d+)/)[1]}`;
  const projectName = (project) => text(`${projectKey(project)}.name`);
  const emailLink = document.querySelector('.email-link');
  const emailText = emailLink?.querySelector('.email-text');
  if (emailText && !reducedMotion.matches) {
    let emailAnimation;
    let hasRevealedEmail = false;
    emailText.classList.add('is-reveal-pending');
    const emailObserver = new IntersectionObserver((entries) => {
      if (hasRevealedEmail || !entries.some((entry) => entry.isIntersecting)) return;
      hasRevealedEmail = true;
      emailText.classList.remove('is-reveal-pending');
      emailAnimation = emailText.animate([
        { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
        { opacity: 1, clipPath: 'inset(0 0 0 0)' }
      ], { duration: 900, easing: 'cubic-bezier(.22, 1, .36, 1)' });
      emailObserver.disconnect();
    }, { threshold: .5 });
    const showEmail = () => {
      hasRevealedEmail = true;
      emailObserver.disconnect();
      emailAnimation?.cancel();
      emailText.classList.remove('is-reveal-pending');
    };
    const observeEmail = () => {
      if (!hasRevealedEmail) emailObserver.observe(emailLink);
    };
    observeEmail();
    emailLink.addEventListener('focus', showEmail, { once: true });
    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) showEmail();
    });
  }

  const navLinks = [...document.querySelectorAll('[data-section-link]')];
  const observedSections = [...document.querySelectorAll('#home, #work, #about, #contact')];
  const projectButtons = [...document.querySelectorAll('[data-project-button]')];
  const projectSteps = [...document.querySelectorAll('[data-project-step]')];
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  const projectControls = [...document.querySelectorAll('[data-project-control]')];
  const projectVisuals = document.querySelector('[data-project-visuals]');
  const projectTitle = document.querySelector('[data-project-title]');
  const projectMeta = document.querySelector('[data-project-meta]');
  const workSection = document.querySelector('#work');
  const overviewButton = document.querySelector('[data-works-overview-toggle]');
  const overviewGrid = document.querySelector('[data-works-overview]');

  const projects = [
    {
        "image": "image/optimized/mockup04-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 1012,
        "url": "work04.html"
    },
    {
        "image": "image/optimized/mockup03-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 919,
        "url": "work03.html"
    },
    {
        "image": "image/optimized/mockup07-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 1012,
        "url": "work07.html"
    },
    {
        "image": "image/optimized/mockup01-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 919,
        "url": "work01.html"
    },
    {
        "image": "image/optimized/mockup06-v2-1600.webp?v=20261012-inage-sea",
        "width": 1600,
        "height": 1012,
        "url": "work06.html"
    },
    {
        "image": "image/optimized/mockup05-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 1012,
        "url": "work05.html"
    },
    {
        "image": "image/optimized/mockup02-1600.webp?v=20261012-ordered",
        "width": 1600,
        "height": 919,
        "url": "work02.html"
    },
    {
        "image": "image/optimized/mockup08-v3-1600.webp?v=20261015-mockup08",
        "width": 1600, "height": 1012,
        "url": "work08.html"
    }
];

  let activeProject = 0;
  let isProjectAnimating = false;
  let pendingProjectIndex = null;
  let projectContentTimer;
  let projectAnimationTimer;

  let navigationFrame = 0;

  function syncActiveSection() {
    navigationFrame = 0;
    if (!navLinks.length || !observedSections.length) return;

    const marker = window.innerHeight * 0.35;
    const atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    let activeSection = observedSections[0];
    observedSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) activeSection = section;
    });
    // A short final section may never reach the viewport marker.
    if (atBottom) activeSection = observedSections[observedSections.length - 1];

    navLinks.forEach((link) => {
      const isActive = link.dataset.sectionLink === activeSection.id;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleNavigation() {
    if (!navigationFrame) navigationFrame = window.requestAnimationFrame(syncActiveSection);
  }

  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('load', scheduleNavigation);
  document.addEventListener('portfolio:introend', scheduleNavigation);
  syncActiveSection();

  function getCard(role) {
    return projectCards.find((card) => card.classList.contains(`project-card--${role}`));
  }

  function setCardProject(card, index, role) {
    const project = projects[index];
    const image = card.querySelector('img');

    card.dataset.projectIndex = String(index);
    image.src = project.image;
    image.srcset = project.image.includes('-1600.webp') ? `${project.image.replace('-1600.webp', '-600.webp')} 600w, ${project.image.replace('-1600.webp', '-960.webp')} 960w, ${project.image} 1600w` : '';
    image.sizes = role === 'main'
      ? '(max-width: 620px) calc(100vw - 24px), (max-width: 820px) 72vw, (max-width: 1245px) 61vw, 760px'
      : '(max-width: 820px) 38vw, 400px';
    image.width = project.width;
    image.height = project.height;
    image.alt = role === 'main' ? text('ui.mockupAlt', { title: projectName(project) }) : '';
    card.setAttribute('aria-hidden', String(role !== 'main'));

    if (role === 'main' && project.url) {
      card.href = project.url;
      card.setAttribute('aria-label', text('ui.details', { title: projectName(project) }));
    } else {
      card.removeAttribute('href');
      card.removeAttribute('aria-label');
    }
  }

  function updateProjectContent(index) {
    const project = projects[index];

    projectButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    projectTitle.textContent = projectName(project);
    projectMeta.textContent = text(`${projectKey(project)}.meta`);
  }

  function syncProjectControls() {
    projectControls.forEach((control) => {
      const role = control.dataset.projectControl;
      const card = getCard(role);
      const project = projects[Number(card.dataset.projectIndex)];
      control.setAttribute('aria-label', text(`ui.${role}`, { title: projectName(project) }));
    });
  }

  function showProject(index) {
    if (index === activeProject || !projects[index]) return;

    if (isProjectAnimating) {
      pendingProjectIndex = index;
      return;
    }

    isProjectAnimating = true;
    const oldIndex = activeProject;
    const nextNeighbor = (oldIndex + 1) % projects.length;
    const previousNeighbor = (oldIndex - 1 + projects.length) % projects.length;
    const direction = index === nextNeighbor || (index !== previousNeighbor && index > oldIndex)
      ? 'next'
      : 'previous';
    const mainCard = getCard('main');
    const previousCard = getCard('previous');
    const nextCard = getCard('next');
    const movingToMain = direction === 'next' ? nextCard : previousCard;
    const movingToSide = mainCard;
    const movingOut = direction === 'next' ? previousCard : nextCard;
    const sideRole = direction === 'next' ? 'previous' : 'next';
    const exitRole = direction === 'next' ? 'exit-left' : 'exit-right';
    const newSideIndex = direction === 'next'
      ? (index + 1) % projects.length
      : (index - 1 + projects.length) % projects.length;

    window.clearTimeout(projectContentTimer);
    window.clearTimeout(projectAnimationTimer);

    if (reducedMotion.matches) {
      activeProject = index;
      setCardProject(mainCard, index, 'main');
      setCardProject(previousCard, (index - 1 + projects.length) % projects.length, 'previous');
      setCardProject(nextCard, (index + 1) % projects.length, 'next');
      updateProjectContent(index);
      syncProjectControls();
      isProjectAnimating = false;
      pendingProjectIndex = null;
      return;
    }
    setCardProject(movingToMain, index, 'main');

    movingOut.classList.replace(
      direction === 'next' ? 'project-card--previous' : 'project-card--next',
      `project-card--${exitRole}`
    );
    movingToSide.classList.replace('project-card--main', `project-card--${sideRole}`);
    movingToMain.classList.replace(
      direction === 'next' ? 'project-card--next' : 'project-card--previous',
      'project-card--main'
    );
    projectVisuals.classList.add(`is-moving-${direction}`);

    projectContentTimer = window.setTimeout(() => {
      activeProject = index;
      updateProjectContent(index);
      setCardProject(movingToSide, direction === 'next'
        ? (index - 1 + projects.length) % projects.length
        : (index + 1) % projects.length, sideRole);
    }, 260);

    projectAnimationTimer = window.setTimeout(() => {
      movingOut.classList.add('is-resetting');
      movingOut.classList.replace(`project-card--${exitRole}`, direction === 'next'
        ? 'project-card--next'
        : 'project-card--previous');
      setCardProject(movingOut, newSideIndex, direction === 'next' ? 'next' : 'previous');
      projectVisuals.classList.remove('is-moving-next', 'is-moving-previous');
      void movingOut.offsetWidth;
      movingOut.classList.remove('is-resetting');
      syncProjectControls();
      isProjectAnimating = false;

      if (pendingProjectIndex !== null && pendingProjectIndex !== activeProject) {
        const nextPendingIndex = pendingProjectIndex;
        pendingProjectIndex = null;
        showProject(nextPendingIndex);
      } else {
        pendingProjectIndex = null;
      }
    }, 540);
  }

  const projectObserver = new IntersectionObserver(() => {
    if (workSection.classList.contains('is-overview')) return;
    const viewportCenter = window.innerHeight / 2;
    const nearestStep = projectSteps.reduce((nearest, step) => {
      const rect = step.getBoundingClientRect();
      const distance = Math.abs(rect.top + (rect.height / 2) - viewportCenter);
      return distance < nearest.distance ? { step, distance } : nearest;
    }, { step: projectSteps[0], distance: Number.POSITIVE_INFINITY });

    showProject(Number(nearestStep.step.dataset.projectStep));
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  projectSteps.forEach((step) => projectObserver.observe(step));

  if (overviewButton && overviewGrid) {
    const mobileWork = window.matchMedia('(max-width: 620px)');
    let showcaseScrollPosition = null;
    let desktopOverview = true;

    function buildOverview() {
      if (overviewGrid.childElementCount) return;
      projects.forEach((project) => {
        const link = document.createElement('a');
        const image = document.createElement('img');
        const title = document.createElement('strong');
        const meta = document.createElement('small');
        const summary = document.createElement('p');

        link.className = 'works-overview-card';
        link.href = project.url;
        image.src = project.image.replace('-1600.webp', '-600.webp');
        image.srcset = project.image.includes('-1600.webp') ? `${image.getAttribute('src')} 600w, ${project.image.replace('-1600.webp', '-960.webp')} 960w` : '';
        image.sizes = '(max-width: 620px) calc(100vw - 40px), (max-width: 820px) 44vw, 30vw';
        image.width = project.width;
        image.height = project.height;
        image.alt = text('ui.mockupAlt', { title: projectName(project) });

        image.loading = 'lazy';
        image.decoding = 'async';
        title.dataset.i18n = `${projectKey(project)}.name`;
        title.dataset.i18nLang = 'en';
        title.lang = 'en';
        title.textContent = projectName(project);
        meta.dataset.i18n = `${projectKey(project)}.meta`;
        meta.dataset.i18nLang = 'en';
        meta.lang = 'en';
        meta.textContent = text(meta.dataset.i18n);
        summary.className = 'project-summary';
        summary.dataset.i18n = `${projectKey(project)}.summary`;
        summary.textContent = window.PortfolioLanguage.text(summary.dataset.i18n);
        link.append(image, title, meta, summary);
        overviewGrid.append(link);
      });
    }

    function setWorkView(opening) {
      if (opening) buildOverview();
      workSection.classList.toggle('is-overview', opening);
      overviewGrid.hidden = !opening;
      overviewButton.hidden = mobileWork.matches;
      overviewButton.setAttribute('aria-expanded', String(opening));
      overviewButton.dataset.i18n = opening ? 'ui.backShowcase' : 'ui.viewAll';
      overviewButton.textContent = text(overviewButton.dataset.i18n);
    }

    // Mobile uses a normal list from the first render, without scroll steps.
    setWorkView(mobileWork.matches || desktopOverview);
    mobileWork.addEventListener('change', () => {
      setWorkView(mobileWork.matches || desktopOverview);
    });

    overviewButton.addEventListener('click', () => {
      if (mobileWork.matches) return;
      const opening = overviewGrid.hidden;
      if (opening) showcaseScrollPosition = window.scrollY;
      desktopOverview = opening;
      setWorkView(opening);

      const workTop = window.scrollY + workSection.getBoundingClientRect().top;
      const headerHeight = parseFloat(getComputedStyle(root).getPropertyValue('--header-height'));
      const start = Math.max(0, workTop - headerHeight);
      const end = Math.max(start, workTop + workSection.offsetHeight - window.innerHeight);
      const destination = opening ? start : Math.min(end, Math.max(start, showcaseScrollPosition ?? start));
      window.scrollTo({ top: destination, behavior: 'instant' });
    });
  }

  function syncLanguage() {
    if (!projectTitle) return;
    updateProjectContent(activeProject);
    syncProjectControls();
    projectCards.forEach((card) => {
      const project = projects[Number(card.dataset.projectIndex)];
      const main = card.classList.contains('project-card--main');
      card.querySelector('img').alt = main ? text('ui.mockupAlt', { title: projectName(project) }) : '';
      if (main) card.setAttribute('aria-label', text('ui.details', { title: projectName(project) }));
    });
    projectButtons.forEach((button, index) => button.setAttribute('aria-label', `${index + 1} ${projectName(projects[index])}`));
    overviewGrid.querySelectorAll('a').forEach((link, index) => {
      link.querySelector('img').alt = text('ui.mockupAlt', { title: projectName(projects[index]) });
    });
    translateTree(overviewGrid);
  }

  if (projectCards.length) {
    setCardProject(getCard('main'), 0, 'main');
    setCardProject(getCard('previous'), projects.length - 1, 'previous');
    setCardProject(getCard('next'), 1, 'next');
  }
  syncLanguage();
  document.addEventListener('portfolio:languagechange', syncLanguage);

  projectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      projectSteps[index].scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
    });
  });

  projectControls.forEach((control) => {
    control.addEventListener('click', () => {
      const card = getCard(control.dataset.projectControl);
      const index = Number(card.dataset.projectIndex);
      showProject(index);
      projectSteps[index].scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
    });
  });
  const homeTop = document.querySelector('[data-home-top]');
  if (homeTop) {
    const syncHomeTop = () => { homeTop.hidden = window.scrollY < window.innerHeight; };
    window.addEventListener('scroll', syncHomeTop, { passive: true });
    window.addEventListener('resize', syncHomeTop);
    homeTop.addEventListener('click', (event) => {
      if (reducedMotion.matches) {
        event.preventDefault();
        history.replaceState(null, '', '#home');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      if (event.detail === 0) document.querySelector('.site-nav a[href="#home"]')?.focus({ preventScroll: true });
    });
    syncHomeTop();
  }
})();
