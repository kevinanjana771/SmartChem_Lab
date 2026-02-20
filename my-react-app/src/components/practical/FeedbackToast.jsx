import React, { useEffect } from "react";
import "./FeedbackToast.css";

const FeedbackToast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default FeedbackToast;
