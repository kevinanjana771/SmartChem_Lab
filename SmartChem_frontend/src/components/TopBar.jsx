import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';


const TopBar = () => {
  
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', updateUser);

    return () => window.removeEventListener('storage', updateUser);
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2 className="page-title">
          Welcome Back, {user ? user.name : 'Guest'} 👨‍🔬
        </h2>
      </div>
      <div className="topbar-right">
        {user ? (
          // LOGGED IN STATE
          <>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <div className="user-profile"
              onClick={() => navigate('/profile')}
              style={{ cursor: "pointer" }}
            >
              <span className="user-name">{user.name}</span>
              <img src={user.avatar} alt="User Avatar" style={{ width: "50px", borderRadius: "50%" }} />
            </div>
          </>
        ) : (
          // NOT LOGGED IN STATE
          <>
            <button 
              className="login-btn-top" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="signup-btn-top" 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;