import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Footer from '../components/Footer';

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz of Introduction to Chemistry in Advanced</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>Exit Quiz</button>
      </div>

      <div className="quiz-body">
        {/* Question 1 */}
        <div className="question-card">
          <h4 className="question-text">1. What is the primary function of a conical flask?</h4>
          <div className="options-grid">
            <div className="option correct">
              <span className="opt-check">✓</span>
              <span>To hold liquids and perform mixing/titration</span>
            </div>
            <div className="option">
              To measure precise volumes
            </div>
            <div className="option">
              To heat substances to high temperatures
            </div>
            <div className="option">
              To store acids only
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="question-card">
          <h4 className="question-text">2. Which equipment is best used to transfer small amounts of liquid?</h4>
          <div className="options-grid">
            <div className="option">
              Beaker
            </div>
            <div className="option correct">
              <span className="opt-check">✓</span>
              <span>Dropper</span>
            </div>
            <div className="option">
              Funnel
            </div>
            <div className="option">
              Test tube
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="question-card">
          <h4 className="question-text">3. Always wear safety goggles when handling chemicals.</h4>
          <div className="options-grid">
            <div className="option correct">
              <span className="opt-check">✓</span>
              <span>True</span>
            </div>
            <div className="option">
              False
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;