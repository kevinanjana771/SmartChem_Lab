import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Report.css";
import Footer from '../components/Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ================= Feedback Card ================= */

const FeedbackCard = () => {
  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <h2 className="feedback-heading">🌟 Chemistry Insight Report</h2>
        <p className="feedback-message">
          Amazing progress! You’ve completed several practicals and are building
          strong laboratory skills. Keep reviewing Safety Methods and aim to
          improve your quiz scores to unlock your next achievement badge.
        </p>
        <div className="feedback-highlight">
          🚀 You are on the right path to becoming a Junior Chemist!
        </div>
      </div>
    </div>
  );
};

/* ================= Equipment Progress ================= */

const TOTAL_EQUIPMENT = 68;
const VIEWED_EQUIPMENT = 25;

const EquipmentProgress = () => {
  const percentage = Math.round(
    (VIEWED_EQUIPMENT / TOTAL_EQUIPMENT) * 100
  );

  return (
    <div className="equipment-card">
      <h2 className="equipment-title">Equipment Progress</h2>

      <div
        className="circle"
        style={{
          background: `conic-gradient(
            #10b981 ${percentage}%,
            #e5e7eb ${percentage}% 100%
          )`,
        }}
      >
        <div className="circle-inner">
          <span className="percent">{percentage}%</span>
          <span className="label">Viewed</span>
        </div>
      </div>

      <div className="equipment-footer">
        {VIEWED_EQUIPMENT} / {TOTAL_EQUIPMENT}  Viewed Equipment
      </div>
    </div>
  );
};

/* ================= Completed Practicals ================= */

const TOTAL_PRACTICALS = 45;

const completedPracticals = [
  1, 2, 3, 5, 6, 10, 11, 15,
  18, 20, 21, 25, 30, 31, 32, 40
];

// Example quiz scores (each between 0 and 10, multiples of 2)
const quizScores = [
  10, 8, 6, 4, 10, 8, 2, 6, 10, 8,
  6, 4, 10, 10, 8, 6, 2, 4, 8, 10,
  6, 8, 10, 4, 2, 6, 8, 10, 10, 8,
  6, 4, 10, 8, 6, 10, 2, 4, 8, 10,
  6, 8, 10, 4, 2
];

/*==================Quiz Progress=====================*/


const QuizProgressChart = () => {

  const labels = Array.from(
    { length: TOTAL_PRACTICALS }, 
    (_, i) => i + 1
);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quiz Score",
        data: quizScores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 10,
            right: 30,
            top: 20,
            bottom: 20,
        },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Practical Number",
        },
        ticks: {
          autoSkip: false,  //show all labels
        },
        grid: {
          display: false,
        },
      },


      y: {
        min: 0,
        max: 12,
        ticks: {
          stepSize: 2,
        },
        title: {
          display: true,
          text: "Marks",
        },
      },
    },
    
    plugins: {
      legend: { display: false,},
    },
  };

  return (
    <div className="quiz-chart-card">
      <h2 className="quiz-title">
        Quiz Performance Progress
      </h2>

        <div className="chart-wrapper">
            <Line data={data} options={options} />
        </div>
     
    </div>
  );
};

/* ================= Main Report ================= */

const Report = () => {
  const practicals = Array.from(
    { length: TOTAL_PRACTICALS },
    (_, i) => i + 1
  );

  return (
    <>
        {/* Top Section */}
        <FeedbackCard />

      {/* Bottom Row (SIDE-BY-SIDE WRAPPER) */}
      <div className="report-flex">

        {/* LEFT CARD */}
        <div className="progress-container-card">
          <h2 className="progress-title">Completed Practicals</h2>

          <div className="bars-wrapper">
            {practicals.map((id) => {
              const isCompleted = completedPracticals.includes(id);

              return (
                <div
                  key={id}
                  className={`practical-bar ${
                    isCompleted ? "completed" : "not-completed"
                  }`}
                >
                  Practical {id}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CARD */}
        <EquipmentProgress />
      </div>

        {/* Line Chart Below */}
        <QuizProgressChart />
    </>
  );
};
export default Report;