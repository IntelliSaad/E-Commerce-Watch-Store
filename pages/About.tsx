// src/pages/About.tsx
import React from 'react';
import { Truck, Shield, Clock, Handshake } from 'lucide-react';

const About: React.FC = () => {
  return (
    // FIX: Changed pt-8 to pt-2 to pull content up
    <div className="max-w-6xl mx-auto pt-2 pb-12 px-4">
      
      {/* Header Section */}
      {/* FIX: Reduced mb-12 to mb-8 */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          The <span className="text-yellow-500">WristHub</span> Legacy
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Founded on the principle of precision, WristHub is dedicated to curating Pakistan’s finest collection of luxury timepieces.
        </p>
      </header>

      {/* --- Mission Section (Box) --- */}
      {/* FIX: Reduced mb-16 to mb-10 */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 mb-10">
        
        {/* Visual */}
        <div className="w-full h-64 bg-gray-700 rounded-xl overflow-hidden relative group shadow-lg">
            <img 
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Luxury Watch"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            More Than Just Time
          </h2>
          <div className="w-16 h-1 bg-yellow-500 rounded"></div>
          <p className="text-gray-300 leading-relaxed text-base">
            We believe that every watch tells a unique story. Our commitment is to offer a transparent and secure shopping experience for enthusiasts across Pakistan. We specialize in high-quality, meticulously selected automatic and quartz movements, ensuring every piece you purchase is a legacy in the making.
          </p>
          <p className="text-gray-300 leading-relaxed text-base">
            Our team of horology enthusiasts meticulously verifies every timepiece, guaranteeing you receive a product of unmatched quality and lasting value.
          </p>
        </div>
      </div>
      
      {/* --- Features Grid --- */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Why Choose Us?</h2>
        <p className="text-gray-400">We don't just sell watches; we deliver trust.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg">
            <Shield size={32} className="text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform"/>
            <h3 className="font-bold text-white text-lg mb-2">Authentic</h3>
            <p className="text-sm text-gray-400">100% Verified Quality</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg">
            <Truck size={32} className="text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform"/>
            <h3 className="font-bold text-white text-lg mb-2">Fast Shipping</h3>
            <p className="text-sm text-gray-400">Nationwide Delivery</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg">
            <Handshake size={32} className="text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform"/>
            <h3 className="font-bold text-white text-lg mb-2">Easy Payment</h3>
            <p className="text-sm text-gray-400">COD & Bank Transfer</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg">
            <Clock size={32} className="text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform"/>
            <h3 className="font-bold text-white text-lg mb-2">Support</h3>
            <p className="text-sm text-gray-400">24/7 Customer Care</p>
        </div>
      </div>
    </div>
  );
};

export default About;