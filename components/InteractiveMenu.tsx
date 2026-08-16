'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Star, Leaf } from 'lucide-react';

export const InteractiveMenu: React.FC = () => {
  const { menuItems, activeRestaurant, categories, addToCart } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDishes = menuItems.filter(dish => {
    if (dish.restaurant_id !== activeRestaurant?.id) return false;
    if (selectedCategory !== 'All') {
      const cat = categories.find(c => c.name === selectedCategory);
      if (cat && dish.category_id !== cat.id) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!dish.name.toLowerCase().includes(q) && !dish.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <section id="menu-section" className="relative py-12 sm:py-20 bg-[#faf8f5]">
      {/* Dot Pattern Texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a263 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header + Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#e8e2d8]"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a8874d]">
              <div className="w-6 sm:w-8 h-px bg-[#c9a263]/50" />
              <span>Full Menu</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#1c1917]">
              A Symphony of <span className="italic text-[#a8874d]">Flavors</span>
            </h2>
          </div>

          <div className="relative flex items-center bg-white rounded-2xl border border-[#e8e2d8] px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs hover:border-[#c9a263]/60 transition-colors w-full md:w-72 group">
            <Search className="w-4 h-4 text-stone-400 group-hover:text-[#c9a263] mr-2.5 transition-colors shrink-0" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#1c1917] placeholder-stone-400 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#1c1917] text-white shadow-md'
                : 'bg-white text-stone-600 border border-[#e8e2d8] hover:border-[#c9a263]'
            }`}
          >
            All Dishes
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#1c1917] text-white shadow-md'
                  : 'bg-white text-stone-600 border border-[#e8e2d8] hover:border-[#c9a263]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dishes Grid - Responsive 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredDishes.map(dish => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                key={dish.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#e8e2d8] overflow-hidden hover:shadow-xl hover:border-[#c9a263]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {dish.is_bestseller && (
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#1c1917]/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#c9a263] border border-[#c9a263]/30 flex items-center space-x-1 shadow-xs">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                        <span>Bestseller</span>
                      </div>
                    )}

                    {/* Veg Mark */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 rounded bg-white border border-green-600 flex items-center justify-center shadow-xs">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-600" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif-display font-medium text-base sm:text-lg text-[#1c1917] leading-snug group-hover:text-[#a8874d] transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-bold text-base text-[#1c1917] shrink-0">
                        ₹{dish.price}
                      </span>
                    </div>
                    
                    <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Add to Order CTA */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => addToCart(dish)}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d8] text-[#1c1917] font-medium text-xs uppercase tracking-wider hover:bg-[#1c1917] hover:text-white hover:border-[#1c1917] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredDishes.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-3">
              <Leaf className="w-8 h-8 text-[#c9a263] mx-auto" />
              <p className="text-stone-500 font-light">No dishes found matching your search.</p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
