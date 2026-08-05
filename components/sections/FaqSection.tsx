"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_DATA, type FaqItem } from "@/data/faqData";

const CATEGORY_ORDER = ["General", "Registration", "Events", "Travel & Accommodation"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

function FaqItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ borderBottom: "1px solid rgba(198,166,100,0.18)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.1rem",
            fontWeight: isOpen ? 600 : 500,
            color: isOpen ? "var(--muted-red)" : "var(--ink)",
            lineHeight: 1.35,
            paddingRight: "1.5rem",
            transition: "color 0.25s ease",
          }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: isOpen ? "var(--muted-red)" : "var(--ink-subtle)" }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                paddingBottom: "1.25rem",
                fontSize: "0.88rem",
                lineHeight: 1.75,
                color: "var(--ink-muted)",
                fontFamily: "var(--font-inter), sans-serif",
                paddingRight: "2rem",
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  // Group by category
  const grouped: Record<string, FaqItem[]> = {};
  for (const item of FAQ_DATA) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  return (
    <section
      id="faq"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--cream)" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div className="text-center mb-14" {...fadeUp(0)}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--muted-red)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✦ &nbsp; Questions &amp; Answers
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Frequently Asked
          </h2>
        </motion.div>

        {/* Accordion — all questions, simple list */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(198,166,100,0.18)", padding: "0 1.75rem" }}
        >
          {FAQ_DATA.map((item, i) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div {...fadeUp(0.25)} className="text-center mt-12">
          <p style={{ fontSize: "0.88rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", marginBottom: "1rem" }}>
            Still have questions? Reach out to us.
          </p>
          <a
            href="#contact"
            className="btn-secondary"
          >
            Contact the Organizers
          </a>
        </motion.div>
      </div>
    </section>
  );
}
