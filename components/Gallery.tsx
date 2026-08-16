'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', title: 'Royal Maharashtrian Thali' },
    { src: 'https://images.unsplash.com/photo-1590846406792-0adc7f928a18?auto=format&fit=crop&q=80&w=800', title: 'Premium Table Setting' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', title: 'Tandoori Specialties' },
    { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800', title: 'Fine Dining AC Hall' },
    { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=800', title: 'Artisanal Desserts' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', title: 'Evening Courtyard' },
  ];

  return (
    <section id="gallery-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a8874d]">
            <div className="w-8 h-px bg-[#c9a263]/50" />
            <span>Visual Journey</span>
            <div className="w-8 h-px bg-[#c9a263]/50" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-[#1c1917]">
            Our <span className="italic text-[#a8874d]">Gallery</span>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveImage(img.src)}
              className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                <ZoomIn className="w-7 h-7 text-[#c9a263] mb-3 scale-75 group-hover:scale-100 transition-transform duration-300" />
                <span className="font-serif-display text-sm font-medium">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={activeImage}
              alt="Gallery Lightbox"
              className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
