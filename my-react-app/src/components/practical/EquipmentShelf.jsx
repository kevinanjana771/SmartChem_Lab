import React from "react";
import EquipmentItem from "./EquipmentItem";
import "./EquipmentShelf.css";

const EquipmentShelf = ({ equipments }) => {
  return (
    <div className="equipment-shelf">
      <h3>Equipment Shelf</h3>

      <div className="equipment-list">
        {equipments.map((eq) => (
          <EquipmentItem key={eq.e_id} equipment={eq} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentShelf;
