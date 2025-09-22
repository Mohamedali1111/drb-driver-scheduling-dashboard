# 🚛 Driver Scheduling Dashboard

A modern, responsive logistics management web application built for the **DRB Internship Program 2025**. This dashboard enables dispatchers to efficiently manage drivers, assign delivery routes, and monitor real-time availability through an intuitive interface.

## 📌 Project Description

The Driver Scheduling Dashboard is a comprehensive frontend-only logistics management system designed to simulate real-world dispatch operations used by delivery and transportation companies. Built with modern web technologies, it provides dispatchers with powerful tools to manage driver schedules, route assignments, and availability tracking in a clean, professional interface.

## 🚀 Live Demo & GitHub

🔗 **Live Deployment (Vercel)**: [https://drb-driver-scheduling-dashboard.vercel.app](https://drb-driver-scheduling-dashboard.vercel.app)  
🧑‍💻 **GitHub Repository**: [https://github.com/Mohamedali1111/drb-driver-scheduling-dashboard.git](https://github.com/Mohamedali1111/drb-driver-scheduling-dashboard.git)

## 🛠️ Tech Stack

- **⚛️ React 19** - Modern UI library with hooks
- **📘 TypeScript** - Type-safe JavaScript development
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🗃️ Zustand** - Lightweight state management
- **⚡ Vite** - Fast build tool and dev server
- **📅 date-fns** - Modern date utility library
- **🧭 React Router** - Client-side routing
- **📱 Responsive Design** - Mobile-first approach

## ✨ Features

### 🧑‍✈️ Driver Management
- **Driver Registration Form** - Add drivers with validation
- **Status Tracking** - Available, Assigned, On Leave
- **Contact Information** - Phone, License ID management
- **Real-time Updates** - Instant status changes

### 🛣️ Route Management
- **Route Creation** - Origin, destination, time windows
- **Driver Assignment** - Dynamic driver selection
- **Route Codes** - Unique identifier system
- **Time Validation** - Ensures logical time windows

### 📊 Dashboard Overview
- **Real-time Statistics** - Total drivers, routes, assignments
- **Filtering System** - Filter by status and search
- **Dual Table View** - Drivers and routes side-by-side
- **Status Indicators** - Color-coded status badges

### 📅 Calendar View
- **Weekly Timeline** - Monday to Sunday grid
- **Hourly Slots** - 6 AM to 10 PM availability
- **Visual Status** - Color-coded driver availability
- **Route Overlay** - Shows assigned routes on timeline
- **Week Navigation** - Navigate between weeks

### 🎨 User Experience
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on all screen sizes
- **Real-time Updates** - Instant data synchronization
- **Intuitive Navigation** - Clean, professional interface

## 📂 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── DarkModeToggle.tsx
│   ├── DriverForm.tsx  # Driver registration form
│   ├── RouteForm.tsx   # Route creation form
│   └── index.ts        # Component exports
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Overview dashboard
│   ├── Drivers.tsx     # Driver management
│   ├── Routes.tsx      # Route management
│   ├── Calendar.tsx    # Weekly calendar view
│   ├── Home.tsx        # Landing page
│   └── index.ts        # Page exports
├── store/              # State management
│   ├── driverStore.ts  # Driver state (Zustand)
│   └── routeStore.ts   # Route state (Zustand)
├── types/              # TypeScript definitions
│   └── index.ts        # Interface definitions
├── utils/              # Helper functions
│   └── index.ts        # Utility functions
└── App.tsx             # Main application component
```

## 📦 Setup Instructions

### Prerequisites
- Node.js (v20.19.0 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohamedali1111/drb-driver-scheduling-dashboard.git
   cd drb-driver-scheduling-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Deployment (Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Vite configuration
   - Deploy with default settings

## 📌 Assumptions Made

- **Frontend-Only**: Data is managed entirely on the frontend using Zustand
- **UUID Generation**: All IDs are generated using UUID v4
- **Time Validation**: Time windows are assumed valid based on user input
- **No Authentication**: User authentication is out of scope for this project
- **Local Storage**: Data persists in browser's local storage
- **Single User**: Designed for single-dispatcher use case

## 🔮 Future Improvements

### Backend Integration
- **Database Integration** - PostgreSQL/MongoDB for data persistence
- **REST API** - Express.js or FastAPI backend
- **Real-time Updates** - WebSocket connections for live updates

### Enhanced Features
- **Drag-and-Drop** - Visual route assignment interface
- **Role-Based Access** - Admin vs. Dispatcher permissions
- **Notification System** - Real-time alerts for driver updates
- **Advanced Analytics** - Performance metrics and reporting
- **Mobile App** - React Native companion app

### Technical Improvements
- **Testing Suite** - Jest + React Testing Library
- **CI/CD Pipeline** - GitHub Actions for automated deployment
- **Performance Optimization** - Code splitting and lazy loading
- **Accessibility** - WCAG 2.1 compliance improvements

## 🎯 Project Goals

This project demonstrates proficiency in:
- **Modern React Development** - Hooks, context, and best practices
- **TypeScript Integration** - Type safety and developer experience
- **State Management** - Zustand for efficient state handling
- **UI/UX Design** - Responsive, accessible, and intuitive interfaces
- **Project Architecture** - Clean, maintainable, and scalable code structure

## 👨‍💻 Author Information

**Name**: Mohamed Ali  
**Program**: DRB Internship Program 2025  
**Email**: mohamedali200bu@gmail.com  
**GitHub**: [github.com/Mohamedali1111](https://github.com/Mohamedali1111)  

---

## 📄 License

This project is part of the DRB Internship Program 2025 and is for educational purposes.

---
