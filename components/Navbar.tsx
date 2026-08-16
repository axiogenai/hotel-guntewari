'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Calendar, QrCode,
  MessageSquare, Menu, X, UserCheck, ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<{
  activeView: 'menu' | 'dashboard' | 'admin' | 'tracker';
  setActiveView: (v: 'menu' | 'dashboard' | 'admin' | 'tracker') => void;
}> = ({ activeView, setActiveView }) => {
  const {
    currentUser, setRole, cart, setIsCartOpen,
    setIsAIAssistantOpen, openBookingModal, openQRModal,
    activeRestaurant, setIsWhatsAppDrawerOpen, whatsappLogs
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#1c1917]/95 backdrop-blur-xl text-white border-b border-[#c9a263]/15 shadow-[0_1px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand */}
          <button
            onClick={() => setActiveView('menu')}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 border border-[#c9a263]/50 rounded-lg flex items-center justify-center bg-[#c9a263]/10 group-hover:bg-[#c9a263] transition-all">
              <span className="font-serif-display text-sm text-[#c9a263] font-bold group-hover:text-white transition-colors">G</span>
            </div>
            <div>
              <div className="font-serif-display font-medium text-base sm:text-lg text-white leading-none group-hover:text-[#c9a263] transition-colors">
                Hotel Malak
              </div>
              <div className="text-[8px] font-semibold text-[#c9a263]/70 tracking-[0.2em] uppercase">
                Pure Veg Heritage
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'Menu', action: () => setActiveView('menu'), active: activeView === 'menu' },
              { label: 'Reservations', action: () => openBookingModal(activeRestaurant), active: false },
              { label: 'Digital Menu', action: () => openQRModal(activeRestaurant), active: false },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer relative py-1 ${
                  item.active
                    ? 'text-[#c9a263]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {item.label}
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a263]" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Concierge */}
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="hidden md:flex px-3 py-1.5 rounded-lg text-[9px] font-semibold uppercase tracking-wider border border-[#c9a263]/30 text-[#c9a263] hover:bg-[#c9a263] hover:text-white transition-all items-center space-x-1.5 bg-[#c9a263]/5 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Concierge</span>
            </button>
            
            {/* Owner CRM Switch */}
            <button
              onClick={() => {
                const newRole = currentUser.role === 'customer' ? 'owner' : 'customer';
                setRole(newRole);
                setActiveView(newRole === 'owner' ? 'dashboard' : 'menu');
              }}
              className="hidden sm:flex items-center space-x-1 px-2 py-1.5 rounded-lg text-[8px] tracking-[0.15em] uppercase font-bold text-stone-500 hover:text-white bg-white/[0.04] border border-white/[0.06] transition-colors cursor-pointer"
            >
              <UserCheck className="w-3 h-3 text-[#c9a263]" />
              <span>{currentUser.role === 'customer' ? 'Owner' : 'Exit'}</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => setIsWhatsAppDrawerOpen(true)}
              className="relative p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Alerts"
            >
              <MessageSquare className="w-4 h-4" />
              {whatsappLogs.length > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c9a263] animate-pulse" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#c9a263] hover:bg-[#a8874d] text-white transition-all shadow-lg text-xs font-medium cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-wider uppercase hidden sm:inline">Order</span>
              {totalCartCount > 0 && (
                <span className="ml-1 bg-white text-[#1c1917] text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#c9a263]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#141210] border-b border-[#c9a263]/15 px-6 py-6 space-y-4"
          >
            {[
              { label: 'Menu & Dishes', action: () => { setActiveView('menu'); setMobileMenuOpen(false); } },
              { label: 'Reserve Table', action: () => { openBookingModal(activeRestaurant); setMobileMenuOpen(false); }, icon: Calendar },
              { label: 'Digital Menu QR', action: () => { openQRModal(activeRestaurant); setMobileMenuOpen(false); }, icon: QrCode },
              { label: 'AI Concierge', action: () => { setIsAIAssistantOpen(true); setMobileMenuOpen(false); }, icon: MessageSquare },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full text-left text-sm font-medium uppercase tracking-wider text-stone-300 hover:text-[#c9a263] py-2 border-b border-white/[0.04] flex items-center space-x-3 cursor-pointer transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4 text-[#c9a263]" />}
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                const newRole = currentUser.role === 'customer' ? 'owner' : 'customer';
                setRole(newRole);
                setActiveView(newRole === 'owner' ? 'dashboard' : 'menu');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs font-bold uppercase tracking-widest text-stone-500 py-2 flex items-center space-x-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#c9a263]" />
              <span>{currentUser.role === 'customer' ? 'Switch to Owner CRM' : 'Exit Owner CRM'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
