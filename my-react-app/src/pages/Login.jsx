import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  
  // Added tab state to utilize the 'tabs' CSS class provided
  const [activeTab, setActiveTab] = useState('student'); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    // Save user data to LocalStorage
    localStorage.setItem('user', JSON.stringify({
      name: formData.name || 'Student', // Fallback name if hidden
      email: formData.email,
      role: activeTab,
      avatar: `https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=10b981&color=fff`
    }));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-page-wrapper">
      {/* Main Card Container utilizing .practical-preview */}
      <div className="practical-preview">
        
        {/* Left Side: Visual Image utilizing .lab-main-img */}
        <div className="visual-side">
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000" 
            alt="Chemistry Laboratory" 
            className="lab-main-img" 
          />
        </div>

        {/* Right Side: Form Content utilizing .preview-content */}
        <div className="preview-content">
          <div className="preview-header">
            <h1>{activeTab === 'student' ? 'Student Portal' : 'Teacher Portal'}</h1>
            <p className="preview-text">Enter your credentials to access the SmartChem Lab.</p>
          </div>

          {/* Tabs utilizing .tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'student' ? 'active' : ''}`} 
              onClick={() => setActiveTab('student')}
            >
              Student
            </button>
            <button 
              className={`tab ${activeTab === 'teacher' ? 'active' : ''}`} 
              onClick={() => setActiveTab('teacher')}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            
            {/* Conditional Name Field (Optional) */}
            {activeTab === 'student' && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@school.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="action-area">
              <button type="submit" className="start-action-btn">
                Sign In
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account? <a href="#" onClick={() => navigate('/')}>Back to Home</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;