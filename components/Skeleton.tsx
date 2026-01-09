// src/components/Skeleton.tsx
import React from 'react';

// Skeleton Box - Basic building block
export const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-gray-700 animate-pulse rounded ${className}`}></div>
);

// Skeleton Product Card
export const SkeletonProductCard: React.FC = () => (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
        {/* Image */}
        <div className="h-40 sm:h-64 bg-gray-700 animate-pulse"></div>
        {/* Content */}
        <div className="p-4 space-y-3">
            <SkeletonBox className="h-3 w-1/3" />
            <SkeletonBox className="h-5 w-full" />
            <SkeletonBox className="h-5 w-2/3" />
            <div className="flex gap-2 pt-2">
                <SkeletonBox className="h-6 w-20" />
                <SkeletonBox className="h-4 w-16" />
            </div>
            <SkeletonBox className="h-10 w-full mt-2" />
        </div>
    </div>
);

// Skeleton Grid (for Shop page)
export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 8 }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonProductCard key={i} />
        ))}
    </div>
);

// Skeleton Product Details
export const SkeletonProductDetails: React.FC = () => (
    <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square bg-gray-700 animate-pulse rounded-xl"></div>
        {/* Details */}
        <div className="space-y-4">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-3/4" />
            <SkeletonBox className="h-6 w-32" />
            <div className="space-y-2 pt-4">
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-2/3" />
            </div>
            <div className="flex gap-3 pt-6">
                <SkeletonBox className="h-10 w-24" />
                <SkeletonBox className="h-10 w-24" />
            </div>
            <SkeletonBox className="h-14 w-full mt-4" />
        </div>
    </div>
);

export default { SkeletonBox, SkeletonProductCard, SkeletonGrid, SkeletonProductDetails };
