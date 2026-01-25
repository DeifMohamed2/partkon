/**
 * PartKon - Professional Scroll Animations
 * Advanced scroll-triggered animations with fade, slide, scale, and reveal effects
 */

(function() {
  'use strict';

  // Animation Configuration
  const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
    staggerDelay: 100, // ms between staggered animations
    defaultDuration: 800,
    defaultEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  // Store all animated elements
  let animatedElements = [];
  let scrollY = 0;
  let ticking = false;

  /**
   * Initialize all scroll animations
   */
  function initScrollAnimations() {
    // Get all elements with animation classes
    const animatableSelectors = [
      '[data-animate]',
      '.animate-on-scroll',
      '.fade-in',
      '.fade-up',
      '.fade-down',
      '.fade-left',
      '.fade-right',
      '.scale-in',
      '.scale-up',
      '.reveal-left',
      '.reveal-right',
      '.blur-in',
      '.rotate-in',
      '.bounce-in',
      '.slide-up',
      '.slide-down',
      '.slide-left',
      '.slide-right',
      // Section-specific animations
      '.section-header',
      '.feature-block',
      '.feature-card-new',
      '.feature-item-compact',
      '.step-card',
      '.step-connector',
      '.template-showcase',
      '.pricing-card',
      '.testimonial-simple-card',
      '.faq-item',
      '.integrations-content',
      '.cta-content',
      '.footer-brand',
      '.footer-links-col'
    ];

    const elements = document.querySelectorAll(animatableSelectors.join(', '));
    
    elements.forEach((el, index) => {
      // Skip if already initialized
      if (el.dataset.animateInit) return;
      
      el.dataset.animateInit = 'true';
      el.classList.add('will-animate');
      
      // Set stagger delay for grouped elements
      if (el.closest('.feature-cards-grid') || 
          el.closest('.features-bottom-row') ||
          el.closest('.steps-container') ||
          el.closest('.templates-grid') ||
          el.closest('.pricing-grid') ||
          el.closest('.faq-grid') ||
          el.closest('.footer-links-grid')) {
        const siblings = el.parentElement.children;
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.style.setProperty('--stagger-delay', `${siblingIndex * config.staggerDelay}ms`);
      }
      
      animatedElements.push(el);
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    });

    animatedElements.forEach(el => observer.observe(el));

    // Initialize parallax elements
    initParallax();
    
    // Initialize text reveal animations
    initTextReveal();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize hover tilt effects
    initTiltEffects();
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Add scroll progress indicator
    initScrollProgress();
  }

  /**
   * Handle intersection observer callbacks
   */
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.style.getPropertyValue('--stagger-delay') || '0');
        
        setTimeout(() => {
          el.classList.add('animated');
          el.classList.remove('will-animate');
        }, delay);
        
        // Optional: unobserve after animation (one-time animation)
        if (!el.dataset.animateRepeat) {
          observer.unobserve(el);
        }
      } else if (entry.target.dataset.animateRepeat) {
        // Reset animation for elements that should repeat
        entry.target.classList.remove('animated');
        entry.target.classList.add('will-animate');
      }
    });
  }

  /**
   * Initialize parallax scrolling effects
   */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax], .parallax');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax(parallaxElements);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function updateParallax(elements) {
    scrollY = window.pageYOffset;
    
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (visible) {
        const yOffset = (scrollY - el.offsetTop + window.innerHeight) * speed * 0.1;
        el.style.transform = `translateY(${yOffset}px)`;
      }
    });
  }

  /**
   * Initialize text reveal animations (word by word or letter by letter)
   */
  function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal], .text-reveal');
    
    textElements.forEach(el => {
      const text = el.textContent;
      const type = el.dataset.textRevealType || 'words'; // 'words' or 'letters'
      const delay = parseInt(el.dataset.textRevealDelay) || 50;
      
      el.innerHTML = '';
      el.style.opacity = '1';
      
      const items = type === 'letters' ? text.split('') : text.split(' ');
      
      items.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = 'text-reveal-item';
        span.textContent = type === 'letters' ? item : item + ' ';
        span.style.setProperty('--reveal-delay', `${index * delay}ms`);
        el.appendChild(span);
      });
    });

    // Observe text reveal elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    textElements.forEach(el => observer.observe(el));
  }

  /**
   * Initialize counter animations
   */
  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter], .counter-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counterTarget || el.textContent.replace(/[^\d]/g, ''));
    const duration = parseInt(el.dataset.counterDuration) || 2000;
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * eased);
      
      el.textContent = prefix + current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Initialize 3D tilt effects on hover
   */
  function initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt], .tilt-effect');
    
    tiltElements.forEach(el => {
      const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
      const scale = parseFloat(el.dataset.tiltScale) || 1.02;
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -maxTilt;
        const rotateY = (x - centerX) / centerX * maxTilt;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  /**
   * Initialize magnetic button effects
   */
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-primary-hero, .btn-cta-primary, .btn-get-started, [data-magnetic]');
    
    magneticElements.forEach(el => {
      const strength = parseFloat(el.dataset.magneticStrength) || 0.3;
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /**
   * Initialize scroll progress indicator
   */
  function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
  }

  /**
   * Add smooth reveal to sections
   */
  function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      section.style.setProperty('--section-index', index);
    });
  }

  /**
   * Initialize floating elements animation
   */
  function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.visual-float, .feature-image-float, [data-float]');
    
    floatingElements.forEach((el, index) => {
      el.style.setProperty('--float-delay', `${index * 0.5}s`);
      el.style.setProperty('--float-duration', `${3 + Math.random() * 2}s`);
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Cursor follower effect
   */
  function initCursorFollower() {
    if (window.innerWidth < 1024) return; // Disable on mobile/tablet
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    });

    function animateCursor() {
      dotX += (cursorX - dotX) * 0.1;
      dotY += (cursorY - dotY) * 0.1;
      cursor.style.left = `${dotX}px`;
      cursor.style.top = `${dotY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .pricing-card, .template-showcase, .feature-card-new');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
        cursorDot.classList.add('cursor-hide');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
        cursorDot.classList.remove('cursor-hide');
      });
    });
  }

  /**
   * Initialize page load animations
   */
  function initPageLoadAnimations() {
    document.body.classList.add('page-loaded');
    
    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.hero-section .animate-fade-in, .hero-section .animate-slide-up');
    heroElements.forEach((el, index) => {
      el.style.animationDelay = `${0.2 + index * 0.15}s`;
    });
  }

  /**
   * Apply animation data attributes to elements
   */
  function applyAnimationAttributes() {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'fade-up';
    });

    // Feature blocks - alternate left/right
    document.querySelectorAll('.feature-block').forEach((el, index) => {
      if (!el.dataset.animate) {
        el.dataset.animate = index % 2 === 0 ? 'fade-right' : 'fade-left';
      }
    });

    // Feature cards
    document.querySelectorAll('.feature-card-new').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'fade-up';
    });

    // Steps
    document.querySelectorAll('.step-card').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'scale-in';
    });

    // Templates
    document.querySelectorAll('.template-showcase').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'fade-up';
    });

    // Pricing cards
    document.querySelectorAll('.pricing-card').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'fade-up';
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'fade-up';
    });

    // CTA section
    document.querySelectorAll('.cta-content').forEach(el => {
      if (!el.dataset.animate) el.dataset.animate = 'scale-in';
    });
  }

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyAnimationAttributes();
    initScrollAnimations();
    initSectionReveal();
    initFloatingElements();
    initSmoothScroll();
    initPageLoadAnimations();
    
    // Optional: Enable custom cursor on desktop
    // initCursorFollower();
  });

  // Re-initialize on window resize (for responsive)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Refresh parallax calculations
      initParallax();
    }, 250);
  });

})();
