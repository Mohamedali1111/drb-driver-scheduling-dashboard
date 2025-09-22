/**
 * Utility functions for the DRB Driver Scheduling Dashboard
 */

/**
 * Format a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date and time to a readable string
 * @param date - The date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Calculate the duration between two times
 * @param startTime - Start time in HH:MM format
 * @param endTime - End time in HH:MM format
 * @returns Duration in minutes
 */
export const calculateDuration = (startTime: string, endTime: string): number => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  return endMinutes - startMinutes;
};

/**
 * Generate a unique ID
 * @returns A unique string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (basic validation)
 * @param phone - Phone string to validate
 * @returns True if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Get status color class for Tailwind CSS
 * @param status - Status string
 * @returns Tailwind color class
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    active: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    inactive: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
    suspended: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
    scheduled: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    'in-progress': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    cancelled: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
    maintenance: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300',
  };
  
  return statusColors[status] || 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
};
