import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Safetymethods.css';
import Footer from '../components/Footer';
import bi from '../images/safetymethod/boximage.png';

const Safetymethods = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    // 1. DATA ARRAY (The "Loop" Source)
    const hazards = [
        {
            name: "Poison Material",
            icon: "fa-skull-crossbones",
            desc: "Fatal if swallowed, inhaled, or in contact with skin."
        },
        {
            name: "Corrosive",
            icon: "fa-droplet",
            desc: "Causes severe skin burns and eye damage."
        },
        {
            name: "Flammable",
            icon: "fa-fire",
            desc: "Catches fire easily if exposed to ignition sources."
        },
        {
            name: "Explosive",
            icon: "fa-bomb",
            desc: "May explode under heat or shock."
        },
        {
            name: "Oxidiser",
            icon: "fa-bolt",
            desc: "Intensifies fire and may cause combustibles to explode."
        },
        {
            name: "Radioactive",
            icon: "fa-radiation",
            desc: "Emits ionizing radiation; hazardous to health."
        },
        {
            name: "Toxic",
            icon: "fa-skull",
            desc: "Harmful to health; may cause long-term effects."
        }
    ];

    // 2. SCROLL LOGIC
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -300,
                behavior: "smooth"
            });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 300,
                behavior: "smooth"
            });
        }
    };

    return (
        
        <div className="safety-methods">
            
          {/* Hero Section */}
          <section className="hero">
            
            <div className="container hero-grid">
                <div className="hero-content hero-stack">
                    <h1>
                        Safety is Our <br />
                        <span className="hero-title-accent">First Element</span>
                    </h1>
                    <p>
                        Conduct experiments with confidence. Our comprehensive digital safety protocols 
                        ensure you understand the risks before you begin.
                    </p>
                    <div className="hero-actions">
                        <a href="#checklist" className="btn btn-primary">Start Safety Check</a>
                        <a href="#hazards" className="btn btn-outline">GHS Symbols</a>
                    </div>
                </div>

                <div className="hero-visual">
                    <img 
                        src={bi}
                        alt="Digital Chemistry Lab" 
                    />
                    <div className="floating-card">
                        <div className="floating-icon">
                            <i className="fa-solid fa-shield-virus"></i>
                        </div>
                        <div>
                            <strong style={{ color: 'var(--primary-dark)', display: 'block' }}>
                                100% Safe
                            </strong>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                                Virtual Simulation Environment
                            </span>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* PPE Requirements */}
          <section className="ppe-section">
            <div className="container">
                <div className="section-header">
                    <h2>Mandatory Lab Gear</h2>
                    <p>
                        Before entering the digital wet-lab, equip your avatar with the following 
                        Personal Protective Equipment.
                    </p>
                </div>

                <div className="card-grid">
                    <div className="ppe-card">
                        <div className="ppe-icon">
                            <i className="fa-solid fa-glasses"></i>
                        </div>
                        <h3>Safety Goggles</h3>
                        <p>
                            Impact-resistant. Protects against chemical splashes 
                            and flying debris during reactions.
                        </p>
                    </div>

                    <div className="ppe-card">
                        <div className="ppe-icon">
                            <i className="fa-solid fa-user-nurse"></i>
                        </div>
                        <h3>Lab Coat</h3>
                        <p>
                            Cotton or flame-retardant. Must be fully buttoned 
                            to protect skin and clothing.
                        </p>
                    </div>

                    <div className="ppe-card">
                        <div className="ppe-icon">
                            <i className="fa-solid fa-mitten"></i>
                        </div>
                        <h3>Nitrile Gloves</h3>
                        <p>
                            Chemical resistant. Inspect for punctures. 
                            Change immediately if contamination occurs.
                        </p>
                    </div>

                    <div className="ppe-card">
                        <div className="ppe-icon">
                            <i className="fa-solid fa-socks"></i>
                        </div>
                        <h3>Closed-Toe Shoes</h3>
                        <p>
                            Leather or rubber. Essential to protect feet 
                            from dropped glassware and spills.
                        </p>
                    </div>
                </div>
            </div>
          </section>

          {/* Hazard Symbols (Slider Version) */}
          <section className="hazard-section" id="hazards">
            <div className="container">
                <div className="section-header">
                    <h2>Identify Chemical Hazards</h2>
                    <p>
                        Recognize these GHS (Globally Harmonized System) pictograms 
                        on all chemical reagent bottles.
                    </p>
                </div>

                <div className="hazard-slider-wrapper">
                    
                    <button className="slide-btn left" onClick={scrollLeft} aria-label="Scroll Left">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <div className="hazard-slider" ref={sliderRef}>
                        {/* 3. DYNAMIC LOOP RENDERING */}
                        {hazards.map((hazard, index) => (
                            <div className="hazard-item" key={index}>
                                <h3>{hazard.name}</h3>
                                <div className="diamond-icon">
                                    <i className={`fa-solid ${hazard.icon}`}></i>
                                </div>
                                <p className="hazard-desc">{hazard.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button className="slide-btn right" onClick={scrollRight} aria-label="Scroll Right">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                </div>
            </div>
          </section>

          {/* Pre-Lab Checklist */}
          <section className="checklist-section" id="checklist">
            <div className="container">
                <div className="checklist-wrapper">

                    <div className="checklist-text">
                        <h2>Pre-Experiment <br />Verification</h2>
                        <p>
                            Safety begins before the reaction starts. Complete this 
                            interactive checklist to unlock the experiment module.
                        </p>

                        <div className="checklist-stats">
                            <div className="checklist-stat">
                                <h3>5</h3>
                                <p>Steps to Safety</p>
                            </div>
                            <div className="checklist-stat">
                                <h3>100%</h3>
                                <p>Compliance Required</p>
                            </div>
                        </div>
                    </div>

                    <div className="checklist-container">

                        <div className="checklist-group">
                            <h3>
                                <i className="fa-solid fa-clipboard-check"></i> Preparation
                            </h3>
                            <div className="checklist-item">
                                <input type="checkbox" id="c1" />
                                <label htmlFor="c1">
                                    I have read the full experimental procedure.
                                </label>
                            </div>
                            <div className="checklist-item">
                                <input type="checkbox" id="c2" />
                                <label htmlFor="c2">
                                    I have located the Eye Wash & Safety Shower.
                                </label>
                            </div>
                        </div>

                        <div className="checklist-group">
                            <h3>
                                <i className="fa-solid fa-flask-vial"></i> Chemicals
                            </h3>
                            <div className="checklist-item">
                                <input type="checkbox" id="c3" />
                                <label htmlFor="c3">
                                    I have checked all bottle labels & hazards.
                                </label>
                            </div>
                            <div className="checklist-item">
                                <input type="checkbox" id="c4" />
                                <label htmlFor="c4">
                                    I know the correct waste disposal method.
                                </label>
                            </div>
                        </div>

                        <div className="checklist-cta">
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={() => alert('Safety Verified. Experiment Unlocked!')}
                            >
                                Verify & Start
                            </button>
                        </div>

                    </div>
                </div>
            </div>
          </section>

          {/* Emergency Section */}
          <section className="emergency-section">
            <div className="container">
                <div className="section-header emergency-header">
                    <h2>Emergency Response</h2>
                    <p>If a real-world or virtual accident occurs, follow these protocols.</p>
                </div>

                <div className="emergency-actions">

                    <div className="action-card">
                        <i className="fa-solid fa-eye-dropper"></i>
                        <h4>Eye Contamination</h4>
                        <p style={{ fontSize: '1.0rem', color: '#881337' }}>
                            Rinse in eyewash station for 15 minutes.
                        </p>
                    </div>

                    <div className="action-card">
                        <i className="fa-solid fa-fire-extinguisher"></i>
                        <h4>Fire Outbreak</h4>
                        <p style={{ fontSize: '1.0rem', color: '#881337' }}>
                            Evacuate immediately. Pull alarm.
                        </p>
                    </div>

                    <div className="action-card">
                        <i className="fa-solid fa-house-medical"></i>
                        <h4>Spill Response</h4>
                        <p style={{ fontSize: '1.0rem', color: '#881337' }}>
                            Alert supervisor. Do not touch spill.
                        </p>
                    </div>

                </div>
            </div>
          </section>

          <Footer />

        </div>
    );
};

export default Safetymethods;