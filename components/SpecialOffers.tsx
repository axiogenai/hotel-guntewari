'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Award, Leaf } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const SpecialOffers: React.FC = () => {
  const { openBookingModal, activeRestaurant } = useApp();
  
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="special-offers-section" className="relative py-20 overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
          alt="Dining"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.15) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a263]/8 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a263]">
              <div className="w-8 h-px bg-[#c9a263]/50" />
              <Award className="w-3.5 h-3.5" />
              <span>Limited Time</span>
            </div>
            
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
              The Grand<br />
              <span className="italic gold-shimmer-text">Weekend Buffet</span>
            </h2>
            
            <p className="text-stone-300 font-light leading-relaxed max-w-md text-base">
              An unlimited royal spread featuring 40+ authentic Maharashtrian and North Indian delicacies. Available exclusively this weekend.
            </p>

            {/* Countdown */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { val: timeLeft.hours, label: 'Hrs' },
                { val: timeLeft.minutes, label: 'Min' },
                { val: timeLeft.seconds, label: 'Sec' },
              ].map((unit, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="text-xl text-[#c9a263]/50 font-serif-display pb-5">:</div>}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm flex items-center justify-center font-serif-display text-2xl text-white">
                      {String(unit.val).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-stone-500 mt-2">{unit.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => openBookingModal(activeRestaurant)}
              className="px-10 py-4 rounded-full bg-[#c9a263] hover:bg-[#a8874d] text-white font-medium text-sm uppercase tracking-wider transition-all shadow-[0_0_40px_rgba(201,162,99,0.25)] hover:shadow-[0_0_50px_rgba(201,162,99,0.4)] hover:-translate-y-0.5 duration-300 cursor-pointer"
            >
              Book Now & Claim Offer
            </button>
          </motion.div>

          {/* Right Offer Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {/* Birthday Card */}
            <div className="p-7 rounded-3xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md hover:bg-white/[0.1] hover:border-[#c9a263]/30 transition-all duration-500 group">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c9a263]/15 border border-[#c9a263]/25 flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-white transition-all">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-display text-xl font-medium text-white">Birthday Package</h3>
                  <p className="text-sm text-stone-400 font-light leading-relaxed">
                    Complimentary half kg cake, exclusive table decoration, and a dedicated host for your special day.
                  </p>
                  <div className="text-[#c9a263] font-semibold text-xs uppercase tracking-wider">Groups of 6+</div>
                </div>
              </div>
            </div>

            {/* Early Bird Card */}
            <div className="p-7 rounded-3xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md hover:bg-white/[0.1] hover:border-[#c9a263]/30 transition-all duration-500 group">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c9a263]/15 border border-[#c9a263]/25 flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-white transition-all">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-display text-xl font-medium text-white">Early Bird Dinner</h3>
                  <p className="text-sm text-stone-400 font-light leading-relaxed">
                    Flat 15% discount on the entire menu when you dine between 7:00 PM and 8:00 PM daily.
                  </p>
                  <div className="text-[#c9a263] font-semibold text-xs uppercase tracking-wider">Daily Offer</div>
                </div>
              </div>
            </div>

            {/* Pure Veg Card */}
            <div className="p-7 rounded-3xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md hover:bg-white/[0.1] hover:border-[#c9a263]/30 transition-all duration-500 group">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c9a263]/15 border border-[#c9a263]/25 flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-white transition-all">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-display text-xl font-medium text-white">Jain Menu Available</h3>
                  <p className="text-sm text-stone-400 font-light leading-relaxed">
                    Full Jain-friendly menu with no onion, no garlic options across all our signature courses.
                  </p>
                  <div className="text-[#c9a263] font-semibold text-xs uppercase tracking-wider">Always Available</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
