import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Drivers, Routes as RoutesPage, Home, Calendar } from './pages';

/**
 * Main App component for the DRB Driver Scheduling Dashboard
 * Entry point of the application with routing setup
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
