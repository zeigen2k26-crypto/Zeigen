"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Bell } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const gainRef     = React.useRef<GainNode | null>(null);
  const osc1Ref     = React.useRef<OscillatorNode | null>(null);
  const osc2Ref     = React.useRef<OscillatorNode | null>(null);
  const osc3Ref     = React.useRef<OscillatorNode | null>(null);

  const start = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.03, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.connect(masterGain);

      // Wind-like noise approximation: three detuned sines = "temple drone"
      const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = 164;
      const o2 = ctx.createOscillator(); o2.type = "triangle"; o2.frequency.value = 220;
      const o3 = ctx.createOscillator(); o3.type = "sine"; o3.frequency.value = 110;

      [o1, o2, o3].forEach(o => { o.connect(filter); o.start(); });
      osc1Ref.current = o1; osc2Ref.current = o2; osc3Ref.current = o3;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  };

  const stop = () => {
    if (!gainRef.current || !audioCtxRef.current) { setIsPlaying(false); return; }
    gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
    setTimeout(() => {
      osc1Ref.current?.stop(); osc2Ref.current?.stop(); osc3Ref.current?.stop();
      audioCtxRef.current?.close();
      setIsPlaying(false);
    }, 650);
  };

  const toggle = () => isPlaying ? stop() : start();

  return (
    <motion.button
      onClick={toggle}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
        isPlaying
          ? "bg-amber-50 border border-amber-300/60 text-amber-800"
          : "bg-white/60 border border-[rgba(43,43,43,0.12)] text-[#6B6B6B] hover:border-[rgba(198,166,100,0.4)] hover:text-[#4A4A4A]"
      }`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title="Toggle Japanese Ambient Sound"
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.span key="on" className="flex items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Bell className="w-3.5 h-3.5 text-amber-600" style={{ animation: "float-slow 2s ease-in-out infinite" }} />
            <span className="hidden sm:inline">Ambient On</span>
          </motion.span>
        ) : (
          <motion.span key="off" className="flex items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Wind className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ambient</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
