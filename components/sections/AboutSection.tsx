"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";
import { SYMPOSIUM_CONFIG } from "@/constants/config";

const CARDS = [
  {
    icon: BookOpen,
    title: "Our Vision",
    body: "ZEIGEN '26 is a national-level technical symposium bringing together brilliant minds from across India to share innovations, research, and ideas that shape the future of technology.",
  },
  {
    icon: Users,
    title: "Who We Are",
    body: `Organized by the Association of Computer Engineers (ACE), Department of Computer Science & Engineering, K.L.N. College of Engineering — a legacy of academic excellence since our founding.`,
  },
  {
    icon: Globe,
    title: "The Experience",
    body: "Two Technical and two Non-Technical events designed to challenge, inspire, and celebrate the spirit of engineering — with generous prize pools and certificates for all participants.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--parchment)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✿ &nbsp; About the Symposium
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Think. Connect. Transform.
          </h2>
          <p
            style={{
              maxWidth: "540px",
              margin: "1.5rem auto 0",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--ink-muted)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {SYMPOSIUM_CONFIG.subTagline} A gathering where tradition meets innovation — where every mind finds its path.
          </p>
        </motion.div>

        {/* Cards — Japanese scroll style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                {...fadeUp(i * 0.12)}
                className="washi-card p-8 flex flex-col gap-4"
              >
                {/* Icon in a soft circle */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-full"
                  style={{ background: "rgba(198,166,100,0.12)", border: "1px solid rgba(198,166,100,0.28)" }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: "var(--gold)", width: "1.1rem", height: "1.1rem" }} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {card.title}
                </h3>

                {/* Thin gold rule */}
                <div style={{ width: "32px", height: "1.5px", background: "linear-gradient(90deg, var(--gold), var(--muted-red))", borderRadius: "2px" }} />

                <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Decorative award badge at bottom */}
        <motion.div {...fadeUp(0.3)} className="flex items-center justify-center gap-3 mt-14">
          <div style={{ height: "1px", width: "60px", background: "rgba(198,166,100,0.3)" }} />
          <Award className="w-4 h-4" style={{ color: "var(--gold)" }} />
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
            {SYMPOSIUM_CONFIG.college}
          </p>
          <Award className="w-4 h-4" style={{ color: "var(--gold)" }} />
          <div style={{ height: "1px", width: "60px", background: "rgba(198,166,100,0.3)" }} />
        </motion.div>
      </div>
    </section>
  );
}
