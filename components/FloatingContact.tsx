'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const FloatingContact: React.FC = () => {
  const { openBookingModal, activeRestaurant } = useApp();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#1c1917]/95 backdrop-blur-xl rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.3)] border border-[#c9a263]/30 p-1.5 flex items-center space-x-1.5 sm:space-x-2 transition-transform hover:scale-105 duration-300">
      
      {/* Book Table Button */}
      <button
        onClick={() => openBookingModal(activeRestaurant)}
        className="flex items-center justify-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#c9a263] text-white hover:bg-[#a8874d] transition-colors shadow-sm cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Book Table</span>
      </button>

      {/* WhatsApp Link */}
      <a
        href="https://wa.me/919822011223?text=Namaste%20Hotel%20Guntewari,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation."
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 flex items-center justify-center transition-colors border border-emerald-500/30"
        title="WhatsApp Us"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>

      {/* Call Link */}
      <a
        href="tel:+919822011223"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors border border-amber-500/30"
        title="Call Us"
        aria-label="Call Us"
      >
        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>

    </div>
  );
};
