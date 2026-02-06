import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const visualSideRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleMouseMove = (e) => {
    if (!visualSideRef.current) return;
    const rect = visualSideRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=10b981&color=fff`
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/login');
  };

  // Generate Bubbles
  const bubbles = Array.from({ length: 20 }).map((_, i) => (
    <div 
      key={i} 
      className="bubble" 
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 30 + 5}px`,
        height: `${Math.random() * 30 + 5}px`,
        animationDuration: `${Math.random() * 4 + 3}s`,
        animationDelay: `${Math.random() * 2}s`,
        opacity: Math.random() * 0.5 + 0.1,
        transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
      }}
    />
  ));

  return (
    <div className="signup-page-wrapper">
      <div className="practical-preview">
        
        {/* Left Side: Interactive Atom Design */}
        <div 
          className="visual-side" 
          ref={visualSideRef}
          onMouseMove={handleMouseMove}
        >
          <div className="gradient-bg"></div>
          <div className="particles">{bubbles}</div>

          {/* Central Icon: Spinning Atom */}
          <div 
            className="center-icon"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="atom-icon">
              {/* Nucleus */}
              <circle cx="12" cy="12" r="3" fill="#a7f3d0" className="nucleus" />
              
              {/* Orbit Rings */}
              <g className="orbit-ring-1" style={{ transformOrigin: "center" }}>
                <ellipse cx="12" cy="12" rx="10" ry="3" stroke="white" strokeWidth="1.5" />
                <circle cx="22" cy="12" r="1.5" fill="white" className="electron" />
              </g>
              <g className="orbit-ring-2" style={{ transformOrigin: "center" }}>
                <ellipse cx="12" cy="12" rx="10" ry="3" stroke="white" strokeWidth="1.5" transform="rotate(60 12 12)" />
                <circle cx="17" cy="20.6" r="1.5" fill="white" className="electron" transform="rotate(60 12 12)" />
              </g>
              <g className="orbit-ring-3" style={{ transformOrigin: "center" }}>
                <ellipse cx="12" cy="12" rx="10" ry="3" stroke="white" strokeWidth="1.5" transform="rotate(-60 12 12)" />
                <circle cx="7" cy="3.4" r="1.5" fill="white" className="electron" transform="rotate(-60 12 12)" />
              </g>
            </svg>

            <h2 className="lab-title-text">Begin Your Research</h2>
            <p className="lab-sub-text">Join the SmartChem community today.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="preview-content">
          <div className="preview-header">
            <h1>Student Registration</h1>
            <p className="preview-text">Create your profile to access experiments.</p>
          </div>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Alex Curie"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="student@lab.edu"
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="action-area">
              <button type="submit" className="start-action-btn">Join Lab</button>
            </div>
          </form>

          <div className="login-footer">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;