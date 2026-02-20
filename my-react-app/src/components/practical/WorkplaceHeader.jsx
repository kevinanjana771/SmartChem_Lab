import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkplaceHeader.css";

const WorkplaceHeader = ({ practicalName }) => {
  const navigate = useNavigate();

  return (
    <div className="workplace-header">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>{practicalName}</h2>
    </div>
  );
};

export default WorkplaceHeader;
