"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Users, Clock, MapPin, Info } from "lucide-react";
import { EVENTS_DATA, type EventItem } from "@/data/eventsData";
import { SYMPOSIUM_CONFIG } from "@/constants/config";
import { handleRegisterClick } from "@/utils/samuraiAnimation";

type Filter = "All" | "Technical" | "Non-Technical";

const FILTERS: Filter[] = ["All", "Technical", "Non-Technical"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

function EventCard({ event }: { event: EventItem }) {
  const isTech = event.category === "Technical";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="washi-card p-6 sm:p-8 flex flex-col justify-between gap-6"
    >
      <div className="flex flex-col gap-4">
        {/* Header & Category Badge */}
        <div className="flex items-center justify-between">
          <span
            className="seal-badge"
            style={{
              color: isTech ? "var(--muted-red)" : "var(--gold)",
              borderColor: isTech ? "rgba(176,65,62,0.35)" : "rgba(198,166,100,0.45)",
              background: isTech ? "rgba(176,65,62,0.06)" : "rgba(198,166,100,0.08)",
            }}
          >
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </h3>

        {/* Full description */}
        <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
          {event.fullDesc}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(198,166,100,0.25)", margin: "0.25rem 0" }} />

        {/* Meta grid: Team size, Time, Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { icon: Users, label: "Team Size", value: event.teamSize },
            { icon: Clock, label: "Time", value: event.time },
            { icon: MapPin, label: "Venue", value: event.venue },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(43,43,43,0.08)" }}
            >
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.25rem" }}>
                {label}
              </p>
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--gold)" }} />
                <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div>
          <h4 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>
            Rules &amp; Guidelines
          </h4>
          <ul className="flex flex-col gap-2">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5" style={{ fontSize: "0.82rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}>
                <span style={{ color: "var(--muted-red)", fontFamily: "var(--font-cormorant), serif", fontWeight: 600, lineHeight: 1.4 }}>✦</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Coordinators */}
        <div>
          <h4 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>
            Coordinators
          </h4>
          <div className="flex flex-col gap-2">
            {event.coordinators.map(c => (
              <div key={c.name} className="flex items-center justify-between rounded-xl p-3" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(43,43,43,0.08)" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>{c.name}</span>
                <a href={`tel:${c.phone}`} style={{ fontSize: "0.78rem", color: "var(--muted-red)", fontFamily: "var(--font-inter), sans-serif" }}>{c.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <a
          href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRegisterClick}
          className="btn-primary w-full justify-center"
        >
          Register for {event.title}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function EventsSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = EVENTS_DATA.filter(e => filter === "All" || e.category === filter);

  return (
    <section
      id="events"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--cream)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div className="text-center mb-10" {...fadeUp(0)}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--muted-red)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✦ &nbsp; Events &amp; Competitions
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            The Arena
          </h2>
        </motion.div>

        {/* Schedule Notice Banner */}
        <motion.div
          {...fadeUp(0.05)}
          className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl flex items-start gap-3 text-left"
          style={{
            background: "rgba(198,166,100,0.08)",
            border: "1px solid rgba(198,166,100,0.28)",
          }}
        >
          <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
          <div style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--ink-light)", fontFamily: "var(--font-inter), sans-serif" }}>
            <strong style={{ color: "var(--ink)" }}>Event Schedule &amp; Entry Rules:</strong>
            <ul className="mt-1 flex flex-col gap-1 list-disc list-inside">
              <li>Both <strong>Technical events</strong> run simultaneously up to <strong>1:00 PM</strong> (10:30 AM – 1:00 PM).</li>
              <li><strong>Lunch break:</strong> 1:00 PM – 2:15 PM.</li>
              <li>Both <strong>Non-Technical events</strong> start simultaneously at <strong>2:30 PM</strong> (2:30 PM – 4:00 PM).</li>
              <li><strong>Team Size:</strong> Every event requires a team of <strong>exactly 2 members (Mandatory)</strong>.</li>
              <li>A participant can join in <strong>only 1 Technical event</strong> and <strong>1 Non-Technical event</strong>.</li>
            </ul>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                letterSpacing: "0.08em",
                background: filter === f ? "var(--muted-red)" : "rgba(255,255,255,0.7)",
                color: filter === f ? "#fff" : "var(--ink-muted)",
                border: filter === f ? "1px solid var(--crimson)" : "1px solid rgba(43,43,43,0.12)",
                boxShadow: filter === f ? "0 4px 14px rgba(176,65,62,0.25)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Register CTA */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-14">
          <a
            href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRegisterClick}
            className="btn-primary"
          >
            Register for Events
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

