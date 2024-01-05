"use client"

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../../components/Canvas/Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/Canvas/Bag/bag.gltf");
  console.log(computer.animations);

  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor='white' />
      <spotLight
        position={[0, 10, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} />
      <primitive
        object={computer.scene}
        enableZoom
        scale={isMobile ? 3 : 1}
        position={[0, 0, 0]}
        rotation={[-0.01, -0.4, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
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
      camera={{ position: [0, 0, 2], fov: 15 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Retirez OrbitControls si vous ne voulez pas permettre le zoom */}
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={10}
          ref={orbitControls}
          enableZoom={false}
          maxPolarAngle={Math.PI / 9}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
