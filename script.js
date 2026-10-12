/* ─────────────────────────────────────────────
   YEAR
───────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────
   ACTIVE NAV LINK — multi-page
   Matches the current filename against each
   link's href so the right tab is highlighted.
───────────────────────────────────────────── */
(function highlightActiveNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
  });
})();

/* ─────────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─────────────────────────────────────────────
   TOPBAR SCROLL SHADOW
───────────────────────────────────────────── */
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   NEWSLETTER FORM
───────────────────────────────────────────── */
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form   = e.currentTarget;
  const btn    = form.querySelector('button');
  const input  = form.querySelector('input[type="email"]');

  if (!input?.value.trim()) {
    input?.focus();
    return;
  }

  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      if (input) input.value = '';
    }, 2200);
  }
});

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const btn  = form.querySelector('button[type="submit"]');

  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Message sent!';
    btn.disabled = true;
    form.reset();

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 3000);
  }
});

/* ─────────────────────────────────────────────
   SMOOTH HOVER TILT ON PROJECT / SERVICE CARDS
   (subtle, respects prefers-reduced-motion)
───────────────────────────────────────────── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  document.querySelectorAll('.project-card, .service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = (-dy * 4).toFixed(2);
      const rotY   = ( dx * 4).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
