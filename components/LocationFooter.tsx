'use client';

import React from 'react';
import { MapPin, Phone, Clock, Camera, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const LocationFooter: React.FC = () => {
  return (
    <footer className="bg-[#1c1917] text-white pt-16 pb-8 border-t-2 border-[#c9a263]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-[#c9a263] rounded-xl flex items-center justify-center bg-[#c9a263]/10">
                <span className="font-serif-display text-lg text-[#c9a263] font-bold">G</span>
              </div>
              <div>
                <h2 className="font-serif-display text-xl font-medium text-white">Hotel Malak</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a263]">Pure Veg Heritage</p>
              </div>
            </div>
            <p className="text-stone-400 font-light text-xs leading-relaxed">
              Authentic Maharashtrian & North Indian fine dining since 2010. Where tradition meets luxury in Peth Vadgaon, Kolhapur.
            </p>
            <div className="flex space-x-2 pt-1">
              <a href="#gallery-section" className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-[#c9a263] hover:border-[#c9a263] transition-all" aria-label="Gallery">
                <Camera className="w-3.5 h-3.5 text-stone-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-[#c9a263] hover:border-[#c9a263] transition-all" aria-label="Website">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
              </a>
              <a href="mailto:contact@malak.com" className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-[#c9a263] hover:border-[#c9a263] transition-all" aria-label="Email">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9a263]">Quick Links</h3>
            <ul className="space-y-2.5 text-stone-400 text-xs font-light">
              <li><a href="#menu-section" className="hover:text-white transition-colors flex items-center space-x-1"><span>→</span><span>Explore Menu</span></a></li>
              <li><a href="#ambiance-section" className="hover:text-white transition-colors flex items-center space-x-1"><span>→</span><span>Our Ambiance</span></a></li>
              <li><a href="#special-offers-section" className="hover:text-white transition-colors flex items-center space-x-1"><span>→</span><span>Special Offers</span></a></li>
              <li><a href="#events-section" className="hover:text-white transition-colors flex items-center space-x-1"><span>→</span><span>Events & Parties</span></a></li>
              <li><a href="#gallery-section" className="hover:text-white transition-colors flex items-center space-x-1"><span>→</span><span>Gallery</span></a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9a263]">Contact & Hours</h3>
            <ul className="space-y-3 text-stone-400 text-xs font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c9a263] shrink-0 mt-0.5" />
                <span>Peth Vadgaon, Kolhapur 416112</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#c9a263] shrink-0" />
                <a href="tel:+919822011223" className="hover:text-white transition-colors">+91 98220 11223</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#c9a263] shrink-0" />
                <span>Daily: 11:00 AM – 11:30 PM</span>
              </li>
            </ul>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full h-40 rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg"
          >
            <iframe
              title="Hotel Malak Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.349791012345!2d74.3006!3d16.8406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUwJzI2LjIiTiA3NMKwMTgnMDIuMiJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'brightness(0.85) contrast(1.1) invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-light text-stone-500">
          <div>&copy; {new Date().getFullYear()} Hotel Malak. All rights reserved.</div>
          <div className="flex items-center space-x-3 text-stone-600">
            <span>Pure Veg</span>
            <div className="w-1 h-1 rounded-full bg-[#c9a263]/40" />
            <span>AC Dining</span>
            <div className="w-1 h-1 rounded-full bg-[#c9a263]/40" />
            <span>Valet Parking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
