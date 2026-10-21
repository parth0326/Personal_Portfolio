// Builds the project cards from PROJECTS (js/projects-data.js) and handles
// the filter buttons + search box. The circle in project-orb.js hooks in through
// window.Projects so everything filters off the same state.
(function () {
  const grid = document.querySelector('.projects-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');
  const noResults = document.querySelector('.no-results');

  // area = filter buttons, slice = whatever's picked in the circle
  const state = { area: 'all', query: '', slice: null };
  const listeners = [];

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  function valuesOf(p, key) {
    const v = p[key];
    if (Array.isArray(v)) return v;
    return v ? [v] : [];
  }

  function cardHTML(p) {
    const link = p.link
      ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">GitHub</a>`
      : '';
    const tags = [
      p.category ? `<span class="tag tag-cat">${esc(p.category)}</span>` : '',
      ...p.languages.map(l => `<span class="tag">${esc(l)}</span>`),
      ...p.tools.slice(0, 4).map(t => `<span class="tag tag-tool">${esc(t)}</span>`),
    ].join('');

    return `
      <article class="project-card${p.featured ? ' featured' : ''}">
        <div class="project-card-top">
          <span class="project-type"><span class="project-icon">&#9632;</span> ${esc(p.type)}</span>
          <div class="project-card-links">${link}</div>
        </div>
        <h3>${esc(p.title)}</h3>
        ${p.when ? `<span class="project-when">${esc(p.when)}</span>` : ''}
        <p>${esc(p.summary)}</p>
        <div class="project-tags">${tags}</div>
      </article>`;
  }

  grid.innerHTML = PROJECTS.map(cardHTML).join('');
  const cards = [...grid.querySelectorAll('.project-card')];

  // search looks at everything, including tools that don't fit on the card
  const haystacks = PROJECTS.map(p => [
    p.title, p.summary, p.type, p.category, p.when, ...p.languages, ...p.tools,
  ].filter(Boolean).join(' ').toLowerCase());

  function matches(p, i) {
    if (state.area !== 'all' && !p.area.includes(state.area)) return false;
    if (state.slice && !valuesOf(p, state.slice.key).includes(state.slice.value)) return false;
    if (state.query && !haystacks[i].includes(state.query)) return false;
    return true;
  }

  function apply() {
    let visible = 0;
    PROJECTS.forEach((p, i) => {
      const show = matches(p, i);
      cards[i].style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    listeners.forEach(fn => fn(state, visible));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.area = btn.dataset.filter;
      apply();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value.toLowerCase().trim();
      apply();
    });
  }

  window.Projects = {
    list: PROJECTS,
    valuesOf,
    getSlice: () => state.slice,
    setSlice(slice) {
      state.slice = slice;
      apply();
    },
    onChange(fn) { listeners.push(fn); },
  };
})();
