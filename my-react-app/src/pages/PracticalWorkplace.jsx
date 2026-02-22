import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkplaceHeader from "../components/practical/WorkplaceHeader";
import LabCanvas from "../components/practical/LabCanvas";
import EquipmentShelf from "../components/practical/EquipmentShelf";
import FeedbackToast from "../components/practical/FeedbackToast";

import "./PracticalWorkplace.css";

const PracticalWorkplace = () => {
  const { id } = useParams();
  const [practical, setPractical] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from backend
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      try {
        // Fetch practical info
        const practicalRes = await fetch(`${baseUrl}/practicals/${id}`);
        const practicalData = await practicalRes.json();
        setPractical(practicalData);

        // Fetch equipments for this practical
        const equipmentsRes = await fetch(`${baseUrl}/practicals/${id}/equipments`);
        const equipmentsData = await equipmentsRes.json();
        setEquipments(equipmentsData);
      } catch (error) {
        console.error("Error fetching workplace data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading-container"><p>Setting up your lab...</p></div>;

  return (
    <div className="workplace-page">
      {/* Header */}
      <WorkplaceHeader practicalName={practical?.p_name || "Simulation"} />

      {/* Toast Feedback */}
      {toast && (
        <FeedbackToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Canvas */}
      <LabCanvas setToast={setToast} />

      {/* Equipment Shelf */}
      <EquipmentShelf equipments={equipments} />
    </div>
  );
};

export default PracticalWorkplace;
