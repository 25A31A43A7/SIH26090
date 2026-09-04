import React, { useState } from 'react';
import { User, Product } from '../types';
import { ArtisanOverview } from '../components/artisan/ArtisanOverview';
import { ProductCreationWizard } from '../components/artisan/ProductCreationWizard';
import { ArtisanProductsList } from '../components/artisan/ArtisanProductsList';
import { ArtisanOrdersList } from '../components/artisan/ArtisanOrdersList';
import { CustomerOrders } from '../components/customer/CustomerOrders';
import { DeliveryPartnerDashboard } from '../components/delivery/DeliveryPartnerDashboard';
import { GovernmentDashboard } from '../components/government/GovernmentDashboard';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';
import { Palette, ShoppingBag, Truck, Shield, Layers, Package, Clock, Plus } from 'lucide-react';

interface DashboardRouterProps {
  currentUser: User;
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
}

export const DashboardRouter: React.FC<DashboardRouterProps> = ({
  currentUser,
  onNavigate,
  onAddToCart,
  onBuyNow
}) => {
  // Artisan specific sub-view state
  const [artisanSubView, setArtisanSubView] = useState<'overview' | 'add_product' | 'products' | 'orders'>('overview');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const handleProductCreated = (product: Product) => {
    setArtisanSubView('products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ARTISAN DASHBOARD */}
      {currentUser.role === 'artisan' && (
        <div className="space-y-6">
          {/* Artisan Sub-Navigation Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setArtisanSubView('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  artisanSubView === 'overview'
                    ? 'bg-craft-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Studio Overview
              </button>
              <button
                onClick={() => setArtisanSubView('products')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  artisanSubView === 'products'
                    ? 'bg-craft-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                My Products
              </button>
              <button
                onClick={() => setArtisanSubView('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  artisanSubView === 'orders'
                    ? 'bg-craft-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Orders & Shipments
              </button>
            </div>

            <button
              onClick={() => setArtisanSubView('add_product')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>AI Product Wizard</span>
            </button>
          </div>

          {/* Sub View Content */}
          {artisanSubView === 'overview' && (
            <ArtisanOverview
              artisanId={currentUser.userId === 'usr_artisan_1' ? 'art_1' : currentUser.userId}
              artisanName={currentUser.name}
              onOpenAddProduct={() => setArtisanSubView('add_product')}
              onViewOrders={() => setArtisanSubView('orders')}
              onViewProducts={() => setArtisanSubView('products')}
            />
          )}

          {artisanSubView === 'add_product' && (
            <ProductCreationWizard
              artisanId={currentUser.userId === 'usr_artisan_1' ? 'art_1' : currentUser.userId}
              artisanName={currentUser.name}
              artisanLocation={currentUser.generalLocation}
              onCancel={() => setArtisanSubView('overview')}
              onSuccess={handleProductCreated}
            />
          )}

          {artisanSubView === 'products' && (
            <ArtisanProductsList
              artisanId={currentUser.userId === 'usr_artisan_1' ? 'art_1' : currentUser.userId}
              onOpenAddProduct={() => setArtisanSubView('add_product')}
              onViewDetails={(p) => setInspectedProduct(p)}
            />
          )}

          {artisanSubView === 'orders' && (
            <ArtisanOrdersList
              artisanId={currentUser.userId === 'usr_artisan_1' ? 'art_1' : currentUser.userId}
              onTrackOrder={(trkId) => onNavigate('track', { trackingId: trkId })}
            />
          )}
        </div>
      )}

      {/* CUSTOMER DASHBOARD */}
      {currentUser.role === 'customer' && (
        <div className="space-y-6">
          <CustomerOrders
            customerId={currentUser.userId}
            onTrackOrder={(trkId) => onNavigate('track', { trackingId: trkId })}
          />
        </div>
      )}

      {/* DELIVERY PARTNER DASHBOARD */}
      {currentUser.role === 'delivery' && (
        <div className="space-y-6">
          <DeliveryPartnerDashboard
            onTrackOrder={(trkId) => onNavigate('track', { trackingId: trkId })}
          />
        </div>
      )}

      {/* GOVERNMENT / ADMIN DASHBOARD */}
      {currentUser.role === 'government' && (
        <div className="space-y-6">
          <GovernmentDashboard
            currentUser={currentUser}
            onTrackOrder={(trkId) => onNavigate('track', { trackingId: trkId })}
          />
        </div>
      )}

      {/* Product Details Modal if opened from list */}
      {inspectedProduct && (
        <ProductDetailsModal
          product={inspectedProduct}
          onClose={() => setInspectedProduct(null)}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}
    </div>
  );
};
