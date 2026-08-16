'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AmbianceShowcase } from '@/components/AmbianceShowcase';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { SignatureDishes } from '@/components/SignatureDishes';
import { InteractiveMenu } from '@/components/InteractiveMenu';
import { SpecialOffers } from '@/components/SpecialOffers';
import { CustomerReviews } from '@/components/CustomerReviews';
import { StatsCounter } from '@/components/StatsCounter';
import { Gallery } from '@/components/Gallery';
import { EventsSection } from '@/components/EventsSection';
import { LocationFooter } from '@/components/LocationFooter';
import { FloatingContact } from '@/components/FloatingContact';
import { ScrollToTop } from '@/components/ScrollToTop';

// Modals & Panels
import { TableBookingModal } from '@/components/TableBookingModal';
import { CartDrawer } from '@/components/CartDrawer';
import { PaymentModal } from '@/components/PaymentModal';
import { OrderTracker } from '@/components/OrderTracker';
import { AIFoodAssistantModal } from '@/components/AIFoodAssistantModal';
import { QRMenuModal } from '@/components/QRMenuModal';
import { RestaurantDashboard } from '@/components/RestaurantDashboard';
import { AdminPanel } from '@/components/AdminPanel';
import { WhatsAppNotificationSimulator } from '@/components/WhatsAppNotificationSimulator';

function HotelGuntewariWebsiteContent() {
  const { currentUser, orders } = useApp();
  const [activeView, setActiveView] = useState<'menu' | 'dashboard' | 'admin' | 'tracker'>('menu');


  return (
    <div className="min-h-screen bg-[#ffffff] text-[#2d2a26] font-sans selection:bg-[#c9a263] selection:text-white">
      
      {/* Navbar Header */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main View Switcher */}
      {activeView === 'dashboard' ? (
        <RestaurantDashboard />
      ) : activeView === 'admin' ? (
        <AdminPanel />
      ) : activeView === 'tracker' ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <OrderTracker />
        </div>
      ) : (
        /* Hotel Guntewari Main Website Flow */
        <main className="w-full overflow-hidden">
          


          {/* Core Conversion Flow Sections */}
          <Hero />
          <AmbianceShowcase />
          <WhyChooseUs />
          <SignatureDishes />
          <InteractiveMenu />
          <SpecialOffers />
          <CustomerReviews />
          <StatsCounter />
          <Gallery />
          <EventsSection />
          <LocationFooter />
          <FloatingContact />
          <ScrollToTop />

        </main>
      )}

      {/* Global Modals */}
      <TableBookingModal />
      <CartDrawer />
      <PaymentModal onOrderPlaced={() => setActiveView('tracker')} />
      <AIFoodAssistantModal />
      <QRMenuModal />
      <WhatsAppNotificationSimulator />

    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <HotelGuntewariWebsiteContent />
    </AppProvider>
  );
}
