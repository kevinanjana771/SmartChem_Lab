import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './EquipmentPreview.css';
import Footer from '../components/Footer.jsx';

const EquipmentPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State to store equipment data (which now includes the 'parts' array)
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL matching your backend setup
    // Server runs on PORT 5001
    const apiUrl = `http://localhost:5001/api/equipment/${id}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch equipment data');
        }
        return response.json();
      })
      .then((data) => {
        // Data contains: { e_id, e_name, e_description, parts: [...] }
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Could not load equipment details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-container"><p>Loading...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!equipment) return <div className="error-container"><p>No equipment found.</p></div>;

  return (
    <motion.div
      className="equip-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Equipments</button>

      <div className="preview-layout">
        {/* Left: Image */}
        <div className="equip-img-section">
          <div className="img-wrapper">
            <img
              src={`https://via.placeholder.com/400x400/3b82f6/ffffff?text=${equipment.e_name}`}
              alt={equipment.e_name}
            />
            <button className="view-360-btn">360 View</button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="equip-info-section">
          <h1>{equipment.e_name}</h1>

          <p className="equip-desc">
            {equipment.e_description}
          </p>

          <div className="parts-list">
            <h3>Parts</h3>

            {/* Check if parts exist and map over the database data */}
            {equipment.parts && equipment.parts.length > 0 ? (
              equipment.parts.map((part, idx) => (
                <div key={idx} className="part-item">
                  <div className="part-name">{part.part_name}</div>
                  <div className="part-desc">{part.part_description}</div>
                </div>
              ))
            ) : (
              <p>No parts listed for this equipment.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default EquipmentPreview;