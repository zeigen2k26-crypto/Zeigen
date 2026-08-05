"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[999] origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, #C6A664, #B0413E, #C6A664)",
        transformOrigin: "left",
      }}
    />
  );
}
