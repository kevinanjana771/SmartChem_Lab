import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  // Replace with actual user image path
  const userAvatar = "../imagers/landing/kevin.jpeg"; 

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2 className="page-title">Welcome Back, Kevin 🖐</h2>
      </div>
      <div className="topbar-right">
        <button className="logout-btn" onClick={() => navigate('/')}>
          Logout
        </button>
        <div className="user-profile">
          <span className="user-name">Kevin</span>
          <img src={userAvatar} alt="Kevin" className="user-avatar" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;