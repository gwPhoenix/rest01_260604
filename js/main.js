// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.right = '24px';
  navLinks.style.background = 'var(--clr-surface)';
  navLinks.style.border = '1px solid var(--clr-border)';
  navLinks.style.borderRadius = 'var(--radius-md)';
  navLinks.style.padding = '16px 24px';
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 640) navLinks.style.display = 'none';
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.about__grid, .skill-card, .work-card, .contact-form, .about__photo, .about__text'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(el);
});

// Contact form (demo)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '전송 완료! ✓';
  btn.disabled = true;
  btn.style.background = 'var(--clr-green)';
  setTimeout(() => {
    btn.textContent = '보내기';
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
