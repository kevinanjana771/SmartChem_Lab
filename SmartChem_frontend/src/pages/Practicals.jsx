import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './Practicals.css';
import Footer from '../components/Footer';

const Practicals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Like Equipments.jsx, fetching strictly from your database and Supabase bucket:
    const STORAGE_URL = "https://kwbuvntvutrihygxaxqo.supabase.co/storage/v1/object/public/practical_image";
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

    fetch(`${baseUrl}/practicals`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch practicals");
        return res.json();
      })
      .then((data) => {
        const formattedData = data.map(item => {
          let imageSrc = "https://via.placeholder.com/300x200?text=No+Image";

          if (item.p_image) {
            let fileName = item.p_image;

            // Handle if database string is a JSON array string like '["p1.png"]'
            if (typeof fileName === 'string' && fileName.startsWith('[')) {
              try {
                const parsed = JSON.parse(fileName);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  fileName = parsed[0];
                }
              } catch (e) {
                // Ignore parsing errors
              }
            } else if (Array.isArray(fileName) && fileName.length > 0) {
              fileName = fileName[0];
            }

            if (typeof fileName === 'string') {
              if (fileName.startsWith('http')) {
                imageSrc = fileName;
              } else if (fileName.length > 0) {
                // Remove extra quotes
                fileName = fileName.replace(/^"|"$/g, "");
                // Strictly use Supabase Bucket
                imageSrc = `${STORAGE_URL}/${fileName}`;
              }
            }
          }

          return {
            id: item.p_id,
            title: item.p_name || 'Chemistry Practical',
            lesson: item.p_lesson || 'Unknown Lesson',
            image: imageSrc
          };
        });
        setCourses(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load practicals from database.");
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course =>
    (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.lesson || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="practicals-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}>
      <div className="page-header-wrapper">
        <h2 className="page-header">Chemistry Practicals</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search practicals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="practicals-grid">
        {loading ? (
          <div className="loading-container" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>Loading practicals from database...</div>
        ) : error ? (
          <div className="error-container" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', padding: '50px' }}>No practicals found matching your search.</p>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Practicals;
