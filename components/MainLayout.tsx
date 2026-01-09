// src/components/MainLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import WhatsAppLink from './WhatsAppLink';
import BackToTop from './BackToTop';
import MobileBottomNav from './MobileBottomNav';

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Check if we are on the Home page
  const isHomePage = location.pathname === '/';

  // Determine floating button visibility
  const path = location.pathname.split('/')[1];
  const showWhatsAppOnly = path === 'contact' || path === 'about';

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-900 text-gray-100 selection:bg-yellow-500 selection:text-gray-900">

      <Header />

      {/* Main content with padding for mobile bottom nav */}
      <main className={`flex-grow relative z-0 pb-20 md:pb-0 ${isHomePage ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-8'}`}>
        <Outlet />
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="relative z-50">
        {showWhatsAppOnly && <WhatsAppLink />}
        {!showWhatsAppOnly && <Chatbot />}
        <BackToTop />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;