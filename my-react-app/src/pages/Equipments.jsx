import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Equipments.css";
import Footer from "../components/Footer";


const Equipments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  // Replace with your actual Project ID and Bucket Name
  const STORAGE_URL = "https://kwbuvntvutrihygxaxqo.supabase.co/storage/v1/object/public/equipments_image";

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
  
  fetch(`${baseUrl}/equipment`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch equipment");
      return res.json();
    })
    .then((data) => {
      const formattedData = data.map(item => {
        // Since 'img' is a JSON array in Supabase (e.g., ["drill.png"])
        // we check if it's an array and pick the first item [0]
        const fileName = Array.isArray(item.img) && item.img.length > 0 
          ? item.img[0] 
          : item.img; // Fallback if it's somehow just a string

        return {
          id: item.e_id,
          name: item.e_name,
          // Build the full public URL
          image: fileName 
            ? `${STORAGE_URL}/${fileName}` 
            : "https://via.placeholder.com/150?text=No+Image"
        };
      });
      setEquipmentList(formattedData);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Could not load equipment list.");
      setLoading(false);
    });
}, []);

  const filteredEquipments = equipmentList.filter((eq) =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-container"><p>Loading equipments...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;

  return (
    <motion.div className="equipments-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <div className="color-bend-bg"></div>

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

      <div className="equip-grid">
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((item) => (
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
          ))
        ) : (
          <p className="no-results">No equipment found matching your search.</p>
        )}
      </div>

      <Footer />
    </motion.div>
  );
};

export default Equipments;
