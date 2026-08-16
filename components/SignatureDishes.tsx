'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Plus, Star, ArrowRight } from 'lucide-react';

export const SignatureDishes: React.FC = () => {
  const { menuItems, activeRestaurant, addToCart } = useApp();

  const signatureDishes = menuItems
    .filter(dish => dish.restaurant_id === activeRestaurant?.id && dish.is_bestseller)
    .slice(0, 3);

  if (signatureDishes.length === 0) return null;

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="space-y-3 max-w-lg">
            <div className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a8874d]">
              <div className="w-8 h-px bg-[#c9a263]/50" />
              <span>Chef's Selection</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-[#1c1917]">
              Signature <span className="italic text-[#a8874d]">Dishes</span>
            </h2>
            <p className="text-stone-500 font-light leading-relaxed text-sm">
              Our most celebrated creations, perfected over decades of culinary dedication.
            </p>
          </div>
          
          <button
            onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center space-x-2 text-[#a8874d] text-sm font-medium hover:text-[#1c1917] transition-colors group cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {signatureDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative"
            >
              {/* Image */}
              <div className="relative h-[380px] w-full rounded-3xl overflow-hidden bg-stone-100 mb-5 shadow-lg">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                
                {/* Bestseller Badge */}
                <div className="absolute top-4 left-4 bg-[#1c1917]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9a263] border border-[#c9a263]/30 flex items-center space-x-1.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Signature</span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold text-sm text-[#1c1917] shadow-md">
                  ₹{dish.price}
                </div>

                {/* Quick Add on Hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-10">
                  <button
                    onClick={() => addToCart(dish)}
                    className="w-full py-3.5 rounded-2xl bg-white text-[#1c1917] font-semibold text-sm hover:bg-[#c9a263] hover:text-white transition-all flex items-center justify-center space-x-2 shadow-2xl cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="px-1 space-y-2">
                <h3 className="font-serif-display text-xl font-medium text-[#1c1917] group-hover:text-[#a8874d] transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs text-stone-500 font-light line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
