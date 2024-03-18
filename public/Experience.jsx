import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei';
import { useCustomContext } from '@/contexts/ContextCustomization';

const Experience = ({ monarchLaboProps }) => {
  const [model, setModel] = useState(null);

  const { isMonarchLab, setIsMonarchLab } = useCustomContext(); // Utiliser le hook useCustomContext
  
  console.log("isMonarchLab", isMonarchLab)

  const binFileUrl = monarchLaboProps.BIN_file.url
  const gltfFileUrl = monarchLaboProps.GLTF_file.url
  
  console.log("binFileUrl", binFileUrl)
  console.log("gltfFileUrl", gltfFileUrl)

  useEffect(() => {
    // Charger le modèle GLTF et le fichier bin associé
    const loader = new GLTFLoader();
    loader.load(
      gltfFileUrl,
      (gltf) => {
        setModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modèle GLTF', error);
      }
    );

    setIsMonarchLab(true)
  }, [gltfFileUrl]);

  return (
    <PresentationControls
      speed={1.5}
      global
      polar={[-0.6, Math.PI / 2]}
      rotation={[Math.PI / 8, Math.PI / 4, 0]}
    >
    
       <Stage environment={"dawn"} intensity={0.6} castShadow={true} adjustCamera >
            <pointLight intensity={10} position={[0, -4.3, 0]} />
            <mesh
                position={[0, -4.2, 0]}>
              {model && (
                <primitive 
                  object={model}
                  onUpdate={(self) => self.traverse((c) => (c.frustumCulled = false))}
                />
              )}
            </mesh>
            
      </Stage>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-4.2}>
                <planeGeometry args={[170, 170]}  />
                <MeshReflectorMaterial
                    opacity={0} // Définir l'opacité à 0.5 pour le matériau réflecteur
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={20}
                    roughness={3}
                    depthScale={2.2}
                    minDepthThreshold={0.1}
                    maxDepthThreshold={0.42}
                    color="#101010"
                    metalness={0.5}
                />
            </mesh>
    </PresentationControls>
  );
};

export default Experience;
