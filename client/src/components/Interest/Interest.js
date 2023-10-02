import React, { useEffect, useRef } from "react";
import "./Interest.css";
import { motion, stagger, useInView, animate } from "framer-motion";
import data from "./interest.json";

const Interest = () => {
  const assetRef = useRef(null);
  const assetIsInView = useInView(assetRef);

  const staggerItems = stagger(0.1, { from: "first" });

  useEffect(() => {
    animate(
      ".interest_left_container li",
      assetIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
      {
        duration: 0.5,
        delay: assetIsInView ? staggerItems : 0,
      }
    );
  }, [assetIsInView]);

  return (
    <div className="interest_container">
      <h2>Financial Health & Well-being</h2>
      <div className="financial_health">
      <div className="interest_left_container">
        <motion.ul ref={assetRef}>
          {data["financial_health_and_well-being"].map((interest) => (
            <motion.li
              key={interest.name} // Add a unique key prop
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {interest.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="interest_right_container">
        <img src="/asset.png" />
      </div>
      </div>

      <div className="financial_health">
      <div className="interest_left_container">
        <motion.ul ref={assetRef}>
          {data["financial_health_and_well-being"].map((interest) => (
            <motion.li
              key={interest.name} // Add a unique key prop
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {interest.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="interest_right_container">
        <img src="/asset.png" />
      </div>
      </div>
    </div>
  );
};

export default Interest;
