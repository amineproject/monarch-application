"use client"

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../../components/Canvas/Loader";
import * as THREE from "three";

const Computers = ({ isMobile, lightIntensity }) => {
  const computer = useGLTF("/Canvas/Clothes/Rose/scene.gltf");
  console.log(computer.animations);

  // Ajustez les propriétés du matériau si nécessaire
  computer.scene.traverse((node) => {
    if (node.isMesh) {
      node.material.transparent = false; // Essayez avec true si nécessaire
      node.material.opacity = 1; // Essayez avec une valeur entre 0 et 1
      node.material.side = THREE.DoubleSide;
    }
  });

  return (
    <mesh>
   
      <pointLight intensity={100} position={[0, 0, 0]} />
      <ambientLight intensity={2} /> {/* Ajout de la lumière ambiante */}
      <primitive
        object={computer.scene}
        enableZoom
        scale={isMobile ? 3 : 1}
        position={[1, 0, 0]}
        rotation={[-2, 0, 6]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(1);

  const orbitControls = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    // Ajustez la valeur de zoom selon vos besoins
    const zoomLevel = 40;

    // Vérifiez si OrbitControls a été initialisé
    if (orbitControls.current) {
      // Réinitialisez la position de la caméra
      orbitControls.current.reset();

      // Accédez à la méthode de zoom et appliquez le zoom prédéfini
      orbitControls.current.target.set(0, 0, 0);
      orbitControls.current.update();
      orbitControls.current.zoomTo(zoomLevel, true);
    }
  }, [isMobile]);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 5]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ preserveDrawingBuffer: true }}

    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={orbitControls}
          enableZoom={true}
          maxPolarAngle={Math.PI / 9}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} lightIntensity={lightIntensity} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
