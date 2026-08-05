"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPEAKERS_DATA } from "@/data/speakersData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

export default function SpeakersSection() {
  return (
    <section
      id="speakers"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--cream)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div className="text-center mb-14" {...fadeUp(0)}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--muted-red)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✦ &nbsp; Voices of Wisdom
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Keynote Speakers
          </h2>
        </motion.div>

        {/* Speaker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS_DATA.map((speaker, i) => (
            <motion.article
              key={speaker.id}
              {...fadeUp(i * 0.12)}
              className="group"
            >
              {/* Photo frame card */}
              <div
                className="washi-card overflow-hidden"
                style={{ padding: 0 }}
              >
                {/* Image container */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "220px" }}
                >
                  {/* Gold frame border (inner inset) */}
                  <div
                    className="absolute inset-2 z-10 pointer-events-none rounded-xl"
                    style={{ border: "1.5px solid rgba(198,166,100,0.4)" }}
                  />

                  {/* Image */}
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center top" }}
                    loading="lazy"
                  />

                  {/* Soft gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 55%, rgba(250,248,244,0.55) 100%)" }}
                  />

                  {/* Tag badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "rgba(250,248,244,0.92)",
                        color: "var(--muted-red)",
                        border: "1px solid rgba(176,65,62,0.25)",
                        borderRadius: "4px",
                        padding: "0.2rem 0.55rem",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {speaker.tag}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {speaker.name}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-red)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500, marginBottom: "0.15rem" }}>
                    {speaker.role}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--ink-subtle)", fontFamily: "var(--font-inter), sans-serif", marginBottom: "1rem" }}>
                    {speaker.company}
                  </p>

                  <div style={{ height: "1px", background: "rgba(198,166,100,0.2)", marginBottom: "0.85rem" }} />

                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                      color: "var(--ink-light)",
                      lineHeight: 1.55,
                      marginBottom: "0.75rem",
                    }}
                  >
                    &ldquo;{speaker.topic}&rdquo;
                  </p>

                  <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}>
                    {speaker.bio}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
