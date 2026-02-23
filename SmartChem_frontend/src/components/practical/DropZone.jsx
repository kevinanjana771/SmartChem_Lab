import React from "react";
import "./DropZone.css";

const DropZone = ({ id, label, onDrop }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("equipment");
    onDrop(item, id);
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
