import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">LOGO</div>
      </div>
      
      <div className="search-container">
        <div className="search-input">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="sidebar-sections">
        <div className="section-title">Recruitment</div>
        <div className={`sidebar-item ${path.includes('/candidates') ? 'active' : ''}`}>
          <span className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <Link to="/candidates">Candidates</Link>
        </div>

        <div className="section-title">Organization</div>
        <div className={`sidebar-item ${path.includes('/employees') ? 'active' : ''}`}>
          <span className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <Link to="/employees">Employees</Link>
        </div>

        <div className={`sidebar-item ${path.includes('/attendance') ? 'active' : ''}`}>
          <span className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </span>
          <Link to="/attendance">Attendance</Link>
        </div>

        <div className={`sidebar-item ${path.includes('/leaves') ? 'active' : ''}`}>
          <span className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </span>
          <Link to="/leaves">Leaves</Link>
        </div>

        <div className="section-title">Others</div>
        <div className={`sidebar-item ${path.includes('/logout') ? 'active' : ''}`}>
          <span className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;