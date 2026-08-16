'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface FilterState {
  vegOnly: boolean;
  nonVegOnly: boolean;
  familyFriendly: boolean;
  hasAC: boolean;
  hasParking: boolean;
  hasOutdoor: boolean;
  minRating: number;
  priceRange: string;
}

export const SearchFilters: React.FC<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}> = ({ filters, setFilters, resetFilters }) => {

  const toggleFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-red-500" />
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            Filter & Refine
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 flex items-center space-x-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Filter Toggle Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Veg Only */}
        <button
          onClick={() => toggleFilter('vegOnly')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
            filters.vegOnly
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-sm border border-emerald-600 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[8px] font-black text-emerald-600">
            ●
          </span>
          <span>Pure Veg</span>
          {filters.vegOnly && <Check className="w-3 h-3 ml-1" />}
        </button>

        {/* Non-Veg */}
        <button
          onClick={() => toggleFilter('nonVegOnly')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
            filters.nonVegOnly
              ? 'bg-red-600 text-white border-red-600 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-red-500'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-sm border border-red-600 bg-red-100 dark:bg-red-950 flex items-center justify-center text-[8px] font-black text-red-600">
            ▲
          </span>
          <span>Non-Veg Available</span>
          {filters.nonVegOnly && <Check className="w-3 h-3 ml-1" />}
        </button>

        {/* Family Friendly */}
        <button
          onClick={() => toggleFilter('familyFriendly')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            filters.familyFriendly
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <span>👨‍👩‍👧 Family Friendly</span>
        </button>

        {/* Air Conditioned */}
        <button
          onClick={() => toggleFilter('hasAC')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            filters.hasAC
              ? 'bg-cyan-600 text-white border-cyan-600 font-bold shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <span>❄️ AC Dining</span>
        </button>

        {/* Parking */}
        <button
          onClick={() => toggleFilter('hasParking')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            filters.hasParking
              ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <span>🅿️ Valet / Parking</span>
        </button>

        {/* Outdoor Seating */}
        <button
          onClick={() => toggleFilter('hasOutdoor')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            filters.hasOutdoor
              ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <span>🌿 Outdoor Garden</span>
        </button>

        {/* Rating Filter */}
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-500">Rating:</span>
          {[4.0, 4.5, 4.8].map(r => (
            <button
              key={r}
              onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === r ? 0 : r }))}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                filters.minRating === r
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              ★ {r}+
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
