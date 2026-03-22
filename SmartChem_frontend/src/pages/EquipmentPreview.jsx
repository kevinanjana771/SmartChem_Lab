import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF, Html } from "@react-three/drei";
import './EquipmentPreview.css';
import Footer from '../components/Footer.jsx';

const DEFAULT_VIEWER_CAMERA_POSITION = [0, 1.5, 4];
const DEFAULT_VIEWER_CAMERA_TARGET = [0, 0, 0];
const MIN_VIEWER_DISTANCE = 2.5;
const MAX_VIEWER_DISTANCE = 10;

// --- 1. Configuration for Local Model Loading ---
const MODEL_FILES = import.meta.glob("/public/models/*.glb", {
  eager: true,
  query: "?url",
  import: "default"
});

const STORAGE_URL = "https://kwbuvntvutrihygxaxqo.supabase.co/storage/v1/object/public/equipments_image";

// --- 2. 3D Model Component ---
const GLBModel = ({ url, scale = 1 }) => {
  console.log("Loading GLB from URL:", url);
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) console.log("GLB Scene loaded successfully:", scene);
  }, [scene]);

  // CLONE the scene to avoid rendering issues when sharing across multiple Canvases
  const clonedScene = React.useMemo(() => {
    if (!scene) return null;
    return scene.clone();
  }, [scene]);

  if (!clonedScene) return null;

  return (
    <Center>
      <primitive object={clonedScene} scale={scale} />
    </Center>
  );
};

const ViewerScene = ({ url, scale, controlsRef }) => {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <GLBModel url={url} scale={scale} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        target={DEFAULT_VIEWER_CAMERA_TARGET}
        minDistance={MIN_VIEWER_DISTANCE}
        maxDistance={MAX_VIEWER_DISTANCE}
      />
    </>
  );
};

