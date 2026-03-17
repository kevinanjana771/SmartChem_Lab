import React from "react";
import "./ChemicalItem.css";

const ChemicalItem = ({ chemical }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("chemical", chemical.c_id);
  };

  return (
    <div
      className="chemical-item"
      draggable
      onDragStart={handleDragStart}
    >
      <img src={chemical.c_img} alt={chemical.c_name} />
      <p>{chemical.c_name}</p>
    </div>
  );
};

export default ChemicalItem;
