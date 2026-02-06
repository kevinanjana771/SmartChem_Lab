import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css'; 


import landingKevin from "../images/landing/kevin.jpeg";
import landingAkinda from "../images/landing/akinda.jpg";
import landingNithika from "../images/landing/nithika.jpg";
import landingSamudi from "../images/landing/samudi.jpeg";
import landingNihara from "../images/landing/nihara.jpeg";
import landingThaaru from "../images/landing/thaaru.jpeg";


export default function AboutUs() {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Kevin Anjana', role: 'Team Leader', image: landingKevin, bio: 'Undergraduate Software Engineer' },
    { name: 'Akinda Perera', role: 'Team Member', image: landingAkinda, bio: 'Undergraduate Software Engineer' },
    { name: 'Nithika Nimlaka', role: 'Team Member', image: landingNithika, bio: 'Undergraduate Software Engineer' },
    { name: 'Nihara Fernando', role: 'Team Member', image: landingNihara, bio: 'Undergraduate Software Engineer' },
    { name: 'Thaaru Perera', role: 'Team Member', image: landingThaaru, bio: 'Undergraduate Software Engineer' },
    { name: 'Samudi Supeshala', role: 'Team Member', image: landingSamudi, bio: 'Undergraduate Software Engineer' }
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
            <li><a href="#" onClick={() => navigate('/')}>Home</a></li>
            <li><a href="#" className="active-link">About Us</a></li>
            <li><a href="#contact" onClick={() => navigate('/')}>Contact Us</a></li>
          </ul>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>Dashboard →</button>
        </div>
      </nav>

      {/* BACKGROUND HEADER */}
      <section className="about-header">
        <div className="about-header-content">
          <h1 className="page-title">About SmartChem Lab</h1>
          <p className="page-subtitle">
            Background of Our Application
          </p>
          <p className="page-description">
            SmartChem Lab was designed to bridge the gap between theoretical knowledge and practical application 
            for Advanced Level Chemistry students in Sri Lanka. By leveraging modern web technologies, we provide a 
            safe, interactive, and comprehensive environment where students can explore lab equipment, 
            practice experiments, and test their knowledge without the constraints of a physical laboratory.
          </p>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="problem-solution-section">
        <div className="ps-container">
          <div className="ps-card problem">
            <div className="ps-icon">⚠️</div>
            <h2 className="ps-title">1.3 Problem Statement</h2>
            <p className="ps-text">
              Sri Lankan A/L Chemistry students lack an accessible, interactive, and syllabus-aligned digital platform 
              that allows them to safely and effectively practice and understand chemistry experiments.
            </p>
          </div>
          
          <div className="ps-card solution">
            <div className="ps-icon">💡</div>
            <h2 className="ps-title">1.4 Proposed Solution</h2>
            <p className="ps-text">
              SmartChem Lab is the suggested solution, an application that is either mobile-based or web-based, which is 
              intended to support the learning of chemistry through virtual simulation, interactive theory modules, 
              guided experiment walkthroughs, and personalized feedback.
            </p>
            <p className="ps-note">
              The intention is not to entirely substitute the labs with virtual ones, but to supplement and make easier 
              the students’ understanding before and after the actual practice sessions.
            </p>
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-title dark">Platform Highlights</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">100</div>
            <div className="feature-text">Equipments</div>
          </div>
          <div className="feature-card">
            <div className="feature-number">42</div>
            <div className="feature-text">Practicals</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <div className="feature-text">MCQ Quiz</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <div className="feature-text">Past Paper Quiz</div>
          </div>
          <div className="feature-card highlight">
            <div className="feature-icon">🔄</div>
            <div className="feature-text">360° Equipment View</div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about">
        <h2 className="section-title dark">Meet Our Team</h2>
        <p className="section-subtitle dark">
          Our dedicated team of experts brings together chemistry education, technology innovation, and student success.
        </p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
                  <div className="team-image-container">
                    {member.image && (
                      <img src={member.image} alt={member.name} className="team-image" />
                    )}
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
                <li><a onClick={() => navigate('/')}>Home</a></li>
                <li><a onClick={() => navigate('/about')}>About Us</a></li>
                <li><a onClick={() => navigate('/')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Practicals</a></li>
                <li><a href="#">Safety Guide</a></li>
                <li><a href="#">Equipment</a></li>
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