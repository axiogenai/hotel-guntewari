'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { analyzeReviewsWithGroq, generateRestaurantSeoDescription } from '@/lib/groq';
import { MenuItem } from '@/lib/types';
import {
  Utensils, Plus, DollarSign, TrendingUp, Users, Calendar,
  Clock, Sparkles, CheckCircle, AlertTriangle, Eye, Edit3,
  ToggleLeft, ToggleRight, Trash2, PieChart, BarChart3, Star
} from 'lucide-react';

export const RestaurantDashboard: React.FC = () => {
  const {
    activeRestaurant, menuItems, addDish, toggleDishAvailability,
    updateDishPrice, orders, reservations, reviews, categories,
    updateOrderStatus, updateReservationStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'bookings' | 'analytics' | 'ai_reviews'>('menu');

  // Form State for Adding New Dish
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishImage, setNewDishImage] = useState('');
  const [newDishCategory, setNewDishCategory] = useState(categories[0]?.id || 'cat-1');
  const [newDishIsVeg, setNewDishIsVeg] = useState(true);
  const [isAddingDish, setIsAddingDish] = useState(false);

  // AI Review Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // SEO Generator State
  const [seoDescription, setSeoDescription] = useState<string | null>(null);

  const restMenuItems = menuItems.filter(i => i.restaurant_id === activeRestaurant.id);
  const restOrders = orders.filter(o => o.restaurant_id === activeRestaurant.id);
  const restReservations = reservations.filter(r => r.restaurant_id === activeRestaurant.id);
  const restReviews = reviews.filter(r => r.restaurant_id === activeRestaurant.id);

  const totalRevenue = restOrders.reduce((acc, o) => acc + o.total, 0);

  const handleAddDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    addDish({
      restaurant_id: activeRestaurant.id,
      category_id: newDishCategory,
      name: newDishName,
      description: newDishDesc || 'Delicious freshly prepared dish.',
      price: Number(newDishPrice),
      image: newDishImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      is_veg: newDishIsVeg,
      is_available: true
    });

    setNewDishName('');
    setNewDishPrice('');
    setNewDishDesc('');
    setNewDishImage('');
    setIsAddingDish(false);
  };

  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeReviewsWithGroq(restReviews, activeRestaurant.name);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleGenerateSeo = async () => {
    const desc = await generateRestaurantSeoDescription(activeRestaurant.name, activeRestaurant.cuisine);
    setSeoDescription(desc);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#ffffff] min-h-screen text-[#2d2a26]">
      
      {/* Header Banner */}
      <div className="bg-[#2d2a26] text-[#fdfaf6] rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-6 border border-[#ece8e1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a263] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a263]">
            Management Portal
          </div>
          <h1 className="font-serif-display text-3xl font-medium">{activeRestaurant.name}</h1>
          <p className="text-xs text-stone-400 font-light">
            {activeRestaurant.address}
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={handleGenerateSeo}
            className="px-4 py-2.5 rounded-xl bg-[#c9a263] hover:bg-[#b08d55] text-white font-medium text-xs flex items-center space-x-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Description</span>
          </button>
          <button
            onClick={() => setIsAddingDish(!isAddingDish)}
            className="px-4 py-2.5 rounded-xl bg-white text-[#2d2a26] hover:bg-stone-100 font-medium text-xs flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#c9a263]" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {seoDescription && (
        <div className="p-5 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] text-xs text-[#2d2a26] space-y-2 shadow-sm">
          <div className="font-semibold text-[#b08d55] flex items-center space-x-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Generated Restaurant Description</span>
          </div>
          <p className="leading-relaxed font-light text-stone-600">{seoDescription}</p>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Total Revenue</div>
          <div className="font-serif-display text-3xl font-medium text-[#2d2a26]">₹{totalRevenue.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-600 font-medium">+18.4% this week</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Total Orders</div>
          <div className="font-serif-display text-3xl font-medium text-[#2d2a26]">{restOrders.length}</div>
          <div className="text-[11px] text-stone-500 font-light">Live kitchen pipeline</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Reservations</div>
          <div className="font-serif-display text-3xl font-medium text-[#c9a263]">{restReservations.length}</div>
          <div className="text-[11px] text-stone-500 font-light">Upcoming guest bookings</div>
        </div>

        <div className="bg-[#fdfaf6] p-6 rounded-2xl border border-[#ece8e1] shadow-sm space-y-1">
          <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Menu Items</div>
          <div className="font-serif-display text-3xl font-medium text-[#2d2a26]">{restMenuItems.length}</div>
          <div className="text-[11px] text-stone-500 font-light">Active dishes</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-3 border-b border-[#ece8e1] pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all ${
            activeTab === 'menu'
              ? 'bg-[#2d2a26] text-white shadow-sm'
              : 'bg-[#fdfaf6] text-stone-600 border border-[#ece8e1] hover:border-[#2d2a26]'
          }`}
        >
          Menu & Dishes ({restMenuItems.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all ${
            activeTab === 'orders'
              ? 'bg-[#2d2a26] text-white shadow-sm'
              : 'bg-[#fdfaf6] text-stone-600 border border-[#ece8e1] hover:border-[#2d2a26]'
          }`}
        >
          Live Kitchen Orders ({restOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all ${
            activeTab === 'bookings'
              ? 'bg-[#2d2a26] text-white shadow-sm'
              : 'bg-[#fdfaf6] text-stone-600 border border-[#ece8e1] hover:border-[#2d2a26]'
          }`}
        >
          Table Bookings ({restReservations.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all ${
            activeTab === 'analytics'
              ? 'bg-[#2d2a26] text-white shadow-sm'
              : 'bg-[#fdfaf6] text-stone-600 border border-[#ece8e1] hover:border-[#2d2a26]'
          }`}
        >
          Analytics Charts
        </button>

        <button
          onClick={() => setActiveTab('ai_reviews')}
          className={`px-5 py-2.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all ${
            activeTab === 'ai_reviews'
              ? 'bg-[#c9a263] text-white shadow-sm'
              : 'bg-[#fdfaf6] text-stone-600 border border-[#ece8e1] hover:border-[#c9a263]'
          }`}
        >
          AI Review Insights
        </button>
      </div>

      {/* Tab 1: Menu Management */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          {/* Add Dish Form Modal/Card */}
          {isAddingDish && (
            <form onSubmit={handleAddDishSubmit} className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#c9a263] shadow-lg space-y-4">
              <h3 className="font-serif-display font-medium text-lg text-[#2d2a26]">Add New Dish to Menu</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Dish Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sizzling Paneer Angara"
                    value={newDishName}
                    onChange={(e) => setNewDishName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="290"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Ingredients and culinary notes..."
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newDishImage}
                    onChange={(e) => setNewDishImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium focus:outline-none focus:border-[#c9a263]"
                  />
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <label className="flex items-center space-x-2 text-xs font-medium text-[#2d2a26] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDishIsVeg}
                      onChange={(e) => setNewDishIsVeg(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-[#ece8e1]"
                    />
                    <span>Is Vegetarian</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDish(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#ece8e1] text-xs font-medium text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2d2a26] text-white text-xs font-medium shadow-md"
                >
                  Save Dish
                </button>
              </div>
            </form>
          )}

          {/* Menu Items Table */}
          <div className="bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-white text-stone-500 font-semibold uppercase tracking-wider border-b border-[#ece8e1]">
                <tr>
                  <th className="p-4">Dish</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Diet</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece8e1] font-light text-stone-700">
                {restMenuItems.map(item => (
                  <tr key={item.id} className="hover:bg-white/80 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="font-serif-display font-medium text-[#2d2a26] text-sm">{item.name}</div>
                        <div className="text-[11px] text-stone-400 line-clamp-1">{item.description}</div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#2d2a26] text-sm">
                      ₹{item.price}
                    </td>
                    <td className="p-4">
                      {item.is_veg ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-[10px]">VEG</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium text-[10px]">NON-VEG</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleDishAvailability(item.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-medium flex items-center space-x-1 ${
                          item.is_available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        <span>{item.is_available ? 'Available' : 'Unavailable'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          const p = prompt('Enter new price for ' + item.name, String(item.price));
                          if (p) updateDishPrice(item.id, Number(p));
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#ece8e1] text-[#2d2a26] font-medium text-[11px] hover:border-[#2d2a26] transition-colors"
                      >
                        Edit Price
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {restOrders.map(ord => (
            <div key={ord.id} className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="font-serif-display font-medium text-lg text-[#2d2a26]">Order #{ord.id}</span>
                  <span className="px-3 py-0.5 rounded-full bg-[#f5ecdd] text-[#b08d55] font-semibold text-xs border border-[#c9a263]/30">
                    {ord.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-stone-500 font-light mt-1">
                  Customer: {ord.user_name} ({ord.user_phone}) • Total: <span className="font-semibold text-[#2d2a26]">₹{ord.total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-stone-400 mt-1 font-light">
                  Items: {ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {['received', 'preparing', 'ready', 'delivered'].map(st => (
                  <button
                    key={st}
                    onClick={() => updateOrderStatus(ord.id, st as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
                      ord.status === st
                        ? 'bg-[#2d2a26] text-white'
                        : 'bg-white border border-[#ece8e1] text-stone-600 hover:border-[#2d2a26]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Table Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {restReservations.map(res => (
            <div key={res.id} className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] shadow-sm flex items-center justify-between">
              <div>
                <div className="font-serif-display font-medium text-base text-[#2d2a26]">
                  {res.user_name} ({res.guest_count} Guests)
                </div>
                <div className="text-xs text-stone-500 font-light mt-1">
                  Date: <strong className="font-medium text-[#2d2a26]">{res.date}</strong> @ <strong className="font-medium text-[#2d2a26]">{res.time}</strong> • Table: <strong className="font-medium text-[#2d2a26]">{res.table_number}</strong>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-[#f5ecdd] text-[#b08d55] text-xs font-medium uppercase border border-[#c9a263]/30">
                {res.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Revenue Growth Bar Chart */}
            <div className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display font-medium text-base text-[#2d2a26] flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-[#c9a263]" />
                  <span>Weekly Revenue Growth (₹)</span>
                </h3>
                <span className="text-xs font-medium text-emerald-600">+24% vs Last Week</span>
              </div>
              <div className="h-44 flex items-end justify-between gap-2 pt-6">
                {[
                  { day: 'Mon', val: 12000 },
                  { day: 'Tue', val: 18500 },
                  { day: 'Wed', val: 15400 },
                  { day: 'Thu', val: 22000 },
                  { day: 'Fri', val: 34000 },
                  { day: 'Sat', val: 48000 },
                  { day: 'Sun', val: 52000 }
                ].map(d => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-[#2d2a26] rounded-t-lg transition-all group-hover:bg-[#c9a263]"
                      style={{ height: `${(d.val / 52000) * 100}%` }}
                    />
                    <span className="text-[10px] text-stone-400 font-medium">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Hours Breakdown Chart */}
            <div className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display font-medium text-base text-[#2d2a26] flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-[#c9a263]" />
                  <span>Peak Ordering & Reservation Hours</span>
                </h3>
                <span className="text-xs text-stone-400">8:00 PM Peak</span>
              </div>
              <div className="space-y-4 pt-2">
                {[
                  { slot: '12:00 PM - 03:00 PM (Lunch)', pct: 35, color: 'bg-[#b08d55]' },
                  { slot: '07:30 PM - 10:30 PM (Dinner Peak)', pct: 55, color: 'bg-[#2d2a26]' },
                  { slot: '04:00 PM - 07:00 PM (Tea/Snacks)', pct: 10, color: 'bg-[#c9a263]' }
                ].map(p => (
                  <div key={p.slot} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-[#2d2a26]">
                      <span>{p.slot}</span>
                      <span>{p.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white border border-[#ece8e1] overflow-hidden">
                      <div className={`h-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 5: Groq AI Review Analysis */}
      {activeTab === 'ai_reviews' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#fdfaf6] rounded-3xl border border-[#c9a263] flex items-center justify-between">
            <div>
              <h3 className="font-serif-display font-medium text-xl text-[#2d2a26] flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#c9a263]" />
                <span>AI Review & Feedback Sentiment Analysis</span>
              </h3>
              <p className="text-xs text-stone-500 font-light mt-1">
                Extracts praises, complaints, service bottlenecks, and actionable business insights.
              </p>
            </div>

            <button
              onClick={handleRunAiAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-3 rounded-2xl bg-[#2d2a26] hover:bg-[#1a1816] text-[#fdfaf6] font-medium text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow text-[#c9a263]" />
              <span>{isAnalyzing ? 'Analyzing Reviews...' : 'Run AI Analysis'}</span>
            </button>
          </div>

          {aiAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] space-y-3">
                <h4 className="font-serif-display font-medium text-base text-emerald-700 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Most Praised Dishes</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-stone-600 font-light space-y-1">
                  {aiAnalysis.praisedDishes?.map((d: string) => <li key={d}>{d}</li>)}
                </ul>
              </div>

              <div className="p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] space-y-3">
                <h4 className="font-serif-display font-medium text-base text-rose-700 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Service Bottlenecks & Notes</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-stone-600 font-light space-y-1">
                  {aiAnalysis.commonComplaints?.map((c: string) => <li key={c}>{c}</li>)}
                </ul>
              </div>

              <div className="md:col-span-2 p-6 bg-[#fdfaf6] rounded-2xl border border-[#ece8e1] space-y-3">
                <h4 className="font-serif-display font-medium text-base text-[#b08d55] flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Growth Recommendations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {aiAnalysis.actionableInsights?.map((ins: string, idx: number) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-[#ece8e1] font-light text-stone-700 shadow-sm">
                      💡 {ins}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
