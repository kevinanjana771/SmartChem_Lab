import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

import landingImage from "../images/landing/landing-image.png";
import landingKevin from "../images/landing/kevin.jpeg";
import landingAkinda from "../images/landing/akinda.jpg";
import landingNithika from "../images/landing/nithika.jpg";
import landingSamudi from "../images/landing/samudi.jpeg";
import landingNihara from "../images/landing/nihara.jpeg";
import landingThaaru from "../images/landing/thaaru.jpeg";



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

  const teamMembers = [
    {
      name: 'Kevin Anjana',
      role: 'Team Leader',
      image: landingKevin,
      bio: 'Undergraduate Software Engineer'
    },
    {
      name: 'Akinda Perera',
      role: 'Team Member',
      image: landingAkinda,
      bio: 'Undergraduate Software Engineer'
    },
    {
      name: 'Nithika Nimlaka',
      role: 'Team Member',
      image: landingNithika,
      bio: 'Undergraduate Software Engineer'
    },
    {
      name: 'Nihara Fernando',
      role: 'Team Member',
      image: landingNihara,
      bio: 'Undergraduate Software Engineer'
    },
    {
      name: 'Thaaru Perera',
      role: 'Team Member',
      image: landingThaaru,
      bio: 'Undergraduate Software Engineer'
    },
    {
      name: 'Samudi Supeshala',
      role: 'Team Member',
      image: landingSamudi,
      bio: 'Undergraduate Software Engineer'
    }
  ];

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">⚗</div>
            <span className="logo-text">SmartChem Lab</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
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
            <div className="stat-value green">42</div>
            <div className="stat-name">Practicals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value green">100+</div>
            <div className="stat-name">Equipments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value green">40+</div>
            <div className="stat-name">Safety Methods</div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="about">
        <h2 className="section-title dark">Meet Our Team</h2>
        <p className="section-subtitle dark">
          Our dedicated team of experts brings together chemistry education, technology innovation, and student success.
        </p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">⚗</div>
              <span className="logo-text">SmartChem Lab</span>
            </div>
            <p className="footer-description">
              Empowering students with cutting-edge digital chemistry labs for practical mastery.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#practicals">Practicals</a></li>
                <li><a href="#safety">Safety Guide</a></li>
                <li><a href="#equipment">Equipment</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faqs">FAQs</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 SmartChem Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );


}