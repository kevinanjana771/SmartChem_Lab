import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: '🏠' },
    { name: 'Practicals', path: '/practicals', icon: '🧪' },
    { name: 'Equipments', path: '/equipments', icon: '⚖️' },
    { name: 'Safety Methods', path: '/safety', icon: '🛡️' }, // Placeholder path
    { name: 'Report', path: '/report', icon: '📊' }, // Placeholder path
    { name: 'Settings', path: '/settings', icon: '⚙️', badge: 2 },
    { name: 'Support', path: '/support', icon: '❓' }, // Placeholder path
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">⚗</div>
        <span className="sidebar-brand">SmartChem Lab</span>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;