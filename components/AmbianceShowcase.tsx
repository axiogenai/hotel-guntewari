'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Users, Car, Gift, Leaf } from 'lucide-react';

export const AmbianceShowcase: React.FC = () => {
  const features = [
    { icon: Wind, title: 'Climate Controlled', desc: 'Fully air-conditioned dining halls with ambient temperature control.' },
    { icon: Users, title: 'Family Seating', desc: 'Spacious configurations for large family gatherings and celebrations.' },
    { icon: Car, title: 'Valet Parking', desc: 'Complimentary valet service for a hassle-free arrival experience.' },
    { icon: Gift, title: 'Private Events', desc: 'Exclusive decorated sections for birthdays, anniversaries & more.' }
  ];

  return (
    <section id="ambiance-section" className="relative py-20 bg-[#faf8f5] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a263 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a8874d]">
            <div className="w-8 h-px bg-[#c9a263]/50" />
            <span>The Experience</span>
            <div className="w-8 h-px bg-[#c9a263]/50" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1917]">
            Dine in <span className="italic text-[#a8874d]">Elegance</span>
          </h2>
          <p className="text-stone-500 font-light leading-relaxed text-base max-w-lg mx-auto">
            Every detail is curated to make your visit unforgettable — from the warmth of our hospitality to the grandeur of our interiors.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
          
          {/* Image Collage - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative"
          >
            <div className="grid grid-cols-12 gap-3">
              {/* Large Hero Image */}
              <div className="col-span-7 relative overflow-hidden rounded-3xl shadow-xl h-[420px] group">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
                  alt="Private Dining Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest text-[#a8874d] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  Private Dining Hall
                </div>
              </div>

              {/* Stacked Right Images */}
              <div className="col-span-5 flex flex-col gap-3">
                <div className="relative overflow-hidden rounded-3xl shadow-lg h-[200px] group">
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600"
                    alt="Main Hall"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative overflow-hidden rounded-3xl shadow-lg h-[208px] group">
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600"
                    alt="Garden Seating"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-5 right-6 bg-[#1c1917] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#c9a263]/30 flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c9a263] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#c9a263]">100% Pure Veg</div>
                <div className="text-[10px] text-stone-400">No Onion · No Garlic Options</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Features - Right */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-[#e8e2d8] hover:border-[#c9a263]/50 transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] flex items-center justify-center text-[#c9a263] group-hover:bg-[#1c1917] group-hover:text-white group-hover:border-[#1c1917] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base font-medium text-[#1c1917] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
