import React from 'react';
import './Footer.css';
import logo from '../images/landing/sdgp-logo.png';

const Footer = () => {
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
            <p>© 2026 SmartChem Lab. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;