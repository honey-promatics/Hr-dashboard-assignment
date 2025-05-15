import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Candidates from './pages/Candidates';
import Employees from './pages/Employees';
import Attendance from './pages/Attendence';
import Leaves from './pages/Leaves';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
    
    // Auto logout after 2 hours
    if (loggedIn) {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry);
        if (Date.now() > expiryTime) {
          handleLogout();
        } else {
          const timeLeft = expiryTime - Date.now();
          setTimeout(() => {
            handleLogout();
          }, timeLeft);
        }
      } else {
        // Set expiry for 2 hours from now
        const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        setTimeout(() => {
          handleLogout();
        }, 2 * 60 * 60 * 1000);
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('tokenExpiry');
    setIsAuthenticated(false);
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    // if (!isAuthenticated) {
    //   return <Navigate to="/login" />;
    // }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/candidates" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/candidates" /> : <Register />} />
        <Route path="/candidates" element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        } />
        <Route path="/employees" element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        } />
        <Route path="/leaves" element={
          <ProtectedRoute>
            <Leaves />
          </ProtectedRoute>
        } />
        <Route path="/logout" element={<Navigate to="/login" />} />
        {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/candidates" : "/login"} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;