'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, MessageSquare, CheckCheck, Clock, Send, ShieldCheck } from 'lucide-react';

export const WhatsAppNotificationSimulator: React.FC = () => {
  const { isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen, whatsappLogs } = useApp();

  if (!isWhatsAppDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-700 text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm">Phase 11 • WhatsApp Cloud API</h3>
                <div className="text-[11px] text-emerald-200 font-medium">Transactional Webhook Alert Simulator</div>
              </div>
            </div>
            <button
              onClick={() => setIsWhatsAppDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Logs Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
            {whatsappLogs.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">No WhatsApp Alerts Sent Yet</h4>
                <p className="text-xs text-slate-400">
                  Book a table or place an order to trigger instant transactional WhatsApp Cloud API messages!
                </p>
              </div>
            ) : (
              whatsappLogs.map(log => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                      <Send className="w-3 h-3" />
                      <span>To: {log.to_name} ({log.to_phone})</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>

                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-xs text-slate-800 dark:text-slate-100 font-medium leading-relaxed border border-emerald-100 dark:border-emerald-900">
                    {log.message}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="uppercase font-bold tracking-wider">{log.type.replace('_', ' ')}</span>
                    <span className="text-emerald-500 font-bold flex items-center space-x-1">
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Delivered</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
