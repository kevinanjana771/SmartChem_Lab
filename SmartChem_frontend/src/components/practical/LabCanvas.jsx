import React, { Suspense, useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, DragControls, Html } from "@react-three/drei";
import * as THREE from "three";
import "./LabCanvas.css";

function EquipmentModel({ id, model, initialPosition, onRemove, isSelected, onSelect }) {
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
      <group position={initialPosition}>
        <DragControls 
          autoTransform 
          axisLock="z" 
          dragLimits={{
            minX: 0,
            minY: 0,
            minZ: 0,
            maxZ: 0
          }}
        >
          <group>
            {isSelected && (
              <Html position={[0.6, 0.6, 0]} center style={{ pointerEvents: 'auto' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemove(id);
                  }}
                  style={{
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(255, 77, 79, 0.4)",
                    transition: "all 0.15s ease",
                    transform: "scale(1)"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  title="Click to remove"
                >
                  &times;
                </button>
              </Html>
            )}
            <primitive 
              object={copiedScene} 
              scale={scale} 
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            />
          </group>
        </DragControls>
      </group>
    );
  } catch (error) {
    console.error(`Failed to load model: ${model}`, error);
    return null;
  }
}

const LabCanvas = ({ placedItems, setPlacedItems }) => {
  const [selectedId, setSelectedId] = useState(null);

  const removeItem = (uuid) => {
    setPlacedItems(prev => prev.filter(item => item.uuid !== uuid));
    if (selectedId === uuid) setSelectedId(null);
  };
  
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
          // Assign initial entry point on the ground line (Y=0, Z=0)
          position: [
            Math.random() * 6 - 3, // Random X
            0, // Start exactly on the floor
            0, // Locked to Z=0
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
      <Canvas 
        camera={{ position: [5, 5, 5], fov: 50 }}
        onPointerMissed={() => setSelectedId(null)}
      >
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
                id={item.uuid}
                model={item.model_filename}
                onRemove={removeItem}
                isSelected={selectedId === item.uuid}
                onSelect={() => setSelectedId(item.uuid)}
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