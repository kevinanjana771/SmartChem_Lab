import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Dashboard.css";
import Footer from "../components/Footer";

import practicalImg1 from "../images/practical/p1.png";
import practicalImg2 from "../images/practical/p2.png";
import practicalImg3 from "../images/practical/p3.png";
import practicalImg4 from "../images/practical/p4.png";
import practicalImg5 from "../images/practical/p5.png";
// Placeholder images
const lessons = [
  {
    id: 1,
    title: "Introduction to Chemistry",
    lesson: "LESSON 2.4",
    image: practicalImg1,
  },
  {
    id: 2,
    title: "Salt Crystal Formation Cryptic",
    lesson: "LESSON 2.5",
    image: practicalImg2,
  },
  {
    id: 3,
    title: "Ester Preparation Experiment",
    lesson: "LESSON 2.6",
    image: practicalImg3,
  },
  {
    id: 4,
    title: "Ester Preparation Experiment",
    lesson: "LESSON 2.7",
    image: practicalImg4,
  },
];

const progressData = [
  {
    label: "Total Practicals",
    value: "12/35",
    percentage: 34,
    color: "#10b981",
  },
  {
    label: "Equipments",
    value: "22/50",
    percentage: 44,
    color: "#3b82f6",
  },
  {
    label: "Safety",
    value: "10/40",
    percentage: 25,
    color: "#f59e0b",
  },
  {
    label: "Quizzes",
    value: "80%",
    percentage: 80,
    color: "#ef4444",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  // CLICK SPARK ANIMATION
  const handleSpark = (e) => {
    const spark = document.createElement("span");
    spark.classList.add("spark");
    const x = e.clientX;
    const y = e.clientY;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 1000);
  };

  return (
    <motion.div className="dashboard-wrapper" onClick={handleSpark}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}>
      <div className="dashboard">
        
        {/* Practices Section */}
        <section className="dashboard-section glass-panel">
          <div className="section-header">
            <h3>Practices</h3>
            <Link to="/practicals" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="card-grid">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="lesson-card glare-card"
                onClick={() => navigate(`/practicals/${lesson.id}`)}
              >
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="card-image"
                />
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
          <section className="dashboard-section learn-more glass-panel">
            <div className="section-header">
              <h3>Learn More</h3>
            </div>
            <div className="learn-grid">
              <div className="learn-card glare-card">
                <div className="learn-icon">🔬</div>
                <h4>Equipments</h4>
                <p>Master laboratory tools.</p>
                <button className="learn-btn" onClick={() => navigate("/equipments")}>
                  Learn Now
                </button>
              </div>
              <div className="learn-card glare-card">
                <div className="learn-icon">🧤</div>
                <h4>Safety Methods</h4>
                <p>Stay safe in the lab.</p>
                <button className="learn-btn" onClick={() => { navigate("/safetymethods")}}>
                  Learn Now
                </button>
              </div>
            </div>
          </section>

          {/* Progress */}
          <section className="dashboard-section progress-section glass-panel">
            <div className="section-header">
              <h3>Progress</h3>
            </div>
            <div className="progress-grid">
              {progressData.map((item, index) => (
                <div key={index} className="progress-item">
                  <div
                    className="progress-ring"
                    style={{
                      "--percentage": item.percentage,
                      "--color": item.color,
                    }}
                  >
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
      <Footer />  
    </motion.div>
  );
};

export default Dashboard;