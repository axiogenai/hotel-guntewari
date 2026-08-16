'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { askGroqFoodAssistant } from '@/lib/groq';
import { MenuItem } from '@/lib/types';
import {
  X, Send, Bot, User, Plus, ShoppingBag,
  Flame, CheckCircle, Zap, MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedItems?: MenuItem[];
}

export const AIFoodAssistantModal: React.FC = () => {
  const {
    isAIAssistantOpen, setIsAIAssistantOpen, activeRestaurant,
    menuItems, addToCart
  } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Welcome to Hotel Malak.\n\nI am your digital concierge. How may I assist you today? (e.g., *"Suggest a light appetizer"*, *"What are your signature dishes?"*, or *"A romantic dinner for two"*). I will curate selections from our menu for you.`
    }
  ]);

  if (!isAIAssistantOpen) return null;

  const restMenuItems = menuItems; // Using all items as it's a single restaurant

  const quickPrompts = [
    'Signature Dishes',
    'Light Appetizers',
    'Vegetarian Delights',
    'Chef\'s Recommendations'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsgId = `u-${Date.now()}`;
    const userMsg: ChatMessage = { id: userMsgId, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await askGroqFoodAssistant(query, 'Hotel Malak', restMenuItems);
      
      const matchedItems = restMenuItems.filter(i => res.recommendedItemIds.includes(i.id));

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.answer,
        recommendedItems: matchedItems
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Apologies, I encountered a temporary connection issue. Please try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-[#fdfaf6] rounded-[2rem] border border-[#ece8e1] shadow-2xl max-w-2xl w-full h-[640px] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="bg-white border-b border-[#ece8e1] p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a263] opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#fdfaf6] border border-[#ece8e1] flex items-center justify-center text-[#c9a263] shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d55] mb-1 flex items-center space-x-1">
                <span>Digital Concierge</span>
              </div>
              <h2 className="font-serif-display text-2xl font-medium text-[#2d2a26]">
                AI Assistant
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-2 rounded-full text-stone-400 hover:text-[#2d2a26] hover:bg-stone-100 transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#fdfaf6]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-white border border-[#ece8e1] text-[#c9a263] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#2d2a26] text-[#fdfaf6] font-light rounded-tr-none'
                  : 'bg-white text-stone-600 font-light border border-[#ece8e1] shadow-sm rounded-tl-none space-y-4'
              }`}>
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Recommended Menu Item Cards embedded in response */}
                {msg.recommendedItems && msg.recommendedItems.length > 0 && (
                  <div className="pt-4 border-t border-[#ece8e1] space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#b08d55]">
                      Curated Selections:
                    </div>
                    {msg.recommendedItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#fdfaf6] border border-[#ece8e1] hover:border-[#c9a263] transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-serif-display font-medium text-[#2d2a26]">{item.name}</div>
                            <div className="font-medium text-[#b08d55] text-xs mt-0.5">₹{item.price}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#ece8e1] hover:bg-[#2d2a26] hover:border-[#2d2a26] hover:text-[#fdfaf6] text-[#2d2a26] font-medium text-xs transition-all flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#fdfaf6] border border-[#ece8e1] text-[#2d2a26] flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-[#b08d55] font-medium p-3 bg-white border border-[#ece8e1] rounded-xl w-max shadow-sm">
              <Bot className="w-4 h-4 animate-pulse" />
              <span>Consulting the chef...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-4 bg-white border-t border-[#ece8e1] flex items-center space-x-3 overflow-x-auto no-scrollbar">
          {quickPrompts.map(p => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              className="px-4 py-2 rounded-full bg-[#fdfaf6] hover:bg-[#f5ecdd] text-stone-600 hover:text-[#2d2a26] border border-[#ece8e1] hover:border-[#c9a263] whitespace-nowrap text-xs font-medium transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-4 sm:p-5 bg-white border-t border-[#ece8e1] flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask your digital concierge..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl bg-[#fdfaf6] border border-[#ece8e1] text-sm font-medium text-[#2d2a26] placeholder:text-stone-400 focus:outline-none focus:border-[#c9a263] transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="p-3 rounded-xl bg-[#2d2a26] hover:bg-[#1a1816] text-[#fdfaf6] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
