/**
 * TypeScript interfaces for the DRB Driver Scheduling Dashboard
 */

// Driver interface representing a driver in the system
export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseId: string;
  status: 'available' | 'assigned' | 'on_leave';
  createdAt: Date;
  updatedAt: Date;
}

// Route interface representing a delivery route
export interface Route {
  id: string;
  name: string;
  description?: string;
  startLocation: string;
  endLocation: string;
  distance: number; // in kilometers
  estimatedDuration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

// Assignment interface representing a driver-route assignment
export interface Assignment {
  id: string;
  driverId: string;
  routeId: string;
  scheduledDate: Date;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard statistics interface
export interface DashboardStats {
  totalDrivers: number;
  activeDrivers: number;
  totalRoutes: number;
  activeRoutes: number;
  todayAssignments: number;
  completedAssignments: number;
  pendingAssignments: number;
}

// Navigation item interface for the header
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
