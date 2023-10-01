import React, { useEffect, useRef } from "react";
import "./Interest.css";
import { motion, stagger, useInView, animate } from "framer-motion";

const Interest = () => {
  const assetRef = useRef(null);
  const assetIsInView = useInView(assetRef);

  const staggerItems = stagger(0.1, { from: "first" });

  useEffect(() => {
    animate(
      ".interest_left_container li",
      assetIsInView
        ? { opacity: 1, scale: 1}
        : { opacity: 0, scale: 0},
      {
        duration: 0.5,
        delay: assetIsInView ? staggerItems : 0
      }
    );
  },[assetIsInView])

  return (
    <div className="interest_container">
      <div className="interest_left_container">
        <h2>Assets</h2>
        <motion.ul ref={assetRef}>
          <motion.li
            whileHover={{scale:1.2}}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Lorem
          </motion.li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
        </motion.ul>
      </div>
      <div className="interest_right_container">
        <img src="/asset.png" />
      </div>
    </div>
  );
};

export default Interest;
