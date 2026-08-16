'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Users, PartyPopper, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const EventsSection: React.FC = () => {
  const { openBookingModal, activeRestaurant } = useApp();

  const events = [
    {
      icon: PartyPopper,
      title: 'Birthday Parties',
      desc: 'Exclusive decorations, complimentary cake, and a dedicated host for birthdays with large groups.',
      tag: 'Most Popular'
    },
    {
      icon: CalendarHeart,
      title: 'Anniversaries',
      desc: 'Intimate private dining setups with candlelight, custom menus, and floral arrangements.',
      tag: 'Premium'
    },
    {
      icon: Users,
      title: 'Corporate Events',
      desc: 'AC conference dining with projector access, customizable catering packages, and professional service.',
      tag: 'Business'
    }
  ];

  return (
    <section id="events-section" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
          alt="Celebration"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.12) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a263]">
            <div className="w-8 h-px bg-[#c9a263]/50" />
            <span>Celebrate with Us</span>
            <div className="w-8 h-px bg-[#c9a263]/50" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white">
            Events & <span className="italic gold-shimmer-text">Celebrations</span>
          </h2>
          <p className="text-stone-400 font-light leading-relaxed text-sm max-w-md mx-auto">
            Turn your gatherings into grand memories with our curated event packages.
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-[#c9a263]/30 transition-all duration-500 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#c9a263]/10 border border-[#c9a263]/20 flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#c9a263] bg-[#c9a263]/10 px-3 py-1 rounded-full border border-[#c9a263]/20">
                    {event.tag}
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-medium text-white">{event.title}</h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  {event.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => openBookingModal(activeRestaurant)}
            className="px-10 py-4 rounded-full bg-[#c9a263] hover:bg-[#a8874d] text-white font-medium text-sm uppercase tracking-wider transition-all shadow-[0_0_40px_rgba(201,162,99,0.25)] hover:-translate-y-0.5 duration-300 inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Enquire for Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
