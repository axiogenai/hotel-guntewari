'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Table } from '@/lib/types';
import {
  X, Calendar, Clock, Users, CheckCircle, MessageSquare,
  ChevronRight, Sparkles
} from 'lucide-react';

export const TableBookingModal: React.FC = () => {
  const {
    isBookingOpen, setIsBookingOpen, selectedRestaurantForBooking,
    activeRestaurant, tables, addReservation, currentUser
  } = useApp();

  const restaurant = selectedRestaurantForBooking || activeRestaurant;

  const [date, setDate] = useState<string>('2026-08-10');
  const [time, setTime] = useState<string>('08:00 PM');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  if (!isBookingOpen || !restaurant) return null;

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const guestOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12];

  const restTables = tables.filter(t => t.restaurant_id === restaurant.id);
  const availableTables = restTables.filter(t => t.capacity >= guestCount && t.status === 'available');

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const tableToAssign = selectedTable || availableTables[0] || restTables[0];
    
    const newRes = addReservation({
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_phone: currentUser.phone,
      user_email: currentUser.email,
      restaurant_id: restaurant.id,
      restaurant_name: restaurant.name,
      table_id: tableToAssign?.id || 'tbl-1',
      table_number: tableToAssign?.table_number || 'T-01',
      date,
      time,
      guest_count: guestCount,
      special_request: specialRequest
    });

    setConfirmedBookingId(newRes.id);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setSelectedTable(null);
    setIsBookingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1c1917] p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a263]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a263]">
              <Sparkles className="w-3 h-3" />
              <span>Table Reservation</span>
            </div>
            <h2 className="font-serif-display text-2xl font-normal text-white">
              {restaurant.name}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors relative z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white">

          {isSuccess ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-full bg-[#c9a263]/10 text-[#c9a263] mx-auto flex items-center justify-center animate-bounce border border-[#c9a263]/30">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif-display text-3xl font-normal text-[#1c1917]">
                  Reservation Confirmed
                </h3>
                <p className="text-sm text-stone-500 font-light mt-2">
                  Booking Ref: <span className="font-mono font-medium text-[#1c1917] bg-[#faf8f5] px-2 py-1 rounded border border-[#e8e2d8]">{confirmedBookingId}</span>
                </p>
              </div>

              {/* Instant WhatsApp Notification Card */}
              <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#e8e2d8] text-left space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-[#a8874d] font-semibold text-xs tracking-wide">
                  <MessageSquare className="w-4 h-4 text-[#c9a263]" />
                  <span>Instant SMS & WhatsApp Confirmation</span>
                </div>
                <div className="text-xs text-stone-600 font-light leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                  <span className="font-medium text-[#1c1917]">Table Reserved</span> at {restaurant.name}<br /><br />
                  <span className="text-[#a8874d]">Date & Time:</span> {date} @ {time}<br />
                  <span className="text-[#a8874d]">Guests:</span> {guestCount} Person(s)<br />
                  <span className="text-[#a8874d]">Assigned Table:</span> {selectedTable?.table_number || 'T-01'} ({selectedTable?.section || 'Indoor'})<br /><br />
                  <span className="text-stone-400">Sent to: {currentUser.phone}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 rounded-2xl bg-[#1c1917] hover:bg-[#c9a263] text-white font-medium text-sm transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold text-stone-400 border-b border-[#e8e2d8] pb-3">
                <span className="text-[#a8874d]">1. Date</span>
                <ChevronRight className="w-3 h-3 text-stone-300" />
                <span className="text-[#a8874d]">2. Guests</span>
                <ChevronRight className="w-3 h-3 text-stone-300" />
                <span className="text-[#a8874d]">3. Time</span>
                <ChevronRight className="w-3 h-3 text-stone-300" />
                <span className="text-[#a8874d]">4. Table</span>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c9a263]" />
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] text-sm font-medium text-[#1c1917] focus:outline-none focus:border-[#c9a263] transition-colors shadow-xs"
                  required
                />
              </div>

              {/* Modern Custom Guest Count Pill Buttons (No Ugly OS Select Dropdown) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2.5 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c9a263]" />
                  <span>Number of Guests ({guestCount} {guestCount === 1 ? 'Person' : 'People'})</span>
                </label>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {guestOptions.map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        guestCount === num
                          ? 'bg-[#1c1917] text-white border-[#1c1917] shadow-md scale-105'
                          : 'bg-[#faf8f5] text-stone-700 border-[#e8e2d8] hover:border-[#c9a263] hover:text-[#1c1917]'
                      }`}
                    >
                      {num} {num === 1 ? 'Person' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2.5 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c9a263]" />
                  <span>Select Time Slot</span>
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                        time === slot
                          ? 'bg-[#c9a263] text-white border-[#c9a263] shadow-md font-semibold'
                          : 'bg-[#faf8f5] text-stone-700 border-[#e8e2d8] hover:border-[#c9a263]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Table Matrix Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2.5">
                  Choose Preferred Table Section
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {restTables.map(tbl => {
                    const isSelected = selectedTable?.id === tbl.id;
                    const isCapFit = tbl.capacity >= guestCount;
                    return (
                      <button
                        key={tbl.id}
                        type="button"
                        onClick={() => isCapFit && setSelectedTable(tbl)}
                        disabled={!isCapFit}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c9a263]/10 border-[#c9a263] shadow-xs'
                            : isCapFit
                            ? 'bg-[#faf8f5] border-[#e8e2d8] hover:border-[#c9a263]'
                            : 'opacity-40 bg-stone-50 border-stone-100 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between font-medium text-xs text-[#1c1917]">
                          <span>{tbl.table_number} <span className="text-[10px] text-stone-400 font-light block">{tbl.section}</span></span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#e8e2d8] text-stone-600">
                            Cap: {tbl.capacity}
                          </span>
                        </div>
                        <div className="text-[9px] font-semibold tracking-wide uppercase mt-1.5">
                          {isCapFit ? <span className="text-emerald-600">Available</span> : <span className="text-stone-400">Fits up to {tbl.capacity}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2">
                  Special Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday celebration, Quiet corner table..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d8] text-sm text-[#1c1917] focus:outline-none focus:border-[#c9a263] transition-colors shadow-xs placeholder:text-stone-300"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#1c1917] hover:bg-[#c9a263] text-white font-medium text-sm shadow-xl transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Confirm Reservation</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
