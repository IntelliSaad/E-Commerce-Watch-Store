// src/components/QuickViewModal.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

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
    brand?: string;
}

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    if (!isOpen || !product) return null;

    const coverImage = product.variants?.[0]?.images?.[0] || product.imageUrls?.[0] || 'https://placehold.co/400?text=No+Image';
    const hasDiscount = (product.discount || 0) > 0 && (product.originalPrice || 0) > product.price;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: coverImage,
        });
        showToast(`${product.name} added to cart!`, 'cart');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-full bg-white flex items-center justify-center p-6">
                        {hasDiscount && (
                            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {Math.round(product.discount || 0)}% OFF
                            </span>
                        )}
                        <img
                            src={coverImage}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col">
                        {/* Brand */}
                        {product.brand && (
                            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">
                                {product.brand}
                            </span>
                        )}

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                            {product.name}
                        </h2>

                        {/* Rating (placeholder) */}
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={14} className={star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                            ))}
                            <span className="text-gray-400 text-xs ml-2">(4.0)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-bold text-yellow-500">
                                Rs. {product.price.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-gray-500 line-through">
                                    Rs. {product.originalPrice?.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                            {product.description}
                        </p>

                        {/* Variants preview */}
                        {product.variants && product.variants.length > 1 && (
                            <div className="mb-6">
                                <span className="text-gray-400 text-xs mb-2 block">Available Colors:</span>
                                <div className="flex gap-2">
                                    {product.variants.slice(0, 4).map((variant, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-gray-600 overflow-hidden"
                                            title={variant.color}
                                        >
                                            <img src={variant.images[0]} alt={variant.color} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {product.variants.length > 4 && (
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                                            +{product.variants.length - 4}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>
                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                            >
                                <Eye size={18} />
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
