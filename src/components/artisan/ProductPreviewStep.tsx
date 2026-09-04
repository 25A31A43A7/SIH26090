import React, { useState } from 'react';
import { Product, ProductCategory, ProductStatus } from '../../types';
import { productService } from '../../services/productService';
import { storageService } from '../../services/storageService';
import {
  Sparkles,
  ShieldAlert,
  Save,
  Send,
  Edit,
  MapPin,
  CheckCircle2,
  WifiOff,
  Wifi,
  Package
} from 'lucide-react';

interface ProductPreviewStepProps {
  productData: {
    name: string;
    category: ProductCategory;
    description: string;
    materials: string[];
    tags: string[];
    price: number;
    quantity: number;
    enhancedImage: string;
    originalImage: string;
    artisanId: string;
    artisanName: string;
    artisanLocation: string;
    rawCost: number;
    labourHours: number;
    aiSuggestedPrice: number;
    priceRange: { min: number; max: number };
  };
  onEditStep: (stepIdx: number) => void;
  onSubmitComplete: (product: Product) => void;
  onBack: () => void;
}

export const ProductPreviewStep: React.FC<ProductPreviewStepProps> = ({
  productData,
  onEditStep,
  onSubmitComplete,
  onBack
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState<string | null>(null);

  const handleSaveDraft = () => {
    const draft = productService.createProduct({
      ...productData,
      images: [productData.enhancedImage || productData.originalImage],
      status: 'DRAFT' as ProductStatus,
      aiCatalogGenerated: true
    });
    setOfflineStatus('Draft Saved Locally (Offline-Ready)');
    setTimeout(() => {
      onSubmitComplete(draft);
    }, 1200);
  };

  const handleSubmitForApproval = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const product = productService.createProduct({
        ...productData,
        images: [productData.enhancedImage || productData.originalImage],
        status: 'PENDING_APPROVAL' as ProductStatus,
        aiCatalogGenerated: true
      });
      setIsSubmitting(false);
      onSubmitComplete(product);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-craft-700 bg-craft-50 px-3 py-1 rounded-full border border-craft-200">
          Step 4 • Final Review & Government Submission
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          Verify Listing Details
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review your AI-generated catalog card before submitting to the Ministry of Textiles verification portal.
        </p>
      </div>

      {offlineStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
          <Wifi className="w-4 h-4 text-emerald-600" />
          <span>{offlineStatus}</span>
        </div>
      )}

      {/* Preview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-craft-300 shadow-craft-lg max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="h-72 rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200">
            <img
              src={productData.enhancedImage || productData.originalImage}
              alt={productData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-amber-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Enhanced Visuals</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-craft-800 text-xs font-bold px-3 py-1 rounded-lg border border-craft-200 shadow-sm">
              ₹{productData.price.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-craft-700 bg-craft-50 px-2.5 py-0.5 rounded border border-craft-200">
                {productData.category}
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 leading-tight">
                {productData.name}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-craft-600" />
                <span>{productData.artisanName} • {productData.artisanLocation}</span>
              </p>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {productData.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Materials:
                </span>
                <div className="flex flex-wrap gap-1">
                  {productData.materials.map((m, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Stock Quantity: <strong>{productData.quantity} units</strong></span>
                <span>Craft Hours: <strong>{productData.labourHours} hrs</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onEditStep(0)}
              className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Offline Draft</span>
            </button>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitForApproval}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-lg shadow-craft-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit for Government Approval'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
