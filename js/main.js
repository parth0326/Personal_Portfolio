// ── Mobile nav ──
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      bottomNavItems.forEach(l => l.classList.remove('active'));
      const id = entry.target.id;
      const a = document.querySelector(`.nav-links a[href="#${id}"]`);
      const b = document.querySelector(`.bottom-nav-item[href="#${id}"]`);
      if (a) a.classList.add('active');
      if (b) b.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── Dark / Light mode toggle ──
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeIcon.textContent = '☀';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeIcon.textContent = isLight ? '☀' : '☾';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ── Typed hero title ──
const phrases = [
  'Cybersecurity Student',
  'Deep Learning Enthusiast',
  'AI / ML Explorer',
  'Security Researcher',
];

const typedEl = document.querySelector('.typed-text');
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

// ── Stagger fade-in on scroll ──
const staggerGroups = [
  '.skill-card',
  '.project-card',
  '.currently-item',
];

staggerGroups.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('stagger-item');
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

const fadeTargets = document.querySelectorAll(
  '.about-grid, .about-card, .contact-container, .stagger-item'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeTargets.forEach(el => {
  if (!el.classList.contains('stagger-item')) el.classList.add('fade-in');
  fadeObserver.observe(el);
});


// ── Project filter + search ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const searchInput = document.getElementById('project-search');
const noResults = document.querySelector('.no-results');
let activeFilter = 'all';

function applyFilters() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let visible = 0;
  projectCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const text = card.textContent.toLowerCase();
    const searchMatch = query === '' || text.includes(query);
    const show = categoryMatch && searchMatch;
    card.style.display = show ? 'flex' : 'none';
    if (show) visible++;
  });
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

// ── Copy email button ──
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const label = btn.querySelector('.copy-label');
      btn.classList.add('copied');
      label.textContent = 'copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        label.textContent = 'copy';
      }, 2000);
    });
  });
});
