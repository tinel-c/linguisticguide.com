/**
 * Animations Component
 * Advanced animations using GSAP (optional)
 */

export function initAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('Reduced motion preferred - skipping advanced animations');
    return;
  }
  
  // Custom animations can be added here
  // The basic fade-ins are handled by scroll-effects.js
}
