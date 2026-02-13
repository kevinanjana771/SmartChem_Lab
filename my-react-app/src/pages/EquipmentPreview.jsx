import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './EquipmentPreview.css';
import './Equipments.jsx';
import Footer from '../components/Footer.jsx';

const EquipmentPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams;

  const parts = [
    { name: 'Base / Frame', desc: 'Provides support and stability for the whole instrument.' },
    { name: 'Pan', desc: 'The platform where the object to be weighed is placed.' },
    { name: 'Four Beams', desc: 'Contains four beams with riders. Each beam measures a different weight range (e.g., 0-10g, 10-100g).' },
    { name: 'Pointer & Scale', desc: 'Indicates when the balance is at equilibrium (zero point).' },
  ];

  return (
    <motion.div className="equip-preview"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Equipments</button>
      
      <div className="preview-layout">
        {/* Left: Image */}
        <div className="equip-img-section">
          <div className="img-wrapper">
            <img 
              src="https://via.placeholder.com/400x400/3b82f6/ffffff?text=Four+Beam+Balance" 
              alt="Four Beam Balance" 
            />
            <button className="view-360-btn">360 View</button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="equip-info-section">
          <h1>Four Beam Balance</h1>
          <p className="equip-desc">
            A mechanical laboratory instrument used to measure mass by comparing an unknown mass to standard masses.
            It relies on a system of beams and riders (sliding weights) to determine the object's weight with high precision.
          </p>

          <div className="parts-list">
            <h3>Parts</h3>
            {parts.map((part, idx) => (
              <div key={idx} className="part-item">
                <div className="part-name">{part.name}</div>
                <div className="part-desc">{part.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default EquipmentPreview;