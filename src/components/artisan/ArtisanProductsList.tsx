import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { StatusBadge } from '../common/StatusBadge';
import { Plus, Sparkles, MapPin, Eye, Package, Trash2 } from 'lucide-react';

interface ArtisanProductsListProps {
  artisanId: string;
  onOpenAddProduct: () => void;
  onViewDetails: (product: Product) => void;
}

export const ArtisanProductsList: React.FC<ArtisanProductsListProps> = ({
  artisanId,
  onOpenAddProduct,
  onViewDetails
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterTab, setFilterTab] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'DRAFT'>('ALL');

  useEffect(() => {
    return productService.subscribe((all) => {
      setProducts(productService.getArtisanProducts(artisanId));
    });
  }, [artisanId]);

  const filteredProducts = products.filter((p) => {
    if (filterTab === 'ALL') return true;
    if (filterTab === 'APPROVED') return p.status === 'APPROVED';
    if (filterTab === 'PENDING') return p.status === 'PENDING_APPROVAL';
    if (filterTab === 'DRAFT') return p.status === 'DRAFT';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">My Handcraft Inventory</h3>
          <p className="text-xs text-slate-500">Products created using AI cataloging studio</p>
        </div>

        <button
          onClick={onOpenAddProduct}
          className="px-5 py-2.5 rounded-xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-md shadow-craft-600/20 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {(['ALL', 'APPROVED', 'PENDING', 'DRAFT'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab === 'ALL' ? 'All Items' : tab === 'APPROVED' ? 'Govt Approved' : tab === 'PENDING' ? 'Under Review' : 'Drafts'}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800">No products found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Use the AI Product Creation Wizard to take a photo and generate your catalog listing.
          </p>
          <button
            onClick={onOpenAddProduct}
            className="mt-4 px-5 py-2.5 rounded-xl bg-craft-600 text-white font-bold text-xs"
          >
            Create First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.productId}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-craft transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
                  <img
                    src={p.enhancedImage || p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                  {p.aiCatalogGenerated && (
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>AI Generated</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-bold uppercase text-craft-700 bg-craft-50 px-2 py-0.5 rounded">
                  {p.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-2">
                  {p.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Price</span>
                  <span className="font-extrabold text-slate-900 text-base">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetails(p)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
