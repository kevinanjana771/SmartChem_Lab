import React, { Suspense, useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, DragControls } from "@react-three/drei";
import * as THREE from "three";
import "./LabCanvas.css";

function EquipmentModel({ model, initialPosition }) {
  if (!model) return null;

  try {
    const { scene } = useGLTF(`/models/${model}`);
    
    // We clone the scene so multiple instances of the same model can be added 
    const copiedScene = useMemo(() => scene.clone(), [scene]);
    
    const [scale, setScale] = useState(1);

    useEffect(() => {
      // Calculate properly sized bounding box once the scene is loaded
      const bbox = new THREE.Box3().setFromObject(copiedScene);
      const size = new THREE.Vector3();
      bbox.getSize(size);
      
      const maxDim = Math.max(size.x, size.y, size.z);
      // Adjust size to be approximately 1.5 units wide/tall/deep
      setScale(maxDim > 0 ? 1.5 / maxDim : 1);
    }, [copiedScene]);

    return (
      <DragControls autoTransform>
        <primitive object={copiedScene} position={initialPosition} scale={scale} />
      </DragControls>
    );
  } catch (error) {
    console.error(`Failed to load model: ${model}`, error);
    return null;
  }
}

const LabCanvas = ({ placedItems, setPlacedItems }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const equipmentData = e.dataTransfer.getData("equipment");
    if (!equipmentData) return;

    try {
      const equipment = JSON.parse(equipmentData);
      if (!equipment || !equipment.model_filename) return;

      setPlacedItems((prev) => [
        ...prev,
        {
          ...equipment,
          // Assign random initial position on the board
          position: [
            Math.random() * 4 - 2,
            0.5,
            Math.random() * 4 - 2,
          ],
          uuid: Math.random().toString(36).substring(7),
        },
      ]);
    } catch (err) {
      console.error("Error parsing dropped equipment:", err);
    }
  };

  return (
    <div
      className="lab-canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <OrbitControls makeDefault />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#e3e3e3" />
        </mesh>
        <gridHelper args={[20, 20, "#888888", "#cccccc"]} position={[0, 0.01, 0]} />
        <Suspense fallback={null}>
          {placedItems.map((item, i) =>
            item.model_filename ? (
              <EquipmentModel
                key={item.uuid || i}
                model={item.model_filename}
                initialPosition={item.position || [0, 0, 0]}
              />
            ) : null
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LabCanvas;