import React, { useState } from 'react';
import { Product } from '../../types';
import { SEED_ARTISANS } from '../../data/seedData';
import {
  X,
  ShoppingBag,
  Zap,
  ShieldCheck,
  MapPin,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product?.enhancedImage || product?.images[0] || '');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const artisan = SEED_ARTISANS.find((a) => a.artisanId === product.artisanId) || {
    name: product.artisanName,
    craftType: product.category,
    generalLocation: product.artisanLocation,
    story: 'Dedicated heritage craftsperson practicing traditional Indian handcraft techniques.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
  };

  const currentImg = selectedImage || product.enhancedImage || product.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden my-8 animate-scale-up">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Handicraft Spec Sheet
            </span>
            <span className="text-xs font-mono text-craft-600 bg-craft-50 px-2 py-0.5 rounded border border-craft-200">
              {product.productId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div>
            <div className="h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Govt Verified Authenticity</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImg === img ? 'border-craft-600 scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Meet the Artisan Card */}
            <div className="mt-6 p-5 rounded-2xl bg-craft-50/70 border border-craft-200">
              <div className="flex items-center gap-2 text-xs font-bold text-craft-800 uppercase tracking-wider mb-3">
                <Award className="w-4 h-4 text-craft-600" />
                <span>Meet the Master Artisan</span>
              </div>

              <div className="flex items-start gap-3.5">
                <img
                  src={artisan.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                  alt={artisan.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs flex-shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{artisan.name}</h4>
                  <p className="text-xs text-craft-700 font-medium">{artisan.craftType}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{artisan.generalLocation}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                    "{artisan.story}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Purchasing */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-craft-700 bg-craft-50 px-2.5 py-1 rounded-md border border-craft-200">
                  {product.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2 leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Fair Trade Certified (Direct Payout)
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Product Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Materials & Craft Specifications */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Materials & Provenance
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Craft Tags */}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Heritage Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-craft-700 font-semibold bg-craft-50 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-slate-900 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Available stock: <strong>{product.quantity}</strong> units
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => {
                  onBuyNow(product, quantity);
                  onClose();
                }}
                className="py-3.5 px-4 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-sm shadow-lg shadow-craft-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
