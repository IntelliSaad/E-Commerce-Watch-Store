// src/components/AnimatedCounter.tsx
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface CounterItem {
    value: number;
    suffix?: string;
    label: string;
}

interface AnimatedCounterProps {
    items: CounterItem[];
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ items }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState<number[]>(items.map(() => 0));
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

            setCounts(items.map((item) => Math.floor(item.value * easeOut)));

            if (current >= steps) {
                clearInterval(timer);
                setCounts(items.map((item) => item.value));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, items]);

    return (
        <div ref={ref} className="py-12 bg-gradient-to-r from-gray-800/50 via-gray-900 to-gray-800/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-3xl md:text-5xl font-extrabold text-yellow-500 mb-2 transition-transform group-hover:scale-110">
                                {counts[index].toLocaleString()}
                                {item.suffix && <span className="text-yellow-400">{item.suffix}</span>}
                            </div>
                            <div className="text-gray-400 text-sm md:text-base font-medium">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Real-time stats from Firebase
export const WristHubStats: React.FC = () => {
    const [stats, setStats] = useState<CounterItem[]>([
        { value: 0, suffix: '+', label: 'Happy Customers' },
        { value: 0, suffix: '+', label: 'Premium Watches' },
        { value: 0, suffix: '+', label: 'Top Brands' },
        { value: 0, suffix: '%', label: 'Satisfaction Rate' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Get delivered orders count (Happy Customers)
                const ordersRef = collection(db, 'orders');
                const deliveredQuery = query(ordersRef, where('status', '==', 'delivered'));
                const ordersSnapshot = await getDocs(deliveredQuery);
                const customerCount = ordersSnapshot.size;

                // 2. Get total products count
                const productsRef = collection(db, 'products');
                const productsSnapshot = await getDocs(productsRef);
                const productCount = productsSnapshot.size;

                // 3. Get unique brands count
                const brands = new Set<string>();
                productsSnapshot.docs.forEach(doc => {
                    const brand = doc.data().brand;
                    if (brand) brands.add(brand.toLowerCase());
                });
                const brandCount = brands.size;

                // 4. Calculate satisfaction rate from reviews
                const reviewsRef = collection(db, 'reviews');
                const reviewsQuery = query(reviewsRef, where('isApproved', '==', true));
                const reviewsSnapshot = await getDocs(reviewsQuery);

                let satisfactionRate = 99; // Default if no reviews
                if (reviewsSnapshot.size > 0) {
                    const totalRating = reviewsSnapshot.docs.reduce((sum, doc) => sum + (doc.data().rating || 0), 0);
                    const avgRating = totalRating / reviewsSnapshot.size;
                    // Convert 5-star rating to percentage (e.g., 4.5/5 = 90%)
                    satisfactionRate = Math.round((avgRating / 5) * 100);
                }

                setStats([
                    { value: customerCount || 0, suffix: '+', label: 'Happy Customers' },
                    { value: productCount || 0, suffix: '+', label: 'Premium Watches' },
                    { value: brandCount || 0, suffix: '+', label: 'Top Brands' },
                    { value: satisfactionRate, suffix: '%', label: 'Satisfaction Rate' },
                ]);
            } catch (error) {
                console.error('Error fetching stats:', error);
                // Keep defaults on error
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Don't render if all stats are 0 and loading is done
    const hasData = stats.some(s => s.value > 0) || loading;

    if (!hasData) {
        return null; // Hide stats section if no data
    }

    return <AnimatedCounter items={stats} />;
};

export default AnimatedCounter;
