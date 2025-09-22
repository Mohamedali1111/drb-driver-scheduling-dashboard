import React, { useState } from 'react';
import { useDriverStore } from '../store/driverStore';
import type { Driver } from '../types';

/**
 * Form data interface for controlled components
 */
interface DriverFormData {
  name: string;
  phone: string;
  licenseId: string;
  status: Driver['status'];
}

/**
 * Form validation errors interface
 */
interface FormErrors {
  name?: string;
  phone?: string;
  licenseId?: string;
}

/**
 * DriverForm component for adding new drivers
 * Provides a clean, responsive form with validation and state management
 */
const DriverForm: React.FC = () => {
  // Get the addDriver action from the store
  const addDriver = useDriverStore((state) => state.addDriver);

  // Form state using controlled components
  const [formData, setFormData] = useState<DriverFormData>({
    name: '',
    phone: '',
    licenseId: '',
    status: 'available',
  });

  // Validation errors state
  const [errors, setErrors] = useState<FormErrors>({});

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string>('');

  /**
   * Handle input changes and update form state
   * @param field - The field being updated
   * @param value - The new value
   */
  const handleInputChange = (field: keyof DriverFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Clear success message when form is being modified
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  /**
   * Validate form data
   * @returns true if valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate phone (required)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate license ID (required)
    if (!formData.licenseId.trim()) {
      newErrors.licenseId = 'License ID is required';
    } else if (formData.licenseId.trim().length < 3) {
      newErrors.licenseId = 'License ID must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Add driver to the store
      addDriver({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        licenseId: formData.licenseId.trim(),
        status: formData.status,
      });

      // Show success message
      setSuccessMessage(`Driver "${formData.name.trim()}" has been added successfully!`);

      // Clear form after successful submission
      setFormData({
        name: '',
        phone: '',
        licenseId: '',
        status: 'available',
      });

      // Clear any existing errors
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding driver:', error);
      setSuccessMessage('Error adding driver. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Driver
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter driver information to add them to the system
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name Field */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter driver's full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.phone
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* License ID Field */}
          <div>
            <label htmlFor="licenseId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              License ID *
            </label>
            <input
              type="text"
              id="licenseId"
              value={formData.licenseId}
              onChange={(e) => handleInputChange('licenseId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.licenseId
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter license ID"
            />
            {errors.licenseId && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.licenseId}</p>
            )}
          </div>

          {/* Availability Status Field */}
          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Availability Status *
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as Driver['status'])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105"
          >
            Add Driver
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;
