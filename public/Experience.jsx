import { useEffect, useMemo, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import JSZip from 'jszip';

const Experience = ({ monarchLaboProps }) => {
  const [model, setModel] = useState(null);

  console.log("monarchLaboProps", monarchLaboProps)
  const GLTF_url = monarchLaboProps.GLTF_file.url;
  const zip_url = monarchLaboProps.ZIP_3D.url;
  const textureObject = monarchLaboProps.Texture_file;

  const loadGLTFFromZip = async (zipUrl) => {
    try {
      console.log("zipUrl", zipUrl)
      const response = await fetch(zipUrl);
      const arrayBuffer = await response.arrayBuffer();
  
      const zip = new JSZip();
      await zip.loadAsync(arrayBuffer);
  
      let gltfFile = null;
      let binFile = null;
      const textures = [];
  
      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          const file = zip.files[fileName];
          console.log("fileName", fileName)
          if (fileName === 'scene.gltf') {
            const content = await file.async('string');
            gltfFile = content;
            
          } else if (fileName.startsWith('textures/') && !file.dir) {
            const textureContent = await file.async('blob');
            textures.push({ name: fileName.split('/').pop(), content: textureContent });
            console.log("--------->", textureContent)
          } else if (fileName === "scene.bin") {
            const content = await file.async("string")
            binFile = content
          }
        })
      );
  
 

      // Vérifie si gltfFile est toujours null après l'extraction du ZIP
      if (gltfFile === null) {
        throw new Error('Le fichier scene.gltf n\'a pas été trouvé dans le ZIP.');
      }
  
      return { gltfFile, textures, binFile };
    } catch (error) {
      console.error('Erreur lors du chargement du fichier ZIP :', error);
      return null; // Retourne null en cas d'erreur
    }
  };
console.log("loadGLTFFromZip",)


useEffect((gltfFile, textures) => {
  const loadGLTFAndTextures = async () => {
      const loader = new GLTFLoader();

      loader.load(gltfFile, (gltf) => {
          setModel(gltf.scene);

          const texturePromises = [];

          textures.forEach((texture, index) => {
              const textureLoader = new THREE.TextureLoader();
              const texturePromise = new Promise((resolve) => {
                  textureLoader.load(texture, (loadedTexture) => {
                      applyTexture(gltf, loadedTexture, index);
                      resolve();
                  });
              });
              texturePromises.push(texturePromise);
          });

          Promise.all(texturePromises).then(() => {
              console.log("All textures applied.");
          });
      });
  };

  loadGLTFAndTextures();
}, [GLTF_url]);

const applyTexture = (gltf, texture, textureIndex) => {
  gltf.scene.traverse((node) => {
      if (node.isMesh) {
          // Assuming the textures array corresponds to different materials in the model
          if (node.material.map === null && textureIndex < node.material.length) {
              node.material[textureIndex].map = texture;
              node.material[textureIndex].needsUpdate = true;
          }
      }
  });
};


  const modifiedTexturesUrls = useMemo(() => {
    if (typeof textureObject === 'string') {
      return [textureObject];
    }

    return textureObject.map((urlObj) => {
      if (urlObj && urlObj.filename && urlObj.prefix) {
        return `https://monarch-application.s3.eu-west-3.amazonaws.com/${urlObj.prefix}${urlObj.filename}`;
      } else {
        return null;
      }
    }).filter(url => url !== null);
  }, [textureObject]);

  console.log("model", model)
  useEffect(() => {
    if (model ) {
      const textureLoader = new TextureLoader();
      const loadedTextures = modifiedTexturesUrls.map((url) => textureLoader.load(url));

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.map = loadedTextures[0]; // Utilisation de la première texture pour child
          child.material.needsUpdate = true;
        }
      });
    } else {
      console.log("Erreur lors de la configuration du matériau");
    }
  }, [model, modifiedTexturesUrls]);

  

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
