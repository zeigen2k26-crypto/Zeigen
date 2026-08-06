"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { SYMPOSIUM_CONFIG } from "@/constants/config";

const SOCIALS = [
  { href: SYMPOSIUM_CONFIG.socials.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SYMPOSIUM_CONFIG.socials.linkedin,  icon: FaLinkedinIn, label: "LinkedIn" },
  { href: SYMPOSIUM_CONFIG.socials.github,    icon: FaGithub,    label: "GitHub" },
  { href: SYMPOSIUM_CONFIG.socials.youtube,   icon: FaYoutube,   label: "YouTube" },
];

// Cherry blossom branch SVG divider
function BlossomBranch() {
  return (
    <svg
      viewBox="0 0 900 80"
      preserveAspectRatio="xMidYMid meet"
      className="w-full"
      style={{ maxHeight: "80px", opacity: 0.55 }}
      aria-hidden
    >
      {/* Main branch */}
      <path d="M 0 55 Q 180 30 360 50 Q 540 70 720 42 Q 820 30 900 45" stroke="#4A3728" strokeWidth="1.5" fill="none" />
      {/* Sub branches */}
      <path d="M 180 40 Q 200 20 220 10" stroke="#4A3728" strokeWidth="1" fill="none" />
      <path d="M 360 50 Q 375 28 400 18" stroke="#4A3728" strokeWidth="1" fill="none" />
      <path d="M 540 58 Q 555 35 580 22" stroke="#4A3728" strokeWidth="1" fill="none" />
      <path d="M 720 42 Q 740 22 760 12" stroke="#4A3728" strokeWidth="1" fill="none" />
      {/* Blossoms */}
      {[
        [215, 8], [225, 14], [208, 15],
        [395, 15], [408, 10], [402, 22],
        [573, 18], [585, 12], [578, 25],
        [752, 10], [764, 16], [758, 6],
        [170, 32], [545, 42],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#F5B7C4" opacity="0.75" />
      ))}
      {[
        [217, 7], [397, 13], [575, 16], [755, 9],
      ].map(([cx, cy], i) => (
        <circle key={`c${i}`} cx={cx} cy={cy} r="2.5" fill="#FDEEF3" opacity="0.9" />
      ))}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--cream)", borderTop: "1px solid rgba(198,166,100,0.18)" }}
      role="contentinfo"
    >
      {/* Cherry blossom branch divider */}
      <div className="w-full overflow-hidden" style={{ marginTop: "-1px" }}>
        <BlossomBranch />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Branding */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.55rem",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.04em",
                marginBottom: "0.5rem",
              }}
            >
              {SYMPOSIUM_CONFIG.name}
            </h3>
            <p style={{ fontSize: "0.72rem", color: "var(--ink-muted)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
              {SYMPOSIUM_CONFIG.association}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", lineHeight: 1.65, fontFamily: "var(--font-inter), sans-serif" }}>
              {SYMPOSIUM_CONFIG.college}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "0.08em", marginBottom: "1rem", textTransform: "uppercase" }}>
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              {["#about", "#events", "#schedule", "#speakers", "#faq", "#contact"].map(href => (
                <a
                  key={href}
                  href={href}
                  className="transition-colors duration-200 w-fit"
                  style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--muted-red)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}
                >
                  {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "0.08em", marginBottom: "1rem", textTransform: "uppercase" }}>
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SYMPOSIUM_CONFIG.contactEmail}`} className="flex items-center gap-2.5" style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--gold)" }} />
                {SYMPOSIUM_CONFIG.contactEmail}
              </a>
              <div className="flex items-center gap-2.5" style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--gold)" }} />
                {SYMPOSIUM_CONFIG.contactPhone}
              </div>
              <div className="flex items-start gap-2.5" style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.55 }}>
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
                {SYMPOSIUM_CONFIG.collegeLocation}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(198,166,100,0.2)", marginBottom: "1.5rem" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: "0.72rem", color: "var(--ink-subtle)", fontFamily: "var(--font-inter), sans-serif" }}>
            © {SYMPOSIUM_CONFIG.year} {SYMPOSIUM_CONFIG.association}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-200 rounded-full p-1.5"
                style={{ color: "var(--ink-muted)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted-red)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink-muted)"; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
