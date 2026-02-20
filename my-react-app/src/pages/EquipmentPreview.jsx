import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF, Html } from "@react-three/drei";
import './EquipmentPreview.css';
import Footer from '../components/Footer.jsx';

// --- 1. Configuration for Local Model Loading ---
const MODEL_FILES = import.meta.glob("/src/images/models/*.glb", {
  eager: true,
  query: "?url",
  import: "default"
});

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
  const modelScale = equipment?.model_scale || 1;

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

      <div className="preview-layout">
        {/* Left: 3D Model or Placeholder Image */}
        <div className="equip-img-section">
          <div className="img-wrapper">
            {modelUrl ? (
              // If DB has a valid filename and file exists locally
              <div className="inline-model-box">
                <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} />
                  <Suspense fallback={<Html center>Loading 3D...</Html>}>
                    <GLBModel url={modelUrl} scale={19} />
                    <Environment preset="city" />
                  </Suspense>
                  <OrbitControls enableZoom={false} enableDamping />
                </Canvas>
              </div>
            ) : (
              // Fallback if no model is linked
              <img
                src={equipment.image || `https://via.placeholder.com/400x400/3b82f6/ffffff?text=${encodeURIComponent(equipment.e_name)}`}
                alt={equipment.e_name}
              />
            )}

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

      {/* Fullscreen 3D Viewer Modal */}
      {showViewer && (
        <div className="viewer-modal" onClick={() => setShowViewer(false)}>
          <div className="viewer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-head">
              <h3>{equipment.e_name} 3D View</h3>
              <button className="viewer-close" onClick={() => setShowViewer(false)}>Close</button>
            </div>
            <div className="viewer-canvas-wrap">
              <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
                <ambientLight intensity={0.85} />
                <directionalLight position={[3, 5, 2]} intensity={1} />
                <Suspense fallback={null}>
                  <GLBModel url={modelUrl} scale={19} />
                  <Environment preset="city" />
                </Suspense>
                <OrbitControls enableDamping />
              </Canvas>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </motion.div>
  );
};

export default EquipmentPreview;
