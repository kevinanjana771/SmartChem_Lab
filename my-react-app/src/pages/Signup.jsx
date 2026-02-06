import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('student');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save user data to LocalStorage
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      role: activeTab,
      avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=10b981&color=fff`
    }));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="signup-page-wrapper">
      {/* Main Card Container */}
      <div className="practical-preview">
        
        {/* Left Side: Visual Image */}
        <div className="visual-side">
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000" 
            alt="Chemistry Laboratory" 
            className="lab-main-img" 
          />
        </div>

        {/* Right Side: Form Content */}
        <div className="preview-content">
          <div className="preview-header">
            <h1>{activeTab === 'student' ? 'Student Registration' : 'Teacher Registration'}</h1>
            <p className="preview-text">Create your account to access the SmartChem Lab.</p>
          </div>

          {/* Tabs */}
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

          <form onSubmit={handleSubmit} className="signup-form">
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@school.com"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
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
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="action-area">
              <button type="submit" className="start-action-btn">
                Create Account
              </button>
            </div>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? <a href="#" onClick={() => navigate('/login')}>Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
