/* ============================================
   VOLTAIC CARS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Header scroll effect --- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu on link click
    navList.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Scroll reveal animation --- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

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

    const images = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      return img ? img.src : '';
    });

    const imageAlts = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      return img ? img.alt : 'Imagen de la galeria';
    });

    function openLightbox(index) {
      currentIndex = index;
      lastFocusedElement = document.activeElement;
      lightboxImg.src = images[currentIndex];
      lightboxImg.alt = imageAlts[currentIndex];
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
      lightboxImg.alt = imageAlts[currentIndex];
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
      lightboxImg.alt = imageAlts[currentIndex];
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }

  /* --- Contact form handling --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formContent = contactForm.querySelector('.form__content');
    const formSuccess = contactForm.querySelector('.form__success');

    const requiredFields = Array.from(contactForm.querySelectorAll('[required]'));

    function getErrorId(input) {
      return `${input.id || input.name}-error`;
    }

    function clearError(input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
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

      if (input.parentElement) {
        input.parentElement.append(error);
      } else {
        input.insertAdjacentElement('afterend', error);
      }
    }

    function isValidEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

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
            setError(input, 'Debes aceptar la politica de privacidad.');
          }
          return;
        }

        if (!input.value.trim()) {
          valid = false;
          setError(input, 'Este campo es obligatorio.');
        }
      });

      const emailInput = contactForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        if (!isValidEmail(emailInput.value.trim())) {
          valid = false;
          setError(emailInput, 'Introduce un email valido, por ejemplo nombre@dominio.com.');
        }
      }

      const firstError = contactForm.querySelector('.is-invalid');
      if (firstError instanceof HTMLElement) {
        firstError.focus();
      }

      if (!valid) return;

      // Simulate submission
      if (formContent && formSuccess) {
        contactForm.reset();
        formContent.style.display = 'none';
        formSuccess.classList.add('active');
      }
    });
  }

  /* --- Active nav link highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  /* --- Smooth counters for stats --- */
  const statElements = document.querySelectorAll('[data-count]');
  if (statElements.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = Number(el.dataset.decimals || 0);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
      el.textContent = formatted + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* --- Scroll progress indicator --- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.append(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* --- Back-to-top button --- */
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Volver arriba');
  backToTop.innerHTML = '&#8593;';
  document.body.append(backToTop);

  function toggleBackToTop() {
    const show = window.scrollY > 500;
    backToTop.classList.toggle('is-visible', show);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

});
