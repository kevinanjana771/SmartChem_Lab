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
            steady learning progress. Continue building on this 
            foundation to strengthen your chemistry knowledge and laboratory skills.
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
        {viewed} / {total}  Viewed Equipment
      </div>
    </div>
  );
};

/*==================Quiz Progress=====================*/

const QuizProgressChart = ({ quizScoresData, totalPracticals }) => {

  // We need to map `quizScoresData` mapping `p_id` to its score.
  // `quizScoresData` looks like: [{ p_id: 1, score: 8, total_questions: 10, chart_score: 8 }]
  const labels = Array.from(
    { length: totalPracticals },
    (_, i) => i + 1
  );

  // Initialize all scores to 0
  const scoreData = new Array(totalPracticals).fill(0);

  quizScoresData.forEach(item => {
    // p_id is 1-indexed. Array is 0-indexed.
    const practicalIndex = parseInt(item.p_id, 10) - 1;
    if (practicalIndex >= 0 && practicalIndex < totalPracticals) {
      // use chart_score or fallback to score
      const scoreValue = parseFloat(item.chart_score !== undefined ? item.chart_score : item.score);
      scoreData[practicalIndex] = scoreValue;
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quiz Score",
        data: scoreData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
        fill: true,
        spanGaps: true, // will connect lines across missed practicals
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
  const TOTAL_PRACTICALS_DEFAULT = 45;

  const [reportData, setReportData] = useState({
    equipment: { total: 68, viewed: 0 },
    completedPracticals: [],
    quizScores: [],
    totalPracticals: TOTAL_PRACTICALS_DEFAULT
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
        const userId = user?.user_id || user?.id;

        if (!userId) {
          setLoading(false);
          return; // Stay empty if the user is not logged in
        }

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
        const response = await fetch(`${baseUrl}/reports/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch report data");
        const data = await response.json();
        setReportData(prev => ({
          ...prev,
          totalPracticals: data.totalPracticals || prev.totalPracticals,
          equipment: data.equipment || prev.equipment,
          completedPracticals: (data.completedPracticals || []).map(id => Number(id)),
          quizScores: data.quizScores || []
        }));
      } catch (error) {
        console.error("Report fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const practicals = Array.from({ length: reportData.totalPracticals }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="report-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "white" }}>
        <h2>Loading Report...</h2>
      </div>
    );
  }

  return (
    <div className="report-page">
      <FeedbackCard />



      <div className="report-flex">
        <div className="progress-container-card">
          <h2 className="progress-title">Completed Practicals</h2>
          <div className="bars-wrapper">
            {practicals.map((id) => {
              const isCompleted = reportData.completedPracticals.includes(id);
              return (
                <div key={id} className={`practical-bar ${isCompleted ? "completed" : "not-completed"}`}>
                  Practical {id}
                </div>
              );
            })}
          </div>
        </div>

        <EquipmentProgress total={reportData.equipment.total} viewed={reportData.equipment.viewed} />
      </div>

      <QuizProgressChart quizScoresData={reportData.quizScores} totalPracticals={reportData.totalPracticals} />
      <Footer />
    </div>
  );
};

export default Report;