import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../images/landing/sdgp-logo.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const visualSideRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const otpRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleMouseMove = (e) => {
        if (!visualSideRef.current) return;
        const rect = visualSideRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        setMessage(`An OTP has been sent to ${email}`);
        setStep(2);
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 3) otpRefs[index + 1].current.focus();
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setError('');
        const otpCode = otp.join('');
        if (otpCode.length !== 4) {
            setError('Please enter the complete 4-digit OTP');
            return;
        }
        if (otpCode === '1234') {
            setMessage('Verification successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError('Invalid OTP. Please try again. (Hint: 1234)');
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="color-bend-bg"></div>
            <div className="practical-preview-signup">

                {/* Left Side */}
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
                        <div className="lock-icon-circle">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h2 className="lab-title-text">Secure Reset</h2>
                        <p className="lab-sub-text">Verify your identity to continue.</p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="preview-content-signup">
                    <Link to="/" className="auth-top-brand">
                        <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
                    </Link>

                    <div className="preview-header-signup">
                        <h1>Forgot Password?</h1>
                        <p className="preview-text">
                            {step === 1
                                ? "No worries, we'll send you reset instructions."
                                : `Enter the code sent to ${email}`}
                        </p>
                    </div>

                    {error && <div className="error-box">{error}</div>}
                    {message && <div className="success-box">{message}</div>}

                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="action-area-signup">
                                <button type="submit" className="start-action-btn-signup choice-btn">
                                    <span>Send Reset Code</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="login-form">
                            <div className="otp-container">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={otpRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        className="otp-input"
                                    />
                                ))}
                            </div>
                            <div className="action-area-signup">
                                <button type="submit" className="start-action-btn-signup choice-btn">
                                    <span>Verify & Proceed</span>
                                </button>
                            </div>
                            <div className="resend-otp">
                                <p>Didn't receive code? <button type="button" onClick={() => setMessage("Code resent!")}>Resend OTP</button></p>
                            </div>
                        </form>
                    )}

                    <div className="auth-divider"><span>or</span></div>

                    {/* Updated Create Account Button */}
                    <div className="action-area-create">
                        <button
                            type="button"
                            className="start-action-btn-create"
                            onClick={() => navigate('/Signup')}
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="login-footer">
                        <p>Remember it? <Link to="/login">Back to Login</Link></p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;