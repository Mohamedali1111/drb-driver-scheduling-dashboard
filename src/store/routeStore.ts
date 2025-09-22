import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Route } from '../types';

/**
 * Route store interface defining the state and actions
 */
interface RouteStore {
  // State
  routes: Route[];
  
  // Actions
  addRoute: (route: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRoute: (id: string, updates: Partial<Omit<Route, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteRoute: (id: string) => void;
  getRoute: (id: string) => Route | undefined;
  getRoutesByDriver: (driverId: string) => Route[];
  getUnassignedRoutes: () => Route[];
}

/**
 * Route store implementation using Zustand
 * Manages route state and provides actions for CRUD operations
 */
export const useRouteStore = create<RouteStore>((set, get) => ({
  // Initial state - empty routes array
  routes: [],

  /**
   * Add a new route to the store
   * @param route - Route data without id, createdAt, updatedAt
   */
  addRoute: (route) => {
    const newRoute: Route = {
      ...route,
      id: uuidv4(), // Generate unique ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      routes: [...state.routes, newRoute],
    }));

    // Log the action for activity tracking
    console.log(`Route added: ${newRoute.routeCode} (${newRoute.id})`);
  },

  /**
   * Update an existing route
   * @param id - Route ID to update
   * @param updates - Partial route data to update
   */
  updateRoute: (id, updates) => {
    set((state) => ({
      routes: state.routes.map((route) =>
        route.id === id
          ? { ...route, ...updates, updatedAt: new Date() }
          : route
      ),
    }));

    // Log the action for activity tracking
    const route = get().getRoute(id);
    if (route) {
      console.log(`Route updated: ${route.routeCode} (${id})`);
    }
  },

  /**
   * Delete a route from the store
   * @param id - Route ID to delete
   */
  deleteRoute: (id) => {
    const route = get().getRoute(id);
    
    set((state) => ({
      routes: state.routes.filter((route) => route.id !== id),
    }));

    // Log the action for activity tracking
    if (route) {
      console.log(`Route deleted: ${route.routeCode} (${id})`);
    }
  },

  /**
   * Get a specific route by ID
   * @param id - Route ID to find
   * @returns Route object or undefined if not found
   */
  getRoute: (id) => {
    return get().routes.find((route) => route.id === id);
  },

  /**
   * Get routes assigned to a specific driver
   * @param driverId - Driver ID to filter by
   * @returns Array of routes assigned to the driver
   */
  getRoutesByDriver: (driverId) => {
    return get().routes.filter((route) => route.assignedDriverId === driverId);
  },

  /**
   * Get routes that are not assigned to any driver
   * @returns Array of unassigned routes
   */
  getUnassignedRoutes: () => {
    return get().routes.filter((route) => !route.assignedDriverId);
  },
}));
