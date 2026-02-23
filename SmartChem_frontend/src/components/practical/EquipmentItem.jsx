import React from "react";
import "./EquipmentItem.css";

const EquipmentItem = ({ equipment }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("equipment", equipment.e_name.toLowerCase());
  };

  return (
    <div
      className="equipment-item"
      draggable
      onDragStart={handleDragStart}
    >
      <img src={equipment.img} alt={equipment.e_name} />
      <p>{equipment.e_name}</p>
    </div>
  );
};

export default EquipmentItem;
