import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Driver } from '../types';

/**
 * Driver store interface defining the state and actions
 */
interface DriverStore {
  // State
  drivers: Driver[];
  
  // Actions
  addDriver: (driver: Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDriver: (id: string, updates: Partial<Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteDriver: (id: string) => void;
  getDriver: (id: string) => Driver | undefined;
  getDriversByStatus: (status: Driver['status']) => Driver[];
}

/**
 * Driver store implementation using Zustand
 * Manages driver state and provides actions for CRUD operations
 */
export const useDriverStore = create<DriverStore>((set, get) => ({
  // Initial state - empty drivers array
  drivers: [],

  /**
   * Add a new driver to the store
   * @param driver - Driver data without id, createdAt, updatedAt
   */
  addDriver: (driver) => {
    const newDriver: Driver = {
      ...driver,
      id: uuidv4(), // Generate unique ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      drivers: [...state.drivers, newDriver],
    }));

    // Log the action for activity tracking
    console.log(`Driver added: ${newDriver.name} (${newDriver.id})`);
  },

  /**
   * Update an existing driver
   * @param id - Driver ID to update
   * @param updates - Partial driver data to update
   */
  updateDriver: (id, updates) => {
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === id
          ? { ...driver, ...updates, updatedAt: new Date() }
          : driver
      ),
    }));

    // Log the action for activity tracking
    const driver = get().getDriver(id);
    if (driver) {
      console.log(`Driver updated: ${driver.name} (${id})`);
    }
  },

  /**
   * Delete a driver from the store
   * @param id - Driver ID to delete
   */
  deleteDriver: (id) => {
    const driver = get().getDriver(id);
    
    set((state) => ({
      drivers: state.drivers.filter((driver) => driver.id !== id),
    }));

    // Log the action for activity tracking
    if (driver) {
      console.log(`Driver deleted: ${driver.name} (${id})`);
    }
  },

  /**
   * Get a specific driver by ID
   * @param id - Driver ID to find
   * @returns Driver object or undefined if not found
   */
  getDriver: (id) => {
    return get().drivers.find((driver) => driver.id === id);
  },

  /**
   * Get drivers filtered by status
   * @param status - Status to filter by
   * @returns Array of drivers with the specified status
   */
  getDriversByStatus: (status) => {
    return get().drivers.filter((driver) => driver.status === status);
  },
}));
