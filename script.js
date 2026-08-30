document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close the menu automatically if the viewport grows back to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Contact form handling (FormSubmit) - only runs on pages with the form
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      status.style.display = 'block';
      status.textContent = 'Sending...';
      try {
        const data = new FormData(form);
        const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          status.textContent = "Thanks - your message has been sent. We'll be in touch shortly.";
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please try again or contact us directly.';
        }
      } catch (err) {
        status.textContent = 'Something went wrong. Please try again or contact us directly.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // Scroll-reveal for cards and sections
  const revealTargets = document.querySelectorAll('.card, .property-card, .testimonial-card, .faq-item, .stat');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Animated stat counters
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const raw = el.textContent.trim();
    if (raw.includes('/')) return; // fraction-style stats (e.g. "24/7") stay static
    const match = raw.match(/[\d.]+/);
    if (!match) return; // no digits to animate
    const target = parseFloat(match[0]);
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[0].length);
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statNums.length) {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statIo.observe(el));
  }

});
