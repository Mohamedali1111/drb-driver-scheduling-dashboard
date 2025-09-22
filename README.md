# DRB Driver Scheduling Dashboard

A modern React application built with Vite, TypeScript, and Tailwind CSS for managing driver schedules, routes, and assignments.

## Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 19** - Latest React with TypeScript support
- 🎨 **Tailwind CSS** - Utility-first CSS framework with dark mode support
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📁 **Clean Architecture** - Organized folder structure

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── types/         # TypeScript type definitions
├── utils/         # Helper functions and utilities
└── index.css      # Global styles with Tailwind directives
```

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Tailwind CSS

The project is configured with Tailwind CSS v4 with the following features:

- **Dark Mode**: Configured with `darkMode: 'class'` strategy
- **Content Scanning**: Scans `index.html` and `src/**/*.{ts,tsx}` files
- **PostCSS**: Configured with autoprefixer

### TypeScript

- Strict type checking enabled
- React types included
- Custom interfaces for Driver, Route, and Assignment entities

## Components

### Header
- Responsive navigation
- Dark mode toggle (placeholder)
- Clean, modern design

### Home Page
- Welcome section
- Feature cards
- Status indicators
- Responsive grid layout

## Types

The application includes comprehensive TypeScript interfaces:

- `Driver` - Driver information and status
- `Route` - Delivery route details
- `Assignment` - Driver-route assignments
- `DashboardStats` - Dashboard statistics
- `NavItem` - Navigation items

## Utilities

Helper functions for common operations:

- Date formatting
- Duration calculations
- ID generation
- Email/phone validation
- Status color mapping

## Development

The project follows modern React patterns:

- Functional components with TypeScript
- Clean, documented code
- Responsive design principles
- Accessibility considerations

## License

This project is private and proprietary.