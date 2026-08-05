"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Maximize2, X, Sparkles } from "lucide-react";
import { GALLERY_DATA, GalleryItem } from "@/data/galleryData";

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>NEURAL SNAPSHOTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Symposium{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Visual Gallery
            </span>
          </motion.h2>

          <p className="text-base sm:text-lg text-slate-300 font-light">
            Memorable moments captured across hackathons, keynotes, eSports arenas, and prize ceremonies.
          </p>
        </div>

        {/* Pinterest Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveItem(item)}
              className="relative group rounded-3xl overflow-hidden glass-panel border border-white/10 cursor-pointer break-inside-avoid"
            >
              <div className="overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Hover Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-purple-950/80 border border-purple-500/40 text-cyan-300 mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-slate-950 border border-purple-500/40 shadow-2xl z-10 p-2"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900 border border-white/10 text-white z-20 hover:bg-purple-900"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-2xl mb-4"
              />

              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-1">{activeItem.title}</h3>
                <span className="text-xs font-mono text-cyan-400">{activeItem.category} &bull; ZEIGEN '26</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
