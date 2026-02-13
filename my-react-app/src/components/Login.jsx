import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../images/landing/sdgp-logo.png';
import GoogleAuthButton from "../components/GoogleAuthButton";


import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const visualSideRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleMouseMove = (e) => {
    if (!visualSideRef.current) return;
    const rect = visualSideRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    setMousePosition({ x, y });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      name: formData.name || 'Scientist',
      email: formData.email,
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=10b981&color=fff`
    }));

    navigate('/dashboard');
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
    
    <motion.div className="login-page-wrapper"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
      <div className="color-bend-bg"></div>
      <div className="practical-preview-login">
        
        {/* Left Side: Interactive Lab Design */}
        <div 
          className="visual-side-login" 
          ref={visualSideRef}
          onMouseMove={handleMouseMove}
        >
          <div className="gradient-bg"></div>
          <div className="particles">{bubbles}</div>

          {/* Central Icon: Bubbling Flask */}
          <div 
            className="center-icon"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="flask-icon">
              <path d="M10 2v7.31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v7.31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 2h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* The Flask Body */}
              <path d="M6 19a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4l-3.5-8.5h-5L6 19z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.1)"/>
              
              {/* Animated Liquid inside Flask */}
              <path className="flask-liquid" d="M7.5 17a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v.5a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-.5z" fill="#a7f3d0"/>
              
              {/* Bubbles inside liquid */}
              <circle className="bubble-anim-1" cx="10" cy="17" r="0.5" fill="white" />
              <circle className="bubble-anim-2" cx="14" cy="17.5" r="0.7" fill="white" />
            </svg>
            
            <h2 className="lab-title-text">Welcome Back, Scientist</h2>
            <p className="lab-sub-text">Ready to conduct your experiments?</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="preview-content-login">
          <Link to="/" className="auth-top-brand">
            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
          </Link>
          <div className="preview-header-login">
            <h1>Student Portal</h1>
            <p className="preview-text-login">Access the virtual laboratory and start your practicals.</p>
          </div>

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

            <div className="action-area-login">
              <button type="submit" className="start-action-btn-login">Enter Lab</button>
            </div>
          </form>
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google Login */}
          <GoogleAuthButton />
          

          <div className="login-footer">
            <p>New to SmartChem? <Link to="/signup">Create an Account</Link></p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;