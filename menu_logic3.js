/* menu.js — El Quijote Restaurante
   Pure vanilla JS: scroll reveal, sticky nav highlight,
   pasta builder selection, back-to-top
*/

(function () {
  'use strict';

  /* ── Scroll Reveal ─────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  /* ── Active Nav Link (scroll spy) ─────────────────────────────── */
  const sections   = document.querySelectorAll('.menu-section[id]');
  const navLinks   = document.querySelectorAll('.cat-nav__link');
  const catNav     = document.getElementById('catNav');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', active);
            if (active) {
              // Scroll active tab into view in the nav
              link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
            }
          });
        }
      });
    },
    {
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0,
    }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ── Back to Top ───────────────────────────────────────────────── */
  const backTop = document.getElementById('backTop');
  const toggleBackTop = () => {
    backTop.classList.toggle('is-visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', toggleBackTop, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Pasta Builder: clickable selections ───────────────────────── */
  const builderLists = document.querySelectorAll('.builder-list');

  builderLists.forEach((list) => {
    list.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        // Single-select within the same list
        list.querySelectorAll('li').forEach((i) => i.classList.remove('selected'));
        item.classList.add('selected');
      });
    });
  });

  /* ── Smooth nav link click ─────────────────────────────────────── */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navH = catNav ? catNav.offsetHeight : 0;
          const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ── Subtle entrance animation for windmill SVG ─────────────────── */
  const windmill = document.querySelector('.windmill-divider svg g');
  if (windmill && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Already handled via CSS animation — just confirm it's rendering
    windmill.style.willChange = 'transform';
  }

})();
