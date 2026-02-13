import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Safetymethods.css';
import Footer from '../components/Footer';

const Safetymethods = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

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
                <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                    <h1>
                        Safety is Our <br />
                        <span style={{ color: 'var(--primary)' }}>First Element</span>
                    </h1>
                    <p>
                        Conduct experiments with confidence. Our comprehensive digital safety protocols 
                        ensure you understand the risks before you begin.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                        <a href="#checklist" className="btn btn-primary">Start Safety Check</a>
                        <a href="#hazards" className="btn btn-outline">GHS Symbols</a>
                    </div>
                </div>

                <div className="hero-visual">
                    <img 
                        src="https://picsum.photos/seed/greenc/600/450" 
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
                <div 
                    className="section-header" 
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
                >
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
                <div 
                    className="section-header" 
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
                >
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

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-fire"></i>
                            </div>
                            <span>Flammable</span>
                        </div>

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-skull-crossbones"></i>
                            </div>
                            <span>Toxic</span>
                        </div>

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-droplet"></i>
                            </div>
                            <span>Corrosive</span>
                        </div>

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-biohazard"></i>
                            </div>
                            <span>Health Hazard</span>
                        </div>

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-bolt"></i>
                            </div>
                            <span>Oxidizer</span>
                        </div>

                        <div className="hazard-item">
                            <div className="diamond-icon">
                                <i className="fa-solid fa-skull"></i>
                            </div>
                            <span>Environmental</span>
                        </div>

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

                        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>5</h3>
                                <p style={{ fontSize: '0.9rem' }}>Steps to Safety</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>100%</h3>
                                <p style={{ fontSize: '0.9rem' }}>Compliance Required</p>
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

                        <div style={{ marginTop: '25px', textAlign: 'right' }}>
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
                <div 
                    className="section-header" 
                    style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
                >
                    <h2 style={{ color: '#be123c' }}>Emergency Response</h2>
                    <p>If a real-world or virtual accident occurs, follow these protocols.</p>
                </div>

                <div className="emergency-actions">

                    <div className="action-card">
                        <i className="fa-solid fa-eye-dropper"></i>
                        <h4>Eye Contamination</h4>
                        <p style={{ fontSize: '0.85rem', color: '#881337' }}>
                            Rinse in eyewash station for 15 minutes.
                        </p>
                    </div>

                    <div className="action-card">
                        <i className="fa-solid fa-fire-extinguisher"></i>
                        <h4>Fire Outbreak</h4>
                        <p style={{ fontSize: '0.85rem', color: '#881337' }}>
                            Evacuate immediately. Pull alarm.
                        </p>
                    </div>

                    <div className="action-card">
                        <i className="fa-solid fa-house-medical"></i>
                        <h4>Spill Response</h4>
                        <p style={{ fontSize: '0.85rem', color: '#881337' }}>
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