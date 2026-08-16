'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Clock, CheckCircle, ChefHat, Bike, PackageCheck,
  PhoneCall, MapPin, Sparkles, MessageSquare
} from 'lucide-react';

export const OrderTracker: React.FC = () => {
  const { activeOrder, updateOrderStatus, sendWhatsAppAlert } = useApp();

  if (!activeOrder) {
    return (
      <div className="bg-[#fdfaf6] rounded-[2rem] p-10 border border-[#ece8e1] text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-white border border-[#ece8e1] text-[#c9a263] mx-auto flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="font-serif-display text-2xl font-medium text-[#2d2a26]">No Active Order Tracked</h3>
        <p className="text-sm text-stone-500 font-light max-w-sm mx-auto">Place an order from the menu to see live kitchen & delivery tracking updates.</p>
      </div>
    );
  }

  const steps = [
    { key: 'received', label: 'Order Received', icon: Clock, desc: 'Kitchen acknowledged order' },
    { key: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Chef cooking fresh dishes' },
    { key: 'ready', label: 'Ready for Delivery', icon: PackageCheck, desc: 'Order packed hot' },
    { key: 'delivered', label: 'Delivered', icon: Bike, desc: 'En route / Delivered' }
  ];

  const currentStepIdx = steps.findIndex(s => s.key === activeOrder.status);

  const handleSimulateNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextStepKey = steps[currentStepIdx + 1].key as any;
      updateOrderStatus(activeOrder.id, nextStepKey);
      
      // WhatsApp alert
      sendWhatsAppAlert({
        to_phone: activeOrder.user_phone,
        to_name: activeOrder.user_name,
        type: 'order_update',
        message: `🛵 Order Update #${activeOrder.id}: Status changed to '${steps[currentStepIdx + 1].label}'. Restaurant: ${activeOrder.restaurant_name}.`
      });
    }
  };

  return (
    <div className="bg-[#fdfaf6] rounded-[2rem] p-8 border border-[#ece8e1] shadow-xl max-w-4xl mx-auto my-8 space-y-8 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a263] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#ece8e1] pb-6 relative z-10">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d55] mb-2">
            Live Kitchen & Delivery Status
          </div>
          <h2 className="font-serif-display text-3xl font-medium text-[#2d2a26]">
            Order #{activeOrder.id}
          </h2>
          <div className="text-sm text-stone-500 font-light mt-1">
            From <span className="font-medium text-[#2d2a26]">{activeOrder.restaurant_name}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-white text-[#b08d55] px-5 py-3 rounded-xl border border-[#ece8e1] font-medium text-sm flex items-center space-x-3 shadow-sm">
            <Clock className="w-5 h-5 animate-pulse" />
            <span>ETA: ~{activeOrder.estimated_mins} Mins</span>
          </div>

          <button
            onClick={handleSimulateNextStep}
            disabled={currentStepIdx === steps.length - 1}
            className="px-5 py-3 rounded-xl bg-[#2d2a26] text-white font-medium text-sm hover:bg-[#1a1816] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Advance Status ➔
          </button>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative py-2 z-10">
        {steps.map((step, idx) => {
          const isDone = idx <= currentStepIdx;
          const isCurrent = idx === currentStepIdx;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={`p-5 rounded-2xl border transition-all flex flex-col items-center text-center space-y-3 ${
                isCurrent
                  ? 'bg-white border-[#c9a263] shadow-md ring-1 ring-[#c9a263]/20'
                  : isDone
                  ? 'bg-white border-[#ece8e1] opacity-80'
                  : 'bg-stone-50/50 border-stone-100 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                isDone ? 'bg-[#c9a263] text-white shadow-inner' : 'bg-stone-100 text-stone-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`text-sm font-semibold tracking-wide uppercase ${isDone ? 'text-[#2d2a26]' : 'text-stone-500'}`}>{step.label}</div>
              <div className="text-xs text-stone-400 font-light px-2">{step.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Order Itemized Receipt Box */}
      <div className="bg-white p-6 rounded-2xl border border-[#ece8e1] space-y-4 shadow-sm relative z-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#b08d55]">Order Summary ({activeOrder.items.length} items)</div>
        <div className="space-y-3 text-sm font-light text-stone-600">
          {activeOrder.items.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.quantity} × <span className="font-medium text-[#2d2a26]">{item.name}</span></span>
              <span className="font-medium text-[#2d2a26]">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center font-serif-display font-medium text-lg text-[#2d2a26] pt-4 border-t border-[#ece8e1]">
            <span>Total Paid ({activeOrder.payment_method})</span>
            <span className="text-[#b08d55]">₹{activeOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
