"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { SYMPOSIUM_CONFIG } from "@/constants/config";
import AudioToggle from "./AudioToggle";
import { triggerSamuraiCutAnimation, handleRegisterClick } from "@/utils/samuraiAnimation";

const NAV_LINKS = [
  { name: "Home",     href: "#hero" },
  { name: "About",    href: "#about" },
  { name: "Events",   href: "#events" },
  { name: "Schedule", href: "#schedule" },
  { name: "Speakers", href: "#speakers" },
  { name: "FAQ",      href: "#faq" },
  { name: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sectionIds = NAV_LINKS.map(l => l.href.slice(1));
      const active = sectionIds.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 160 && r.bottom >= 160;
      });
      if (active) setActiveSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
            {/* Red seal circle */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ background: "#B0413E", boxShadow: "0 2px 12px rgba(176,65,62,0.3)" }}
            >
              <span style={{ color: "#FAF8F4", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "var(--font-cormorant), serif" }}>
                ✿
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                }}
              >
                {SYMPOSIUM_CONFIG.name}
              </span>
              <span
                className="block"
                style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--ink-muted)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}
              >
                ACE · CSE · KLNCE
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    color: active ? "var(--muted-red)" : "var(--ink-light)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-1 left-3 right-3 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, var(--gold), var(--muted-red))" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2.5">
            <AudioToggle />

            {/* Register CTA */}
            <a
              href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              className="btn-primary hidden sm:inline-flex"
              style={{ padding: "0.45rem 1.25rem", fontSize: "0.72rem" }}
            >
              Register
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ background: "rgba(198,166,100,0.1)", border: "1px solid rgba(198,166,100,0.25)", color: "var(--ink)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-x-0 top-[68px] z-40 lg:hidden p-5"
            style={{
              background: "rgba(250,248,244,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(198,166,100,0.2)",
              boxShadow: "0 8px 30px rgba(43,43,43,0.08)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    color: "var(--ink-light)",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(198,166,100,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleRegisterClick(e);
                }}
                className="btn-primary mt-2 justify-center"
              >
                Register Now
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
