import React from "react";
import DropZone from "./DropZone";
import "./LabCanvas.css";

const LabCanvas = ({ setToast }) => {
  // Correct placements for titration
  const correctZones = {
    burette: "zone-burette",
    flask: "zone-flask",
  };

  const handleDrop = (item, zoneId) => {
    if (correctZones[item] === zoneId) {
      setToast({
        type: "success",
        message: `${item} placed correctly ✅`,
      });
    } else {
      setToast({
        type: "error",
        message: `Wrong placement ❌ Try again!`,
      });
    }
  };

  return (
    <div className="lab-canvas">
      <DropZone id="zone-burette" label="Place Burette Here" onDrop={handleDrop} />
      <DropZone id="zone-flask" label="Place Flask Here" onDrop={handleDrop} />
    </div>
  );
};

export default LabCanvas;
