import React from 'react';
import "./generativeIA.css";
import { motion } from 'framer-motion';

interface ImageGeneratorProps {
  imageUrl: string;
}
const images = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 3,
    z: 1,
    transition: {
      duration: 1
    }
  }
}
const ImageGenerator: React.FC<ImageGeneratorProps> = ({ imageUrl }) => {
  return (
    <motion.div className="h-65 w-65">
      <motion.img 
        variants={images}
      className='' src={imageUrl} alt="Generated Image" />
    </motion.div>
  );
};

export default ImageGenerator;
