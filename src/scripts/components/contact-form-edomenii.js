/**
 * Contact Form Component - eDomenii.ro Version
 * Configured to work with PHP backend on eDomenii.ro hosting
 */

import { validateEmail, validateRequired } from '../utils/validation.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');

  // Real-time validation
  const setupValidation = (input, validator, errorId) => {
    const errorElement = document.getElementById(errorId);

    input.addEventListener('blur', () => {
      const error = validator(input.value);
      if (error) {
        input.classList.add('error');
        input.classList.remove('success');
        if (errorElement) errorElement.textContent = error;
      } else {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorElement) errorElement.textContent = '';
      }
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const error = validator(input.value);
        if (!error) {
          input.classList.remove('error');
          input.classList.add('success');
          if (errorElement) errorElement.textContent = '';
        }
      }
    });
  };

  setupValidation(nameInput, validateRequired, 'name-error');
  setupValidation(emailInput, validateEmail, 'email-error');
  setupValidation(messageInput, validateRequired, 'message-error');

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateRequired(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateRequired(messageInput.value);

    // Display errors
    if (nameError) {
      nameInput.classList.add('error');
      document.getElementById('name-error').textContent = nameError;
    }
    if (emailError) {
      emailInput.classList.add('error');
      document.getElementById('email-error').textContent = emailError;
    }
    if (messageError) {
      messageInput.classList.add('error');
      document.getElementById('message-error').textContent = messageError;
    }

    // Stop if there are errors (except captcha which is handled during submission now)
    if (nameError || emailError || messageError) {
      showFormMessage('Please fix the errors above.', 'error');
      return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
      // Execute reCAPTCHA v3
      let captchaToken = '';
      if (typeof grecaptcha !== 'undefined') {
        captchaToken = await new Promise((resolve, reject) => {
          grecaptcha.ready(() => {
            grecaptcha.execute('6LfHLkAsAAAAAGgGmdnL2_KbRObY9ZjJf_tdGF_N', { action: 'submit' })
              .then(resolve)
              .catch(reject);
          });
        });
      }

      // Collect form data
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        service: document.getElementById('service').value,
        message: messageInput.value,
        recaptchaToken: captchaToken
      };

      // Submit to PHP handler on eDomenii.ro
      const response = await fetch('/contact-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success
        showFormMessage(
          result.message || 'Thank you for your message! I\'ll respond within 24 hours.',
          'success'
        );
        form.reset();

        // Remove validation classes
        [nameInput, emailInput, messageInput].forEach(input => {
          input.classList.remove('success', 'error');
        });

      } else {
        // Server error or validation error
        showFormMessage(
          result.message || 'Sorry, there was an error sending your message. Please try again or email directly at contact@linguisticguide.com',
          'error'
        );
      }

    } catch (error) {
      // Network or other error
      showFormMessage(
        'Sorry, there was an error sending your message. Please try again or email directly at contact@linguisticguide.com',
        'error'
      );
      console.error('Form submission error:', error);
    } finally {
      // Remove loading state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  });

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message visible ${type}`;

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success messages after 8 seconds
    if (type === 'success') {
      setTimeout(() => {
        formMessage.classList.remove('visible');
      }, 8000);
    }
  }
}

