(() => {
  'use strict';

  // ---- Settings -----------------------------------------------------------
  const GITHUB_USER = 'thitiwutphi';
  // Repositories to leave out of the Projects grid (lower-case names).
  const HIDDEN_REPOS = ['portfolio'];
  const MAX_PROJECTS = 6;

  const LANGUAGE_COLORS = {
    'C': '#555555',
    'C#': '#178600',
    'C++': '#f34b7d',
    'CSS': '#563d7c',
    'Dart': '#00b4ab',
    'Go': '#00add8',
    'HTML': '#e34c26',
    'Java': '#b07219',
    'JavaScript': '#f1e05a',
    'Jupyter Notebook': '#da5b0b',
    'Kotlin': '#a97bff',
    'PHP': '#4f5d95',
    'Python': '#3572a5',
    'Ruby': '#701516',
    'Rust': '#dea584',
    'Shell': '#89e051',
    'Svelte': '#ff3e00',
    'Swift': '#f05138',
    'TypeScript': '#3178c6',
    'Vue': '#41b883',
  };

  const root = document.documentElement;

  // ---- Small DOM helpers --------------------------------------------------
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'class') node.className = value;
      else node.setAttribute(key, value);
    }
    node.append(...children.filter((child) => child !== null && child !== undefined));
    return node;
  };

  const icon = (pathData) => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon icon-sm');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', pathData);
    svg.append(path);
    return svg;
  };

  const ICON_STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  const ICON_ARROW = 'M7 17 17 7M8 7h9v9';

  // ---- Theme toggle -------------------------------------------------------
  const themeButton = document.querySelector('.theme-toggle');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = () => root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');

  const syncThemeButton = () => {
    const theme = currentTheme();
    themeButton.dataset.mode = theme;
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  if (themeButton) {
    syncThemeButton();
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncThemeButton);
    themeButton.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
      syncThemeButton();
    });
  }

  // ---- Mobile menu --------------------------------------------------------
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    const isOpen = () => menuButton.getAttribute('aria-expanded') === 'true';
    const setOpen = (open) => {
      navLinks.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    menuButton.addEventListener('click', () => setOpen(!isOpen()));
    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (isOpen() && !event.target.closest('.nav')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        menuButton.focus();
      }
    });
  }

  // ---- Reveal on scroll ---------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((node) => observer.observe(node));
  } else {
    revealEls.forEach((node) => node.classList.add('is-visible'));
  }

  // ---- Footer year --------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Projects from GitHub -----------------------------------------------
  const projectList = document.getElementById('project-list');
  const projectStatus = document.getElementById('project-status');

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en', { month: 'short', year: 'numeric' });

  const profileLink = () =>
    el('a', { href: `https://github.com/${GITHUB_USER}`, target: '_blank', rel: 'noopener' }, 'GitHub');

  const showStatus = (...content) => {
    projectStatus.replaceChildren(...content);
    projectStatus.hidden = false;
  };

  const projectCard = (repo) => {
    const meta = el('div', { class: 'card-meta' });

    if (repo.language) {
      const dot = el('span', { class: 'lang-dot', 'aria-hidden': 'true' });
      dot.style.setProperty('--dot', LANGUAGE_COLORS[repo.language] || 'var(--muted)');
      meta.append(el('span', {}, dot, repo.language));
    }
    if (repo.stargazers_count > 0) {
      meta.append(el('span', { 'aria-label': `${repo.stargazers_count} stars` }, icon(ICON_STAR), String(repo.stargazers_count)));
    }
    meta.append(el('span', {}, `Updated ${formatDate(repo.pushed_at)}`));

    const card = el('article', { class: 'card' },
      el('h3', {}, el('a', { href: repo.html_url, target: '_blank', rel: 'noopener' }, repo.name)),
      el('p', {}, repo.description || 'No description yet.'),
      meta,
    );

    if (repo.homepage && /^https?:\/\//i.test(repo.homepage)) {
      card.append(el('a', { class: 'card-link', href: repo.homepage, target: '_blank', rel: 'noopener' }, 'Live demo', icon(ICON_ARROW)));
    }

    return el('li', {}, card);
  };

  const loadProjects = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);

      const repos = (await response.json())
        .filter((repo) => !repo.fork && !repo.archived && !HIDDEN_REPOS.includes(repo.name.toLowerCase()))
        .slice(0, MAX_PROJECTS);

      projectList.replaceChildren(...repos.map(projectCard));
      if (repos.length === 0) {
        showStatus('No public projects to show yet — follow along on ', profileLink(), ' for new work.');
      }
    } catch (error) {
      console.error('Could not load projects:', error);
      projectList.replaceChildren();
      showStatus('Projects could not be loaded right now. You can browse them on ', profileLink(), '.');
    } finally {
      projectList.removeAttribute('aria-busy');
    }
  };

  if (projectList && projectStatus) loadProjects();
})();
