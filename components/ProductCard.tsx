// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Venus, Mars, Watch } from 'lucide-react';

interface Variant { color: string; images: string[]; }

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  variants?: Variant[];
  imageUrls: string[];
  gender?: 'Male' | 'Female';
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // 1. Robust Image Logic
  let coverImage = 'https://placehold.co/300?text=No+Image'; // Fallback
  if (product.variants && product.variants.length > 0 && product.variants[0].images.length > 0) {
    coverImage = product.variants[0].images[0];
  } else if (product.imageUrls && product.imageUrls.length > 0) {
    coverImage = product.imageUrls[0];
  }

  // 2. Second Image for Hover Reveal
  let hoverImage = coverImage;
  if (product.variants && product.variants.length > 0 && product.variants[0].images.length > 1) {
    hoverImage = product.variants[0].images[1];
  } else if (product.imageUrls && product.imageUrls.length > 1) {
    hoverImage = product.imageUrls[1];
  }

  // 3. Gender Icon Logic
  const getGenderIcon = (gender: 'Male' | 'Female' | 'Unisex' | undefined) => {
    switch (gender) {
      case 'Male': return <Mars size={16} className="text-blue-400" />;
      case 'Female': return <Venus size={16} className="text-pink-400" />;
      default: return <Watch size={16} className="text-gray-400" />;
    }
  };

  // 4. Discount Logic
  const originalPrice = product.originalPrice || 0;
  const discount = product.discount || 0;
  const hasDiscount = discount > 0 && originalPrice > product.price;

  return (
    <div className="group relative bg-brand-charcoal rounded-sm overflow-hidden transition-all duration-300 hover:shadow-glow-md border border-white/5 hover:border-brand-gold/20 flex flex-col h-full">

      {/* === Image Area === */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square bg-white overflow-hidden">
        {/* Primary Image */}
        <img
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${hoverImage !== coverImage ? 'group-hover:opacity-0' : ''}`}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src={coverImage}
          alt={product.name}
          loading="lazy"
        />

        {/* Secondary Image (Hover Reveal) */}
        {hoverImage !== coverImage && (
          <img
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            src={hoverImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {hasDiscount && (
            <span className="bg-brand-gold text-brand-darker text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              {Math.round(discount)}% OFF
            </span>
          )}
          {/* Example Logic for Best Seller - could be prop driven */}
          {product.id.includes('1') && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-white/20">
              Best Seller
            </span>
          )}
        </div>

        {/* Gender Icon Overlay */}
        <div className="absolute top-3 right-3 p-1.5 bg-brand-darker/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors z-10">
          {getGenderIcon(product.gender)}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/10 backdrop-blur-md p-3 flex justify-center z-10">
          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Eye size={14} /> View Details
          </span>
        </div>
      </Link>

      {/* === Content Area === */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-white group-hover:text-brand-gold transition-colors line-clamp-1 mb-1 font-serif tracking-wide">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-3 mt-auto">
          <span className="text-base font-bold text-brand-gold-light">
            Rs. {product.price.toLocaleString()}
          </span>

          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through decoration-brand-gold/50">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;