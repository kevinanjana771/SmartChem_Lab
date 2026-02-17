import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Equipments.css";
import Footer from "../components/Footer";

const equipmentList = [
  { id: 1, name: "Test Tube", image: "https://via.placeholder.com/150?text=Balance" },
  { id: 2, name: "Boiling Tube", image: "https://via.placeholder.com/150?text=Flask" },
  { id: 3, name: "Beaker", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 4, name: "Conical Flask/Erlenmeyer Flask", image: "https://via.placeholder.com/150?text=Glass" },
  { id: 5, name: "Volumetric Flask", image: "https://via.placeholder.com/150?text=Burner" },
  { id: 6, name: "Titration Flask", image: "https://via.placeholder.com/150?text=Tube" },
  { id: 7, name: "Flat Bottom Flask", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 8, name: "Round Botton Flask", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 9, name: "Distillation Flask", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 10, name: "Reagent bottle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 11, name: "Glass Bottle with Cork ", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 12, name: "DO Bottle(Dissolved Oxygen Bottle)", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 13, name: "Wash Bottle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 14, name: "Standard Funnel", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 15, name: "Buchner Funnel", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 16, name: "Seperating funnel", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 17, name: "Watch Glass", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 18, name: "Petri Dish", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 19, name: "Glass Rod", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 20, name: "Three-Beam Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 21, name: "Four-Beam Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 22, name: "Digital Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 23, name: "Chemical Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 24, name: "Electronic Chemical Balance", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 25, name: "Newton Meter", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 26, name: "Measuring Cylinder", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 27, name: "Burette", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 28, name: "Pipette", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 29, name: "Micropipette", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 30, name: "Dropper", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 31, name: "Pasture Pipette", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 32, name: "Thermometer", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 33, name: "Barometer", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 34, name: "Eudiometer", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 35, name: "Stopwatch", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 36, name: "Bunsen Burner", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 37, name: "Heating Mantle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 38, name: "Steam Bath", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 39, name: "Water Bath", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 40, name: "Ice Bath", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 41, name: "Magnetic Stire", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 42, name: "Cathode Ray Tube/Crookes Tube", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 43, name: "Liebig Condenser", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 44, name: "Tripod", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 45, name: "Clay Triangle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 46, name: "Retort Stand", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 47, name: "Boiling Tube Clamp", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 48, name: "Test Tube Clamp", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 49, name: "Test Tube Rack", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 50, name: "Test Tube Holder", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 51, name: "Pair of Tongs", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 52, name: "Forceps", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 53, name: "Spatula", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 54, name: "Delivery Tubes", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 55, name: "Rubber Tube", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 56, name: "Filter Papers", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 57, name: "Litmus Papers", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 58, name: "Motar and Pestle", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 59, name: "Crucible with Lid", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 60, name: "Corks", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 61, name: "Pipette Fillers", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 62, name: "Weight set", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 63, name: "Weighting Boat", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 64, name: "Calomel Electrode", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 65, name: "Graphite Rod", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 66, name: "Cobalt Glass", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 67, name: "White Porcelain Tile", image: "https://via.placeholder.com/150?text=Bottle" },
  { id: 68, name: "Safety Goggles", image: "https://via.placeholder.com/150?text=Bottle" },
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