// --- 3. Main Equipment Component ---
const EquipmentPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for database data
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Modal
  const [showViewer, setShowViewer] = useState(false);
  const viewerControlsRef = useRef(null);
  const resetAnimationRef = useRef(null);

  // --- 4. Data Fetching (Database) ---
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    const API_URL = `${baseUrl}/equipment/${id}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch equipment data');
        }
        return response.json();
      })
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Could not load equipment details.");
        setLoading(false);
      });
  }, [id]);

  // --- 5. Helper to Resolve Model URL ---
  const modelFilename = equipment?.model_filename;

  // Find the matching key in MODEL_FILES that ends with the filename
  const modelKey = modelFilename
    ? Object.keys(MODEL_FILES).find(key => key.endsWith(`/${modelFilename}`))
    : null;

  const modelUrl = modelKey ? MODEL_FILES[modelKey] : null;
  const parsedModelScale = Number(equipment?.model_scale);
  const modelScale = Number.isFinite(parsedModelScale) ? parsedModelScale : 19;
  const previewImageUrl = equipment?.image
    ? `${STORAGE_URL}/${equipment.image}`
    : `https://via.placeholder.com/400x400/3b82f6/ffffff?text=${encodeURIComponent(equipment?.e_name || "Equipment")}`;

  const adjustViewerZoom = (direction) => {
    const controls = viewerControlsRef.current;

    if (!controls) return;

    const zoomFactor = direction === 'in' ? 0.8 : 1.2;
    const offset = controls.object.position.clone().sub(controls.target);
    const nextOffset = offset.multiplyScalar(zoomFactor);
    const nextDistance = nextOffset.length();

    if (nextDistance < MIN_VIEWER_DISTANCE) {
      nextOffset.setLength(MIN_VIEWER_DISTANCE);
    } else if (nextDistance > MAX_VIEWER_DISTANCE) {
      nextOffset.setLength(MAX_VIEWER_DISTANCE);
    }

    controls.object.position.copy(controls.target.clone().add(nextOffset));
    controls.update();
  };

  const resetViewer = () => {
    const controls = viewerControlsRef.current;

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

      controls.object.position.set(
        startPosition.x + (DEFAULT_VIEWER_CAMERA_POSITION[0] - startPosition.x) * easedProgress,
        startPosition.y + (DEFAULT_VIEWER_CAMERA_POSITION[1] - startPosition.y) * easedProgress,
        startPosition.z + (DEFAULT_VIEWER_CAMERA_POSITION[2] - startPosition.z) * easedProgress
      );
      controls.target.set(
        startTarget.x + (DEFAULT_VIEWER_CAMERA_TARGET[0] - startTarget.x) * easedProgress,
        startTarget.y + (DEFAULT_VIEWER_CAMERA_TARGET[1] - startTarget.y) * easedProgress,
        startTarget.z + (DEFAULT_VIEWER_CAMERA_TARGET[2] - startTarget.z) * easedProgress
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

  useEffect(() => {
    return () => {
      if (resetAnimationRef.current) {
        cancelAnimationFrame(resetAnimationRef.current);
      }
    };
  }, []);

  // --- 6. Render States ---
  if (loading) return <div className="loading-container"><p>Loading equipment details...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!equipment) return <div className="error-container"><p>No equipment found.</p></div>;

  return (
    <motion.div
      className="equip-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Equipments</button>

      <div className="preview-shell">
        <div className="preview-layout">
          {/* Left: 3D Model or Placeholder Image */}
          <div className="equip-img-section">
            <div className="img-wrapper">
              <img
                src={previewImageUrl}
                alt={equipment.e_name}
              />

              <button
                className="view-360-btn"
                onClick={() => modelUrl && setShowViewer(true)}
                disabled={!modelUrl}
                style={{ opacity: modelUrl ? 1 : 0.5, cursor: modelUrl ? 'pointer' : 'not-allowed' }}
              >
                {modelUrl ? "360 View" : "No 3D Model Available"}
              </button>
            </div>
          </div>

          {/* Right: Details from Database */}
          <div className="equip-info-section">
            <h1>{equipment.e_name}</h1>

            <p className="equip-desc">
              {equipment.e_description}
            </p>

            <div className="parts-list">
              <h3>Parts</h3>

              {equipment.parts && equipment.parts.length > 0 ? (
                equipment.parts.map((part, idx) => (
                  <div key={idx} className="part-item">
                    <div className="part-name">{part.part_name}</div>
                    <div className="part-desc">{part.part_description}</div>
                  </div>
                ))
              ) : (
                <p>No parts listed for this equipment.</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Fullscreen 3D Viewer Modal */}
      {showViewer && (
        <div className="viewer-modal" onClick={() => setShowViewer(false)}>
          <div className="viewer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-head">
              <h3>{equipment.e_name} 3D View</h3>
              <button className="viewer-close" onClick={() => setShowViewer(false)}>Close</button>
            </div>
            <div className="viewer-canvas-wrap">
              <div className="viewer-zoom-controls">
                <button
                  type="button"
                  className="viewer-zoom-btn viewer-reset-btn"
                  onClick={resetViewer}
                  aria-label="Reset view"
                  title="Reset view"
                >
                  <span className="viewer-zoom-icon viewer-reset-icon">⟲</span>
                </button>
                <button
                  type="button"
                  className="viewer-zoom-btn"
                  onClick={() => adjustViewerZoom('in')}
                >
                  <span className="viewer-zoom-icon viewer-zoom-icon-plus">+</span>
                </button>
                <button
                  type="button"
                  className="viewer-zoom-btn"
                  onClick={() => adjustViewerZoom('out')}
                >
                  <span className="viewer-zoom-icon viewer-zoom-icon-minus">-</span>
                </button>
              </div>
              <Canvas camera={{ position: DEFAULT_VIEWER_CAMERA_POSITION, fov: 50 }}>
                <ViewerScene
                  url={modelUrl}
                  scale={modelScale}
                  controlsRef={viewerControlsRef}
                />
              </Canvas>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EquipmentPreview;
