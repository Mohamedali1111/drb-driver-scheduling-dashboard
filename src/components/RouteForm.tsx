import React, { useState } from 'react';
import { useRouteStore } from '../store/routeStore';
import { useDriverStore } from '../store/driverStore';

/**
 * Form data interface for controlled components
 */
interface RouteFormData {
  routeCode: string;
  origin: string;
  destination: string;
  startTime: string;
  endTime: string;
  assignedDriverId: string;
}

/**
 * Form validation errors interface
 */
interface FormErrors {
  routeCode?: string;
  origin?: string;
  destination?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * RouteForm component for adding new delivery routes
 * Provides a clean, responsive form with validation and state management
 */
const RouteForm: React.FC = () => {
  // Get store actions
  const addRoute = useRouteStore((state) => state.addRoute);
  const updateDriver = useDriverStore((state) => state.updateDriver);
  const drivers = useDriverStore((state) => state.drivers);

  // Form state using controlled components
  const [formData, setFormData] = useState<RouteFormData>({
    routeCode: '',
    origin: '',
    destination: '',
    startTime: '',
    endTime: '',
    assignedDriverId: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState<FormErrors>({});

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Get available drivers (status === 'available')
  const availableDrivers = drivers.filter((driver) => driver.status === 'available');

  /**
   * Handle input changes and update form state
   * @param field - The field being updated
   * @param value - The new value
   */
  const handleInputChange = (field: keyof RouteFormData, value: string) => {
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

    // Validate route code (required)
    if (!formData.routeCode.trim()) {
      newErrors.routeCode = 'Route code is required';
    } else if (formData.routeCode.trim().length < 3) {
      newErrors.routeCode = 'Route code must be at least 3 characters';
    }

    // Validate origin (required)
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
    } else if (formData.origin.trim().length < 2) {
      newErrors.origin = 'Origin must be at least 2 characters';
    }

    // Validate destination (required)
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    } else if (formData.destination.trim().length < 2) {
      newErrors.destination = 'Destination must be at least 2 characters';
    }

    // Validate start time (required)
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    // Validate end time (required)
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (formData.startTime && formData.endTime) {
      // Check if end time is after start time
      const startDateTime = new Date(formData.startTime);
      const endDateTime = new Date(formData.endTime);
      
      if (endDateTime <= startDateTime) {
        newErrors.endTime = 'End time must be after start time';
      }
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
      // Prepare route data
      const routeData = {
        routeCode: formData.routeCode.trim(),
        origin: formData.origin.trim(),
        destination: formData.destination.trim(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        assignedDriverId: formData.assignedDriverId || undefined,
      };

      // Add route to the store
      addRoute(routeData);

      // If a driver is assigned, update their status to 'assigned'
      if (formData.assignedDriverId) {
        updateDriver(formData.assignedDriverId, { status: 'assigned' });
      }

      // Show success message
      setSuccessMessage(`Route "${formData.routeCode.trim()}" has been added successfully!`);

      // Clear form after successful submission
      setFormData({
        routeCode: '',
        origin: '',
        destination: '',
        startTime: '',
        endTime: '',
        assignedDriverId: '',
      });

      // Clear any existing errors
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding route:', error);
      setSuccessMessage('Error adding route. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Route
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create a new delivery route and optionally assign a driver
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
          {/* Route Code Field */}
          <div>
            <label htmlFor="routeCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Route Code *
            </label>
            <input
              type="text"
              id="routeCode"
              value={formData.routeCode}
              onChange={(e) => handleInputChange('routeCode', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.routeCode
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., RT001"
            />
            {errors.routeCode && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.routeCode}</p>
            )}
          </div>

          {/* Assign Driver Field */}
          <div>
            <label htmlFor="assignedDriverId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assign Driver (Optional)
            </label>
            <select
              id="assignedDriverId"
              value={formData.assignedDriverId}
              onChange={(e) => handleInputChange('assignedDriverId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a driver (optional)</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} - {driver.licenseId}
                </option>
              ))}
            </select>
            {availableDrivers.length === 0 && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No available drivers. Add drivers first or assign later.
              </p>
            )}
          </div>

          {/* Origin Field */}
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Origin *
            </label>
            <input
              type="text"
              id="origin"
              value={formData.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.origin
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter origin location"
            />
            {errors.origin && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.origin}</p>
            )}
          </div>

          {/* Destination Field */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.destination
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter destination location"
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.destination}</p>
            )}
          </div>

          {/* Start Time Field */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Time *
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.startTime
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startTime}</p>
            )}
          </div>

          {/* End Time Field */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Time *
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.endTime
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            Add Route
          </button>
        </div>
      </form>
    </div>
  );
};

export default RouteForm;
