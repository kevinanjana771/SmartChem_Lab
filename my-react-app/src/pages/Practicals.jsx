import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './Practicals.css';
import Footer from '../components/Footer';

const courses = [
  { id: 1, title: 'Properties of Cathode Rays', lesson: 'LESSON 1.1', image: 'https://via.placeholder.com/300x200?text=Glassware' },
  { id: 2, title: 'Molecular and Ionic Shapes Using Models', lesson: 'LESSON 2.1', image: 'https://via.placeholder.com/300x200?text=Crystals' },
  { id: 3, title: 'Safe Handling of Glassware and Four-Beam Balance', lesson: 'LESSON 3.1', image: 'https://via.placeholder.com/300x200?text=Ester' },
  { id: 4, title: 'Preparation of Standard Solutions', lesson: 'LESSON 3.2', image: 'https://via.placeholder.com/300x200?text=Titration' },
  { id: 5, title: 'Determination of Molar Volume of a Gas', lesson: 'LESSON 4.1', image: 'https://via.placeholder.com/300x200?text=Acid' },
  { id: 6, title: 'Determination of the Relative Atomic Mass of Magnesium', lesson: 'LESSON 4.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 7, title: 'Enthalpy of Acid–Base Neutralisation', lesson: 'LESSON 5.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 8, title: 'Verification of Hess’s Law', lesson: 'LESSON 5.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 9, title: 'Reactions of s-Block Metals with Air, Water, and Acids', lesson: 'LESSON 6.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 10, title: 'Flame Tests for Metal Ions', lesson: 'LESSON 6.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 11, title: 'Identification of Common Anions', lesson: 'LESSON 6.3', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 12, title: 'Demonstration of Nitrogen in Air', lesson: 'LESSON 6.4', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 13, title: 'Identification of Halide Ions', lesson: 'LESSON 6.5', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 14, title: 'Standardisation of Thiosulphate Solution', lesson: 'LESSON 6.6', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 15, title: 'Identification of Ammonia and Ammonium Salts', lesson: 'LESSON 6.7', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 16, title: 'Solubility of s-Block Metal Salts', lesson: 'LESSON 6.7', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 17, title: 'Thermal Stability of s-Block Nitrates and Carbonates', lesson: 'LESSON 6.8', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 18, title: 'Colours of Aqueous Complex Ions', lesson: 'LESSON 6.9', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 19, title: 'Determination of Fe²⁺ Concentration Using KMnO₄', lesson: 'LESSON 6.10', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 20, title: 'Standardisation of KMnO₄ Using Oxalate', lesson: 'LESSON 6.11', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 21, title: 'Complex Formation of Cu²⁺, Ni²⁺, and Co²⁺', lesson: 'LESSON 6.12', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 22, title: 'Oxidation States of Manganese Compounds', lesson: 'LESSON 6.13', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 23, title: 'Identification of Transition Metal Ions (Ni²⁺, Fe²⁺, Fe³⁺, Cu²⁺, Cr³⁺)', lesson: 'LESSON 6.14 ', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 24, title: 'Reactions of Alkenes and Alkynes', lesson: 'LESSON 8.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 25, title: 'Properties of Alcohols', lesson: 'LESSON 9.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 26, title: 'Properties of Phenol', lesson: 'LESSON 9.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 27, title: 'Tests for Aldehydes and Ketones', lesson: 'LESSON 9.3', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 28, title: 'Properties of Carboxylic Acids', lesson: 'LESSON 9.4', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 29, title: 'Tests for Aniline', lesson: 'LESSON 10.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 30, title: 'Effect of Acid Concentration on Reaction Rate (Mg + Acid)', lesson: 'LESSON 11.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 31, title: 'Effect of Concentration on Reaction Rate (Na₂S₂O₃ + HNO₃)', lesson: 'LESSON 11.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 32, title: 'Order of Reaction with Respect to Fe³⁺', lesson: 'LESSON 11.3', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 33, title: 'Dynamic Equilibrium in Fe³⁺and SCN⁻ System', lesson: 'LESSON 12.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 34, title: 'Effect of Temperature on NO₂ and N₂O₄ Equilibrium', lesson: 'LESSON 12.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 35, title: 'pH Testing of Salt Solutions', lesson: 'LESSON 12.3', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 36, title: 'Acid–Base Titration Using Indicators', lesson: 'LESSON 12.4', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 37, title: 'Determination of Solubility Product of Ca(OH)₂', lesson: 'LESSON 12.5', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 38, title: 'Distribution of Ethanoic Acid Between Water and 2-butanol', lesson: 'LESSON 12.6', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 39, title: 'Electrochemical Series of Metals', lesson: 'LESSON 13.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 40, title: 'Preparation of Ag/AgCl Reference Electrode', lesson: 'LESSON 13.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 41, title: 'Laboratory Preparation of Soap', lesson: 'LESSON 14.1', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 42, title: 'Extraction of Essential Oils by Steam Distillation', lesson: 'LESSON 14.2', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 43, title: 'Preparation of Biodiesel', lesson: 'LESSON 14.3', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 44, title: 'Determination of Acetic Acid in Vinegar', lesson: 'LESSON 14.4', image: 'https://via.placeholder.com/300x200?text=Redox' },
  { id: 45, title: 'Determination of Dissolved Oxygen in Water', lesson: 'LESSON 14.5', image: 'https://via.placeholder.com/300x200?text=Redox' },

];

const Practicals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.lesson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="practicals-page"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}>
      
      <div className="search-bar">
          <input
            type="text"
            placeholder="Search practicals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      <h2 className="page-header">Chemistry Practicals</h2>
      <div className="practicals-grid">
        {filteredCourses.map((course) => (
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
    </motion.div>
  );
};

export default Practicals;