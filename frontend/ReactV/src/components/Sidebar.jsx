import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);


const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { id: 'scan', icon: 'fas fa-search', label: 'New Scan' },
    { id: 'reports', icon: 'fas fa-file-alt', label: 'Reports' },
    { id: 'database', icon: 'fas fa-database', label: 'Vulnerability DB' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    { id: 'login', icon: 'fas fa-user', label: 'Login' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <i className="fas fa-shield-halved"></i> Scanner
      </div>
      
      {menuItems.map(item => (
        <div
          key={item.id}
          className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => setCurrentPage(item.id)}
        >
          <i className={item.icon}></i> {item.label}
        </div>
      ))}

      <div className="metrics-section">
        <div className="metric-box">System Status: Active</div>
        <div className="metric-box">Scans Today: 0</div>
        <div className="metric-box">Vulnerabilities: 0</div>
      </div>
    </div>
  );
};
export default Sidebar;