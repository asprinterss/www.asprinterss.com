const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const panels = document.querySelectorAll('.heading, .card, .portfolio-grid, .about-grid, .contact-box');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('slide-pending');
      entry.target.classList.add('slide-in');
      observer.unobserve(entry.target);
    });
  }, {threshold: 0.06});
  panels.forEach((panel, index) => {
    panel.style.setProperty('--slide-delay', panel.classList.contains('card') ? ((index % 3) * 80) + 'ms' : '0ms');
    panel.classList.add('slide-pending');
    observer.observe(panel);
  });
  motionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    panels.forEach(panel => panel.classList.remove('slide-pending', 'slide-in'));
  });
}