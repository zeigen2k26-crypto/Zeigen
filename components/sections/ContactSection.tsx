"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SYMPOSIUM_CONFIG } from "@/constants/config";
import { triggerSamuraiCutAnimation, handleRegisterClick } from "@/utils/samuraiAnimation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: SYMPOSIUM_CONFIG.contactEmail,
    href: `mailto:${SYMPOSIUM_CONFIG.contactEmail}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SYMPOSIUM_CONFIG.contactPhone,
    href: `tel:${SYMPOSIUM_CONFIG.contactPhone}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: SYMPOSIUM_CONFIG.collegeLocation,
    href: `https://maps.google.com/?q=K.L.N.+College+of+Engineering+Madurai`,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20"
      style={{ padding: "var(--section-py) var(--section-px)", background: "var(--parchment)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div className="text-center mb-14" {...fadeUp(0)}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
            ✿ &nbsp; Reach Us
          </p>
          <h2 className="section-heading centered" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Contact
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", marginTop: "1rem", maxWidth: "420px", margin: "1rem auto 0", lineHeight: 1.7 }}>
            For queries regarding events, registration, or logistics — our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Contact info cards */}
          <div className="flex flex-col gap-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={label === "Address" ? "_blank" : undefined}
                rel={label === "Address" ? "noopener noreferrer" : undefined}
                {...fadeUp(i * 0.1)}
                className="washi-card p-6 flex items-start gap-5 group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{
                    background: "rgba(198,166,100,0.1)",
                    border: "1px solid rgba(198,166,100,0.25)",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.3rem" }}>
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--ink)",
                      fontFamily: "var(--font-inter), sans-serif",
                      lineHeight: 1.6,
                      transition: "color 0.2s",
                    }}
                    className="group-hover:text-[var(--muted-red)]"
                  >
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div {...fadeUp(0.35)} className="washi-card p-6">
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "1rem" }}>
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { href: SYMPOSIUM_CONFIG.socials.instagram, icon: FaInstagram, label: "Instagram" },
                  { href: SYMPOSIUM_CONFIG.socials.linkedin,  icon: FaLinkedinIn,  label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-250"
                    style={{
                      fontSize: "0.78rem",
                      fontFamily: "var(--font-inter), sans-serif",
                      color: "var(--ink-muted)",
                      background: "rgba(43,43,43,0.04)",
                      border: "1px solid rgba(43,43,43,0.08)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(176,65,62,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--muted-red)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(43,43,43,0.08)"; (e.currentTarget as HTMLElement).style.color = "var(--ink-muted)"; }}
                    aria-label={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Registration CTA panel */}
          <motion.div {...fadeUp(0.15)}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(176,65,62,0.92), rgba(139,46,44,0.96))",
                padding: "3rem 2.5rem",
                position: "relative",
              }}
            >
              {/* Decorative torii gate watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <svg viewBox="0 0 200 220" width="160" style={{ opacity: 0.06 }}>
                  <path d="M 20 46 Q 100 28 180 46" stroke="white" strokeWidth="14" fill="none" strokeLinecap="round"/>
                  <rect x="38" y="62" width="124" height="10" rx="3" fill="white"/>
                  <rect x="58" y="58" width="12" height="160" rx="3" fill="white"/>
                  <rect x="130" y="58" width="12" height="160" rx="3" fill="white"/>
                  <rect x="54" y="88" width="92" height="8" rx="2" fill="white"/>
                </svg>
              </div>

              <div className="relative z-10">
                {/* Small label */}
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "1.25rem" }}>
                  ✦ &nbsp; Join Us
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#FAF8F4",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  Ready to Begin Your Journey?
                </h3>

                <p style={{ fontSize: "0.88rem", color: "rgba(250,248,244,0.75)", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Register now for ZEIGEN &apos;26 and become part of a national gathering of brilliant minds. Compete, connect, and create.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleRegisterClick}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300"
                    style={{
                      background: "#FAF8F4",
                      color: "var(--muted-red)",
                      fontFamily: "var(--font-inter), sans-serif",
                      letterSpacing: "0.08em",
                      border: "1px solid rgba(250,248,244,0.3)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FAF8F4"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    Register on Google Form
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(250,248,244,0.5)",
                      textAlign: "center",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    Deadline: {SYMPOSIUM_CONFIG.registrationDeadline}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Organizing Committee / Coordinators Section */}
        <motion.div {...fadeUp(0.2)} className="mt-16 pt-12" style={{ borderTop: "1px solid rgba(198,166,100,0.2)" }}>
          <div className="text-center mb-10">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--muted-red)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.5rem" }}>
              ✦ &nbsp; Leadership &amp; Organization
            </p>
            <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2rem", fontWeight: 600, color: "var(--ink)" }}>
              Organizing Committee
            </h3>
          </div>

          {/* Top row leadership: Convener & Co-Convener */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="washi-card p-6 flex flex-col gap-3">
              <span className="seal-badge w-fit" style={{ color: "var(--muted-red)", borderColor: "rgba(176,65,62,0.3)" }}>
                Convener
              </span>
              <div style={{ height: "1px", background: "rgba(198,166,100,0.2)" }} />
              <p className="flex items-center gap-2 pt-1" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                <span style={{ color: "var(--gold)" }}>✦</span>
                {SYMPOSIUM_CONFIG.coordinators.convener}
              </p>
            </div>

            <div className="washi-card p-6 flex flex-col gap-3">
              <span className="seal-badge w-fit" style={{ color: "var(--muted-red)", borderColor: "rgba(176,65,62,0.3)" }}>
                Co-Convener
              </span>
              <div style={{ height: "1px", background: "rgba(198,166,100,0.2)" }} />
              <p className="flex items-center gap-2 pt-1" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                <span style={{ color: "var(--gold)" }}>✦</span>
                {SYMPOSIUM_CONFIG.coordinators.coConvener}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Faculty Coordinators */}
            <div className="washi-card p-6 flex flex-col gap-3">
              <span className="seal-badge w-fit" style={{ color: "var(--muted-red)", borderColor: "rgba(176,65,62,0.3)" }}>
                Faculty Coordinators
              </span>
              <div style={{ height: "1px", background: "rgba(198,166,100,0.2)" }} />
              <ul className="flex flex-col gap-2 pt-1">
                {SYMPOSIUM_CONFIG.coordinators.faculty.map(name => (
                  <li key={name} className="flex items-center gap-2" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                    <span style={{ color: "var(--gold)" }}>✿</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Faculty Co-Coordinators */}
            <div className="washi-card p-6 flex flex-col gap-3">
              <span className="seal-badge w-fit" style={{ color: "var(--gold)", borderColor: "rgba(198,166,100,0.4)", background: "rgba(198,166,100,0.08)" }}>
                Faculty Co-Coordinators
              </span>
              <div style={{ height: "1px", background: "rgba(198,166,100,0.2)" }} />
              <ul className="flex flex-col gap-2 pt-1">
                {SYMPOSIUM_CONFIG.coordinators.facultyCo.map(name => (
                  <li key={name} className="flex items-center gap-2" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                    <span style={{ color: "var(--gold)" }}>✿</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Coordinators */}
            <div className="washi-card p-6 flex flex-col gap-3">
              <span className="seal-badge w-fit" style={{ color: "var(--ink)", borderColor: "rgba(43,43,43,0.2)", background: "rgba(43,43,43,0.05)" }}>
                Student Coordinators
              </span>
              <div style={{ height: "1px", background: "rgba(198,166,100,0.2)" }} />
              <ul className="flex flex-col gap-2 pt-1">
                {SYMPOSIUM_CONFIG.coordinators.student.map(name => (
                  <li key={name} className="flex items-center gap-2" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                    <span style={{ color: "var(--muted-red)" }}>✦</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
