import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Placeholder images - update paths as needed
const lessons = [
  { id: 1, title: 'Introduction to Chemistry', lesson: 'LESSON 2.4', image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Intro' },
  { id: 2, title: 'Salt Crystal Formation Cryptic', lesson: 'LESSON 2.5', image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Salt' },
  { id: 3, title: 'Ester Preparation Experiment', lesson: 'LESSON 2.6', image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Ester' },
];

const progressData = [
  { label: 'Total Practicals', value: '12/35', percentage: 34, color: '#10b981' },
  { label: 'Equipments', value: '22/50', percentage: 44, color: '#3b82f6' },
  { label: 'Safety', value: '10/40', percentage: 25, color: '#f59e0b' },
  { label: 'Quizzes', value: '80%', percentage: 80, color: '#ef4444' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Practices Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>Practices</h3>
          <span className="view-all">View All</span>
        </div>
        <div className="card-grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card" onClick={() => navigate(`/practicals/${lesson.id}`)}>
              <img src={lesson.image} alt={lesson.title} className="card-image" />
              <div className="card-content">
                <span className="lesson-tag">{lesson.lesson}</span>
                <h4>{lesson.title}</h4>
                <button className="start-btn-sm">Start</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More & Progress Split */}
      <div className="dashboard-split">
        {/* Learn More */}
        <section className="dashboard-section learn-more">
          <div className="section-header">
            <h3>Learn More</h3>
          </div>
          <div className="learn-grid">
            <div className="learn-card">
              <div className="learn-icon">🔬</div>
              <h4>Equipments</h4>
              <p>Master laboratory tools.</p>
              <button className="learn-btn" onClick={() => navigate('/equipments')}>Learn Now</button>
            </div>
            <div className="learn-card">
              <div className="learn-icon">🧤</div>
              <h4>Safety Methods</h4>
              <p>Stay safe in the lab.</p>
              <button className="learn-btn">Learn Now</button>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="dashboard-section progress-section">
          <div className="section-header">
            <h3>Progress</h3>
          </div>
          <div className="progress-grid">
            {progressData.map((item, index) => (
              <div key={index} className="progress-item">
                <div className="progress-ring" style={{ '--percentage': item.percentage, '--color': item.color }}>
                  <span className="progress-value">{item.percentage}%</span>
                </div>
                <div className="progress-info">
                  <h5>{item.label}</h5>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;