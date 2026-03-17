import React from "react";
import "./DropZone.css";

const DropZone = ({ id, label, onDrop }) => {

  const handleDrop = (e) => {
    e.preventDefault();

    const equipmentId = e.dataTransfer.getData("equipmentId");
    const chemicalId = e.dataTransfer.getData("chemicalId");

    if (equipmentId) {
      onDrop({ type: "equipment", id: equipmentId }, id);
    }

    if (chemicalId) {
      onDrop({ type: "chemical", id: chemicalId }, id);
    }

  };

  return (
    <div
      className="drop-zone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p>{label}</p>
    </div>
  );
};

export default DropZone;
