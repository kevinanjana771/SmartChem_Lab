import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PracticalPreview.css';

const PracticalPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="practical-preview">
      <div className="preview-header">
        <h1>LESSON 2.4 Introduction to Chemistry in Advanced</h1>
        <div className="tabs">
          <button className="tab active">About</button>
          <button className="tab">Equipments</button>
          <button className="tab">Lesson</button>
        </div>
      </div>

      <div className="preview-content">
        <div className="preview-image-section">
          {/* Using placeholder as per description of glassware */}
          <img 
            src="https://via.placeholder.com/800x400/000000/FFFFFF?text=Lab+Glassware+Setup" 
            alt="Experiment Setup" 
            className="lab-main-img" 
          />
        </div>

        <div className="preview-details">
          <p className="preview-text">
            In this lesson, you will learn the fundamental operations of a chemistry laboratory. 
            We will cover the usage of conical flasks, beakers, and droppers for precise measurement and mixing.
            <br /><br />
            Ensure you have reviewed the safety guidelines before starting the simulation.
          </p>
          
          <div className="action-area">
            <button className="start-action-btn" onClick={() => navigate(`/quiz/${id}`)}>
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalPreview;