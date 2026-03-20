import React, { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, DragControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import tableTextureImage from "../../images/workbench/Table-Texture.jpg";
import background360Image from "../../images/workbench/360background.jpg";
import "./LabCanvas.css";

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 2, 8);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 1, 0);
const MIN_CAMERA_DISTANCE = 4.5;
const MAX_CAMERA_DISTANCE = 14;

function SceneBackground() {
  const { scene } = useThree();
  const backgroundTexture = useTexture(background360Image);

  useEffect(() => {
    backgroundTexture.mapping = THREE.EquirectangularReflectionMapping;
    backgroundTexture.colorSpace = THREE.SRGBColorSpace;
    scene.background = backgroundTexture;
    scene.backgroundBlurriness = 0.0;
    scene.backgroundIntensity = 0.40;

    return () => {
      if (scene.background === backgroundTexture) {
        scene.background = null;
      }
      scene.backgroundBlurriness = 0;
      scene.backgroundIntensity = 1;
    };
  }, [backgroundTexture, scene]);

  return null;
}

function TableSurface() {
  const tableTexture = useTexture(tableTextureImage);

  useMemo(() => {
    tableTexture.wrapS = THREE.RepeatWrapping;
    tableTexture.wrapT = THREE.RepeatWrapping;
    tableTexture.repeat.set(2.5, 2.5);
    tableTexture.anisotropy = 8;
    tableTexture.colorSpace = THREE.SRGBColorSpace;
    tableTexture.needsUpdate = true;
  }, [tableTexture]);

  return (
    <group>
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <boxGeometry args={[12, 0.36, 12]} />
        <meshStandardMaterial map={tableTexture} color="#b8b8b8" />
      </mesh>
    </group>
  );
}

function TableGrid() {
  return (
    <gridHelper
      args={[12, 12, "#a3a3a3", "#dddddd"]}
      position={[0, 0.01, 0]}
      ref={(grid) => {
        if (!grid) return;

        const materials = Array.isArray(grid.material)
          ? grid.material
          : [grid.material];

        materials.forEach((material) => {
          material.transparent = true;
          material.opacity = 0.20;
          material.needsUpdate = true;
          material.depthWrite = false;
        });
      }}
    />
  );
}

function EquipmentModel({ id, model, initialPosition, onRemove, isSelected, onSelect }) {
  if (!model) return null;

  // Hooks must be called at the top level, never inside try/catch or if blocks
  const { scene } = useGLTF(`/models/${model}`);
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
                castShadow
                receiveShadow
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
}

const LabCanvas = ({ placedItems, setPlacedItems }) => {
  const [selectedId, setSelectedId] = useState(null);
  const controlsRef = useRef(null);
  const resetAnimationRef = useRef(null);

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

  const adjustZoom = (direction) => {
    const controls = controlsRef.current;

    if (!controls) return;

    const zoomFactor = direction === "in" ? 0.85 : 1.15;
    const offset = controls.object.position.clone().sub(controls.target);
    const nextOffset = offset.multiplyScalar(zoomFactor);
    const nextDistance = nextOffset.length();

    if (nextDistance < MIN_CAMERA_DISTANCE) {
      nextOffset.setLength(MIN_CAMERA_DISTANCE);
    } else if (nextDistance > MAX_CAMERA_DISTANCE) {
      nextOffset.setLength(MAX_CAMERA_DISTANCE);
    }

    controls.object.position.copy(controls.target.clone().add(nextOffset));
    controls.update();
  };

  const resetView = () => {
    const controls = controlsRef.current;

    if (!controls) return;

    if (resetAnimationRef.current) {
      cancelAnimationFrame(resetAnimationRef.current);
    }

    const startPosition = controls.object.position.clone();
    const startTarget = controls.target.clone();
    const duration = 450;
    const startTime = performance.now();

    const animateReset = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      controls.object.position.lerpVectors(
        startPosition,
        DEFAULT_CAMERA_POSITION,
        easedProgress
      );
      controls.target.lerpVectors(
        startTarget,
        DEFAULT_CAMERA_TARGET,
        easedProgress
      );
      controls.update();

      if (progress < 1) {
        resetAnimationRef.current = requestAnimationFrame(animateReset);
      } else {
        resetAnimationRef.current = null;
      }
    };

    resetAnimationRef.current = requestAnimationFrame(animateReset);
  };

  return (
    <div
      className="lab-canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="lab-zoom-controls">
        <button
          type="button"
          className="lab-zoom-btn lab-reset-btn"
          onClick={resetView}
          aria-label="Reset view"
          data-tooltip="Reset Camera View"
          title="Reset view"
        >
          <span className="lab-zoom-icon lab-reset-icon">⟲</span>
        </button>
        <button
          type="button"
          className="lab-zoom-btn"
          onClick={() => adjustZoom("in")}
          aria-label="Zoom in"
          data-tooltip="Zoom In"
        >
          <span className="lab-zoom-icon lab-zoom-icon-plus">+</span>
        </button>
        <button
          type="button"
          className="lab-zoom-btn"
          onClick={() => adjustZoom("out")}
          aria-label="Zoom out"
          data-tooltip="Zoom Out"
        >
          <span className="lab-zoom-icon lab-zoom-icon-minus">-</span>
        </button>
      </div>

      <Canvas
        shadows
        camera={{ position: DEFAULT_CAMERA_POSITION.toArray(), fov: 40 }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <color attach="background" args={["#ffffff"]} />
        <SceneBackground />
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          target={DEFAULT_CAMERA_TARGET.toArray()}
          minDistance={MIN_CAMERA_DISTANCE}
          maxDistance={MAX_CAMERA_DISTANCE}
        />

        <TableSurface />
        <TableGrid />

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
