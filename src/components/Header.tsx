import React from 'react';
import type { NavItem } from '../types';
import DarkModeToggle from './DarkModeToggle';

/**
 * Header component for the DRB Driver Scheduling Dashboard
 * Provides navigation and branding for the application
 */
interface HeaderProps {
  title?: string;
  navItems?: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ 
  title = "DRB Driver Scheduling Dashboard",
  navItems = []
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* Dark mode toggle */}
          <div className="flex items-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
