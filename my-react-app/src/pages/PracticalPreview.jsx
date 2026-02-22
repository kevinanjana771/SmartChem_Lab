import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import './PracticalPreview.css';
import Footer from '../components/Footer';

const PracticalPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for Practical details (from 'practical' table)
  const [practical, setPractical] = useState(null);

  // State for Steps (from 'practical_steps' table)
  const [steps, setSteps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Main Practical Details from 'practical' table
        const practicalRes = await fetch(`http://localhost:5001/api/practicals/${id}`);
        if (!practicalRes.ok) throw new Error('Failed to fetch practical data');
        const practicalData = await practicalRes.json();
        setPractical(practicalData);

        // 2. Fetch Steps from 'practical_steps' table
        const stepsRes = await fetch(`http://localhost:5001/api/practicals/${id}/steps`);
        if (!stepsRes.ok) throw new Error('Failed to fetch steps');
        const stepsData = await stepsRes.json();
        setSteps(stepsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <motion.div
      className="practical-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="preview-header">
        {/* Header Data from 'practical' table */}
        <h1>{practical.p_lesson} {practical.p_name}</h1>
        <div className="tabs">
          <button className="tab active">About</button>
          <button className="tab">Equipments</button>
          <button className="tab">Lesson</button>
        </div>
      </div>

      <div className="preview-content">
        {/* Image from 'practical' table */}
        <div className="preview-image-section">
          <img
            src={practical.p_image || "https://via.placeholder.com/800x400/000000/FFFFFF?text=Lab+Setup"}
            alt="Experiment Setup"
            className="lab-main-img"
          />
        </div>

        <div className="preview-details">
          {/* Description from 'practical' table */}
          <p className="preview-text">
            {practical.p_description}
          </p>

          {/* --- STEPS SECTION (Data from 'practical_steps' table) --- */}
          {steps.length > 0 && (
            <div className="practical-steps-container">
              <h3 className="steps-title">Procedure Steps</h3>
              <div className="steps-list">
                {steps.map((step) => (
                  <div key={step.s_id} className="step-item">
                    {/* Circle with step_num */}
                    <div className="step-marker">{step.step_num}</div>

                    <div className="step-content">
                      <h4 className="step-heading">Step {step.step_num}</h4>
                      {/* s_description */}
                      <p className="step-desc">{step.s_description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* -------------------------------------------------------- */}

          <div className="action-area">
            <button className="start-action-btn secondary" onClick={() => navigate(`/quiz/${id}`)}>
              Start Quiz
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