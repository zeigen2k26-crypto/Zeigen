"use client";

import React from "react";
import { motion } from "framer-motion";
import { SCHEDULE_DATA } from "@/data/scheduleData";

const CATEGORY_STYLES: Record<string, { dot: string; label: string; labelColor: string }> = {
  Keynote:      { dot: "#B0413E", label: "Keynote",    labelColor: "#B0413E" },
  Technical:    { dot: "#C6A664", label: "Technical",  labelColor: "#8B6914" },
  "Non-Technical": { dot: "#A0909A", label: "Non-Tech", labelColor: "#6B5A70" },
  General:      { dot: "#9A9A9A", label: "General",   labelColor: "#6B6B6B" },
};

export default function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--parchment)" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✿ &nbsp; August 28, 2026
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Day at a Glance
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", marginTop: "1rem" }}>
            One day. Many paths. All converging at ZEIGEN &apos;26.
          </p>
        </motion.div>

        {/* Bamboo Timeline */}
        <div className="relative">
          {/* Center gold line */}
          <div
            className="absolute hidden md:block"
            style={{
              left: "50%",
              top: 0, bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, transparent 0%, var(--gold) 8%, var(--gold) 92%, transparent 100%)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Slots */}
          <div className="flex flex-col gap-8 md:gap-6">
            {SCHEDULE_DATA.map((slot, i) => {
              const isLeft  = i % 2 === 0;
              const style   = CATEGORY_STYLES[slot.category] ?? CATEGORY_STYLES.General;
              const isHL    = !!slot.isHighlight;

              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                  className="relative flex md:grid md:grid-cols-2 gap-4 md:gap-8 items-center"
                >
                  {/* Left card (even indices) */}
                  <div className={`${isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2 md:col-span-1 md:row-start-1"} w-full md:flex ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    <div
                      className={`${isLeft ? "" : "md:hidden"} w-full md:max-w-xs`}
                    >
                      {isLeft && (
                        <ScheduleCard slot={slot} style={style} isHL={isHL} align="right" />
                      )}
                    </div>
                  </div>

                  {/* Timeline node (center) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
                    <div
                      style={{
                        width: isHL ? "16px" : "12px",
                        height: isHL ? "16px" : "12px",
                        borderRadius: "50%",
                        background: isHL ? style.dot : "var(--parchment)",
                        border: `2px solid ${style.dot}`,
                        boxShadow: isHL ? `0 0 0 4px ${style.dot}25` : "none",
                        transition: "all 0.3s",
                      }}
                    />
                  </div>

                  {/* Right card (odd indices) */}
                  <div className={`${!isLeft ? "md:col-start-2 md:text-left" : "md:col-start-1 md:col-span-1 md:row-start-1 md:hidden"} w-full`}>
                    {!isLeft && (
                      <ScheduleCard slot={slot} style={style} isHL={isHL} align="left" />
                    )}
                  </div>

                  {/* Mobile card (full-width, all slots) */}
                  <div className="md:hidden w-full pl-8 relative">
                    {/* Mobile dot */}
                    <div
                      className="absolute left-0 top-4"
                      style={{
                        width: "10px", height: "10px",
                        borderRadius: "50%",
                        background: isHL ? style.dot : "var(--parchment)",
                        border: `2px solid ${style.dot}`,
                      }}
                    />
                    {/* Mobile line */}
                    <div
                      className="absolute left-[4px] top-0 bottom-0 w-[2px]"
                      style={{ background: "rgba(198,166,100,0.3)" }}
                    />
                    <ScheduleCard slot={slot} style={style} isHL={isHL} align="left" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScheduleCard({
  slot, style, isHL, align,
}: {
  slot: (typeof SCHEDULE_DATA)[number];
  style: { dot: string; label: string; labelColor: string };
  isHL: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${align === "right" ? "text-right" : "text-left"}`}
      style={{
        background: isHL ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
        border: isHL ? `1px solid ${style.dot}40` : "1px solid rgba(43,43,43,0.09)",
        boxShadow: isHL
          ? `0 4px 20px ${style.dot}18, 0 1px 4px rgba(43,43,43,0.06)`
          : "0 2px 8px rgba(43,43,43,0.04)",
      }}
    >
      {/* Category badge */}
      <div className={`flex ${align === "right" ? "justify-end" : "justify-start"} mb-2`}>
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: style.labelColor,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {style.label}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--gold)",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 500,
          letterSpacing: "0.06em",
          marginBottom: "0.3rem",
        }}
      >
        {slot.time}
      </p>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--ink)",
          lineHeight: 1.25,
          marginBottom: "0.4rem",
        }}
      >
        {slot.title}
      </h3>

      <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.5rem" }}>
        {slot.description}
      </p>

      <p style={{ fontSize: "0.68rem", color: "var(--ink-subtle)", fontFamily: "var(--font-inter), sans-serif", fontStyle: "italic" }}>
        {slot.venue}
      </p>
    </div>
  );
}
