import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Equipments.css';

const equipmentList = [
  { id: 1, name: 'Balance', image: 'https://via.placeholder.com/150?text=Balance' },
  { id: 2, name: 'Volumetric Flask', image: 'https://via.placeholder.com/150?text=Flask' },
  { id: 3, name: 'Wash Bottle', image: 'https://via.placeholder.com/150?text=Bottle' },
  { id: 4, name: 'Watch Glass', image: 'https://via.placeholder.com/150?text=Glass' },
  { id: 5, name: 'Bunsen Burner', image: 'https://via.placeholder.com/150?text=Burner' },
  { id: 6, name: 'Test Tube', image: 'https://via.placeholder.com/150?text=Tube' },
  { id: 7, name: 'Pipette', image: 'https://via.placeholder.com/150?text=Pipette' },
  { id: 8, name: 'Mortar & Pestle', image: 'https://via.placeholder.com/150?text=Mortar' },
];

const Equipments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipments = equipmentList.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="equipments-page">
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
        {filteredEquipments.map((item) => (
          <div 
            key={item.id} 
            className="equip-card" 
            onClick={() => navigate(`/equipments/${item.id}`)}
          >
            <img src={item.image} alt={item.name} className="equip-img" />
            <p className="equip-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipments;