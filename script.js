/* ══════════════════════════════════════════════════════════════
   GetDevWorks — script.js
   • Bidirectional scroll fade (IntersectionObserver)
   • Sticky nav scroll behaviour
   • Mobile hamburger menu
   ══════════════════════════════════════════════════════════════ */

'use strict';

// ── Bidirectional Scroll Fade ────────────────────────────────
(function initScrollFade() {
  // Track the last known vertical scroll position to determine
  // scroll direction (up vs down) on each observation callback.
  let lastScrollY = window.scrollY;

  const targets = document.querySelectorAll('.fade-target');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const currentScrollY = window.scrollY;
      const scrollingDown  = currentScrollY >= lastScrollY;
      lastScrollY = currentScrollY;

      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // Element entered the viewport → fade in from whichever direction
          el.classList.remove('is-hidden-above');
          el.classList.add('is-visible');
        } else {
          // Element LEFT the viewport
          el.classList.remove('is-visible');

          if (scrollingDown) {
            // Scrolling DOWN → element exited above → fade out upward
            el.classList.add('is-hidden-above');
          } else {
            // Scrolling UP → element exited below → reset to default fade-in state
            el.classList.remove('is-hidden-above');
          }
        }
      });
    },
    {
      // Trigger when 12 % of the element is visible;
      // a small rootMargin nudges the fade to start a little earlier.
      threshold:  0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
})();


// ── Sticky Nav (add class when scrolled) ────────────────────
(function initStickyNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const toggle = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 24);
  };
  toggle(); // run once on load
  window.addEventListener('scroll', toggle, { passive: true });
})();


// ── Mobile Hamburger Menu ────────────────────────────────────
(function initMobileMenu() {
  const burger     = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burger || !mobileMenu) return;

  const open  = () => {
    burger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    burger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };
  const toggle = () => (mobileMenu.classList.contains('is-open') ? close() : open());

  burger.addEventListener('click', toggle);

  // Close menu when a mobile nav link is clicked
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      close();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) close();
  });
})();


// ── Smooth anchor scroll (offset for fixed nav) ─────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH   = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
