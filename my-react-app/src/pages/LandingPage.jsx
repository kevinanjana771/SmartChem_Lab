import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/landing/sdgp-logo.png";
import './LandingPage.css';

import landingImage from "../images/landing/landing-image.png";
import Footer from '../components/Footer';

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 4000;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target]);

  return <>{count}{suffix}</>;
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">

            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />


          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            {/* Updated: Click triggers navigation to About page */}
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
              >
                About Us
              </a>
            </li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>Dashboard →</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <h1 className="hero-title">
          Master Practical Skills With<br />Smart Digital Labs
        </h1>

        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-description">
              Covers all 42 A/L Chemistry practicals with clear guidance, interactive steps, and easy virtual learning.
            </p>
            <div className="stat-number">42+</div>
            <div className="stat-label">Practicals</div>
          </div>

          <div className="hero-center">
            <div className="hero-circle">
              <img
                src={landingImage}
                alt="Lab Scientist"
                className="hero-image"
              />
            </div>
          </div>

          <div className="hero-right">
            <p className="hero-description">
              Learn 100+ equipment, safety procedures, and correct handling through guided simulations.
            </p>
            <div className="stat-number">100+</div>
            <div className="stat-label">Lab Equipment</div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="achievements">
        <h2 className="section-title">Discover Your Lab Achievements</h2>
        <p className="section-subtitle">
          Track experiments completed, tools explored, and progress made in learning chemistry.
        </p>

        <div className="stats-container">
          <div className="stat-card">
            {/* UPDATED: Animated Counter */}
            <div className="stat-value green"><AnimatedCounter target={42} /></div>
            <div className="stat-name">Practicals</div>
          </div>
          <div className="stat-card">
            {/* UPDATED: Animated Counter */}
            <div className="stat-value green"><AnimatedCounter target={100} suffix="+" /></div>
            <div className="stat-name">Equipments</div>
          </div>
          <div className="stat-card">
            {/* UPDATED: Animated Counter */}
            <div className="stat-value green"><AnimatedCounter target={40} suffix="+" /></div>
            <div className="stat-name">Safety Methods</div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION REMOVED - MOVED TO AboutUs.jsx */}

      {/* CONTACT US SECTION */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-info">
            <h2 className="section-title dark">Get In Touch</h2>
            <p className="contact-description">
              Have questions about our SmartChem Lab? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@smartchemlab.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+94 76 647 1750</p>
                  <p>+94 76 011 1902</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you"
                  value={form.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}