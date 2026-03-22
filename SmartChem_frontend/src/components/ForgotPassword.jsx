import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../images/landing/sdgp-logo.png';
import axios from "axios";

import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const visualSideRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMouseMove = (e) => {
    if (!visualSideRef.current) return;
    const rect = visualSideRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // Mocking the backend call for now
      // const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  // Generate Bubbles (Same as Login)
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
        <div 
          className="visual-side-login" 
          ref={visualSideRef}
          onMouseMove={handleMouseMove}
        >
          <div className="gradient-bg"></div>
          <div className="particles">{bubbles}</div>

          <div 
            className="center-icon"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="flask-icon">
              <path d="M10 2v7.31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v7.31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 2h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 19a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4l-3.5-8.5h-5L6 19z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.1)"/>
              <path className="flask-liquid" d="M7.5 17a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v.5a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-.5z" fill="#a7f3d0"/>
            </svg>
            <h2 className="lab-title-text">Account Recovery</h2>
            <p className="lab-sub-text">Don't worry, even scientists lose their keys sometimes.</p>
          </div>
        </div>

        <div className="preview-content-login">
          <Link to="/" className="auth-top-brand">
            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
          </Link>

          {!submitted ? (
            <>
              <div className="preview-header-login">
                <h1>Forgot Password?</h1>
                <p className="preview-text-login">Enter your email address and we'll send you a recovery link.</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="student@lab.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="action-area-login">
                  <button type="submit" className="start-action-btn-login" disabled={loading}>
                    {loading ? "Sending..." : "Recover Account"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="success-message-container">
              <div className="success-icon">📧</div>
              <h1>Check Your Email</h1>
              <p>We've sent a recovery link to <strong>{email}</strong>. Please check your inbox and follow the instructions.</p>
              <button 
                className="start-action-btn-login" 
                style={{ marginTop: '2rem' }}
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          )}

          <div className="login-footer">
            <p>Remember your password? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
