'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Utensils, MessageSquare, Star, Leaf, Clock, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Hero: React.FC = () => {
  const { openBookingModal, activeRestaurant, setIsAIAssistantOpen } = useApp();

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] w-full overflow-hidden flex items-center justify-center">
      
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0">
        {/* Main Image */}
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=85&w=2000"
          alt="Hotel Malak"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) contrast(1.2) saturate(1.1)' }}
        />
        {/* Cinematic Gradient: dark bottom + warm vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
        {/* Gold warm tint */}
        <div className="absolute inset-0 bg-[#c9a263]/[0.04]" />
      </div>

      {/* === DECORATIVE ELEMENTS === */}
      {/* Corner Ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#c9a263]/30 z-10 hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#c9a263]/30 z-10 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#c9a263]/30 z-10 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#c9a263]/30 z-10 hidden lg:block" />

      {/* Floating Ambient Orbs */}
      <div className="absolute top-1/4 left-[15%] w-64 h-64 bg-[#c9a263]/10 rounded-full blur-[100px] animate-glow z-0" />
      <div className="absolute bottom-1/4 right-[10%] w-48 h-48 bg-[#c9a263]/8 rounded-full blur-[80px] animate-glow z-0" style={{ animationDelay: '2s' }} />

      {/* === HERO CONTENT === */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Ornamental Top Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a263] to-transparent mb-8"
        />

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center space-x-2 text-[#c9a263] text-[11px] font-semibold uppercase tracking-[0.35em] mb-6"
        >
          <MapPin className="w-3 h-3" />
          <span>Peth Vadgaon, Kolhapur</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-elegant text-lg sm:text-xl text-[#c9a263]/80 italic tracking-wide mb-4"
        >
          Pure Vegetarian Fine Dining Since 2010
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif-display text-6xl sm:text-8xl md:text-9xl font-normal text-white tracking-tight leading-[0.95] mb-6"
        >
          Hotel
          <br />
          <span className="gold-shimmer-text">Malak</span>
        </motion.h1>

        {/* Gold Ornamental Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c9a263]/60" />
          <Leaf className="w-4 h-4 text-[#c9a263]/60 rotate-45" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c9a263]/60" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-stone-300 text-base sm:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed mb-10"
        >
          Authentic Maharashtrian thalis, royal tandoori delicacies, and gourmet South Indian specialties — crafted with heritage & served with pride.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => openBookingModal(activeRestaurant)}
            className="group px-10 py-4 rounded-full bg-[#c9a263] hover:bg-[#a8874d] text-white font-medium text-sm tracking-wider uppercase transition-all shadow-[0_0_40px_rgba(201,162,99,0.3)] hover:shadow-[0_0_50px_rgba(201,162,99,0.45)] hover:-translate-y-0.5 duration-300 flex items-center space-x-3 cursor-pointer"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Reserve Your Table</span>
          </button>

          <button
            onClick={scrollToMenu}
            className="px-10 py-4 rounded-full text-white font-medium text-sm tracking-wider uppercase transition-all border border-white/20 hover:border-[#c9a263]/60 hover:bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 duration-300 flex items-center space-x-3 cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-[#c9a263]" />
            <span>View Our Menu</span>
          </button>

          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="px-8 py-4 rounded-full text-stone-400 hover:text-white font-medium text-sm tracking-wide transition-all border border-white/10 hover:border-white/25 flex items-center space-x-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#c9a263]" />
            <span>Concierge</span>
          </button>
        </motion.div>

        {/* Bottom Info Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-wider uppercase text-stone-400 font-light"
        >
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-[#c9a263]" />
            <span>100% Pure Veg</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-[#c9a263]" />
            <span>AC & Family Dining</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-[#c9a263]" />
            <span>Valet Parking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-3 h-3 text-[#c9a263] fill-current" />
            <span>4.9 Rating · 800+ Reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3 text-[#c9a263]" />
            <span>11 AM – 11:30 PM</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
