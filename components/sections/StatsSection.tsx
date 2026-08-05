"use client";

import React from "react";
import { motion } from "framer-motion";
import { SYMPOSIUM_CONFIG } from "@/constants/config";

const STATS = [
  { value: `${SYMPOSIUM_CONFIG.stats.participants}+`, label: "Participants",    desc: "Expected students from across India" },
  { value: `${SYMPOSIUM_CONFIG.stats.eventsCount}+`,  label: "Events",          desc: "Technical & Non-Technical competitions" },
  { value: `₹${(SYMPOSIUM_CONFIG.stats.prizePool/1000).toFixed(0)}K+`, label: "Prize Pool", desc: "Cash prizes to be won" },
  { value: `${SYMPOSIUM_CONFIG.stats.colleges}+`,     label: "Colleges",        desc: "Institutions expected to participate" },
];

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative z-20 overflow-hidden"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--parchment)" }}
    >
      {/* Decorative brushstroke watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden
      >
        <svg viewBox="0 0 800 300" width="700" style={{ opacity: 0.03 }}>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily: "serif",
              fontSize: "280px",
              fontWeight: 900,
              fill: "#2B2B2B",
              letterSpacing: "-0.05em",
            }}
          >
            &apos;26
          </text>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✿ &nbsp; The Scale
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            ZEIGEN by Numbers
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              className="flex flex-col items-center text-center py-10 px-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(198,166,100,0.18)",
                boxShadow: "0 2px 12px rgba(43,43,43,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--gold)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                {s.value}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                  marginBottom: "0.5rem",
                }}
              >
                {s.label}
              </span>

              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--ink-subtle)",
                  fontFamily: "var(--font-inter), sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
