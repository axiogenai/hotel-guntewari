'use client';

import React, { use } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { INITIAL_RESTAURANTS, INITIAL_MENU_ITEMS, INITIAL_CATEGORIES } from '@/lib/mock-data';
import {
  Utensils, Star, MapPin, Clock, Plus, ShoppingBag,
  Award, ChevronLeft, Sparkles, Check
} from 'lucide-react';

function MenuPageContent({ slug }: { slug: string }) {
  const restaurant = INITIAL_RESTAURANTS.find(r => r.slug === slug) || INITIAL_RESTAURANTS[0];
  const menuItems = INITIAL_MENU_ITEMS.filter(i => i.restaurant_id === restaurant.id);
  const categories = INITIAL_CATEGORIES.filter(c => c.restaurant_id === restaurant.id);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500 selection:text-white">
      
      {/* Header Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={restaurant.banner || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        <div className="absolute top-4 left-4 z-10">
          <a
            href="/"
            className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs font-bold flex items-center space-x-1 border border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Axiogen Eats Platform</span>
          </a>
        </div>

        <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto space-y-2">
          <div className="flex items-center space-x-2">
            {restaurant.is_veg_only && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold">
                100% PURE VEG
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current" />
              <span>{restaurant.rating} ({restaurant.reviews_count} reviews)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{restaurant.name}</h1>
          <p className="text-xs text-slate-300 line-clamp-2 max-w-xl">{restaurant.description}</p>
          <div className="text-xs text-slate-400 flex items-center space-x-2 pt-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{restaurant.address}</span>
            <span>•</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{restaurant.opening_hours}</span>
          </div>
        </div>
      </div>

      {/* Digital QR Menu Catalog */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-bold">Contactless Table Menu Activated</span>
          </div>
          <span className="text-slate-400 font-mono">Tenant: {restaurant.slug}.axiogeneats.in</span>
        </div>

        {/* Menu Items List */}
        <div className="space-y-6">
          <h2 className="text-xl font-black tracking-tight border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Utensils className="w-5 h-5 text-red-500" />
            <span>Full Digital Menu ({menuItems.length} Dishes)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all flex items-center justify-between space-x-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center text-[7px] font-black ${item.is_veg ? 'border-emerald-500 text-emerald-500' : 'border-red-500 text-red-500'}`}>
                      ●
                    </span>
                    <h3 className="font-extrabold text-sm text-white">{item.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  <div className="text-sm font-black text-red-400 pt-1">₹{item.price}</div>
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return (
    <AppProvider>
      <MenuPageContent slug={resolvedParams.slug} />
    </AppProvider>
  );
}
