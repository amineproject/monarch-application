"use client"

import { motion } from "framer-motion"

const Configurator = () => {



    return ( 
    <motion.div 
    initial={{ opacity: 0, z: 15}}
    animate={{ opacity: 1, z: 0}}
    exit={{opacity: 0, z: 15}}
    transition={{ delay: 1.45}}
    
    
    className="border border-red-700 h-28 w-44 configurator z-10">
        <div className="configurator__section__title">
                Louis Vuitton Bag
            <div className="configurator__section__title">Chair material</div>
            <div className="configurator__section__values">
                <div
                    className={`item`}
                    
                >
                    <div className="item__label">Leather</div>
                </div>
                <div
                    className={`item`}
                    
                >
                    <div className="item__label">Fabric</div>
                </div>
            </div>
        </div>
    </motion.div>)
}

export default Configurator