import React, { useState } from 'react';
import { Product } from '../data/products';
import { ArrowRight, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isRegistered?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isRegistered,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-[#111317] border border-[#1d2026] hover:border-neutral-600 rounded-xl overflow-hidden flex flex-col transition-all duration-200">
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] bg-[#16181e] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#171920]">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              {product.category}
            </span>
            <span className="mt-2 text-sm font-bold text-white font-display">
              {product.name}
            </span>
          </div>
        )}

        {/* Status notice */}
        {isRegistered && (
          <div className="absolute top-3 right-3 bg-white text-black px-2.5 py-1 text-[11px] font-bold rounded-md flex items-center gap-1 shadow-md">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Interest Registered</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category metadata */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
          <span className="uppercase tracking-wider font-mono text-[11px]">
            {product.category}
          </span>
          <span className="text-neutral-400">{product.pricingNotice}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-white uppercase tracking-tight font-display mb-2 group-hover:text-neutral-200">
          {product.name}
        </h3>

        {/* Overview text */}
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.overview}
        </p>

        {/* Variants Preview */}
        <div className="pt-3 border-t border-[#1d2026] space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Sizes:</span>
            <span className="text-neutral-300 font-mono">
              {product.availableSizes.join(' · ')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Colours:</span>
            <span className="text-neutral-300 truncate max-w-[170px] text-right">
              {product.availableColours.join(' · ')}
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => onSelect(product)}
          className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.99] ${
            isRegistered
              ? 'bg-[#1a1d24] text-neutral-300 border border-neutral-700 hover:border-neutral-500'
              : 'bg-white text-black hover:bg-neutral-200'
          }`}
        >
          <span>{isRegistered ? 'Update Registration' : 'Register Interest'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
