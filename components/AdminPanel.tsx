'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck, Check, Ban, Star, Building2, Users,
  DollarSign, TrendingUp, Plus, Sparkles
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    restaurants, toggleRestaurantStatus, toggleFeaturedRestaurant,
    addRestaurant, orders
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [cuisineStr, setCuisineStr] = useState('');
  const [address, setAddress] = useState('');

  const totalPlatformRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addRestaurant({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      cuisine: cuisineStr.split(',').map(c => c.trim()),
      address: address || 'Pune, Maharashtra'
    });
    setName('');
    setSlug('');
    setCuisineStr('');
    setAddress('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-[#2d2a26] min-h-screen">
      
      {/* Header */}
      <div className="bg-[#2d2a26] text-[#fdfaf6] rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-6 border border-[#ece8e1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a263] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a263]">
            System Control
          </div>
          <h1 className="font-serif-display text-3xl font-medium">Master Control Panel</h1>
          <p className="text-xs text-stone-400 font-light">
            Manage multi-tenant settings and venue approvals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="px-5 py-3 rounded-xl bg-[#c9a263] hover:bg-[#b08d55] text-white font-medium text-xs shadow-md flex items-center space-x-2 relative z-10 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venue</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Platform Revenue</div>
          <div className="font-serif-display text-3xl font-medium text-[#2d2a26]">₹{(totalPlatformRevenue * 0.15).toFixed(2)}</div>
          <div className="text-[10px] text-stone-500 font-light">Commission Fee (15%)</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Total Venues</div>
          <div className="font-serif-display text-3xl font-medium text-[#2d2a26]">{restaurants.length}</div>
          <div className="text-[10px] text-stone-500 font-light">Active Domains</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Approved Status</div>
          <div className="font-serif-display text-3xl font-medium text-emerald-700">
            {restaurants.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-[10px] text-stone-500 font-light">Live Catalog</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Featured Partners</div>
          <div className="font-serif-display text-3xl font-medium text-[#c9a263]">
            {restaurants.filter(r => r.is_featured).length}
          </div>
          <div className="text-[10px] text-stone-500 font-light">Top Placement</div>
        </div>
      </div>

      {/* Onboard Restaurant Form Modal */}
      {showAddModal && (
        <form onSubmit={handleAddSubmit} className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#c9a263] shadow-xl space-y-4">
          <h3 className="font-serif-display font-medium text-lg text-[#2d2a26]">Add New Venue</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Venue Name</label>
              <input
                type="text"
                placeholder="e.g. Hotel Malak Annex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Slug</label>
              <input
                type="text"
                placeholder="malak-annex"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-mono focus:outline-none focus:border-[#c9a263]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Cuisines</label>
              <input
                type="text"
                placeholder="Maharashtrian, North Indian"
                value={cuisineStr}
                onChange={(e) => setCuisineStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Address</label>
              <input
                type="text"
                placeholder="FC Road, Pune"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium text-stone-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#2d2a26] text-white text-xs font-medium shadow-md"
            >
              Save Venue
            </button>
          </div>
        </form>
      )}

      {/* Tenants Table */}
      <div className="bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-white text-stone-500 font-semibold uppercase tracking-wider border-b border-[#ece8e1]">
            <tr>
              <th className="p-4">Venue</th>
              <th className="p-4">Slug / Path</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ece8e1] font-light text-stone-700">
            {restaurants.map(r => (
              <tr key={r.id} className="hover:bg-white/80 transition-colors">
                <td className="p-4 flex items-center space-x-3">
                  <img src={r.image} alt={r.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-serif-display font-medium text-[#2d2a26] text-sm">{r.name}</div>
                    <div className="text-[11px] text-stone-400">{r.cuisine.join(', ')}</div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[#b08d55] font-medium">
                  {r.slug}
                </td>
                <td className="p-4 font-semibold text-[#c9a263]">
                  ★ {r.rating} ({r.reviews_count})
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleFeaturedRestaurant(r.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 ${
                      r.is_featured
                        ? 'bg-[#f5ecdd] text-[#b08d55] border border-[#c9a263]/30'
                        : 'bg-white border border-[#ece8e1] text-stone-500'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{r.is_featured ? 'Featured' : 'Standard'}</span>
                  </button>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    r.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {r.status === 'approved' ? (
                    <button
                      onClick={() => toggleRestaurantStatus(r.id, 'suspended')}
                      className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 font-medium text-[11px] hover:bg-rose-100"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleRestaurantStatus(r.id, 'approved')}
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-[11px] hover:bg-emerald-100"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
