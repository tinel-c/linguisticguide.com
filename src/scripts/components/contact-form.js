/**
 * Contact Form Component
 * Handles form validation and submission
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
    
    // Stop if there are errors
    if (nameError || emailError || messageError) {
      showFormMessage('Please fix the errors above.', 'error');
      return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Collect form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      service: document.getElementById('service').value,
      message: messageInput.value
    };
    
    try {
      // Simulate API call (replace with actual endpoint)
      await submitFormData(formData);
      
      // Success
      showFormMessage('Thank you for your message! I\'ll respond within 24 hours.', 'success');
      form.reset();
      
      // Remove validation classes
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('success', 'error');
      });
      
    } catch (error) {
      // Error
      showFormMessage('Sorry, there was an error sending your message. Please try again or email directly.', 'error');
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
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('visible');
    }, 5000);
  }
  
  async function submitFormData(data) {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, always succeed
        // In production, replace with actual fetch call:
        /*
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
        */
        
        console.log('Form data:', data);
        resolve({ success: true });
      }, 1500);
    });
  }
}

