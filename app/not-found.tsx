"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowLeft, ShieldAlert } from "lucide-react";
import NeuralBackground from "@/components/NeuralBackground";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden bg-[#05070D] text-slate-100">
      <NeuralBackground />

      <div className="relative z-10 p-8 sm:p-12 rounded-3xl glass-panel border border-purple-500/40 max-w-lg shadow-[0_0_50px_rgba(124,58,237,0.4)]">
        <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-cyan-400 mx-auto flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 mb-2 font-mono">
          404
        </h1>

        <h2 className="text-xl font-bold text-white mb-4">
          SYNAPTIC DISCONNECTION DETECTED
        </h2>

        <p className="text-sm text-slate-300 font-light leading-relaxed mb-8">
          The neural route you are looking for has been moved, fragmented, or lost in the cyber matrix.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO CYBER MATRIX HOME</span>
        </Link>
      </div>
    </div>
  );
}
