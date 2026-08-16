'use client';

import React, { useState } from 'react';
import { Restaurant, MenuItem } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import {
  Star, MapPin, Calendar, QrCode, Utensils, Plus, Check,
  Clock, ShieldCheck, Award, Heart
} from 'lucide-react';

export const RestaurantCard: React.FC<{
  restaurant: Restaurant;
  onSelectMenu: (r: Restaurant) => void;
}> = ({ restaurant, onSelectMenu }) => {
  const { openBookingModal, openQRModal, menuItems, addToCart } = useApp();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const restMenuItems = menuItems.filter(i => i.restaurant_id === restaurant.id);
  const isSuspended = restaurant.status === 'suspended';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Restaurant Image Banner Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {restaurant.is_veg_only && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-extrabold shadow-sm backdrop-blur-md flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-white border border-emerald-800" />
              <span>PURE VEG</span>
            </span>
          )}
          {restaurant.is_featured && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[11px] font-extrabold shadow-sm flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>FEATURED</span>
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-2.5 py-1 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-black flex items-center space-x-1 z-10">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{restaurant.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({restaurant.reviews_count})</span>
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl font-black tracking-tight drop-shadow-md">
            {restaurant.name}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1 opacity-90 font-medium">
            {restaurant.cuisine.join(' • ')}
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Address & Hours */}
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>

          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2 mb-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{restaurant.opening_hours}</span>
            </span>
            <span>•</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{restaurant.price_range}</span>
          </div>

          {/* Amenities Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {restaurant.has_ac && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                ❄️ AC
              </span>
            )}
            {restaurant.has_parking && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                🅿️ Parking
              </span>
            )}
            {restaurant.has_outdoor_seating && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                🌿 Outdoor
              </span>
            )}
            {restaurant.is_family_friendly && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                👨‍👩‍👧 Family Friendly
              </span>
            )}
          </div>
        </div>

        {/* Quick Menu Accordion Preview */}
        {showQuickMenu && (
          <div className="my-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 max-h-48 overflow-y-auto">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 flex justify-between items-center mb-1">
              <span>Bestsellers Menu</span>
              <span className="text-[10px] text-slate-400">{restMenuItems.length} dishes</span>
            </div>
            {restMenuItems.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm flex items-center justify-center border text-[8px] font-black ${item.is_veg ? 'border-emerald-600 text-emerald-600' : 'border-red-600 text-red-600'}`}>
                    ●
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">₹{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => openBookingModal(restaurant)}
            disabled={isSuspended}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 text-xs font-bold transition-colors disabled:opacity-50"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => onSelectMenu(restaurant)}
            disabled={isSuspended}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm shadow-red-500/20 disabled:opacity-50"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Order Menu</span>
          </button>
        </div>

        {/* Secondary Actions Row */}
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="hover:text-slate-900 dark:hover:text-white font-medium underline underline-offset-2"
          >
            {showQuickMenu ? 'Hide Quick Menu' : 'Quick Menu Peek'}
          </button>

          <button
            onClick={() => openQRModal(restaurant)}
            className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold"
          >
            <QrCode className="w-3.5 h-3.5 text-indigo-500" />
            <span>View QR Code</span>
          </button>
        </div>

      </div>
    </div>
  );
};
