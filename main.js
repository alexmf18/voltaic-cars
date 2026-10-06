/* ============================================
   VOLTAIC CARS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const numberFormat = (decimals) => new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  /* --- Cover math: where a point of an object-fit: cover image lands --- */
  function coverBox(img, box) {
    const iw = img.naturalWidth || Number(img.getAttribute('width')) || 1;
    const ih = img.naturalHeight || Number(img.getAttribute('height')) || 1;
    const scale = Math.max(box.width / iw, box.height / ih);
    const w = iw * scale;
    const h = ih * scale;
    const pos = getComputedStyle(img).objectPosition.split(' ');
    const px = parseFloat(pos[0]) / 100 || 0.5;
    const py = parseFloat(pos[1] || pos[0]) / 100 || 0.5;
    return {
      x: (box.width - w) * px,
      y: (box.height - h) * py,
      w,
      h
    };
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  if (navToggle && navList) {
    const closeNav = () => {
      navToggle.classList.remove('active');
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    };

    navToggle.addEventListener('click', () => {
      const open = !navList.classList.contains('active');
      navToggle.classList.toggle('active', open);
      navList.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) closeNav();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* --- Active nav link highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const isCurrent = link.getAttribute('href') === currentPage;
    link.classList.toggle('nav__link--active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
  });

  /* --- Smoke streamlines (canvas) --- */
  class Smoke {
    constructor(host) {
      this.host = host;
      this.variant = host.dataset.smoke || 'quiet';
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'smoke';
      this.canvas.setAttribute('aria-hidden', 'true');
      const before = host.querySelector('[data-smoke-before]');
      host.insertBefore(this.canvas, before ? before.nextSibling : host.firstChild);
      this.ctx = this.canvas.getContext('2d');
      this.img = host.dataset.smokeImage ? host.querySelector(host.dataset.smokeImage) : null;
      this.obstacleFrac = host.dataset.obstacle ? host.dataset.obstacle.split(',').map(Number) : null;
      this.pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
      this.start = performance.now();
      this.visible = true;
      this.running = false;

      this.resize = this.resize.bind(this);
      this.frame = this.frame.bind(this);
      this.resize();
      window.addEventListener('resize', this.resize);
      if (this.img && !this.img.complete) this.img.addEventListener('load', this.resize);

      if (prefersReducedMotion) {
        this.draw(5000);
        return;
      }

      window.addEventListener('pointermove', (e) => {
        const r = this.host.getBoundingClientRect();
        this.pointer.tx = e.clientX - r.left;
        this.pointer.ty = e.clientY - r.top;
      }, { passive: true });

      new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        if (this.visible) this.play();
      }).observe(host);

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) this.play();
      });

      this.play();
    }

    play() {
      if (this.running) return;
      this.running = true;
      requestAnimationFrame(this.frame);
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = this.host.getBoundingClientRect();
      this.w = r.width;
      this.h = r.height;
      this.canvas.width = Math.round(this.w * dpr);
      this.canvas.height = Math.round(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.obstacle = null;
      this.calm = null;
      if (this.img && this.obstacleFrac) {
        const ir = this.img.getBoundingClientRect();
        // Below the photograph the smoke thins out so the copy stays legible
        this.calm = (ir.bottom - r.top) * 0.9;
        const box = coverBox(this.img, ir);
        const [fx, fy, frx, fry] = this.obstacleFrac;
        this.obstacle = {
          cx: ir.left - r.left + box.x + fx * box.w,
          cy: ir.top - r.top + box.y + fy * box.h,
          rx: frx * box.w,
          ry: fry * box.h
        };
      }

      const spacing = this.variant === 'hero' ? 17 : 22;
      const count = Math.max(8, Math.round(this.h / spacing));
      this.lines = Array.from({ length: count }, (_, i) => ({
        y: (this.h * (i + 0.5)) / count,
        phase: Math.random() * 400,
        dash: 60 + Math.random() * 160,
        gap: 40 + Math.random() * 120,
        bright: Math.random() < 0.28
      }));
      if (prefersReducedMotion) this.draw(5000);
    }

    offset(x, y0, t) {
      let y = y0;
      let fade = 1;
      const o = this.obstacle;

      if (o) {
        const nx = (x - o.cx) / o.rx;
        const ny = (y0 - o.cy) / o.ry;
        const bump = Math.exp(-nx * nx * 1.5);
        if (ny < 0) {
          y -= o.ry * Math.max(0, 1.12 + ny) * bump;
        } else {
          y += o.ry * Math.max(0, 1.05 - ny) * bump * 0.35;
          fade = 1 - 0.75 * bump * Math.max(0, 1 - Math.abs(ny - 0.4));
        }
      } else {
        y += Math.sin(x * 0.0035 + t * 0.00035 + y0 * 0.02) * 7;
      }

      const p = this.pointer;
      const dx = x - p.x;
      const dy = y - p.y;
      const g = Math.exp(-(dx * dx + dy * dy) / (2 * 110 * 110));
      y += Math.sign(dy || 1) * 46 * g;

      return { y, fade };
    }

    draw(t) {
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      const elapsed = t - this.start;
      const reveal = prefersReducedMotion ? 1 : 1 - Math.pow(1 - Math.min(elapsed / 1800, 1), 3);
      const limit = w * reveal + 40;
      const step = 9;
      const flow = elapsed * 0.05;

      this.lines.forEach((line) => {
        const pts = [];
        for (let x = -20; x <= limit; x += step) {
          const { y, fade } = this.offset(x, line.y, elapsed);
          pts.push([x, y, fade]);
        }
        if (pts.length < 2) return;

        const path = new Path2D();
        path.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
        const fade = pts.reduce((m, p) => Math.min(m, p[2]), 1);
        const k = this.calm !== null && line.y > this.calm ? 0.3 : (this.variant === 'quiet' ? 0.5 : 1);

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = `rgba(233, 230, 223, ${(0.06 + 0.04 * fade) * k})`;
        ctx.stroke(path);

        ctx.setLineDash([line.dash, line.gap]);
        ctx.lineDashOffset = -(flow + line.phase);
        ctx.strokeStyle = `rgba(233, 230, 223, ${(line.bright ? 0.42 : 0.2) * (0.35 + 0.65 * fade) * k})`;
        ctx.stroke(path);
      });
    }

    frame(t) {
      if (!this.visible || document.hidden) {
        this.running = false;
        return;
      }
      const p = this.pointer;
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;
      this.draw(t);
      requestAnimationFrame(this.frame);
    }
  }

  document.querySelectorAll('[data-smoke]').forEach(host => new Smoke(host));

  /* --- Pins: annotations fixed to points on a cover image --- */
  function placePins(group) {
    const img = group.parentElement.querySelector('img');
    if (!img) return;
    const box = coverBox(img, img.getBoundingClientRect());
    group.querySelectorAll('.pin').forEach(pin => {
      const x = box.x + Number(pin.dataset.x) * box.w;
      const y = box.y + Number(pin.dataset.y) * box.h;
      pin.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    if (!group.classList.contains('is-placed')) {
      group.classList.add('is-placed');
      group.querySelectorAll('[data-count]').forEach(animateCount);
    }
  }

  const pinGroups = Array.from(document.querySelectorAll('.pins'));
  if (pinGroups.length) {
    const placeAll = () => pinGroups.forEach(g => {
      if (getComputedStyle(g).display !== 'none') placePins(g);
    });
    const pinObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.parentElement.querySelector('img');
          const go = () => placePins(entry.target);
          if (img && !img.complete) img.addEventListener('load', go, { once: true });
          else go();
          pinObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    pinGroups.forEach(g => pinObserver.observe(g));
    window.addEventListener('resize', placeAll);
  }

  /* --- Counters --- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = Number(el.dataset.decimals || 0);
    const fmt = numberFormat(decimals);
    if (prefersReducedMotion) {
      el.textContent = fmt.format(target) + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      el.textContent = fmt.format(target * (progress === 1 ? 1 : eased)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* --- Line-up tabs --- */
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

    function select(index, focus) {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        if (panels[i]) panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i, false));
      tab.addEventListener('keydown', (e) => {
        const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (e.key in keys) {
          e.preventDefault();
          select((i + keys[e.key] + tabs.length) % tabs.length, true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          select(0, true);
        } else if (e.key === 'End') {
          e.preventDefault();
          select(tabs.length - 1, true);
        }
      });
    });

    select(0, false);
  });

  /* --- Scroll reveal --- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* --- Lightbox for gallery --- */
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && galleryItems.length > 0) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
    const lightboxNext = lightbox.querySelector('.lightbox__nav--next');
    let currentIndex = 0;
    let lastFocusedElement = null;

    const items = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      return { src: img ? img.src : '', alt: img ? img.alt : 'Imagen de la galería' };
    });

    function show(index) {
      currentIndex = (index + items.length) % items.length;
      lightboxImg.src = items[currentIndex].src;
      lightboxImg.alt = items[currentIndex].alt;
    }

    function openLightbox(index) {
      lastFocusedElement = document.activeElement;
      show(index);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    }

    galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => show(currentIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => show(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
      if (e.key === 'Tab') {
        const focusables = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);
        const idx = focusables.indexOf(document.activeElement);
        e.preventDefault();
        const next = e.shiftKey ? idx - 1 : idx + 1;
        focusables[(next + focusables.length) % focusables.length].focus();
      }
    });
  }

  /* --- Contact form handling --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formContent = contactForm.querySelector('.form__content');
    const formSuccess = contactForm.querySelector('.form__success');
    const requiredFields = Array.from(contactForm.querySelectorAll('[required]'));

    const getErrorId = (input) => `${input.id || input.name}-error`;

    function clearError(input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      const error = contactForm.querySelector(`#${getErrorId(input)}`);
      if (error) error.remove();
    }

    function setError(input, message) {
      clearError(input);
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      const error = document.createElement('p');
      error.className = 'form__error';
      error.id = getErrorId(input);
      error.textContent = message;
      input.setAttribute('aria-describedby', error.id);
      (input.parentElement || input).append(error);
    }

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    requiredFields.forEach((input) => {
      const eventName = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(eventName, () => clearError(input));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      requiredFields.forEach((input) => {
        if (input.type === 'checkbox') {
          if (!input.checked) {
            valid = false;
            setError(input, 'Acepta la política de privacidad para que podamos responderte.');
          }
          return;
        }
        if (!input.value.trim()) {
          valid = false;
          setError(input, 'Este campo es obligatorio.');
        }
      });

      const emailInput = contactForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && !isValidEmail(emailInput.value.trim())) {
        valid = false;
        setError(emailInput, 'Revisa el email: debe tener el formato nombre@dominio.com.');
      }

      const firstError = contactForm.querySelector('.is-invalid');
      if (firstError instanceof HTMLElement) firstError.focus();
      if (!valid) return;

      // Simulated submission
      if (formContent && formSuccess) {
        contactForm.reset();
        formContent.hidden = true;
        formSuccess.classList.add('active');
        formSuccess.focus();
      }
    });
  }

  /* --- Smoke line: scroll position --- */
  const smokeLine = document.createElement('div');
  smokeLine.className = 'smoke-line';
  smokeLine.setAttribute('aria-hidden', 'true');
  let d = 'M6 0';
  for (let y = 10; y <= 1000; y += 10) {
    d += ` L${(6 + Math.sin(y / 46) * 3.2).toFixed(2)} ${y}`;
  }
  smokeLine.innerHTML = `<svg viewBox="0 0 12 1000" preserveAspectRatio="none">
      <path class="smoke-line__track" d="${d}" />
      <path class="smoke-line__run" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" />
    </svg>`;
  document.body.append(smokeLine);
  const smokeRun = smokeLine.querySelector('.smoke-line__run');

  function updateSmokeLine() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    smokeRun.setAttribute('stroke-dashoffset', (1 - progress).toFixed(4));
  }
  window.addEventListener('scroll', updateSmokeLine, { passive: true });
  updateSmokeLine();

  /* --- Back-to-top button --- */
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Volver arriba');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>';
  document.body.append(backToTop);

  const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 600);
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

});
