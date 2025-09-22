import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

/**
 * Header component for the DRB Driver Scheduling Dashboard
 * Provides navigation and branding for the application
 */
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "DRB Driver Scheduling Dashboard"
}) => {
  const location = useLocation();

  // Navigation items
  const navItems = [
    { label: 'Dashboard', href: '/', icon: '📊' },
    { label: 'Drivers', href: '/drivers', icon: '👥' },
    { label: 'Routes', href: '/routes', icon: '🛣️' },
    { label: 'Calendar', href: '/calendar', icon: '📅' },
  ];

  /**
   * Check if a navigation item is active
   * @param href - The href to check
   * @returns true if the item is active
   */
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {title}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <div className="flex items-center">
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-1 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
