document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.action.includes('YOUR_FORM_ID')) {
        status.style.display = 'block';
        status.textContent = 'Form not connected yet — add your Formspree endpoint to activate.';
        return;
      }
      const data = new FormData(form);
      status.style.display = 'block';
      status.textContent = 'Sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = "Thanks — your message has been sent. We'll be in touch shortly.";
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please try again or contact us directly.';
        }
      } catch (err) {
        status.textContent = 'Something went wrong. Please try again or contact us directly.';
      }
    });
  }

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '84px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#0a0a0a';
    nav.style.padding = '16px 24px';
    nav.style.borderBottom = '1px solid #2b2b2b';
    nav.style.gap = '18px';
  });
});
