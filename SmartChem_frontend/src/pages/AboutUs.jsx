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

      {/* BACKGROUND HEADER */}
      <section ref={headerRef} className="about-header scroll-section">
        <div className="about-header-content">
          <h1 className="page-title">About SmartChem Lab</h1>
          <p className="page-subtitle">
            Background of Our Application
          </p>
          <p className="page-description">
            SmartChem Lab is a modern digital platform developed to bridge the gap between theoretical 
            understanding and practical application for Advanced Level Chemistry students in Sri Lanka. 
            By integrating advanced web technologies with interactive learning tools, the platform offers a safe, 
            immersive, and accessible virtual laboratory experience. Students can explore laboratory equipment in 
            detail, simulate experiments, and reinforce their knowledge through guided practice all without the 
            limitations of a traditional physical lab. SmartChem Lab aims to enhance conceptual clarity, promote 
            self-directed learning, and support academic excellence in chemistry education.
          </p>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="problem-solution-section">
        <div className="ps-container">
          
          {/* PROBLEM CARD - Slides from Left */}
          <div ref={problemRef} className="ps-card problem scroll-section">
            <div className="ps-header">
              <span className="ps-icon">⚠️</span>
              <h2 className="ps-title">Challenges in Traditional Chemistry Learning</h2>
            </div>
            <div className="ps-body">
              <p className="ps-text">
                Traditional chemistry education often faces limitations such as restricted laboratory 
                access, safety concerns, and insufficient practical exposure. These challenges hinder 
                students from fully understanding experimental procedures and developing confidence in 
                laboratory environments, ultimately affecting their academic performance and interest in 
                the subject.
              </p>
            </div>
          </div>
          
          {/* SOLUTION CARD - Slides from Right */}
          <div ref={solutionRef} className="ps-card solution scroll-section">
            <div className="ps-header">
              <span className="ps-icon">💡</span>
              <h2 className="ps-title">Our Innovative Solution</h2>
            </div>
            <div className="ps-body">
              <p className="ps-text">
                SmartChem Lab addresses these challenges by offering a comprehensive digital solution that 
                integrates virtual simulations, interactive learning modules, and guided experiment walkthroughs. 
                The platform empowers students to explore, practice, and revise laboratory concepts at their own 
                pace, enhancing both understanding and retention.
              </p>
            </div>
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