// The breakdown circle in the projects section.
// outer ring = project type, middle = security category, inner = language.
// It sizes itself off how many projects there are, so it gets bigger as the list grows.
// Clicking a slice (or a legend entry) filters the cards through window.Projects.
(function () {
  const host = document.getElementById('project-orb');
  const legend = document.getElementById('orb-legend');
  const status = document.querySelector('.projects-status');
  if (!host || !window.Projects) return;

  const { list, valuesOf } = window.Projects;

  const RINGS = [
    { key: 'type',      label: 'type',     where: 'outer',  r0: 150, r1: 186 },
    { key: 'category',  label: 'category', where: 'middle', r0: 110, r1: 144 },
    { key: 'languages', label: 'language', where: 'inner',  r0: 74,  r1: 104 },
  ];
  const SEG_COLORS = 10; // --seg-1 ... --seg-10 in style.css

  let shown = list.length; // the intro animation counts this up from 0
  let hovered = null;

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const same = (a, b) => !!a && !!b && a.key === b.key && a.value === b.value;

  function tally(items, key) {
    const counts = new Map();
    items.forEach(p => valuesOf(p, key).forEach(v => counts.set(v, (counts.get(v) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }

  // lock in a color per value up front so slices don't swap colors while it grows
  const colors = {};
  RINGS.forEach(r => {
    colors[r.key] = {};
    tally(list, r.key).forEach(([v], i) => {
      colors[r.key][v] = `var(--seg-${(i % SEG_COLORS) + 1})`;
    });
  });

  function arc(r0, r1, a0, a1) {
    const pt = (r, a) => [200 + r * Math.sin(a), 200 - r * Math.cos(a)];
    const big = a1 - a0 > Math.PI ? 1 : 0;
    const [x0, y0] = pt(r1, a0), [x1, y1] = pt(r1, a1);
    const [x2, y2] = pt(r0, a1), [x3, y3] = pt(r0, a0);
    return `M${x0} ${y0}A${r1} ${r1} 0 ${big} 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 ${big} 0 ${x3} ${y3}Z`;
  }

  // sqrt so 50 projects doesn't turn into a giant circle
  const sizeFor = n => Math.min(420, Math.round(190 + 30 * Math.sqrt(n)));

  function drawOrb() {
    const items = list.slice(0, shown);
    const n = items.length;
    const active = window.Projects.getSlice();
    const focus = hovered || active;

    host.style.setProperty('--orb-size', sizeFor(n) + 'px');
    host.classList.toggle('has-focus', !!focus);

    let svg = `<svg viewBox="0 0 400 400" role="group" aria-label="${n} projects broken down by type, security category and language">`;

    RINGS.forEach(ring => {
      svg += `<path class="orb-track" d="${arc(ring.r0, ring.r1, 0, Math.PI * 2 - 0.0001)}"/>`;
      if (!n) return;

      // slices are out of the total project count, so whatever's left empty
      // is the projects where this ring doesn't apply
      const total = ring.key === 'languages'
        ? Math.max(n, items.reduce((s, p) => s + p.languages.length, 0))
        : n;
      let a = 0;
      tally(items, ring.key).forEach(([value, count]) => {
        const span = (count / total) * Math.PI * 2;
        const slice = { key: ring.key, value };
        svg += `<path class="orb-seg${same(focus, slice) ? ' on' : ''}"
          d="${arc(ring.r0, ring.r1, a + 0.012, a + span - 0.012)}"
          fill="${colors[ring.key][value]}" tabindex="0" role="button"
          data-key="${ring.key}" data-value="${esc(value)}"
          aria-pressed="${same(active, slice)}"
          aria-label="${ring.label}: ${esc(value)}, ${count} project${count === 1 ? '' : 's'}"></path>`;
        a += span;
      });
    });

    let big = n;
    let small = n === 1 ? 'project' : 'projects';
    if (focus) {
      big = items.filter(p => valuesOf(p, focus.key).includes(focus.value)).length;
      small = focus.value.length > 22 ? focus.value.slice(0, 21) + '…' : focus.value;
    }
    svg += `<text class="orb-count" x="200" y="208" text-anchor="middle">${big}</text>`;
    svg += `<text class="orb-label" x="200" y="234" text-anchor="middle">${esc(small)}</text>`;
    host.innerHTML = svg + '</svg>';
  }

  function drawLegend() {
    const items = list.slice(0, shown);
    const active = window.Projects.getSlice();
    legend.innerHTML = RINGS.map(ring => {
      const na = items.filter(p => valuesOf(p, ring.key).length === 0).length;
      const rows = tally(items, ring.key).map(([v, c]) => `
        <li><button type="button" class="legend-item" data-key="${ring.key}" data-value="${esc(v)}"
          aria-pressed="${same(active, { key: ring.key, value: v })}">
          <span class="legend-dot" style="background:${colors[ring.key][v]}"></span>${esc(v)}
          <span class="legend-n">${c}</span></button></li>`).join('');
      return `<div class="legend-group">
        <h3><span class="accent">${ring.where}</span> ${ring.label}${na ? ` <span class="legend-na">(${na} n/a)</span>` : ''}</h3>
        <ul>${rows}</ul></div>`;
    }).join('');
  }

  function draw() { drawOrb(); drawLegend(); }

  function toggle(slice) {
    const cur = window.Projects.getSlice();
    window.Projects.setSlice(same(cur, slice) ? null : slice);
  }

  const sliceFrom = e => {
    const el = e.target.closest('[data-key]');
    return el ? { key: el.dataset.key, value: el.dataset.value } : null;
  };

  host.addEventListener('click', e => { const s = sliceFrom(e); if (s) toggle(s); });
  host.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const s = sliceFrom(e);
    if (!s) return;
    e.preventDefault();
    toggle(s);
    // redrawing wipes focus, put it back on the same slice
    host.querySelector(`[data-key="${s.key}"][data-value="${CSS.escape(s.value)}"]`)?.focus();
  });
  host.addEventListener('mouseover', e => {
    const s = sliceFrom(e);
    if (same(s, hovered) || (!s && !hovered)) return;
    hovered = s;
    drawOrb();
  });
  host.addEventListener('mouseleave', () => { hovered = null; drawOrb(); });
  legend.addEventListener('click', e => { const s = sliceFrom(e); if (s) toggle(s); });

  window.Projects.onChange((state, visible) => {
    draw();
    if (!status) return;
    if (state.slice) {
      status.innerHTML = `showing ${visible} &middot; ${esc(state.slice.value)} <button type="button" class="status-clear">clear</button>`;
      status.querySelector('.status-clear').onclick = () => window.Projects.setSlice(null);
    } else {
      status.textContent = '';
    }
  });

  // grow from 0 the first time it scrolls into view
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    draw();
    return;
  }
  shown = 0;
  draw();
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const step = () => {
      shown++;
      draw();
      if (shown < list.length) setTimeout(step, 45);
    };
    step();
  }, { threshold: 0.4 });
  io.observe(host);
})();
