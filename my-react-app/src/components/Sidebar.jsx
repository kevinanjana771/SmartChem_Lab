import React, { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  
  // Mouse position for Spotlight effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: '🏠' },
    { name: 'Practicals', path: '/practicals', icon: '🧪' },
    { name: 'Equipments', path: '/equipments', icon: '⚖️' },
    { name: 'Safety Methods', path: '/safety', icon: '🛡️' },
    { name: 'Report', path: '/report', icon: '📊' },
    { name: 'Settings', path: '/settings', icon: '⚙️', badge: 2 },
  ];

  // Handle Mouse Move for Spotlight
  const handleMouseMove = (e) => {
    if (!sidebarRef.current) return;
    const rect = sidebarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Handle Click Spark
  const handleSpark = (e) => {
    const spark = document.createElement('div');
    spark.classList.add('sidebar-spark');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    e.currentTarget.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 600);
  };

  return (
    <div 
      className="sidebar" 
      ref={sidebarRef}
      onMouseMove={handleMouseMove}
      style={{ '--x': mousePos.x + 'px', '--y': mousePos.y + 'px' }}
    >
      
      {/* MAIN HEADER */}
      <div className="sidebar-header">
        <div className="logo-icon">⚗</div>
        <span className="sidebar-brand">SmartChem Lab</span>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={handleSpark}
              >
                {/* Interactive Spotlight Gradient */}
                <span className="spotlight"></span>
                
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