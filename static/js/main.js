/**
 * NTH Therm – main.js
 * Nav · Cookie · Fonts · Form
 */
(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const setCookie = (name, val, days) => {
    const exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${val};expires=${exp};path=/;SameSite=Lax`;
  };
  const getCookie = name => {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  };

  /* ── Mobile Nav ───────────────────────────────────────── */
  const toggle = $('#site-header .nav-toggle');
  const nav    = $('.primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#site-header')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Sticky header shadow on scroll ──────────────────── */
  const header = $('#site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Cookie Consent ───────────────────────────────────── */
  const banner  = $('#cookie-banner');
  const btnAccept  = $('#cookie-accept');
  const btnDecline = $('#cookie-decline');

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function loadFonts() {
    if (document.getElementById('nth-fonts')) return;
    const link = document.createElement('link');
    link.id   = 'nth-fonts';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700;800&display=swap';
    document.head.appendChild(link);
  }

  // On page load: check consent
  const consent = getCookie('nth_consent');
  if (consent === 'all') {
    hideBanner();
    loadFonts();
  } else if (consent === 'essential') {
    hideBanner();
  } else {
    // Show banner after brief delay for better UX
    setTimeout(() => {
      if (banner) banner.hidden = false;
    }, 1200);
  }

  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      setCookie('nth_consent', 'all', 365);
      hideBanner();
      loadFonts();
    });
  }

  if (btnDecline) {
    btnDecline.addEventListener('click', () => {
      setCookie('nth_consent', 'essential', 180);
      hideBanner();
    });
  }

  /* ── FAQ Accordion keyboard support ──────────────────── */
  $$('.faq-item').forEach(item => {
    const summary = item.querySelector('summary');
    if (summary) {
      summary.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.open = !item.open;
        }
      });
    }
  });

  /* ── Contact Form ─────────────────────────────────────── */
  const form       = $('#contact-form');
  const submitBtn  = $('#form-submit-btn');
  const successMsg = $('#form-success');
  const errorMsg   = $('#form-error');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Basic client-side validation
      const required = $$('[required]', form);
      let valid = true;
      required.forEach(el => {
        el.classList.remove('is-invalid');
        if (!el.value.trim() || (el.type === 'checkbox' && !el.checked)) {
          el.classList.add('is-invalid');
          valid = false;
        }
      });
      if (!valid) return;

      // Submit via Formspree
      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.closest('[lang="de"]') ? 'Wird gesendet…' : 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (res.ok) {
          form.reset();
          if (successMsg) { successMsg.style.display = 'block'; successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (errorMsg) errorMsg.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = document.documentElement.lang === 'de' ? 'Anfrage absenden' : 'Submit Enquiry';
      }
    });

    // Clear validation on input
    $$('[required]', form).forEach(el => {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
    });
  }

  /* ── Smooth anchor scrolling ──────────────────────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Animate elements on scroll ──────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.usp-card, .product-card, .step-card').forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 60}ms`);
      io.observe(el);
    });
  }

})();
