// Form validation utilities

/**
 * Validates an email address format
 * @param email Email address to validate
 * @returns Boolean indicating if email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password Password to validate
 * @returns Object with validation status and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character',
    };
  }
  
  return {
    isValid: true,
    message: 'Password is strong',
  };
};

/**
 * Validates required fields
 * @param fields Object containing field names and values
 * @returns Object with validation status and array of missing fields
 */
export const validateRequiredFields = (
  fields: Record<string, string>
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = Object.entries(fields)
    .filter(([_, value]) => !value.trim())
    .map(([key, _]) => key);
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

/**
 * Format validation error message for missing fields
 * @param missingFields Array of missing field names
 * @returns Formatted error message
 */
export const formatMissingFieldsMessage = (missingFields: string[]): string => {
  if (missingFields.length === 0) return '';
  
  const formattedFields = missingFields.map(field => {
    // Convert camelCase to readable format
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  });
  
  if (formattedFields.length === 1) {
    return `${formattedFields[0]} is required.`;
  }
  
  const lastField = formattedFields.pop();
  return `${formattedFields.join(', ')} and ${lastField} are required.`;
};
