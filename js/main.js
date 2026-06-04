// ===== GSAP Motion Path =====
gsap.registerPlugin(MotionPathPlugin);
gsap.to("#hero-anim-rect", {
  motionPath: {
    path: "#hero-anim-path",
    align: "#hero-anim-path",
    alignOrigin: [0.5, 0.5],
  },
  duration: 18,
  ease: "none",
  repeat: -1,
});

// ===== Hero Effects =====

// 1. Canvas particles
const heroSection = document.getElementById('hero');
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;';
heroSection.insertBefore(canvas, heroSection.firstChild);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = heroSection.offsetWidth;
  canvas.height = heroSection.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 70 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.6 + 0.4,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  alpha: Math.random() * 0.45 + 0.1,
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx / canvas.width;
    p.y += p.vy / canvas.height;
    if (p.x < 0) p.x = 1;
    if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1;
    if (p.y > 1) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,106,245,${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// 2. Mouse parallax on hero background
const heroBg = document.querySelector('.hero__bg');
let parallaxTarget = { x: 0, y: 0 };
let parallaxCurrent = { x: 0, y: 0 };

heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  parallaxTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
  parallaxTarget.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 22;
});
heroSection.addEventListener('mouseleave', () => {
  parallaxTarget.x = 0;
  parallaxTarget.y = 0;
});

function animateParallax() {
  parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * 0.06;
  parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * 0.06;
  heroBg.style.transform = `translate(${parallaxCurrent.x}px,${parallaxCurrent.y}px) scale(1.06)`;
  requestAnimationFrame(animateParallax);
}
animateParallax();

// 3. Typewriter on hero description
const heroDesc = document.querySelector('.hero__desc');
const typeLines = [
  '총 경력 7년 11개월 · 이커머스 서비스 운영지원 전문가',
  '업무 자동화로 효율 10배를 달성한 운영 전문가',
  '쿠팡 · 11번가 · Ebay Korea 경력 보유',
  '데이터 기반으로 실질적인 개선을 이끌어 냅니다',
];
let tl = 0, tc = 0, tDeleting = false;
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.style.cssText = 'color:var(--clr-accent);animation:blink 1s step-end infinite;margin-left:1px;';
const style = document.createElement('style');
style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
document.head.appendChild(style);
heroDesc.textContent = '';
heroDesc.appendChild(cursor);

function typeWrite() {
  const line = typeLines[tl];
  if (tDeleting) {
    tc--;
    heroDesc.firstChild.textContent = line.slice(0, tc);
    if (tc <= 0) { tDeleting = false; tl = (tl + 1) % typeLines.length; setTimeout(typeWrite, 400); return; }
    setTimeout(typeWrite, 28);
  } else {
    tc++;
    heroDesc.firstChild.textContent = line.slice(0, tc);
    if (tc >= line.length) { tDeleting = true; setTimeout(typeWrite, 2200); return; }
    setTimeout(typeWrite, 55);
  }
}
setTimeout(typeWrite, 1600);

// ===== Nav scroll effect
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
