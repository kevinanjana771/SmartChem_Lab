import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WorkplaceHeader.css";

const WorkplaceHeader = ({ practicalName }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="workplace-header">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>{practicalName}</h2>

      <button
        className="quiz-btn"
        onClick={() => navigate(`/quiz/${id}`)}
      >
        Go to Quiz →
      </button>
    </div>
  );
};

export default WorkplaceHeader;
