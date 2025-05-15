// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/login';
// import Register from './pages/Register';
// import Candidates from './pages/Candidates';
// import Employees from './pages/Employees';
// import Attendance from './pages/Attendence';
// import Leaves from './pages/Leaves';
// import './App.css';
// import { AuthProvider, useAuth } from "./context/AuthContext"
// import { ToastContainer } from 'react-toastify';

// const App = () => {
//   const { isAuthenticated, setIsAuthenticated } = useAuth();

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('tokenExpiry');
//     setIsAuthenticated(false);
//   };


//   const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated, loading } = useAuth();

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }

//     return children;
//   };

//   return (
//     <AuthProvider>
//       <ToastContainer />
//       <Router>
//         <Routes>
//           <Route path="/login" element={isAuthenticated ? <Navigate to="/candidates" /> : <Login />} />
//           <Route path="/register" element={isAuthenticated ? <Navigate to="/candidates" /> : <Register />} />
//           <Route path="/candidates" element={
//             <ProtectedRoute>
//               <Candidates />
//             </ProtectedRoute>
//           } />
//           <Route path="/employees" element={
//             <ProtectedRoute>
//               <Employees />
//             </ProtectedRoute>
//           } />
//           <Route path="/attendance" element={
//             <ProtectedRoute>
//               <Attendance />
//             </ProtectedRoute>
//           } />
//           <Route path="/leaves" element={
//             <ProtectedRoute>
//               <Leaves />
//             </ProtectedRoute>
//           } />
//           <Route path="/logout" element={<Navigate to="/login" />} />
//           {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/candidates" : "/login"} />} /> */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;




import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from './pages/login';
import Register from './pages/Register';
import Candidates from './pages/Candidates';
import Employees from './pages/Employees';
import Attendance from './pages/Attendence';
import Leaves from './pages/Leaves';
import './App.css';

// ⚠️ useAuth used inside, not at top level
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log("isAuthenticated : ", isAuthenticated)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/candidates" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/candidates" /> : <Register />} />
      <Route path="/candidates" element={<ProtectedRoute><Candidates /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/leaves" element={<ProtectedRoute><Leaves /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/candidates" : "/login"} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
