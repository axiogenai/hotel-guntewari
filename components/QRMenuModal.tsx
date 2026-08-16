'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  X, QrCode, Download, Share2, ExternalLink,
  CheckCircle, Smartphone
} from 'lucide-react';

export const QRMenuModal: React.FC = () => {
  const { isQRModalOpen, setIsQRModalOpen, activeRestaurant } = useApp();

  if (!isQRModalOpen) return null;

  const restaurantUrl = `https://hotelguntewari.com/menu`;
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(restaurantUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden text-center p-6 space-y-5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Contactless Table QR Stand
            </div>
            <h3 className="text-lg font-black text-stone-900">
              Hotel Guntewari
            </h3>
          </div>
          <button
            onClick={() => setIsQRModalOpen(false)}
            className="p-2 rounded-full text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Stand Card Frame */}
        <div className="p-6 bg-gradient-to-b from-stone-50 to-amber-50/50 rounded-3xl border-2 border-stone-200 space-y-4 shadow-inner">
          <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-rose-600/30">
            <QrCode className="w-7 h-7" />
          </div>

          <div>
            <h4 className="font-serif-display font-extrabold text-lg text-stone-900">
              Scan QR to View Menu & Order
            </h4>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Direct Contactless Table Ordering Experience
            </p>
          </div>

          {/* Rendered QR Code Image */}
          <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto border-2 border-stone-200 shadow-md flex items-center justify-center">
            <img
              src={qrSvgUrl}
              alt="QR Code for Hotel Guntewari Menu"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-xs font-mono font-bold text-stone-700 bg-white py-2 px-3 rounded-xl border border-stone-200 truncate">
            {restaurantUrl}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={qrSvgUrl}
            download="hotel-guntewari-qr-stand.png"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-md shadow-rose-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Stand QR</span>
          </a>

          <a
            href={`/menu/guntewari`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-stone-900 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Menu Link</span>
          </a>
        </div>

      </div>
    </div>
  );
};
