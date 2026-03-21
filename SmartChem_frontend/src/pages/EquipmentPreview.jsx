import React, { Suspense, useState, useEffect, useRef } from 'react';
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
        minDistance={2.5}
        maxDistance={10}
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
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Modal
  const [showViewer, setShowViewer] = useState(false);
  const [showBulkScaler, setShowBulkScaler] = useState(false);
  const [manualScale, setManualScale] = useState(1);
  const [savingScale, setSavingScale] = useState(false);
  const viewerControlsRef = useRef(null);

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
        setManualScale(data.model_scale || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Could not load equipment details.");
        setLoading(false);
      });

    // Fetch the full list to enable Next/Prev navigation
    fetch(`${baseUrl}/equipment`)
      .then(res => res.json())
      .then(data => setEquipmentList(data))
      .catch(err => console.error("Error fetching equipment list:", err));
  }, [id]);

  const currentIndex = equipmentList.findIndex(e => e.e_id === parseInt(id));
  const prevId = currentIndex > 0 ? equipmentList[currentIndex - 1].e_id : null;
  const nextId = currentIndex < equipmentList.length - 1 ? equipmentList[currentIndex + 1].e_id : null;

  const handleSaveScale = async () => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    const API_URL = `${baseUrl}/equipment/${id}/scale`;

    try {
      setSavingScale(true);
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model_scale: manualScale }),
      });

      if (!response.ok) throw new Error('Failed to save scale');
      
      alert("Scale saved successfully in database!");
    } catch (err) {
      console.error(err);
      alert("Error saving scale.");
    } finally {
      setSavingScale(false);
    }
  };

  const handleBulkUpdateScale = async (eqId, newScale) => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    const API_URL = `${baseUrl}/equipment/${eqId}/scale`;

    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model_scale: parseFloat(newScale) }),
      });

      if (!response.ok) throw new Error('Failed to update scale');
      
      // Update local state for immediate feedback
      setEquipmentList(prev => prev.map(eq => 
        eq.e_id === eqId ? { ...eq, model_scale: parseFloat(newScale) } : eq
      ));
      
      if (parseInt(id) === eqId) {
        setManualScale(parseFloat(newScale));
      }

    } catch (err) {
      console.error(err);
      alert(`Error updating scale for ID ${eqId}`);
    }
  };

  // --- 5. Helper to Resolve Model URL ---
  const modelFilename = equipment?.model_filename;

  // Find the matching key in MODEL_FILES that ends with the filename
  const modelKey = modelFilename
    ? Object.keys(MODEL_FILES).find(key => key.endsWith(`/${modelFilename}`))
    : null;

  const modelUrl = modelKey ? MODEL_FILES[modelKey] : null;
  const modelScale = equipment?.model_scale || 1;
  const previewImageUrl = equipment?.image
    ? `${STORAGE_URL}/${equipment.image}`
    : `https://via.placeholder.com/400x400/3b82f6/ffffff?text=${encodeURIComponent(equipment?.e_name || "Equipment")}`;

  const adjustViewerZoom = (direction) => {
    const controls = viewerControlsRef.current;

    if (!controls) return;

    const zoomFactor = direction === 'in' ? 0.8 : 1.2;
    const offset = controls.object.position.clone().sub(controls.target);
    const nextOffset = offset.multiplyScalar(zoomFactor);

    controls.object.position.copy(controls.target.clone().add(nextOffset));
    controls.update();
  };

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
      <div className="preview-nav-top">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Equipments</button>
        <div className="quick-nav">
          <button 
            disabled={!prevId} 
            onClick={() => navigate(`/equipment/${prevId}`)}
            className="nav-btn"
          >
            ← Previous
          </button>
          <span className="nav-index">{currentIndex + 1} / {equipmentList.length}</span>
          <button 
            disabled={!nextId} 
            onClick={() => navigate(`/equipment/${nextId}`)}
            className="nav-btn"
          >
            Next →
          </button>
        </div>
        <button 
          className={`bulk-scaler-toggle ${showBulkScaler ? 'active' : ''}`}
          onClick={() => setShowBulkScaler(!showBulkScaler)}
        >
          {showBulkScaler ? "Close Bulk Scaler" : "Open Bulk Scaler (68 Items)"}
        </button>
      </div>

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

        {/* Bulk Scaler Panel (New) */}
        {showBulkScaler && (
          <div className="bulk-scaler-panel">
            <div className="scaler-header">
              <h3>Equipment Scale Management - All 68 Items</h3>
              <span>Edit numbers directly to update database</span>
            </div>
            <div className="scaler-list">
              {equipmentList.map((eq) => (
                <div key={eq.e_id} className={`scaler-row ${parseInt(id) === eq.e_id ? 'active' : ''}`}>
                  <span className="sc-id">#{eq.e_id}</span>
                  <span className="sc-name" title={eq.e_name}>{eq.e_name}</span>
                  <div className="sc-input-group">
                    <input 
                      type="number" 
                      step="0.1"
                      defaultValue={eq.model_scale || 1}
                      onBlur={(e) => handleBulkUpdateScale(eq.e_id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleBulkUpdateScale(eq.e_id, e.target.value)}
                    />
                    <button onClick={() => navigate(`/equipment/${eq.e_id}`)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
              <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
                <ViewerScene
                  url={modelUrl}
                  scale={manualScale}
                  controlsRef={viewerControlsRef}
                />
              </Canvas>

              {/* Manual Scale Adjustment UI */}
              <div className="scale-adjustment-panel">
                <div className="scale-slider-wrap">
                  <label>Manual Scale: {manualScale.toFixed(2)}</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="50" 
                    step="0.1" 
                    value={manualScale} 
                    onChange={(e) => setManualScale(parseFloat(e.target.value))}
                    className="scale-range"
                  />
                </div>
                <button 
                  className="save-scale-btn" 
                  onClick={handleSaveScale}
                  disabled={savingScale}
                >
                  {savingScale ? "Saving..." : "Save to Database"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EquipmentPreview;
