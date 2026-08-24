document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '76px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#0c0c0d';
    nav.style.padding = '16px 24px';
    nav.style.borderBottom = '1px solid #2a2b2e';
  });
});
