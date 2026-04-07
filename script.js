/* ============================================================
   STUDYMEDIC — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Hamburger mobile menu ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', open);
    nav.style.cssText = open
      ? `display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(15,13,46,0.97);padding:24px;gap:8px;backdrop-filter:blur(20px);z-index:850;`
      : '';
    if (!open) nav.removeAttribute('style');
  });

  // ---- Close mobile nav on link click ----
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 780) {
        nav.classList.remove('nav-open');
        nav.removeAttribute('style');
      }
    });
  });

  // ---- Smooth stat counter animation ----
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  const animateStats = () => {
    if (statsAnimated) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
      });
    }
  };
  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats();

  // ---- Floating hero particles ----
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    const colors = ['#D8355F', '#2E2A7B', '#FF8A6E', '#4A44A8', '#ffffff'];
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 12 + 10;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        background:${color};
        left:${left}%;
        bottom:-10px;
        animation-delay:${delay}s;
        animation-duration:${duration}s;
        opacity:0;
      `;
      particleContainer.appendChild(p);
    }
  }

  // ---- Testimonial tabs ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('tab-content-text').classList.toggle('hidden', tab !== 'text');
      document.getElementById('tab-content-video').classList.toggle('hidden', tab !== 'video');
    });
  });

  // ---- Scroll fade-in animations ----
  const fadeEls = [
    ...document.querySelectorAll('.course-card'),
    ...document.querySelectorAll('.feature-card'),
    ...document.querySelectorAll('.program-card'),
    ...document.querySelectorAll('.testimonial-card'),
    ...document.querySelectorAll('.webinar-card'),
    document.querySelector('.newsletter-inner'),
  ].filter(Boolean);

  fadeEls.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // ---- Hero search ----
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
      }
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }

  // ---- Active nav link on scroll ----
  const sections = ['hero', 'courses', 'about', 'programs', 'testimonials', 'contact'];
  const navLinks = {
    hero: document.getElementById('nav-home'),
    courses: document.getElementById('nav-courses'),
    about: document.getElementById('nav-about'),
    programs: document.getElementById('nav-advanced'),
  };
  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    Object.values(navLinks).forEach(l => l && l.classList.remove('active'));
    if (navLinks[current]) navLinks[current].classList.add('active');
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Newsletter form ----
  window.handleNewsletter = (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-subscribe');
    btn.textContent = '✅ Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #1A6B4A, #26A69A)';
    setTimeout(() => {
      btn.textContent = 'Subscribe Free';
      btn.style.background = '';
      document.getElementById('newsletter-form').reset();
    }, 3000);
  };

  // ---- Smooth anchor scroll for all # links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
