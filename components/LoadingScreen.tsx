"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYMPOSIUM_CONFIG } from "@/constants/config";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const STATUS_PHASES = [
  "The gate opens...",
  "The path clears...",
  "The lanterns are lit...",
  "The shrine awaits...",
  "Enter.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState(0);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 600);
          return 100;
        }
        const next = Math.min(prev + Math.floor(Math.random() * 6) + 3, 100);
        if (next > 80)      setPhase(4);
        else if (next > 60) setPhase(3);
        else if (next > 40) setPhase(2);
        else if (next > 20) setPhase(1);
        return next;
      });
    }, 75);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: "#1A1411" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }}
        >
          {/* Subtle paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 60%, rgba(198,166,100,0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(245,183,196,0.06) 0%, transparent 50%)",
            }}
          />

          {/* Torii Gate SVG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center mb-10"
          >
            {/* Animated ink circle */}
            <svg
              viewBox="0 0 200 200"
              width="180"
              height="180"
              className="absolute"
            >
              <motion.circle
                cx="100"
                cy="100"
                r="88"
                stroke="rgba(198,166,100,0.25)"
                strokeWidth="1"
                fill="none"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="88"
                stroke="rgba(198,166,100,0.7)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="553"
                initial={{ strokeDashoffset: 553, rotate: -90 }}
                animate={{ strokeDashoffset: 0 }}
                style={{ transformOrigin: "100px 100px" }}
                transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              />
            </svg>

            {/* Torii Gate */}
            <svg viewBox="0 0 140 180" width="90" height="116">
              {/* Kasagi — curved top beam */}
              <motion.path
                d="M 5 42 Q 70 20 135 42"
                stroke="#B0413E"
                strokeWidth="11"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: "easeInOut" }}
              />
              {/* Shimaki — second beam */}
              <motion.rect
                x="20" y="60" width="100" height="9" rx="2"
                fill="#B0413E"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: "70px 64px" }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              />
              {/* Left post */}
              <motion.rect
                x="40" y="55" width="9" height="125" rx="3"
                fill="#B0413E"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ transformOrigin: "44px 55px" }}
                transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
              />
              {/* Right post */}
              <motion.rect
                x="91" y="55" width="9" height="125" rx="3"
                fill="#B0413E"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ transformOrigin: "95px 55px" }}
                transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
              />
              {/* Nuki — lower connector */}
              <motion.rect
                x="36" y="82" width="68" height="7" rx="2"
                fill="#B0413E"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: "70px 85px" }}
                transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              color: "#EDD9A8",
              fontSize: "clamp(2rem, 6vw, 3.25rem)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textAlign: "center",
            }}
          >
            {SYMPOSIUM_CONFIG.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            style={{
              color: "rgba(210,190,160,0.7)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginTop: "0.5rem",
              marginBottom: "2.5rem",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {SYMPOSIUM_CONFIG.association}
          </motion.p>

          {/* Progress bar — thin gold line */}
          <div style={{ width: "min(300px, 80vw)" }}>
            <div
              style={{
                height: "1px",
                background: "rgba(198,166,100,0.2)",
                borderRadius: "1px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #C6A664, #B0413E)",
                  borderRadius: "1px",
                  width: `${progress}%`,
                  transition: "width 0.15s ease",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.75rem",
                alignItems: "center",
              }}
            >
              <motion.span
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  color: "rgba(198,166,100,0.75)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontStyle: "italic",
                }}
              >
                {STATUS_PHASES[phase]}
              </motion.span>
              <span style={{ color: "rgba(198,166,100,0.5)", fontSize: "0.68rem", fontFamily: "monospace" }}>
                {progress}%
              </span>
            </div>
          </div>

          {/* Small petals decoration */}
          <div className="absolute bottom-10" style={{ color: "rgba(198,166,100,0.35)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
            ✿ &nbsp; National Level Technical Symposium &nbsp; ✿
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
