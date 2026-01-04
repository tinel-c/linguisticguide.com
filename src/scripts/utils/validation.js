/**
 * Form Validation Utilities
 */

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export function validateRequired(value) {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return null;
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
}

/**
 * Validate minimum length
 * @param {string} value - Field value
 * @param {number} minLength - Minimum length required
 * @returns {string|null} Error message or null if valid
 */
export function validateMinLength(value, minLength) {
  if (!value || value.trim().length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  return null;
}

/**
 * Validate maximum length
 * @param {string} value - Field value
 * @param {number} maxLength - Maximum length allowed
 * @returns {string|null} Error message or null if valid
 */
export function validateMaxLength(value, maxLength) {
  if (value && value.trim().length > maxLength) {
    return `Must be no more than ${maxLength} characters`;
  }
  return null;
}

/**
 * Validate phone number
 * @param {string} phone - Phone number
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone) {
  if (!phone || phone.trim() === '') {
    return null; // Optional field
  }
  
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  
  return null;
}

/**
 * Sanitize string input
 * @param {string} str - Input string
 * @returns {string} Sanitized string
 */
export function sanitizeString(str) {
  if (!str) return '';
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

