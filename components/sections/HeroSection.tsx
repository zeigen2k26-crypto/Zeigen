"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowDown, Calendar, MapPin, AlertCircle } from "lucide-react";
import { SYMPOSIUM_CONFIG } from "@/constants/config";
import { triggerSamuraiCutAnimation, handleRegisterClick } from "@/utils/samuraiAnimation";

/* ─── Countdown hook ─── */
function useCountdown(targetISO: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}

/* ─── Web Audio API Slash Sound Synthesizer ─── */
function playSlashSound() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const bufferSize = Math.floor(ctx.sampleRate * 0.28);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(700, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3600, ctx.currentTime + 0.08);
    filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.25);
    filter.Q.value = 3.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.27);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.28);
  } catch {
    // Browser autoplay policy catch
  }
}

interface BurstPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  size: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = ["#F5B7C4", "#FDEEF3", "#F8D7DA", "#EDD5E5", "#E84A43", "#FFD700"];

/* ─── Japanese Landscape Scene with Torii Gate & Samurai Tree Animation ─── */
function LandscapeScene() {
  const [cutState, setCutState] = useState<"idle" | "slashing" | "sliced" | "resetting">("idle");
  const [burstPetals, setBurstPetals] = useState<BurstPetal[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const handleCutTrigger = useCallback(() => {
    if (cutState !== "idle") return;

    playSlashSound();
    setCutState("slashing");

    // At 180ms, the blade hits the tree
    setTimeout(() => {
      setCutState("sliced");

      // Generate 50 burst petals originating from tree cut point (x: 1202, y: 485)
      const newPetals: BurstPetal[] = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: 1202 + (Math.random() - 0.5) * 15,
        y: 485 + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.55) * 16,
        vy: -Math.random() * 10 - 2,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 18,
        size: Math.random() * 7 + 4,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.6,
      }));
      setBurstPetals(newPetals);
    }, 180);

    // Reset after 3.5s
    setTimeout(() => {
      setCutState("resetting");
    }, 3500);

    setTimeout(() => {
      setCutState("idle");
      setBurstPetals([]);
    }, 4300);
  }, [cutState]);

  useEffect(() => {
    const listener = () => handleCutTrigger();
    window.addEventListener("samurai-cut-tree", listener);
    return () => window.removeEventListener("samurai-cut-tree", listener);
  }, [handleCutTrigger]);

  // Animate burst petals trajectory
  useEffect(() => {
    if (burstPetals.length === 0) return;

    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      setBurstPetals((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt * 45,
            y: p.y + p.vy * dt * 45,
            vy: p.vy + 8 * dt, // gravity
            rot: p.rot + p.vRot,
            opacity: Math.max(0, p.opacity - 0.22 * dt),
          }))
          .filter((p) => p.opacity > 0.05 && p.y < 820)
      );

      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [burstPetals.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #C8B8D8 0%, #E8C8C4 18%, #F5D4C4 38%, #FAE8DC 58%, #FDF4EE 78%, #FAF8F4 100%)",
        }}
      />

      {/* Animated sunlight pulse */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "8%", left: "50%", transform: "translateX(-50%)",
          width: "320px", height: "320px",
          background: "radial-gradient(circle, rgba(255,218,160,0.38) 0%, rgba(255,200,140,0.18) 38%, transparent 70%)",
          animation: "sun-breathe 5s ease-in-out infinite",
        }}
      />

      {/* Landscape SVG */}
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "100%" }}
      >
        <defs>
          <linearGradient id="mist1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4D0C4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D8C4B4" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="mist2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B09A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#B89880" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A89070" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#907860" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="slashGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B0413E" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Far mountains — misty, pale */}
        <path
          d="M 0 600 C 120 530 270 560 420 490 C 570 420 720 455 870 400 C 1020 345 1170 370 1320 415 C 1400 440 1440 460 1440 475 L 1440 820 L 0 820 Z"
          fill="url(#mist1)"
        />

        {/* Mid mountains */}
        <path
          d="M 0 680 C 100 645 230 660 390 618 C 550 575 680 600 840 568 C 1000 536 1120 560 1290 590 C 1390 608 1440 622 1440 635 L 1440 820 L 0 820 Z"
          fill="url(#mist2)"
        />

        {/* Near ground hills */}
        <path
          d="M 0 758 C 120 738 280 748 460 722 C 640 696 780 715 960 705 C 1140 695 1300 714 1440 728 L 1440 820 L 0 820 Z"
          fill="url(#ground)"
        />

        {/* Ground base */}
        <rect x="0" y="795" width="1440" height="25" fill="#8A7058" />

        {/* ── Torii Gate (Grounded on Right Midground Hill: x ~ 940-1060) ── */}
        <g id="torii-gate">
          {/* Post base footing shadows */}
          <ellipse cx="954.5" cy="711" rx="14" ry="4.5" fill="#5A3E2B" opacity="0.5" />
          <ellipse cx="1028.5" cy="711" rx="14" ry="4.5" fill="#5A3E2B" opacity="0.5" />

          {/* Stone base footings (Kamebara) */}
          <rect x="944" y="698" width="21" height="14" rx="2.5" fill="#3A2818" />
          <rect x="1018" y="698" width="21" height="14" rx="2.5" fill="#3A2818" />

          {/* Left post */}
          <rect x="948" y="475" width="13" height="225" rx="4" fill="#B0413E" />
          {/* Right post */}
          <rect x="1022" y="475" width="13" height="225" rx="4" fill="#B0413E" />

          {/* Kasagi — top curved main beam */}
          <path d="M 920 475 Q 991 448 1062 475" stroke="#B0413E" strokeWidth="16" fill="none" strokeLinecap="round" />
          {/* Upper cap (Kasagi top ridge) */}
          <path d="M 918 472 Q 991 445 1064 472" stroke="#8B2E2C" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Shimaki — straight second beam */}
          <rect x="935" y="500" width="112" height="11" rx="3" fill="#B0413E" />

          {/* Nuki — lower connector bar */}
          <rect x="942" y="525" width="98" height="9" rx="2.5" fill="#B0413E" />

          {/* Center wooden plaque (Gakuzuka) */}
          <rect x="984" y="500" width="14" height="25" fill="#2B2B2B" rx="1.5" />
          <rect x="985" y="501" width="12" height="23" stroke="#C6A664" strokeWidth="1" fill="none" rx="1" />
          <text x="991" y="517" textAnchor="middle" fill="#C6A664" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            祭
          </text>

          {/* Paper Lantern (Chochin) hanging from center Nuki */}
          <g>
            <line x1="991" y1="534" x2="991" y2="546" stroke="#3A2818" strokeWidth="1.5" />
            <circle cx="991" cy="558" r="16" fill="rgba(255,200,100,0.35)" />
            <ellipse cx="991" cy="558" rx="8" ry="11" fill="#D32F2F" />
            <line x1="984" y1="554" x2="998" y2="554" stroke="#FAF8F4" strokeWidth="1" opacity="0.8" />
            <line x1="984" y1="562" x2="998" y2="562" stroke="#FAF8F4" strokeWidth="1" opacity="0.8" />
            <line x1="991" y1="569" x2="991" y2="576" stroke="#C6A664" strokeWidth="1.5" />
          </g>
        </g>

        {/* ── Cherry Blossom Tree (Base & Lower Trunk) ── */}
        <g>
          {/* Ground trunk base */}
          <path
            d="M 1195 820 C 1188 730 1182 640 1190 560 C 1193 530 1198 505 1202 485"
            stroke="#3A2818" strokeWidth="20" fill="none" strokeLinecap="round"
          />

          {/* Lower cut surface face (visible when sliced) */}
          {(cutState === "sliced" || cutState === "resetting") && (
            <motion.path
              d="M 1190 488 L 1215 480"
              stroke="#FFD700" strokeWidth="6" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.7, 0] }}
              transition={{ duration: 1.2 }}
            />
          )}

          {/* ── Upper Trunk & Canopy (SLICED ANIMATION GROUP) ── */}
          <motion.g
            animate={
              cutState === "sliced"
                ? { x: 38, y: 22, rotate: 16 }
                : cutState === "resetting"
                ? { x: 0, y: 0, rotate: 0 }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={
              cutState === "sliced"
                ? { type: "spring", stiffness: 100, damping: 9 }
                : { duration: 0.9, ease: "easeInOut" }
            }
            style={{ transformOrigin: "1202px 485px" }}
          >
            {/* Upper trunk segment */}
            <path
              d="M 1202 485 C 1206 460 1210 440 1215 420"
              stroke="#3A2818" strokeWidth="20" fill="none" strokeLinecap="round"
            />
            {/* Upper cut surface glow */}
            {(cutState === "sliced" || cutState === "resetting") && (
              <line x1="1192" y1="487" x2="1215" y2="480" stroke="#FF5566" strokeWidth="4" />
            )}

            {/* Left main branch */}
            <path d="M 1215 420 C 1175 388 1100 355 1045 320"
              stroke="#3A2818" strokeWidth="13" fill="none" strokeLinecap="round" />
            {/* Right main branch */}
            <path d="M 1215 420 C 1250 385 1310 355 1360 330"
              stroke="#3A2818" strokeWidth="13" fill="none" strokeLinecap="round" />
            {/* Sub-branches */}
            <path d="M 1105 348 C 1090 315 1075 278 1070 248"
              stroke="#3A2818" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 1310 348 C 1325 315 1340 278 1345 248"
              stroke="#3A2818" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 1175 375 C 1160 340 1148 308 1142 282"
              stroke="#3A2818" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 1250 375 C 1265 340 1278 308 1282 282"
              stroke="#3A2818" strokeWidth="7" fill="none" strokeLinecap="round" />

            {/* Blossom clusters */}
            {([
              [1045,310,28],[1068,268,26],[1100,248,22],[1080,282,20],[1055,288,18],
              [1142,270,24],[1160,248,20],[1130,232,22],
              [1215,400,22],[1230,368,26],[1265,330,24],[1305,298,22],[1340,262,26],[1360,248,20],[1370,278,18],
              [1280,268,20],[1252,280,18],[1300,232,22],
            ] as [number,number,number][]).map(([cx,cy,r],i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#F5B7C4" opacity="0.75" />
            ))}
            {([
              [1050,302,13],[1072,262,14],[1228,362,12],[1308,292,13],[1283,264,11],[1345,254,12]
            ] as [number,number,number][]).map(([cx,cy,r],i) => (
              <circle key={`h${i}`} cx={cx} cy={cy} r={r} fill="#FDEEF3" opacity="0.9" />
            ))}
          </motion.g>
        </g>

        {/* ── Blade Slash Flash & Shockwave ── */}
        <AnimatePresence>
          {(cutState === "slashing" || cutState === "sliced") && (
            <g key="slash-flash">
              {/* Main glowing white katana slash trajectory */}
              <motion.line
                x1="1110" y1="540" x2="1295" y2="430"
                stroke="url(#slashGradient)" strokeWidth="8" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                filter="drop-shadow(0 0 14px #FFD700)"
              />
              {/* Secondary white blade core */}
              <motion.line
                x1="1110" y1="540" x2="1295" y2="430"
                stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Slash impact shockwave ring */}
              <motion.circle
                cx="1202" cy="485" r="8"
                fill="none" stroke="#FF5566" strokeWidth="3"
                initial={{ r: 4, opacity: 1 }}
                animate={{ r: 65, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </g>
          )}
        </AnimatePresence>

        {/* ── Burst Sakura Petals ── */}
        {burstPetals.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
          />
        ))}

        {/* ── Samurai silhouette (near tree base) ── */}
        <motion.g
          animate={
            cutState === "slashing" || cutState === "sliced"
              ? { x: 1162, y: 712, rotate: -12, scale: 1.08 }
              : { x: 1160, y: 715, rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.22, ease: "easeOut" }}
          opacity="0.9"
        >
          {/* Head */}
          <circle cx="0" cy="-108" r="11" fill="#2B2B2B" />
          {/* Topknot */}
          <ellipse cx="0" cy="-122" rx="4" ry="6" fill="#2B2B2B" />
          {/* Body / kimono */}
          <path d="M -16 -97 L -14 -55 C -14 -50 14 -50 14 -55 L 16 -97 C 8 -103 -8 -103 -16 -97 Z" fill="#2B2B2B" />
          {/* Left arm holding sword */}
          <path d="M -14 -88 L -28 -70 L -18 -60" stroke="#2B2B2B" strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Right arm */}
          <path d="M 14 -88 L 22 -76" stroke="#2B2B2B" strokeWidth="9" fill="none" strokeLinecap="round" />

          {/* Dynamic Katana blade */}
          {cutState === "slashing" || cutState === "sliced" ? (
            <motion.g
              initial={{ rotate: -40 }}
              animate={{ rotate: 55 }}
              transition={{ duration: 0.25 }}
              style={{ transformOrigin: "-20px -62px" }}
            >
              <path d="M -20 -62 L 60 -115" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 0 8px #FFD700)" />
              <path d="M -20 -62 L 60 -115" stroke="#2B2B2B" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          ) : (
            <g>
              <path d="M -20 -62 L 30 -10" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="8" cy="-37" rx="6.5" ry="3" fill="#2B2B2B" transform="rotate(45 8 -37)" />
            </g>
          )}

          {/* Legs */}
          <path d="M -9 -52 L -12 0" stroke="#2B2B2B" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 9 -52 L 14 0" stroke="#2B2B2B" strokeWidth="10" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* ── Distant pine trees (horizon) ── */}
        {[180, 280, 350, 1080, 1170].map((x, i) => {
          const h = [70, 55, 80, 65, 75][i];
          const y = 635 - h;
          return (
            <g key={i} opacity="0.4">
              <polygon
                points={`${x},${y} ${x-14},${y+h} ${x+14},${y+h}`}
                fill="#5A4A3A"
              />
              <rect x={x-3} y={y+h} width="6" height="18" fill="#4A3828" />
            </g>
          );
        })}

        {/* Atmospheric mist layer */}
        <rect x="0" y="540" width="1440" height="80" fill="url(#mist1)" opacity="0.28" />
      </svg>

      {/* Drifting clouds — layer 1 */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "14%", left: "-20%", animation: "drift-cloud-1 95s linear infinite" }}
      >
        <svg viewBox="0 0 700 90" width="600" style={{ opacity: 0.22 }}>
          <ellipse cx="180" cy="55" rx="130" ry="38" fill="white" />
          <ellipse cx="270" cy="40" rx="90" ry="28" fill="white" />
          <ellipse cx="140" cy="60" rx="70" ry="22" fill="white" />
          <ellipse cx="340" cy="48" rx="60" ry="20" fill="white" />
        </svg>
      </div>

      {/* Drifting clouds — layer 2 */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "28%", left: "30%", animation: "drift-cloud-2 130s linear infinite" }}
      >
        <svg viewBox="0 0 500 70" width="420" style={{ opacity: 0.16 }}>
          <ellipse cx="120" cy="45" rx="100" ry="30" fill="white" />
          <ellipse cx="200" cy="32" rx="70" ry="22" fill="white" />
          <ellipse cx="90" cy="50" rx="55" ry="18" fill="white" />
        </svg>
      </div>

      {/* Flying birds */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "22%", left: "-5%", animation: "fly-bird 55s linear infinite" }}
      >
        <svg viewBox="0 0 80 30" width="60" style={{ opacity: 0.28 }}>
          <path d="M 10 15 Q 20 8 30 15 Q 40 22 50 15 Q 60 8 70 15" stroke="#4A3728" strokeWidth="1.5" fill="none" />
          <path d="M 35 12 Q 40 6 45 12" stroke="#4A3728" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Main Hero Section ─── */
