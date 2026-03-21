import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../images/landing/sdgp-logo.png';
import GoogleAuthButton from "../components/GoogleAuthButton";
import axios from "axios";

import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const visualSideRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ Keep your validations (unchanged)
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

    try {
      // ✅ SEND DATA TO BACKEND
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      // ✅ HANDLE SUCCESS RESPONSE
      if (res.data.success) {
        const user = res.data.user;

        // store user locally (same as before)
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);

        // redirect
        navigate('/dashboard');
      } else {
        setError(res.data.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      setError("Signup failed - server error");
    }
  };

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
    <motion.div className="signup-page-wrapper"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-bend-bg"></div>  
      <div className="practical-preview-signup">
        <div 
          className="visual-side-signup" 
          ref={visualSideRef}
          onMouseMove={handleMouseMove}
        >
          <div className="gradient-bg"></div>
          <div className="particles">{bubbles}</div>

          <div 
            className="center-icon"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          >
            {/* Atom SVG */}
            <svg viewBox="0 0 24 24" fill="none" className="atom-icon">
              <circle cx="12" cy="12" r="3" fill="#a7f3d0" className="nucleus" />
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

        <div className="preview-content-signup">
          <Link to="/" className="auth-top-brand">
            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
          </Link>
          
          <div className="preview-header-signup">
            <h1>Student Registration</h1>
            <p className="preview-text">Create your profile to access experiments.</p>
          </div>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" required />
            </div>
            <div className="action-area-signup">
              <button type="submit" className="start-action-btn-signup">Join Lab</button>
            </div>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Always show Google login */}
          <GoogleAuthButton onLogin={(u) => {
            setUser(u);
            localStorage.setItem('user', JSON.stringify(u));
            navigate("/dashboard");
          }} />

          <div className="login-footer">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;