import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Stage } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Subtle rotation animation in the shelf
  useFrame((state, delta) => {
    clonedScene.rotation.y += delta * 0.5;
  });

  return <primitive object={clonedScene} />;
}

const EquipmentModelPreview = ({ modelPath }) => {
  if (!modelPath) return <div className="no-model-placeholder">?</div>;

  return (
    <div className="model-preview-container">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4], fov: 35 }}
        gl={{ antialias: true }}
        style={{ width: "100%", height: "130px" }}
      >
        <Suspense fallback={null}>
          <Stage 
            intensity={0.4} 
            environment="city" 
            adjustCamera 
            center={{ precise: true }}
            shadows={false}
          >
            <Model url={modelPath} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EquipmentModelPreview;