export default function HeroSection() {
  const countdown = useCountdown("2026-08-28T09:00:00");
  const countUnits = [
    { label: "Days",    value: countdown.days },
    { label: "Hours",   value: countdown.hours },
    { label: "Min",     value: countdown.minutes },
    { label: "Sec",     value: countdown.seconds },
  ];

  const words = ["ZEIGEN", "'26"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      <LandscapeScene />

      {/* Content overlay */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20"
        style={{ display: "flex", alignItems: "center", minHeight: "100vh" }}
      >
        <div className="max-w-2xl">

          {/* Institutional Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6"
          >
            {/* 1st in Hierarchy: KLN College of Engineering */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "0.03em",
                lineHeight: 1.2,
                marginBottom: "0.4rem",
              }}
            >
              {SYMPOSIUM_CONFIG.college}
            </h2>

            {/* 2nd in Hierarchy: Department of CSE & ACE */}
            <div
              className="flex flex-wrap items-center gap-2"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ color: "var(--muted-red)" }}>
                {SYMPOSIUM_CONFIG.department}
              </span>
              <span style={{ color: "var(--gold)" }}>•</span>
              <span style={{ color: "var(--ink)" }}>
                {SYMPOSIUM_CONFIG.association}
              </span>
            </div>

            {/* Symposium Date Badge */}
            <div>
              <span
                className="seal-badge"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                ✿ National Level Technical Symposium · {SYMPOSIUM_CONFIG.date}
              </span>
            </div>
          </motion.div>

          {/* Main title — brushstroke word reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="flex flex-wrap items-baseline"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                gap: "0.18em",
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0, rotateX: -30 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.14, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                  style={{
                    display: "inline-block",
                    color: i === 0 ? "var(--ink)" : "var(--muted-red)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--ink-light)",
              letterSpacing: "0.01em",
              marginBottom: "0.6rem",
            }}
          >
            Where Innovation Meets Tradition
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              marginBottom: "2rem",
            }}
          >
            Think · Connect · Transform
          </motion.p>

          {/* Registration deadline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            className="flex items-center gap-2 mb-6"
            style={{
              fontSize: "0.75rem",
              color: "#92600A",
              fontFamily: "var(--font-inter), sans-serif",
              background: "rgba(198,140,40,0.08)",
              border: "1px solid rgba(198,140,40,0.25)",
              borderRadius: "8px",
              padding: "0.5rem 0.85rem",
              display: "inline-flex",
            }}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Registration closes: <strong style={{ marginLeft: "0.25rem" }}>{SYMPOSIUM_CONFIG.registrationDeadline}</strong>
          </motion.div>

          {/* Meta badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {[
              { icon: Calendar, text: SYMPOSIUM_CONFIG.date },
              { icon: MapPin,   text: "PG Conference Hall" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-inter), sans-serif",
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(43,43,43,0.1)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.85rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.1 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <a
              href={SYMPOSIUM_CONFIG.GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              className="btn-primary"
            >
              Register Now
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="#events" className="btn-secondary">
              Explore Events
            </a>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.75rem" }}>
              Countdown to August 28
            </p>
            <div className="flex items-center gap-3">
              {countUnits.map((u, i) => (
                <React.Fragment key={u.label}>
                  <div
                    className="flex flex-col items-center"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(43,43,43,0.1)",
                      borderRadius: "10px",
                      padding: "0.55rem 0.9rem",
                      backdropFilter: "blur(8px)",
                      minWidth: "52px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "var(--muted-red)",
                        lineHeight: 1,
                      }}
                    >
                      {String(u.value).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.12em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginTop: "0.2rem" }}>
                      {u.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant), serif", fontSize: "1.2rem", fontWeight: 300, opacity: 0.7 }}>:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--ink-subtle)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: "var(--gold)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
