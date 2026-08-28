import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import FrontendLayout from './components/FrontendLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

// Simple PrivateRoute for admin
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Frontend Routes wrapped in Layout */}
          <Route path="/" element={<FrontendLayout><HomePage /></FrontendLayout>} />
          <Route path="/about" element={<FrontendLayout><AboutPage /></FrontendLayout>} />
          <Route path="/services" element={<FrontendLayout><ServicesPage /></FrontendLayout>} />
          <Route path="/contact" element={<FrontendLayout><ContactPage /></FrontendLayout>} />
          <Route path="/book" element={<FrontendLayout><BookingPage /></FrontendLayout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
