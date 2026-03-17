import React from "react";
import "./EquipmentShelf.css";

const EquipmentShelf = ({ equipments }) => {
  if (!Array.isArray(equipments)) return null;

  const handleDragStart = (e, equipment) => {
    e.dataTransfer.setData("equipment", JSON.stringify(equipment));
  };

  return (
    <div className="equipment-shelf">
      <h3>Equipment Shelf</h3>
      {equipments.length === 0 && <p>No equipment found</p>}
      {equipments.map((eq) => (
        <div
          key={eq.e_id}
          className="equipment-item"
          draggable
          onDragStart={(e) => handleDragStart(e, eq)}
        >
          {eq.img ? <img src={eq.img} alt={eq.e_name} /> : null}
          <p>{eq.e_name}</p>
        </div>
      ))}
    </div>
  );
};

export default EquipmentShelf;