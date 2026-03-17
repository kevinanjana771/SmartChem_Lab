import React, { useEffect, useState } from "react";
import EquipmentShelf from "../components/practical/EquipmentShelf";
import ChemicalShelf from "../components/practical/ChemicalShelf";
import LabCanvas from "../components/practical/LabCanvas";
import WorkplaceHeader from "../components/practical/WorkplaceHeader";
import axios from "axios";
import "./PracticalWorkplace.css";

const PracticalWorkplace = () => {
  const practicalId = 36;

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

    loadData();
  }, []);

  return (
    <div className="workplace-page">
      <WorkplaceHeader practicalName={practical?.p_name || "Practical"} />

      <div className="lab-layout">
        <EquipmentShelf equipments={equipments} />
        <LabCanvas placedItems={placedItems} setPlacedItems={setPlacedItems} />
        <ChemicalShelf chemicals={chemicals} />
      </div>
    </div>
  );
};

export default PracticalWorkplace;