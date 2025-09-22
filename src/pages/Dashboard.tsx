import React, { useState, useMemo } from 'react';
import { Header } from '../components';
import { useRouteStore } from '../store/routeStore';
import { useDriverStore } from '../store/driverStore';

/**
 * Filter types for routes and drivers
 */
type RouteFilter = 'all' | 'assigned' | 'unassigned';
type DriverFilter = 'all' | 'available' | 'assigned' | 'on_leave';

/**
 * Dashboard page component
 * Displays a comprehensive overview of routes and drivers with filtering and search
 */
const Dashboard: React.FC = () => {
  // Get data from stores
  const routes = useRouteStore((state) => state.routes);
  const drivers = useDriverStore((state) => state.drivers);

  // Filter states
  const [routeFilter, setRouteFilter] = useState<RouteFilter>('all');
  const [driverFilter, setDriverFilter] = useState<DriverFilter>('all');

  // Search states
  const [routeSearch, setRouteSearch] = useState('');
  const [driverSearch, setDriverSearch] = useState('');

  /**
   * Get driver name by ID
   * @param driverId - Driver ID to find
   * @returns Driver name or 'Unknown Driver'
   */
  const getDriverName = (driverId?: string): string => {
    if (!driverId) return '';
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? driver.name : 'Unknown Driver';
  };

  /**
   * Get route code by driver ID
   * @param driverId - Driver ID to find assigned route
   * @returns Route code or empty string
   */
  const getAssignedRouteCode = (driverId: string): string => {
    const assignedRoute = routes.find((route) => route.assignedDriverId === driverId);
    return assignedRoute ? assignedRoute.routeCode : '';
  };

  /**
   * Format datetime string for display
   * @param dateTime - DateTime string
   * @returns Formatted date and time
   */
  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Filtered and searched routes
   */
  const filteredRoutes = useMemo(() => {
    let filtered = routes;

    // Apply search filter
    if (routeSearch) {
      filtered = filtered.filter((route) =>
        route.routeCode.toLowerCase().includes(routeSearch.toLowerCase()) ||
        route.origin.toLowerCase().includes(routeSearch.toLowerCase()) ||
        route.destination.toLowerCase().includes(routeSearch.toLowerCase())
      );
    }

    // Apply status filter
    switch (routeFilter) {
      case 'assigned':
        filtered = filtered.filter((route) => route.assignedDriverId);
        break;
      case 'unassigned':
        filtered = filtered.filter((route) => !route.assignedDriverId);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    return filtered;
  }, [routes, routeFilter, routeSearch]);

  /**
   * Filtered and searched drivers
   */
  const filteredDrivers = useMemo(() => {
    let filtered = drivers;

    // Apply search filter
    if (driverSearch) {
      filtered = filtered.filter((driver) =>
        driver.name.toLowerCase().includes(driverSearch.toLowerCase()) ||
        driver.licenseId.toLowerCase().includes(driverSearch.toLowerCase()) ||
        driver.phone.includes(driverSearch)
      );
    }

    // Apply status filter
    switch (driverFilter) {
      case 'available':
        filtered = filtered.filter((driver) => driver.status === 'available');
        break;
      case 'assigned':
        filtered = filtered.filter((driver) => driver.status === 'assigned');
        break;
      case 'on_leave':
        filtered = filtered.filter((driver) => driver.status === 'on_leave');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    return filtered;
  }, [drivers, driverFilter, driverSearch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dashboard" />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Overview of all routes and drivers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Routes
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {routes.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Assigned Routes
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {routes.filter(route => route.assignedDriverId).length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Drivers
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {drivers.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Available Drivers
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {drivers.filter(driver => driver.status === 'available').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Routes Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Routes ({filteredRoutes.length})
                  </h2>
                  
                  {/* Route Filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setRouteFilter('all')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        routeFilter === 'all'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setRouteFilter('assigned')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        routeFilter === 'assigned'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Assigned
                    </button>
                    <button
                      onClick={() => setRouteFilter('unassigned')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        routeFilter === 'unassigned'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Unassigned
                    </button>
                  </div>
                </div>

                {/* Route Search */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search routes by code, origin, or destination..."
                    value={routeSearch}
                    onChange={(e) => setRouteSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Time Window
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredRoutes.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          {routeSearch ? 'No routes match your search.' : 'No routes found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredRoutes.map((route) => (
                        <tr key={route.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {route.routeCode}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {route.origin} → {route.destination}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex flex-col">
                              <span>{formatDateTime(route.startTime)}</span>
                              <span className="text-xs text-gray-400">to {formatDateTime(route.endTime)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              route.assignedDriverId
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {route.assignedDriverId ? (
                                <>✅ Assigned to {getDriverName(route.assignedDriverId)}</>
                              ) : (
                                <>❌ Unassigned</>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Drivers Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Drivers ({filteredDrivers.length})
                  </h2>
                  
                  {/* Driver Filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setDriverFilter('all')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        driverFilter === 'all'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setDriverFilter('available')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        driverFilter === 'available'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => setDriverFilter('assigned')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        driverFilter === 'assigned'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Assigned
                    </button>
                    <button
                      onClick={() => setDriverFilter('on_leave')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        driverFilter === 'on_leave'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      On Leave
                    </button>
                  </div>
                </div>

                {/* Driver Search */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search drivers by name, phone, or license..."
                    value={driverSearch}
                    onChange={(e) => setDriverSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredDrivers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          {driverSearch ? 'No drivers match your search.' : 'No drivers found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredDrivers.map((driver) => (
                        <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {driver.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {driver.licenseId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {driver.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                driver.status === 'available'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : driver.status === 'assigned'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              }`}>
                                {driver.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              {driver.status === 'assigned' && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Route: {getAssignedRouteCode(driver.id)}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
