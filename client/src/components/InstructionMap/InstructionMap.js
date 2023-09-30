import React, {useRef} from 'react';
import './InstructionMap.css';
import { motion} from 'framer-motion';
import ExploreData2 from '../ExploreData/ExploreData2'

const InstructionMap = () => {

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 }, // Start with opacity 0 and slight Y translation
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Fade in and move up smoothly
  };

  return (
    <div className="container">
      <div className='content'>
            <motion.div className='instruction_map' viewport={{ once: true, amount: 0.8 }} variants={fadeIn} initial='hidden' whileInView='visible'><ExploreData2/></motion.div>
            <motion.div className='description' viewport={{ once: true, amount: 0.8 }} variants={fadeIn} initial='hidden' whileInView='visible'>
                <h2>Comprehensive <span className='new-line'>Financial Survey.</span></h2>
                <motion.div className='details' viewport={{ once: true, amount: 0.8 }} variants={fadeIn} initial='hidden' whileInView='visible'>
                    <p>The SCF, conducted by the Federal Reserve System, is a nationwide survey that provides a comprehensive view of income, wealth, debt, and various financial factors.</p>
                </motion.div>
            </motion.div>
        </div>

      {/* Add more text elements and animations as needed */}
    </div>
  );
};

export default InstructionMap;
