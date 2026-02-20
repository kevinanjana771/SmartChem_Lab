import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkplaceHeader from "../components/practical/WorkplaceHeader";
import LabCanvas from "../components/practical/LabCanvas";
import EquipmentShelf from "../components/practical/EquipmentShelf";
import FeedbackToast from "../components/practical/FeedbackToast";

import "./PracticalWorkplace.css";

const PracticalWorkplace = () => {
  const { id } = useParams();

  const [equipments, setEquipments] = useState([]);
  const [toast, setToast] = useState(null);

  // Load equipments from backend
  useEffect(() => {
    const fetchEquipments = async () => {
      const res = await fetch(
        `http://localhost:5001/api/practicals/${id}/equipments`
      );
      const data = await res.json();
      setEquipments(data);
    };

    fetchEquipments();
  }, [id]);

  return (
    <div className="workplace-page">
      {/* Header */}
      <WorkplaceHeader practicalName="Titration Practical" />

      {/* Toast Feedback */}
      {toast && (
        <FeedbackToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Canvas */}
      <LabCanvas
        setToast={setToast}
      />

      {/* Equipment Shelf */}
      <EquipmentShelf equipments={equipments} />
    </div>
  );
};

export default PracticalWorkplace;
