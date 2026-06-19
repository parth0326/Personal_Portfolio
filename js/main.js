// ── Mobile nav ──
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

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

// ── Fade-in on scroll ──
const fadeTargets = document.querySelectorAll(
  '.about-grid, .skill-card, .project-card, .about-card, .contact-container'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ── Project filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'flex' : 'none';
    });
  });
});
