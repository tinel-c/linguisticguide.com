/**
 * Main JavaScript Entry Point
 * LinguisticGuide.com
 */

import { initNavigation } from './components/navigation.js';
import { initScrollEffects } from './components/scroll-effects.js';
import { initContactForm } from './components/contact-form-edomenii.js';
import { initAnimations } from './components/animations.js';
import { translator } from './i18n.js';

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  initNavigation();

  // Initialize scroll effects
  initScrollEffects();

  // Initialize contact form
  initContactForm();

  // Initialize animations
  initAnimations();

  // Initialize translator
  translator.init();

  console.log('LinguisticGuide.com initialized successfully');
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden - pause animations if needed
  } else {
    // Page is visible - resume animations if needed
  }
});

