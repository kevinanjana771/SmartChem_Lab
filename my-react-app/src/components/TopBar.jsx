import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';


const TopBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("User is logged in:", parsedUser);
      setUser(parsedUser);
    } else {
      console.log("No user found in localStorage");
      setUser(null);
    }
  }, []);

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
            <div className="user-profile">
              <span className="user-name">{user.name}</span>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
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