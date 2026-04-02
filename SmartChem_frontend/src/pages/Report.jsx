import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Report.css";
import Footer from '../components/Footer';
import ReportImg from '../images/report/report.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

/* ================= Feedback Card ================= */

const FeedbackCard = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <div className="feedback-text-section">
          <h2 className="feedback-heading"> Laboratory Performance Report</h2>
          <p className="feedback-message">
            Your engagement across practical completion,
            equipment exploration, and quiz performance shows
            steady learning progress.
          </p>

          {isLoggedIn ? (
            <div className="feedback-highlight">
              You are on the right path to becoming a Junior Chemist!
            </div>
          ) : (
            <button
              className="feedback-highlight"
              onClick={() => navigate('/login')}
            >
              Log in to view your progress
            </button>
          )}
        </div>

        <div className="feedback-image-section">
          <img src={ReportImg} alt="Chemistry Tracking" className="feedback-image" />
        </div>
      </div>
    </div>
  );
};

/* ================= Equipment Progress ================= */

const EquipmentProgress = ({ total, viewed }) => {
  const percentage = total > 0 ? Math.round((viewed / total) * 100) : 0;

  return (
    <div className="equipment-card">
      <h2 className="equipment-title">Equipment Progress</h2>

      <div
        className="circle"
        style={{
          background: `conic-gradient(#10b981 ${percentage}%, #e5e7eb ${percentage}% 100%)`,
        }}
      >
        <div className="circle-inner">
          <span className="percent">{percentage}%</span>
          <span className="label">Viewed</span>
        </div>
      </div>

      <div className="equipment-footer">
        {viewed} / {total} Viewed Equipment
      </div>
    </div>
  );
};

/* ================= Quiz Progress ================= */

const QuizProgressChart = ({ quizScoresData, totalPracticals }) => {

  const labels = Array.from({ length: totalPracticals }, (_, i) => i + 1);
  const scoreData = new Array(totalPracticals).fill(0);

  quizScoresData.forEach(item => {
    const index = parseInt(item.p_id, 10) - 1;
    if (index >= 0 && index < totalPracticals) {
      scoreData[index] = parseFloat(item.chart_score ?? item.score);
    }
  });

  const data = {
    labels,
    datasets: [{
      label: "Quiz Score",
      data: scoreData,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.1,
      fill: true,
      spanGaps: true, // will connect lines across missed practicals
      pointRadius: 4,
      pointBackgroundColor: "#3b82f6",
    }],
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
        max: 12, // Ensure the chart scale spans 12
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
      legend: { display: false, },
    },
  };

  return (
    <div className="quiz-chart-card">
      <h2 className="quiz-title">Quiz Performance Progress</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

/* ================= Main Report ================= */

const Report = () => {
  const TOTAL_PRACTICALS_DEFAULT = 45;

  const [reportData, setReportData] = useState({
    equipment: { total: 68, viewed: 0 },
    completedPracticals: [],
    quizScores: [],
    totalPracticals: TOTAL_PRACTICALS_DEFAULT
  });

  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false); //controls the popup(modal) is visible
  const [resetLoading, setResetLoading] = useState(false);//shows "Resetting..." while API is running

  /* ===== Fetch Report ===== */
  const fetchReport = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user_id || user?.id;

      if (!userId) return setLoading(false);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${baseUrl}/reports/user/${userId}`);
      const data = await res.json();

      setReportData(prev => ({
        ...prev,
        totalPracticals: data.totalPracticals || prev.totalPracticals,
        equipment: data.equipment || prev.equipment,
        completedPracticals: (data.completedPracticals || []).map(Number),
        quizScores: data.quizScores || []
      }));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  /* ===== RESET FUNCTION ===== */
  const handleResetProgress = async () => {
    try {
      setResetLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user_id || user?.id;

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

      await fetch(`${baseUrl}/reports/reset/${userId}`, {
        method: "DELETE"
      });

      await fetchReport(); // refresh without reload

    } catch (err) {
      console.error(err);
    } finally {
      setResetLoading(false);
      setShowConfirm(false);
    }
  };

  const practicals = Array.from(
    { length: reportData.totalPracticals },
    (_, i) => i + 1
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="report-page">

      <FeedbackCard />

      <div className="report-flex">
        <div className="progress-container-card">
          <h2 className="progress-title">Completed Practicals</h2>

          <div className="bars-wrapper">
            {practicals.map(id => (
              <div
                key={id}
                className={`practical-bar ${reportData.completedPracticals.includes(id)
                  ? "completed"
                  : "not-completed"
                  }`}
              >
                Practical {id}
              </div>
            ))}
          </div>
        </div>

        <EquipmentProgress
          total={reportData.equipment.total}
          viewed={reportData.equipment.viewed}
        />
      </div>

      <QuizProgressChart
        quizScoresData={reportData.quizScores}
        totalPracticals={reportData.totalPracticals}
      />

      {/* ===== RESET BUTTON ===== */}
      <div className="reset-section">
        <button
          className="reset-btn"
          onClick={() => setShowConfirm(true)}
        >
          Reset Progress Results
        </button>
      </div>

      {/* ===== MODAL ===== */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Reset Progress Results</h3>
            <p>This will clear all your progress. Are you sure?</p>

            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={handleResetProgress}
                disabled={resetLoading}
              >
                {resetLoading ? "Resetting..." : "Yes"}
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Report;