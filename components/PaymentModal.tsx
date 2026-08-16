'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X, CreditCard, QrCode, DollarSign, CheckCircle2,
  ShieldCheck, ArrowRight, Smartphone
} from 'lucide-react';

export const PaymentModal: React.FC<{ onOrderPlaced: () => void }> = ({ onOrderPlaced }) => {
  const { isPaymentModalOpen, setIsPaymentModalOpen, createOrder, cart, currentUser } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Razorpay'>('UPI');
  const [address, setAddress] = useState<string>('Peth Vadgaon, Kolhapur');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isPaymentModalOpen) return null;

  const subtotal = cart.reduce((acc, i) => acc + (i.menuItem.price * i.quantity), 0);
  const totalAmount = Math.round(subtotal * 1.05);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      createOrder(address, paymentMethod);
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      onOrderPlaced();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-[#fdfaf6] rounded-[2rem] border border-[#ece8e1] shadow-2xl max-w-lg w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-white p-6 border-b border-[#ece8e1] flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a263] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d55] mb-1">
              Secure Checkout
            </div>
            <h2 className="font-serif-display text-2xl font-medium text-[#2d2a26]">
              Pay ₹{totalAmount.toFixed(2)}
            </h2>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-2 rounded-full text-stone-400 hover:text-[#2d2a26] hover:bg-stone-100 transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleCompletePayment} className="p-6 space-y-6">
          
          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2">
              Delivery Details
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#ece8e1] text-sm text-[#2d2a26] font-medium focus:outline-none focus:border-[#c9a263] transition-colors shadow-sm"
              required
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
              Payment Gateway
            </label>
            
            <div className="grid grid-cols-3 gap-3">
              {/* UPI */}
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                  paymentMethod === 'UPI'
                    ? 'bg-[#f5ecdd] border-[#c9a263] shadow-inner'
                    : 'bg-white border-[#ece8e1] hover:border-[#c9a263]'
                }`}
              >
                <Smartphone className={`w-6 h-6 ${paymentMethod === 'UPI' ? 'text-[#c9a263]' : 'text-stone-400'}`} />
                <span className={`text-xs font-medium ${paymentMethod === 'UPI' ? 'text-[#2d2a26]' : 'text-stone-500'}`}>UPI</span>
              </button>

              {/* Razorpay Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Razorpay')}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                  paymentMethod === 'Razorpay'
                    ? 'bg-[#f5ecdd] border-[#c9a263] shadow-inner'
                    : 'bg-white border-[#ece8e1] hover:border-[#c9a263]'
                }`}
              >
                <CreditCard className={`w-6 h-6 ${paymentMethod === 'Razorpay' ? 'text-[#c9a263]' : 'text-stone-400'}`} />
                <span className={`text-xs font-medium ${paymentMethod === 'Razorpay' ? 'text-[#2d2a26]' : 'text-stone-500'}`}>Card</span>
              </button>

              {/* COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                  paymentMethod === 'COD'
                    ? 'bg-[#f5ecdd] border-[#c9a263] shadow-inner'
                    : 'bg-white border-[#ece8e1] hover:border-[#c9a263]'
                }`}
              >
                <DollarSign className={`w-6 h-6 ${paymentMethod === 'COD' ? 'text-[#c9a263]' : 'text-stone-400'}`} />
                <span className={`text-xs font-medium ${paymentMethod === 'COD' ? 'text-[#2d2a26]' : 'text-stone-500'}`}>Cash</span>
              </button>
            </div>
          </div>

          {/* Payment Method Details Simulation Box */}
          {paymentMethod === 'UPI' && (
            <div className="p-5 bg-white rounded-xl border border-[#ece8e1] text-center space-y-3 shadow-sm">
              <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto border border-[#ece8e1] shadow-inner flex items-center justify-center">
                <QrCode className="w-20 h-20 text-[#2d2a26]" />
              </div>
              <p className="text-xs font-mono text-stone-500">Scan QR Code or Enter UPI ID: hotelmalak@upi</p>
            </div>
          )}

          {paymentMethod === 'Razorpay' && (
            <div className="p-5 bg-white rounded-xl border border-[#ece8e1] text-xs space-y-2 text-[#2d2a26] shadow-sm">
              <div className="font-semibold flex items-center space-x-2 text-[#b08d55]">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit Secure Gateway</span>
              </div>
              <p className="text-stone-500 font-light leading-relaxed">You will be securely redirected to our payment partner to complete your transaction via Credit Card, Debit Card, or NetBanking.</p>
            </div>
          )}

          {paymentMethod === 'COD' && (
            <div className="p-5 bg-white rounded-xl border border-[#ece8e1] text-xs space-y-2 text-[#2d2a26] shadow-sm text-center">
              <div className="font-semibold flex items-center justify-center space-x-2 text-[#b08d55]">
                <DollarSign className="w-4 h-4" />
                <span>Pay at Doorstep</span>
              </div>
              <p className="text-stone-500 font-light">Please keep exact change ready to assist our delivery executive.</p>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-[#2d2a26] hover:bg-[#1a1816] text-white font-medium text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70 group"
          >
            {isProcessing ? (
              <span className="animate-pulse flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 animate-spin-slow" />
                <span>Processing Order...</span>
              </span>
            ) : (
              <>
                <span>Confirm & Pay ₹{totalAmount.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
