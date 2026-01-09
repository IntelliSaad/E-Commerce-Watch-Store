// src/pages/Contact.tsx
import React from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const Contact: React.FC = () => {
    const email = 'wristhubstore@gmail.com';
    const phonePrimary = '+923155308406';
    const phoneSecondary1 = '+923340997309';
    const phoneSecondary2 = '+923001501510';
    const address = 'Westridge 1, Rawalpindi, 46000, Pakistan';

    // Social Links
    const instagramLink = 'https://www.instagram.com/wristhubwatch?igsh=MTg0aTUyZjhtaXVxaA==';
    const tiktokLink = 'https://tiktok.com/@wristhubpk';
    const whatsappLink = 'https://wa.me/923155308406';

    return (
        <div className="py-4 max-w-5xl mx-auto px-4">

            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Get in Touch</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Have a question about a timepiece? Need help with an order? We are here to assist you 24/7.
                </p>
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">

                {/* WhatsApp Card */}
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col items-center hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">WhatsApp</h3>
                    <p className="text-gray-400 text-sm mt-1">Fastest Response</p>
                </a>

                {/* Instagram Card */}
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="group bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col items-center hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Instagram</h3>
                    <p className="text-gray-400 text-sm mt-1">Follow our Gallery</p>
                </a>

                {/* TikTok Card */}
                <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="group bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col items-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4 shadow-lg border border-gray-600 group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-1 13.6 6.84 6.84 0 0 0 6.25-5.45 6.84 6.84 0 0 0 .21-1.53V9.68a7.83 7.83 0 0 0 3.77 1.33v-3.44a4.28 4.28 0 0 1 0-.88Z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">TikTok</h3>
                    <p className="text-gray-400 text-sm mt-1">Watch Reviews</p>
                </a>
            </div>

            {/* Contact Details List */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-4">Direct Contact</h2>
                <div className="space-y-6 text-center md:text-left">

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="p-3 bg-gray-700 rounded-full text-yellow-500"><Mail size={24} /></div>
                        <div>
                            <h3 className="font-bold text-white">Email Support</h3>
                            <a href={`mailto:${email}`} className="text-gray-400 hover:text-yellow-500 transition">{email}</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="p-3 bg-gray-700 rounded-full text-yellow-500"><MapPin size={24} /></div>
                        <div>
                            <h3 className="font-bold text-white">Head Office</h3>
                            <p className="text-gray-400">{address}</p>
                            <a href="https://maps.google.com" target="_blank" className="text-xs text-yellow-500 underline mt-1 block">View Map</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="p-3 bg-gray-700 rounded-full text-yellow-500"><Phone size={24} /></div>
                        <div>
                            <h3 className="font-bold text-white">Phone Support</h3>
                            <p className="text-gray-400 text-sm">{phonePrimary}</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                <Clock size={14} className="text-gray-500" />
                                <span className="text-gray-400 text-xs">10:00 AM - 10:00 PM</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{phoneSecondary1}</p>
                            <p className="text-gray-400 text-sm">{phoneSecondary2}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;