import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Practicals.css';
import Footer from '../components/Footer';

const courses = [
  { id: 1, title: 'Introduction to Chemistry in Advanced', lesson: 'LESSON 2.4', image: 'https://via.placeholder.com/300x200?text=Glassware' },
  { id: 2, title: 'Salt Crystal Formation Cryptic', lesson: 'LESSON 2.5', image: 'https://via.placeholder.com/300x200?text=Crystals' },
  { id: 3, title: 'Ester Preparation Experiment', lesson: 'LESSON 2.6', image: 'https://via.placeholder.com/300x200?text=Ester' },
  { id: 4, title: 'Titration Basics', lesson: 'LESSON 3.1', image: 'https://via.placeholder.com/300x200?text=Titration' },
  { id: 5, title: 'Acid Base Reactions', lesson: 'LESSON 3.2', image: 'https://via.placeholder.com/300x200?text=Acid' },
  { id: 6, title: 'Oxidation Reduction', lesson: 'LESSON 4.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 7, title: 'Oxidation Reduction', lesson: 'LESSON 4.1', image: 'https://via.placeholder.com/300x200?text=Redox' },

];

const Practicals = () => {
  const navigate = useNavigate();

  return (
    <div className="practicals-page">
      <div className="color-bend-bg"></div>
      <h2 className="page-header">Chemistry Practicals</h2>
      <div className="practicals-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-img" />
            <div className="course-body">
              <span className="course-badge">{course.lesson}</span>
              <h3>{course.title}</h3>
              <button 
                className="start-btn-lg" 
                onClick={() => navigate(`/practicals/${course.id}`)}
              >
                START NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    <Footer />
    </div>
  );
};

export default Practicals;