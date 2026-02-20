import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import './PracticalPreview.css';
import Footer from '../components/Footer';

const PracticalPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold data, loading status, and errors
  const [practical, setPractical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchPractical = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch(`http://localhost:5001/api/practicals/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch practical data');
        }

        const data = await response.json();
        setPractical(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPractical();
  }, [id]);

  // Render Loading State
  if (loading) {
    return (
      <div className="practical-preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading Practical...</h2>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="practical-preview" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2 style={{ color: 'red' }}>Error: {error}</h2>
        <button onClick={() => window.location.reload()} className="start-action-btn">Retry</button>
      </div>
    );
  }

  // Render Content
  return (
    <motion.div
      className="practical-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="preview-header">
        {/* Dynamic Title using p_name */}
        <h1>{practical.p_lesson} {practical.p_name}</h1>
        <div className="tabs">
          <button className="tab active">About</button>
          <button className="tab">Equipments</button>
          <button className="tab">Lesson</button>
        </div>
      </div>

      <div className="preview-content">
        <div className="preview-image-section">
          {/* Dynamic Image using p_image, with fallback to placeholder */}
          <img
            src={practical.p_image || "https://via.placeholder.com/800x400/000000/FFFFFF?text=Lab+Glassware+Setup"}
            alt="Experiment Setup"
            className="lab-main-img"
          />
        </div>

        <div className="preview-details">
          {/* Dynamic Description using p_description */}
          <p className="preview-text">
            {practical.p_description}
          </p>

          <div className="action-area">
            <button className="start-action-btn" onClick={() => navigate(`/quiz/${id}`)}>
              Start Now
            </button>
            <button className="start-action-btn" onClick={() => navigate(`/practicals/${id}/workplace`)}>
              Start Simulation
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default PracticalPreview;