'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ChefHat, Shield, Timer, Heart } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    { icon: Leaf, title: 'Farm-Fresh Daily', desc: 'Ingredients sourced every morning from local organic farms.' },
    { icon: ChefHat, title: 'Master Chefs', desc: 'Decades of heritage culinary expertise in every dish.' },
    { icon: Shield, title: 'Spotless Hygiene', desc: 'FSSAI certified kitchen with hospital-grade cleanliness.' },
    { icon: Timer, title: 'Swift Service', desc: 'Hot, fresh food at your table within minutes of ordering.' },
    { icon: Heart, title: 'Family Warmth', desc: 'A space designed for love, laughter, and togetherness.' }
  ];

  return (
    <section className="relative py-20 bg-[#1c1917] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a263]/10 rounded-full blur-[150px]" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a263]">
            <div className="w-8 h-px bg-[#c9a263]/50" />
            <span>Our Promise</span>
            <div className="w-8 h-px bg-[#c9a263]/50" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-normal">
            Why <span className="italic gold-shimmer-text">Malak?</span>
          </h2>
          <p className="text-stone-400 font-light leading-relaxed text-sm">
            Five pillars of excellence that define every meal at Hotel Malak.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] hover:border-[#c9a263]/40 hover:bg-white/[0.07] transition-all duration-500 text-center space-y-4 backdrop-blur-sm"
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#c9a263]/10 border border-[#c9a263]/20 flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-white group-hover:border-[#c9a263] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,162,99,0.3)]">
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="font-serif-display font-medium text-base text-white">
                  {reason.title}
                </h3>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  {reason.desc}
                </p>

                {/* Hover Glow Underline */}
                <div className="w-0 group-hover:w-8 h-0.5 bg-[#c9a263] mx-auto transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
