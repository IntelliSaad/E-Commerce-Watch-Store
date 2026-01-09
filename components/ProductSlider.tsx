// src/components/ProductSlider.tsx
import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Variant { color: string; images: string[]; }
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[]; 
  variants?: Variant[];
}

interface ProductSliderProps {
  products: Product[];
  title: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, title }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const { current } = scrollContainer;
            const scrollAmount = current.offsetWidth * 0.75; 
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (products.length === 0) return null;

  return (
    <div className="my-12 relative group/slider">
      <div className="flex justify-between items-end mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
            <div className="h-1 w-20 bg-yellow-500 mt-2 rounded-full"></div>
        </h2>
        
        <div className="hidden md:flex space-x-2">
            <button onClick={() => scroll('left')} className="bg-gray-800 hover:bg-yellow-500 hover:text-black text-white p-2 rounded-full transition-colors border border-gray-700">
                <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="bg-gray-800 hover:bg-yellow-500 hover:text-black text-white p-2 rounded-full transition-colors border border-gray-700">
                <ChevronRight size={24} />
            </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainer} 
        className="flex space-x-5 overflow-x-auto pb-8 pt-2 px-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[22%] snap-center">
                <ProductCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;