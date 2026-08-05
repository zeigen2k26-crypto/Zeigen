"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onDown = () => setIsClicking(true);
    const onUp   = () => setIsClicking(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive =
        t.tagName === "BUTTON" || t.tagName === "A" ||
        t.tagName === "INPUT"  || t.tagName === "TEXTAREA" ||
        !!t.closest("button") || !!t.closest("a") ||
        t.getAttribute("role") === "button" ||
        t.classList.contains("interactive");
      setIsHovered(interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Smooth trailing
  useEffect(() => {
    if (!isVisible) return;
    let animId: number;
    const follow = () => {
      setTrailing(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isVisible]);

  if (!isVisible) return null;

  const innerSize  = isHovered ? 10 : 7;
  const outerSize  = isHovered ? 44 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Inner sakura blossom dot */}
      <motion.div
        className="fixed top-0 left-0"
        animate={{
          x: mousePos.x - innerSize / 2,
          y: mousePos.y - innerSize / 2,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 60, mass: 0.08 }}
      >
        {/* 5-petal mini sakura SVG */}
        <svg width={innerSize * 3} height={innerSize * 3} viewBox="-10 -10 20 20" style={{ overflow: "visible" }}>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.sin((angle * Math.PI) / 180) * 4}
              cy={-Math.cos((angle * Math.PI) / 180) * 4}
              rx="2.2"
              ry="4"
              fill="#F5B7C4"
              opacity="0.92"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="1.5" fill="#FAE0E8" />
        </svg>
      </motion.div>

      {/* Outer gold ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        style={{
          borderColor: isHovered ? "rgba(176, 65, 62, 0.5)" : "rgba(198, 166, 100, 0.45)",
          background:  isHovered ? "rgba(176, 65, 62, 0.05)" : "rgba(198, 166, 100, 0.04)",
        }}
        animate={{
          x: trailing.x - outerSize / 2,
          y: trailing.y - outerSize / 2,
          width:  outerSize,
          height: outerSize,
          scale:  isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.3 }}
      />
    </div>
  );
}
