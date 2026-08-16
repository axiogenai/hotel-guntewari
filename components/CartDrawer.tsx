'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X, ShoppingBag, Plus, Minus, Trash2, Tag, Award,
  CheckCircle, ArrowRight, ShieldCheck, AlertCircle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart,
    userLoyalty, pointsRedeemed, toggleRedeemPoints, appliedOffer,
    applyCoupon, removeCoupon, setIsPaymentModalOpen, activeRestaurant
  } = useApp();

  const [couponInput, setCouponInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, i) => acc + (i.menuItem.price * i.quantity), 0);
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (appliedOffer) {
    discount = Math.min((subtotal * appliedOffer.discount_percentage) / 100, appliedOffer.max_discount);
  }
  const pointsDiscount = Math.floor(pointsRedeemed / 10);
  const totalDiscount = discount + pointsDiscount;

  const grandTotal = Math.max(0, subtotal + tax - totalDiscount);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const err = applyCoupon(couponInput);
    if (err) setCouponError(err);
    else setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfaf6] shadow-2xl border-l border-[#ece8e1] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#ece8e1] flex items-center justify-between bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a263] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center space-x-3 relative z-10">
              <ShoppingBag className="w-6 h-6 text-[#c9a263]" />
              <div>
                <h2 className="font-serif-display text-xl font-medium text-[#2d2a26]">
                  Culinary Selection
                </h2>
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#b08d55]">
                  {activeRestaurant?.name || 'Hotel Guntewari'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-[#2d2a26] hover:bg-stone-100 transition-colors relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 rounded-full bg-white border border-[#ece8e1] text-[#c9a263] mx-auto flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-medium text-[#2d2a26]">
                  Your selection is empty
                </h3>
                <p className="text-sm text-stone-500 max-w-[200px] mx-auto font-light">
                  Browse our exquisite menu to begin your culinary journey.
                </p>
              </div>
            ) : (
              cart.map(({ menuItem, quantity, special_instructions }) => (
                <div
                  key={menuItem.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#ece8e1] shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={menuItem.image}
                      alt={menuItem.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-sm border flex items-center justify-center text-[8px] font-black ${menuItem.is_veg ? 'border-emerald-600 text-emerald-600' : 'border-[#8b2635] text-[#8b2635]'}`}>
                          ●
                        </span>
                        <h4 className="font-medium text-sm text-[#2d2a26] max-w-[150px] truncate">
                          {menuItem.name}
                        </h4>
                      </div>
                      <div className="text-sm font-medium text-[#b08d55] mt-1">
                        ₹{(menuItem.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 bg-[#fdfaf6] border border-[#ece8e1] rounded-lg p-1.5 shadow-inner">
                    <button
                      onClick={() => updateCartQuantity(menuItem.id, -1)}
                      className="p-1 hover:bg-white rounded text-stone-500 hover:text-[#2d2a26] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium px-2 text-[#2d2a26]">{quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(menuItem.id, 1)}
                      className="p-1 hover:bg-white rounded text-stone-500 hover:text-[#2d2a26] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Loyalty Points Redemption Box */}
            {cart.length > 0 && (
              <div className="p-5 rounded-xl bg-[#f5ecdd] border border-[#c9a263]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#8c6b38] font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#c9a263]" />
                    <span>Privilege Points</span>
                  </div>
                  <span className="text-xs font-bold text-[#b08d55]">
                    {userLoyalty.points} Available
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#2d2a26] font-medium pt-2 border-t border-[#c9a263]/20">
                  <span>Redeem 150 Pts (₹15 OFF)</span>
                  <input
                    type="checkbox"
                    checked={pointsRedeemed > 0}
                    onChange={(e) => toggleRedeemPoints(e.target.checked)}
                    className="w-4 h-4 rounded text-[#c9a263] border-[#c9a263]/50 focus:ring-[#c9a263] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Coupon Code Section */}
            {cart.length > 0 && (
              <div className="space-y-3">
                {appliedOffer ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-emerald-800 font-medium">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>{appliedOffer.code} ({appliedOffer.discount_percentage}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#8b2635] font-medium text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Complimentary Code (AXIOGEN50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#ece8e1] text-sm font-medium uppercase focus:outline-none focus:border-[#c9a263] placeholder:text-stone-300 placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#2d2a26] hover:bg-[#1a1816] text-white font-medium text-sm transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-xs text-[#8b2635] font-medium flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>
            )}

          </div>

          {/* Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#ece8e1] bg-white space-y-4">
              
              <div className="space-y-2 text-sm text-stone-500 font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2d2a26]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Service (5%)</span>
                  <span className="font-medium text-[#2d2a26]">₹{tax.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount</span>
                    <span>- ₹{totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-serif-display font-medium text-[#2d2a26] pt-3 border-t border-[#ece8e1]">
                  <span>Total Payable</span>
                  <span className="text-[#b08d55]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsPaymentModalOpen(true);
                }}
                className="w-full py-4 rounded-xl bg-[#c9a263] hover:bg-[#b08d55] text-white font-medium text-sm shadow-md transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Complete Order</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
