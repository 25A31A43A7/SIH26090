import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { StatusBadge } from '../common/StatusBadge';
import {
  CheckCircle2,
  XCircle,
  Eye,
  MapPin,
  Sparkles,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Package
} from 'lucide-react';

interface ProductApprovalTabProps {
  onViewProductModal?: (product: Product) => void;
}

export const ProductApprovalTab: React.FC<ProductApprovalTabProps> = ({ onViewProductModal }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<'PENDING' | 'APPROVED' | 'ALL'>('PENDING');

  useEffect(() => {
    return productService.subscribe((all) => {
      setProducts(all);
    });
  }, []);

  const pendingList = products.filter((p) => p.status === 'PENDING_APPROVAL');
  const approvedList = products.filter((p) => p.status === 'APPROVED');

  const filtered = activeFilter === 'PENDING' ? pendingList : activeFilter === 'APPROVED' ? approvedList : products;

  const handleApprove = (productId: string) => {
    productService.approveProductByGovernment(productId);
  };

  const handleReject = (productId: string) => {
    productService.rejectProductByGovernment(productId, 'Requires additional material provenance documentation.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">National Product Catalog Certification</h3>
          <p className="text-xs text-slate-500">
            Review artisan AI catalog submissions and authorize public marketplace publishing
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['PENDING', 'APPROVED', 'ALL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-govnavy-800 text-white shadow-xs'
                  : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab === 'PENDING' ? `⏳ Pending (${pendingList.length})` : tab === 'APPROVED' ? `✓ Approved (${approvedList.length})` : 'All'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800">No pending products in queue</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            All submitted artisan listings have been evaluated and certified.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((prod) => (
            <div
              key={prod.productId}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-craft transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 max-w-2xl">
                <img
                  src={prod.enhancedImage || prod.images[0]}
                  alt={prod.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-craft-700 bg-craft-50 px-2 py-0.5 rounded border border-craft-200">
                      {prod.category}
                    </span>
                    <StatusBadge status={prod.status} size="sm" />
                    {prod.aiCatalogGenerated && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>AI Cataloged ({prod.voiceLanguageUsed || 'Voice'})</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-base leading-snug">{prod.name}</h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="text-slate-800 font-semibold">Artisan: {prod.artisanName}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {prod.artisanLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Submitted: {new Date(prod.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Right Pricing & Approval Actions */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Listing Price
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {prod.status === 'PENDING_APPROVAL' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(prod.productId)}
                      className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(prod.productId)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Live on Marketplace</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
