"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-14 h-7 p-1 rounded-full border transition-all duration-500 focus:outline-none ${
        isLight
          ? "bg-slate-200 border-purple-400/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          : "bg-slate-900/80 border-cyan-500/40 shadow-[0_0_15px_rgba(96,165,250,0.3)]"
      }`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
      title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
    >
      {/* Background Icons */}
      <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ml-0.5 ${isLight ? "text-amber-500 opacity-100" : "text-slate-500 opacity-40"}`} />
      <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 mr-0.5 ${isLight ? "text-slate-400 opacity-40" : "text-cyan-300 opacity-100"}`} />

      {/* Sliding Toggle Knob */}
      <motion.div
        className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md border ${
          isLight
            ? "bg-gradient-to-tr from-amber-400 to-orange-400 border-amber-300 text-white"
            : "bg-gradient-to-tr from-cyan-500 to-blue-600 border-cyan-300 text-white"
        }`}
        animate={{
          x: isLight ? 0 : 26,
          rotate: isLight ? 0 : 360,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5 animate-spin-slow" />
        ) : (
          <Moon className="w-3.5 h-3.5" />
        )}
      </motion.div>
    </motion.button>
  );
}
