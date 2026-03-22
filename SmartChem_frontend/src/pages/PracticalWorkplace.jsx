import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EquipmentShelf from "../components/practical/EquipmentShelf";
import ChemicalShelf from "../components/practical/ChemicalShelf";
import LabCanvas from "../components/practical/LabCanvas";
import WorkplaceHeader from "../components/practical/WorkplaceHeader";
import axios from "axios";
import "./PracticalWorkplace.css";

const PracticalWorkplace = () => {
  const { id } = useParams();
  const practicalId = id || 36;

  const [practical, setPractical] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [placedItems, setPlacedItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

        const [practicalRes, eqRes, chRes] = await Promise.all([
          axios.get(`${baseURL}/practicals/${practicalId}`),
          axios.get(`${baseURL}/practicals/${practicalId}/equipments`),
          axios.get(`${baseURL}/practicals/${practicalId}/chemicals`),
        ]);

        setPractical(practicalRes.data || null);
        setEquipments(Array.isArray(eqRes.data) ? eqRes.data : []);
        setChemicals(Array.isArray(chRes.data) ? chRes.data : []);
      } catch (error) {
        console.error("API error:", error);
        setEquipments([]);
        setChemicals([]);
      }
    };

    if (practicalId) {
      loadData();
    }
  }, [practicalId]);

  // Track Practical Completion (Simulation start)
  useEffect(() => {
    if (!practicalId) return;

    const userStr = localStorage.getItem("user");
    const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
    const userId = user?.user_id || user?.id;
    
    if (!userId) return;
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

    axios.post(`${baseURL}/practicals/${practicalId}/complete`, { user_id: userId })
      .catch(err => console.error("Error tracking practical complete:", err));
  }, [practicalId]);

  return (
    <div className="workplace-page">
      <WorkplaceHeader practicalName={practical?.p_name || "Practical"} />

      <div className="lab-layout">
        <EquipmentShelf equipments={equipments} />
        <div className="main-work-area">
          <LabCanvas placedItems={placedItems} setPlacedItems={setPlacedItems} />
          <ChemicalShelf chemicals={chemicals} />
        </div>
      </div>
    </div>
  );
};

export default PracticalWorkplace;