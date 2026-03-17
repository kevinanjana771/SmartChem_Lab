import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./LabCanvas.css";

function EquipmentModel({ model, position, scale }) {
  if (!model) return null;

  try {
    const { scene } = useGLTF(`/models/${model}`);
    return <primitive object={scene} position={position} scale={scale} />;
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

      // Load model temporarily to calculate bounding box for scale
      const gltf = useGLTF(`/models/${equipment.model_filename}`);
      const bbox = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      bbox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = maxDim > 0 ? 1 / maxDim : 1;

      setPlacedItems((prev) => [
        ...prev,
        {
          ...equipment,
          position: [
            Math.random() * 3 - 1.5,
            0,
            Math.random() * 3 - 1.5,
          ],
          scale: scaleFactor, // store calculated scale
        },
      ]);
    } catch {
      return;
    }
  };

  return (
    <div
      className="lab-canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <OrbitControls />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#e3e3e3" />
        </mesh>
        <Suspense fallback={null}>
          {placedItems.map((item, i) =>
            item.model_filename ? (
              <EquipmentModel
                key={i}
                model={item.model_filename}
                position={item.position}
                scale={item.scale || 1} // use stored scale
              />
            ) : null
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LabCanvas;