import React from 'react';
import { Product } from '../../types';
import { ShoppingBag, Eye, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-craft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Product Image Container */}
        <div className="relative h-60 overflow-hidden bg-slate-100">
          <img
            src={product.enhancedImage || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Govt Verified Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Govt Verified</span>
          </div>

          {/* AI Enhanced Tag */}
          {product.aiCatalogGenerated && (
            <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Studio</span>
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Artisan & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-craft-700 truncate max-w-[150px]">
              {product.artisanName}
            </span>
            <span className="flex items-center gap-1 truncate max-w-[120px]">
              <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span>{product.artisanLocation}</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-craft-600 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Direct Price
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-emerald-600 font-medium block">
              In Stock ({product.quantity})
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="py-2.5 px-3 rounded-xl bg-craft-600 hover:bg-craft-700 text-white text-xs font-bold shadow-md shadow-craft-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
