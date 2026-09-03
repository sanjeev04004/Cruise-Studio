// CRUISE STUDIO — interactions

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header scroll state ---------- */
const header = document.getElementById('siteHeader');
const progressFill = document.getElementById('progressFill');

function onScroll(){
  header.classList.toggle('is-scrolled', window.scrollY > 40);
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressFill.style.width = scrolled + '%';
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle?.addEventListener('click', () => mainNav.classList.toggle('is-open'));
mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('is-open')));

/* ---------- Custom cursor ---------- */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
const hasFinePointer = window.matchMedia('(hover: hover)').matches;

if (hasFinePointer){
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });
  function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
} else {
  dot.style.display = 'none';
  ring.style.display = 'none';
}

/* ---------- Scroll reveal ---------- */
const revealTargets = document.querySelectorAll(
  '.section-head, .service-row, .price-card, .feature-project, .work-card, .process-step, .about-visual, .about-body, .reviews-empty, .contact-title, .quote-form, .channel-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => io.observe(el));

/* ---------- Pricing tabs ---------- */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.pricing-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('is-active'));
    panels.forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.querySelector(`.pricing-panel[data-panel="${btn.dataset.tab}"]`).classList.add('is-active');
  });
});

/* ---------- Quote form (front-end only demo) ---------- */
const quoteForm = document.getElementById('quoteForm');
const formNote = document.getElementById('formNote');

quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(quoteForm);
  const name = data.get('name');
  const service = data.get('service');
  const phone = data.get('phone');
  const brief = data.get('brief') || '';

  const message = `Hi Cruise Studio, I'm ${name}. I need help with: ${service}. ${brief} My number is ${phone}.`;
  const waLink = `https://wa.me/919820189508?text=${encodeURIComponent(message)}`;

  formNote.textContent = 'Opening WhatsApp to send your brief…';
  window.open(waLink, '_blank');
  quoteForm.reset();
});