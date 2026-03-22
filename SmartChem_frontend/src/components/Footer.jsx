import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import logo from '../images/landing/sdgp-logo.png';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (path.startsWith('#')) {
      // If we're on the landing page, just scroll. Otherwise, go to landing with hash.
      if (window.location.pathname === '/') {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + path);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-brand">
            <div className="logo">
                <img src={logo} alt="SmartChem Lab Logo" className="logo-img" /> 
            </div>
            <p className="footer-description">
                Empowering students with cutting-edge digital chemistry labs for practical mastery.
            </p>
            </div>

            <div className="footer-links">
            <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                <li><a href="/" onClick={(e) => handleLinkClick(e, '/')}>Home</a></li>
                <li><a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                <li><a href="/practicals" onClick={(e) => handleLinkClick(e, '/practicals')}>Practicals</a></li>
                <li><a href="/safetymethods" onClick={(e) => handleLinkClick(e, '/safetymethods')}>Safety Guide</a></li>
                <li><a href="/equipments" onClick={(e) => handleLinkClick(e, '/equipments')}>Equipment</a></li>
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
            <p>© 2026 SmartChem Lab. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;