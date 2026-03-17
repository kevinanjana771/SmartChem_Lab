import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/landing/sdgp-logo.png";
import './LandingPage.css';

import landingImage from "../images/landing/landing-image.png";
import Footer from '../components/Footer';

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; 
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * target));
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
  
  // Ref for the background canvas
  const canvasRef = useRef(null);

  // Animation refs for sections
  const [heroRef, heroVisible] = useScrollAnimation();
  const [featRef, featVisible] = useScrollAnimation();
  const [achieveRef, achieveVisible] = useScrollAnimation();
  const [processRef, processVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  // --- BACKGROUND ANIMATION LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.radius = 2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, 0.4)'; // Particle color
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    // Draw Lines between close particles
    const connectParticles = () => {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${1 - dist / maxDist})`; // Line color
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      {/* BACKGROUND CANVAS */}
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="SmartChem Lab Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
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
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
            Dashboard →
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero" ref={heroRef}>
        <h1 className={`hero-title ${heroVisible ? 'animate-fade-up' : ''}`}>
          Master Practical Skills With<br />Smart Digital Labs
        </h1>

        <div className={`hero-content ${heroVisible ? 'animate-fade-up delay-1' : ''}`}>
          <div className="hero-left">
            <p className="hero-description">
              Covers all 42 A/L Chemistry practicals with clear guidance, interactive steps, and easy virtual learning.
            </p>
            <div className="stat-badge">
                <div className="stat-number">42+</div>
                <div className="stat-label">Practicals</div>
            </div>
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
            <div className="stat-badge">
                <div className="stat-number">100+</div>
                <div className="stat-label">Lab Equipment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="achievements" ref={achieveRef}>
        <h2 className={`section-title ${achieveVisible ? 'animate-fade-up' : ''}`}>Discover Your Lab Achievements</h2>
        <p className={`section-subtitle ${achieveVisible ? 'animate-fade-up delay-1' : ''}`}>
          Track experiments completed, tools explored, and progress made in learning chemistry.
        </p>

        <div className="stats-container">
          <div className={`stat-card glass-card ${achieveVisible ? 'animate-fade-up' : ''}`}>
            <div className="stat-value green">
                {achieveVisible ? <AnimatedCounter target={42} /> : '0'}
            </div>
            <div className="stat-name">Practicals</div>
          </div>
          <div className={`stat-card glass-card delay-1 ${achieveVisible ? 'animate-fade-up' : ''}`}>
            <div className="stat-value green">
                {achieveVisible ? <AnimatedCounter target={100} suffix="+" /> : '0'}
            </div>
            <div className="stat-name">Equipments</div>
          </div>
          <div className={`stat-card glass-card delay-2 ${achieveVisible ? 'animate-fade-up' : ''}`}>
            <div className="stat-value green">
                {achieveVisible ? <AnimatedCounter target={40} suffix="+" /> : '0'}
            </div>
            <div className="stat-name">Safety Methods</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features-section" ref={featRef}>
        <div className="container">
            <h2 className={`section-title dark ${featVisible ? 'animate-fade-up' : ''}`}>
                Why Choose SmartChem?
            </h2>
            <p className={`section-subtitle dark ${featVisible ? 'animate-fade-up delay-1' : ''}`}>
                Revolutionizing chemistry education with immersive technology.
            </p>

            <div className="features-grid">
                <div className={`feature-card ${featVisible ? 'animate-scale-in' : ''}`}>
                    <div className="feature-icon">🧪</div>
                    <h3>Virtual Simulations</h3>
                    <p>Perform experiments in a risk-free virtual environment with realistic reactions and outcomes.</p>
                </div>
                <div className={`feature-card delay-1 ${featVisible ? 'animate-scale-in' : ''}`}>
                    <div className="feature-icon">📊</div>
                    <h3>Progress Tracking</h3>
                    <p>Monitor your learning journey with detailed analytics and performance reports.</p>
                </div>
                <div className={`feature-card delay-2 ${featVisible ? 'animate-scale-in' : ''}`}>
                    <div className="feature-icon">🧠</div>
                    <h3>Smart Quizzes</h3>
                    <p>Test your knowledge with AI-generated quizzes tailored to your syllabus.</p>
                </div>
            </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="process-section" ref={processRef}>
          <div className="container">
            <h2 className={`section-title dark ${processVisible ? 'animate-fade-up' : ''}`}>
                How It Works
            </h2>
            
            <div className="process-timeline">
                <div className={`process-step ${processVisible ? 'animate-slide-right' : ''}`}>
                    <div className="step-number">1</div>
                    <h3>Choose a Practical</h3>
                    <p>Select from a comprehensive list of A/L chemistry experiments.</p>
                </div>
                
                <div className="process-line"></div>

                <div className={`process-step delay-1 ${processVisible ? 'animate-slide-left' : ''}`}>
                    <div className="step-number">2</div>
                    <h3>Perform Simulation</h3>
                    <p>Follow guided steps to mix chemicals and use equipment virtually.</p>
                </div>

                <div className="process-line"></div>

                <div className={`process-step delay-2 ${processVisible ? 'animate-slide-right' : ''}`}>
                    <div className="step-number">3</div>
                    <h3>Analyze Results</h3>
                    <p>Get instant feedback and understand the science behind the reaction.</p>
                </div>
            </div>
          </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="contact" ref={contactRef}>
        <div className="contact-container">
          <div className={`contact-info ${contactVisible ? 'animate-fade-right' : ''}`}>
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

          <div className={`contact-form-container ${contactVisible ? 'animate-fade-left' : ''}`}>
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