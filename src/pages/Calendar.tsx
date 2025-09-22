import React, { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, isWithinInterval, addWeeks, subWeeks } from 'date-fns';
import { Header } from '../components';
import { useDriverStore } from '../store/driverStore';
import { useRouteStore } from '../store/routeStore';
import type { Driver, Route } from '../types';

/**
 * Filter types for drivers
 */
type DriverFilter = 'all' | 'available' | 'assigned' | 'on_leave';

/**
 * Time slot interface for calendar grid
 */
interface TimeSlot {
  hour: number;
  label: string;
  isAM: boolean;
}

/**
 * Driver availability data for a specific time slot
 */
interface DriverAvailability {
  driver: Driver;
  status: 'available' | 'assigned' | 'on_leave';
  route?: Route;
}

/**
 * Calendar page component
 * Displays driver availability and route assignments in a visual timeline
 */
const Calendar: React.FC = () => {
  // Get data from stores
  const drivers = useDriverStore((state) => state.drivers);
  const routes = useRouteStore((state) => state.routes);

  // State for week navigation
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // State for driver filtering
  const [driverFilter, setDriverFilter] = useState<DriverFilter>('all');

  // Generate time slots (6 AM to 10 PM)
  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push({
        hour,
        label: hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`,
        isAM: hour < 12,
      });
    }
    return slots;
  }, []);

  // Generate week days
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Start on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentWeek]);

  /**
   * Filter drivers based on selected filter
   */
  const filteredDrivers = useMemo(() => {
    switch (driverFilter) {
      case 'available':
        return drivers.filter((driver) => driver.status === 'available');
      case 'assigned':
        return drivers.filter((driver) => driver.status === 'assigned');
      case 'on_leave':
        return drivers.filter((driver) => driver.status === 'on_leave');
      default:
        return drivers;
    }
  }, [drivers, driverFilter]);

  /**
   * Get driver availability for a specific day and time slot
   * @param driver - Driver to check
   * @param day - Day to check
   * @param timeSlot - Time slot to check
   * @returns Driver availability data
   */
  const getDriverAvailability = (driver: Driver, day: Date, timeSlot: TimeSlot): DriverAvailability => {
    // Check if driver is on leave
    if (driver.status === 'on_leave') {
      return { driver, status: 'on_leave' };
    }

    // Check if driver has an assigned route for this day and time
    const assignedRoute = routes.find((route) => {
      if (route.assignedDriverId !== driver.id) return false;
      
      const routeStart = new Date(route.startTime);
      const routeEnd = new Date(route.endTime);
      
      // Check if the route is on the same day
      if (!isSameDay(routeStart, day)) return false;
      
      // Check if the time slot overlaps with the route
      const slotStart = new Date(day);
      slotStart.setHours(timeSlot.hour, 0, 0, 0);
      
      const slotEnd = new Date(day);
      slotEnd.setHours(timeSlot.hour + 1, 0, 0, 0);
      
      return isWithinInterval(slotStart, { start: routeStart, end: routeEnd }) ||
             isWithinInterval(routeStart, { start: slotStart, end: slotEnd });
    });

    if (assignedRoute) {
      return { driver, status: 'assigned', route: assignedRoute };
    }

    // Driver is available if not on leave and no assigned route
    return { driver, status: 'available' };
  };

  /**
   * Get status color classes for a driver availability
   * @param availability - Driver availability data
   * @returns Tailwind CSS classes
   */
  const getStatusClasses = (availability: DriverAvailability): string => {
    switch (availability.status) {
      case 'available':
        return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-300';
      case 'assigned':
        return 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300';
      case 'on_leave':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300';
    }
  };

  /**
   * Navigate to previous week
   */
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  /**
   * Navigate to next week
   */
  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  /**
   * Navigate to current week
   */
  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calendar View
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Driver availability and route assignments
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Week Navigation */}
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Week of {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={goToPreviousWeek}
                    className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goToCurrentWeek}
                    className="px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Current Week
                  </button>
                  <button
                    onClick={goToNextWeek}
                    className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Driver Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                {(['all', 'available', 'assigned', 'on_leave'] as DriverFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDriverFilter(filter)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      driverFilter === filter
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Header Row */}
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                      Driver
                    </th>
                    {weekDays.map((day) => (
                      <th key={day.toISOString()} className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col">
                          <span>{format(day, 'EEE')}</span>
                          <span className="text-lg font-semibold">{format(day, 'd')}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Time Slots Header */}
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="w-48 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                      Time
                    </th>
                    {weekDays.map((day) => (
                      <th key={day.toISOString()} className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                        {format(day, 'MMM')}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Time Slots and Driver Rows */}
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot.hour} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {/* Time Slot Label */}
                      <td className="w-48 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-600">
                        {timeSlot.label}
                      </td>

                      {/* Driver Availability for each day */}
                      {weekDays.map((day) => (
                        <td key={day.toISOString()} className="px-2 py-3 border-r border-gray-200 dark:border-gray-600">
                          <div className="space-y-1">
                            {filteredDrivers.map((driver) => {
                              const availability = getDriverAvailability(driver, day, timeSlot);
                              return (
                                <div
                                  key={driver.id}
                                  className={`px-2 py-1 text-xs rounded border ${getStatusClasses(availability)}`}
                                  title={`${driver.name} - ${availability.status}${availability.route ? ` (${availability.route.routeCode})` : ''}`}
                                >
                                  <div className="font-medium truncate">
                                    {driver.name}
                                  </div>
                                  {availability.route && (
                                    <div className="text-xs opacity-75 truncate">
                                      {availability.route.routeCode}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">On Leave</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
