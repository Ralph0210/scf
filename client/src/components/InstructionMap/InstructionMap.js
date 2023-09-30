import React, { useEffect, useRef, useState } from "react";
import "./InstructionMap.css";
import { motion, useScroll, useInView, useMotionValueEvent } from "framer-motion";
import ExploreData2 from "../ExploreData/ExploreData2";
import { BiLeftArrowAlt } from 'react-icons/bi'
import InstructionAnalytics from "../InstructionAnalytics/InstructionAnalytics";

const InstructionMap = () => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggered = useRef(false)
  const hasTriggered2 = useRef(true)
  const [isHover, setIsHover] = useState(false)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 }, // Start with opacity 0 and slight Y translation
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Fade in and move up smoothly
  };

  const handleClick = () => {
    setIsVisible((prevVisible) => {
      console.log("isVisible is now:", !prevVisible);
      return !prevVisible; // Toggle the state
    });
  };

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "1.7 1"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!hasTriggered.current && latest > 0.8 ) {
      hasTriggered.current = true; // Set the flag to true to prevent further triggers
      isVisible? setIsVisible(!isVisible) : setIsVisible(isVisible)
      hasTriggered2.current = false
    }
    if (!hasTriggered2.current && latest < 0.8) {
      hasTriggered2.current = true; // Set the flag to true to prevent further triggers
      isVisible? setIsVisible(!isVisible) : setIsVisible(isVisible)
      setIsVisible(!isVisible)
      hasTriggered.current=false
    }
    console.log(latest)
  });

  const handleHover= () => {
    setIsHover(!isHover)
  }

  return (
    <div className="container" ref={ref}>
      <div className="content"
            whileHover={handleHover}
        >
        <motion.div 
          className="instruction_map"
          viewport={{ once: true, amount: 0.7 }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          animate={{x: isVisible ? '53%' : 0}}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          {isVisible ?  <ExploreData2 /> : <InstructionAnalytics />}
         
        </motion.div>
        <motion.div
          className="description"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          animate={{x: isVisible ? '-186%' : 0}}
          transition={{ ease: "easeOut", duration: 1}}
        >
          {isVisible ? (
            <h2>
              Comprehensive <span className="new-line">Financial Survey.</span>
            </h2>
          ) : (
            <h2>
              Understanding <span className="new-line">Consumer</span>
              <span className="new-line">Behavior.</span>
            </h2>
          )}

          <motion.div
            className="details"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            transition={{ ease: "easeOut", duration: 1 }}
          >
            {isVisible ? (
              <p>
                The SCF, conducted by the Federal Reserve System, is a
                nationwide survey that provides a comprehensive view of income,
                wealth, debt, and various financial factors.
              </p>
            ) : (
              <p>
                The SCF offers valuable insights into how individuals and
                households manage their financial lives.
              </p>
            )}
          </motion.div>
        </motion.div>
        <motion.button
          className="swap_button"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          animate={{x: isVisible ? "-2080%" : "-1140%", rotate: isVisible ? 180 : 0,}}
          onClick={handleClick}
          transition={{ ease: "easeOut", duration: 1 }}
          whileHover={{scale:1.2}}
          whileTap={{ scale: 0.6 }}
        >
          <BiLeftArrowAlt className="arrow"/>
        </motion.button>
      </div>

      {/* Add more text elements and animations as needed */}
    </div>
  );
};

export default InstructionMap;
