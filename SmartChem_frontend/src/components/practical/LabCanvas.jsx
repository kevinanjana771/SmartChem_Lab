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
    const [offsetY, setOffsetY] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);


    useEffect(() => {
      // Calculate properly sized bounding box once the scene is loaded
      const bbox = new THREE.Box3().setFromObject(copiedScene);
      const size = new THREE.Vector3();
      bbox.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      // Subtly reduce equipment size (target 2.8 units)
      const calculatedScale = maxDim > 0 ? 2.8 / maxDim : 1;
      setScale(calculatedScale);
      
      // Zero-offset calculation: Shift the mesh up so its floor-base is at Y=0
      setOffsetY(-bbox.min.y * calculatedScale);
    }, [copiedScene]);

    const handleRotateStart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const startX = e.clientX;
      const initialRotation = rotationY;

      const onPointerMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        setRotationY(initialRotation + deltaX * 0.02);
      };

      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const handleTiltStart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const startY = e.clientY;
      const initialRotation = rotationX;

      const onPointerMove = (moveEvent) => {
        const deltaY = moveEvent.clientY - startY;
        // Tilt sensitivity (X-axis)
        setRotationX(initialRotation + deltaY * 0.02);
      };

      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };


    return (
      <group position={initialPosition}>
        <DragControls 
          autoTransform 
          axisLock="z" 
          dragLimits={{
            minX: -6,
            maxX: 6,
            minY: offsetY, // Align floor limit with the model's physical base offset
            maxY: offsetY + 5,
            minZ: 0,
            maxZ: 0
          }}
        >
          <group position={[0, offsetY, 0]}>
            {isSelected && (
              <>
                {/* Rotate Button (Left) */}
                <Html position={[-0.7, 1.2, 0]} center style={{ pointerEvents: 'auto' }}>
                  <button
                    onPointerDown={handleRotateStart}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      cursor: "ew-resize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                      transition: "all 0.15s ease",
                      transform: "scale(1)"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="Drag left/right to rotate"
                  >
                    ↻
                  </button>
                </Html>

                {/* Tilt Button (Middle) */}
                <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'auto' }}>
                  <button
                    onPointerDown={handleTiltStart}
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      cursor: "ns-resize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                      transition: "all 0.15s ease",
                      transform: "scale(1)"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="Drag up/down to tilt (X-axis)"
                  >
                    ⇅
                  </button>
                </Html>

                {/* Delete Button (Right) */}
                <Html position={[0.7, 1.2, 0]} center style={{ pointerEvents: 'auto' }}>
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
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(255, 77, 79, 0.4)",
                      transition: "all 0.15s ease",
                      transform: "scale(1)"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="Click to remove"
                  >
                    &times;
                  </button>
                </Html>

              </>
            )}
            <group rotation={[0, rotationY, 0]}>
              <group rotation={[rotationX, 0, 0]}>
                <primitive 
                  object={copiedScene} 
                  scale={scale} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                />
              </group>
            </group>

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
          // Assign initial entry point on the wider micro floor surface
          position: [
            Math.random() * 8 - 4, // Horizontally spreads over an 8-unit width
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
        camera={{ position: [0, 2, 8], fov: 40 }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <OrbitControls makeDefault target={[0, 1, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#e3e3e3" />
        </mesh>
        <gridHelper args={[12, 12, "#888888", "#cccccc"]} position={[0, 0.01, 0]} />
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