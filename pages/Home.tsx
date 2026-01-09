// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import ProductSlider from '../components/ProductSlider';
import HeroSection from '../components/HeroSection';
import BrandStory from '../components/BrandStory';
import CollectionGrid from '../components/CollectionGrid';
import TestimonialsMasonry from '../components/TestimonialsMasonry';
import SEO from '../components/SEO';

interface Variant { color: string; images: string[]; }
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  variants?: Variant[];
}

const Home: React.FC = () => {
  // ... (state and effects)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, limit(8)); // Increased limit for better display
        const querySnapshot = await getDocs(q);

        const productsData: Product[] = [];
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description,
            imageUrls: data.imageUrls || (data.variants?.[0]?.images || []),
            variants: data.variants || [],
          } as Product);
        });

        setFeaturedProducts(productsData);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="bg-brand-darker min-h-screen">
      <SEO
        title="Premium Watches in Pakistan"
        description="WristHub offers the finest collection of luxury watches in Pakistan. Shop Rolex, Omega, and more with cash on delivery and nationwide shipping."
      // Uses default image from SEO component
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Story - The Art of Time */}
      <BrandStory />

      {/* 3. Collections - Bento Grid */}
      <div id="collections">
        <CollectionGrid />
      </div>

      {/* 4. Featured Products Slider */}
      <div className="py-24 bg-brand-dark border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-2 block">Exquisite Selection</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Trending Timepieces</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <ProductSlider products={featuredProducts} title="" />
          )}
        </div>
      </div>

      {/* 5. Social Proof - Masonry Testimonials */}
      <TestimonialsMasonry />

      {/* 6. Instagram Feed / Newsletter Divider (Optional - handled in Footer) */}

    </div>
  );
};

export default Home;