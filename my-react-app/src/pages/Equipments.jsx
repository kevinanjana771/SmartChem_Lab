import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Equipments.css";
import Footer from "../components/Footer";

const equipmentList = [
  { id: 1, name: "Test Tube", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 2, name: "Boiling Tube", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 3, name: "Beakers", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 4, name: "Conical Flask/Erlenmeyer Flask", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 5, name: "Volumetric Flask", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 6, name: "Titration Flask", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 7, name: "Round Bottom Flask/Distillation Flask", image: "https://via.placeholder.com/150?text=Pipette" },
  { id: 8, name: "Reagent Bottle/Stoppered Bottles", image: "https://via.placeholder.com/150?text=Mortar" },
  { id: 9, name: "Glass Bottle with Cork", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 10, name: "Dissolved Oxygen Bottle", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 11, name: "Wash Bottle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 12, name: "Standard Funnel", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 13, name: "Separating Funnel", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 14, name: "Watch Glass", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 15, name: "Petri Dish", image: "https://via.placeholder.com/150?text=Pipette" },
  { id: 16, name: "Glass Rods", image: "https://via.placeholder.com/150?text=Mortar" },
  { id: 17, name: "Four-Beam Balance", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 18, name: "Three-Beam Balance", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 19, name: "Digital Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 20, name: "Top Pan Balance", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 21, name: "Measuring Cylinders", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 22, name: "Burettes", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 23, name: "Pipettes", image: "https://via.placeholder.com/150?text=Pipette" },
  { id: 24, name: "Micropipettes", image: "https://via.placeholder.com/150?text=Mortar" },
  { id: 25, name: "Droppers/ Pasture pipettes", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 26, name: "Thermometer", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 27, name: "Barometer", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 28, name: "Eudiometer", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 29, name: "Bunsen Burner", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 30, name: "Heating Mantle", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 31, name: "Steam Bath", image: "https://via.placeholder.com/150?text=Pipette" },
  { id: 32, name: "Water Bath", image: "https://via.placeholder.com/150?text=Mortar" },
  { id: 33, name: "Tripods", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 34, name: "Retort Stand", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 35, name: "Boiling Tube Champs", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 36, name: "Test Tube Rack", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 37, name: "Test Tube Holders", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 38, name: "Pair of Tongs", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 39, name: "Forceps", image: "https://via.placeholder.com/150?text=Pipette" },
  { id: 40, name: "Spatula", image: "https://via.placeholder.com/150?text=Mortar" },
];

const Equipments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipments = equipmentList.filter((eq) =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="equipments-page"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}>
      <div className="color-bend-bg"></div>
      {/* Header */}
      <div className="equip-header">
        <h2>Equipments</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="equip-grid">
        {filteredEquipments.map((item) => (
          <div
            key={item.id}
            className="equip-card"
            onClick={() => navigate(`/equipments/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="equip-img"
            />
            <p className="equip-name">{item.name}</p>
          </div>
        ))}
      </div>

      <Footer />
      
    </motion.div>
  );
};

export default Equipments;
