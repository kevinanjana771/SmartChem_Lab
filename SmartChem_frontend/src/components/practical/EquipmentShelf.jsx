import React from "react";
import EquipmentModelPreview from "./EquipmentModelPreview";
import "./EquipmentShelf.css";

const EquipmentShelf = ({ equipments }) => {
  if (!Array.isArray(equipments)) return null;

  const handleDragStart = (e, equipment) => {
    // Pass the data for the drop zone
    e.dataTransfer.setData("equipment", JSON.stringify(equipment));
    
    // Create a larger ghost image from the equipment's 2D representation
    if (equipment.img) {
      const ghost = new Image();
      ghost.src = equipment.img;
      // We don't scale it, so it appears at its natural size (usually larger than our card)
      e.dataTransfer.setDragImage(ghost, 48, 48);
    }
  };

  return (
    <div className="equipment-shelf">
      <h3>Inventory</h3>
      <p className="shelf-hint">Drag any item below</p>
      
      {equipments.length === 0 && <p className="no-items">Empty Shelf</p>}
      
      <div className="equipment-list">
        {equipments.map((eq) => (
          <div
            key={eq.e_id}
            className="equipment-item"
            draggable
            onDragStart={(e) => handleDragStart(e, eq)}
          >
            <div className="model-3d-wrapper">
              <EquipmentModelPreview
                modelPath={eq.model_filename ? `/models/${eq.model_filename}` : null}
              />
            </div>
            <p className="item-title">{eq.e_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentShelf;