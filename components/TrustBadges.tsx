// src/components/TrustBadges.tsx
import React from 'react';
import { Shield, Truck, CreditCard, Clock, Award, Headphones } from 'lucide-react';

interface Badge {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const badges: Badge[] = [
    {
        icon: <Shield className="text-green-400" size={28} />,
        title: 'Secure Shopping',
        subtitle: '100% Protected',
    },
    {
        icon: <Truck className="text-blue-400" size={28} />,
        title: 'Free Delivery',
        subtitle: 'All Over Pakistan',
    },
    {
        icon: <CreditCard className="text-yellow-400" size={28} />,
        title: 'COD Available',
        subtitle: 'Cash on Delivery',
    },
    {
        icon: <Clock className="text-purple-400" size={28} />,
        title: 'Fast Shipping',
        subtitle: '3-5 Business Days',
    },
    {
        icon: <Award className="text-orange-400" size={28} />,
        title: 'Authentic Products',
        subtitle: 'Quality Guaranteed',
    },
    {
        icon: <Headphones className="text-pink-400" size={28} />,
        title: '24/7 Support',
        subtitle: 'WhatsApp Available',
    },
];

interface TrustBadgesProps {
    compact?: boolean; // For footer or smaller spaces
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ compact = false }) => {
    if (compact) {
        return (
            <div className="flex flex-wrap justify-center gap-4 py-4">
                {badges.slice(0, 4).map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-400">
                        {badge.icon}
                        <span className="text-xs font-medium">{badge.title}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section className="py-12 bg-gray-800/30 border-y border-gray-700/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-800/50 transition-colors group"
                        >
                            <div className="mb-3 p-3 rounded-full bg-gray-800 group-hover:scale-110 transition-transform">
                                {badge.icon}
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-1">{badge.title}</h3>
                            <p className="text-gray-400 text-xs">{badge.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
