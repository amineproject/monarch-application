"use client"
import { motion } from "framer-motion"

import "../src/app/globals.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Configurator from "./Configurator";


function App({ monarchLaboProps }) {
  console.log("page.tsx -> Monarchlab/productId | LABORATOIRE ---> monarchLaboProps", monarchLaboProps)
  return (
        <motion.div
        initial={{ opacity: 0, z: 15}}
        animate={{ opacity: 1, z: 0}}
        exit={{opacity: 0, z: 15}}
        transition={{ delay: 1.45}}
        className="IndexUp App ">
          <Canvas dpr={[1, 1.5]} camera={{ fov: 40, position: [0, 2, 15] }} className="IndexUp" shadows >
            <color attach="background" args={["#213547"]} />
            <fog attach="fog" args={["#213547", 10, 63]} />
            <Experience monarchLaboProps={monarchLaboProps}/>
          </Canvas>
          <Configurator />
        </motion.div>
  );
}

export default App;