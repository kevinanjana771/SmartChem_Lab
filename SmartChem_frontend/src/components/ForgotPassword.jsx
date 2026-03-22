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
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleMouseMove = (e) => {
    if (!visualSideRef.current) return;
    const rect = visualSideRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setStep(2);
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length < 4) {
      alert('Please enter the 4-digit code');
      return;
    }
    setLoading(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1200));
    setStep(3);
    setLoading(false);
  };

  // Generate Molecules (New Premium Animation)
  const molecules = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 40 + 20;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * -20;
    
    return (
      <motion.div 
        key={i} 
        className="molecule-node" 
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * 0.3 + 0.1,
          background: `radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.4), rgba(6, 78, 59, 0.1))`
        }}
        animate={{
          x: [0, (Math.random() - 0.5) * 200, 0],
          y: [0, (Math.random() - 0.5) * 200, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <div className="molecule-core" />
        <div className="molecule-orbit" />
      </motion.div>
    );
  });

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
          <div className="particles">{molecules}</div>

          <div 
            className="center-icon"
            style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
          >
            <div className="flask-scanner" />
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

          {step === 1 && (
            <>
              <div className="preview-header-login">
                <h1>Recover Account</h1>
                <p className="preview-text-login">Enter your email to receive a 4-digit verification code.</p>
              </div>
              <form onSubmit={handleEmailSubmit} className="login-form">
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
                    {loading ? "Sending..." : "Send Code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="preview-header-login">
                <h1>Verify OTP</h1>
                <p className="preview-text-login">Enter the 4-digit code sent to your email.</p>
              </div>
              <form onSubmit={handleOtpSubmit} className="otp-form">
                <div className="otp-input-group">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={otpRefs[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="otp-box"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <div className="action-area-login">
                  <button type="submit" className="start-action-btn-login" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </div>
                <p className="resend-text">Didn't receive code? <span onClick={() => setStep(1)} className="resend-link">Try Again</span></p>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="success-message-container">
              <div className="success-icon">✅</div>
              <h1>Account Verified</h1>
              <p>Your identity has been confirmed. You can now reset your password.</p>
              <button 
                className="start-action-btn-login" 
                style={{ marginTop: '2rem' }}
                onClick={() => navigate('/login')}
              >
                Go to Reset
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
