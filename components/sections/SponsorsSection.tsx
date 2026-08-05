"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPONSORS_DATA } from "@/data/sponsorsData";
import { Shield, Sparkles } from "lucide-react";

export default function SponsorsSection() {
  // Duplicate array to make seamless loop marquee
  const marqueeItems = [...SPONSORS_DATA, ...SPONSORS_DATA];

  return (
    <section id="sponsors" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>SYNAPSE ECOSYSTEM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Industry Partners &{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Sponsors
          </span>
        </motion.h2>

        <p className="text-base text-slate-400 font-light max-w-2xl mx-auto">
          Backed by leading global technology pioneers driving artificial intelligence, web infrastructure, and high-performance hardware.
        </p>
      </div>

      {/* Marquee Track 1 (Left Direction) */}
      <div className="relative w-full overflow-hidden no-scrollbar py-4 mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05070D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05070D] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((sponsor, idx) => (
            <div
              key={`${sponsor.id}-${idx}`}
              className="group relative px-8 py-5 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/50 transition-all duration-300 min-w-[200px] flex flex-col items-center justify-center cursor-pointer"
            >
              <span className="text-[10px] font-mono tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors uppercase mb-1">
                {sponsor.category}
              </span>
              <span className={`text-lg sm:text-xl font-black tracking-widest text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${sponsor.gradient} transition-all duration-300`}>
                {sponsor.logoText}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Track 2 (Right Direction) */}
      <div className="relative w-full overflow-hidden no-scrollbar py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05070D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05070D] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-8 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((sponsor, idx) => (
            <div
              key={`reverse-${sponsor.id}-${idx}`}
              className="group relative px-8 py-5 rounded-2xl glass-panel border border-white/10 hover:border-blue-500/50 transition-all duration-300 min-w-[200px] flex flex-col items-center justify-center cursor-pointer"
            >
              <span className="text-[10px] font-mono tracking-widest text-slate-500 group-hover:text-purple-400 transition-colors uppercase mb-1">
                {sponsor.category}
              </span>
              <span className={`text-lg sm:text-xl font-black tracking-widest text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${sponsor.gradient} transition-all duration-300`}>
                {sponsor.logoText}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
