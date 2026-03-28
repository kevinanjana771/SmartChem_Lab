import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/landing/sdgp-logo.png';
import './AboutUs.css';

import landingKevin from "../images/landing/kevin.jpeg";
import landingAkinda from "../images/landing/akinda.jpg";
import landingNithika from "../images/landing/nithika.jpg";
import landingSamudi from "../images/landing/samudi.jpeg";
import landingNihara from "../images/landing/nihara.jpeg";
import landingThaaru from "../images/landing/thaaru.jpeg";
import Footer from '../components/Footer';

// Custom Hook for Scroll Animation
const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return ref;
};

export default function AboutUs() {
  const navigate = useNavigate();

  // Initialize refs
  const headerRef = useScrollAnimation();
  const problemRef = useScrollAnimation();
  const solutionRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const teamRef = useScrollAnimation();

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
            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><a href="#" onClick={() => navigate('/')}>Home</a></li>
            <li><a href="#" className="active-link">About Us</a></li>
            <li><a href="#contact" onClick={() => navigate('/')}>Contact Us</a></li>
          </ul>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>Dashboard →</button>
        </div>
      </nav>

      {/* 1. BACKGROUND SECTION - Zig Layout */}
      <section ref={headerRef} className="about-section scroll-section">
        <div className="section-content split">
          <div className="section-text">
            <h1 className="main-gradient-title">Our Scientific <span className="highlight-green">Journey</span></h1>
            <h3 className="sub-heading">Background of SmartChem</h3>
            <div className="premium-glass-card">
              <p>
                SmartChem Lab bridges the gap between theoretical understanding and practical 
                application for <strong>Advanced Level Chemistry students</strong>. Our digital platform offers 
                a safe, immersive experience that transcends the limitations of a physical laboratory.
              </p>
              <p>
                We aim to enhance conceptual clarity and promote self-directed learning, 
                supporting academic excellence in chemistry education.
              </p>
            </div>
          </div>
          <div className="section-visual">
             <div className="floating-orb chemistry">🧪</div>
             <div className="orbital-ring"></div>
          </div>
        </div>
      </section>

      {/* 2. CHALLENGE SECTION - Zag Layout */}
      <section ref={problemRef} className="about-section scroll-section alt-bg">
        <div className="section-content split reverse">
          <div className="section-visual">
             <div className="floating-orb alert">⚠️</div>
             <div className="orbital-ring red-ring"></div>
          </div>
          <div className="section-text">
            <h2 className="main-gradient-title red">The Challenge</h2>
            <h3 className="sub-heading">Traditional Learning Gaps</h3>
            <div className="premium-glass-card error-accent">
              <p>
                Traditional chemistry education often faces <strong>restricted laboratory access, 
                safety concerns, and insufficient practical exposure.</strong> These hurdles hinder 
                students from building confidence in laboratory environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION - Zig Layout */}
      <section ref={solutionRef} className="about-section scroll-section">
        <div className="section-content split">
          <div className="section-text">
            <h2 className="main-gradient-title green">The Solution</h2>
            <h3 className="sub-heading">Virtual Mastery</h3>
            <div className="premium-glass-card success-accent">
              <p>
                SmartChem Lab addresses these challenges by offering <strong>high-fidelity virtual 
                simulations</strong> and interactive learning modules. The platform empowers 
                students to explore, practice, and revise laboratory concepts at their own pace.
              </p>
            </div>
          </div>
          <div className="section-visual">
             <div className="floating-orb solution">💡</div>
             <div className="orbital-ring green-ring"></div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section ref={featuresRef} className="features-section scroll-section animate-children">
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
      <section ref={teamRef} className="about scroll-section animate-children">
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

      <Footer />
    </div>
  );
}