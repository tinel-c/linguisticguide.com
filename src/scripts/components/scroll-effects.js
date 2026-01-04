/**
 * Scroll Effects Component
 * Handles scroll-triggered animations and effects
 */

export function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    '.service-card, .testimonial, .step, .experience__item, .stat, [data-aos]'
  );
  
  animateElements.forEach(el => {
    if (!el.hasAttribute('data-aos')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    }
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });
  
  // Add animation class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    [data-aos="fade-right"] { transform: translateX(-50px); opacity: 0; }
    [data-aos="fade-left"] { transform: translateX(50px); opacity: 0; }
    [data-aos="fade-up"] { transform: translateY(50px); opacity: 0; }
    [data-aos="zoom-in"] { transform: scale(0.9); opacity: 0; }
    
    .animate-in[data-aos="fade-right"],
    .animate-in[data-aos="fade-left"],
    .animate-in[data-aos="fade-up"] {
      transform: translate(0, 0) !important;
      opacity: 1 !important;
    }
    .animate-in[data-aos="zoom-in"] {
      transform: scale(1) !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Animated counter for statistics
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Observe stat numbers for counter animation
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        if (count && !target.classList.contains('counted')) {
          target.classList.add('counted');
          animateCounter(target, count);
        }
        statObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat__number[data-count]').forEach(stat => {
    statObserver.observe(stat);
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

