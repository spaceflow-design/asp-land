/* ============================================
   Shared site behaviors
   - Header scroll state
   - Reveal-on-scroll
   - Smooth anchor scroll
   ============================================ */

(function () {
  'use strict';

  // ----- Header scroll state -----
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Reveal-on-scroll using IntersectionObserver -----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ----- Mark hero as loaded -----
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-loaded'));
  }

  // ----- Count-up animation for stats -----
  const counters = document.querySelectorAll('.count-up');
  if (counters.length && 'IntersectionObserver' in window) {
    const formatNum = (val, target) => {
      if (target >= 1000) return Math.floor(val).toLocaleString('en-US');
      return Math.floor(val).toString();
    };
    const runCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = formatNum(target * eased, target) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = formatNum(target, target) + suffix;
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  }

  // ----- Map type filter -----
  const filterChips = document.querySelectorAll('.map-filter__chip');
  if (filterChips.length) {
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        // Update active state
        filterChips.forEach((c) => {
          c.classList.remove('is-active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');

        // Filter project rows
        const rows = document.querySelectorAll('.project-row');
        let visible = 0;
        rows.forEach((row) => {
          const type = row.dataset.type;
          const show = filter === 'all' || type === filter;
          row.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        const counter = document.getElementById('project-count');
        if (counter) {
          counter.textContent = filter === 'all'
            ? 'Our Developments'
            : `${visible} ${filter} project${visible === 1 ? '' : 's'}`;
        }

        // Filter map pins (dispatch event picked up by vn-map)
        document.dispatchEvent(new CustomEvent('map:filter', { detail: { filter } }));
      });
    });
  }

  // ----- Smooth anchor scroll -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- Language switch (visual only — placeholder) -----
  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-switch button').forEach((b) =>
        b.classList.remove('is-active')
      );
      btn.classList.add('is-active');
    });
  });

  // ----- Mobile nav toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const navBackdrop = document.querySelector('.nav-backdrop');

  const setNavOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      setNavOpen(!document.body.classList.contains('nav-open'));
    });
  }
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => setNavOpen(false));
  }
  document.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setNavOpen(false);
    }
  });
})();
