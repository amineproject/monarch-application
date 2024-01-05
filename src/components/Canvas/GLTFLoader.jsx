"use client"
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../../components/Canvas/Loader";


const GLTFLoader = ({gltfObject }) => {
    
  const computer = useGLTF("/Canvas/Clothes/Monsieur_sac3/scene.gltf");
  console.log(computer.animations);

/*
  useFrame((state, delta) => {
    // Vous pouvez ajuster la vitesse de rotation en modifiant la valeur de delta
    computer.scene.rotation.y += 520;
  }); */
     
  
  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor="black" />
      <spotLight
        position={[0, 1, 0]}
        angle={0.12}
        penumbra={0}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} />
      <primitive
        object={computer.scene}
        enableZoom
        scale={isMobile ? 3 : 1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({gltfObject}) => {
  const [isMobile, setIsMobile] = useState(false);


  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 5]}
      camera={{ position: [0, 100, 5], fov: 15 }} // Ajustez la position de la caméra et le champ de vision (fov)
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Retirez OrbitControls si vous ne voulez pas permettre le zoom */}
        <OrbitControls
           autoRotate={true}
           autoRotateSpeed={3}
          enableZoom={false}
          maxPolarAngle={Math.PI / 9}
          minPolarAngle={Math.PI / 2}
        />
        <GLTFLoader gltfObject={gltfObject} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;