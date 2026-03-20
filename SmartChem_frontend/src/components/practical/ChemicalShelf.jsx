import React from "react";
import "./ChemicalShelf.css";

const ChemicalShelf = ({ chemicals }) => {
  if (!Array.isArray(chemicals)) return null;

  const handleDragStart = (e, chem) => {
    e.dataTransfer.setData("chemical", JSON.stringify(chem));
  };

  return (
    <div className="chemical-shelf">
      <h3>Chemicals</h3>
      <div className="chemical-list">
        {chemicals.map((c) => (
          <div
            key={c.c_id}
            className="chemical-item"
            draggable
            onDragStart={(e) => handleDragStart(e, c)}
          >
            {c.img && <img src={c.img} alt="" className="chem-icon" />}
            <span className="chem-name">{c.c_name || "Unnamed"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChemicalShelf;