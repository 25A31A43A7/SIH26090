import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { impactStatisticsService } from '../../services/impactStatisticsService';
import { productService } from '../../services/productService';
import { governmentService } from '../../services/governmentService';
import { orderService } from '../../services/orderService';
import { ImpactStatistics } from '../../types';
import { ArtisanVerificationTab } from './ArtisanVerificationTab';
import { ProductApprovalTab } from './ProductApprovalTab';
import { OrderMonitoringTab } from './OrderMonitoringTab';
import { AnalyticsTab } from './AnalyticsTab';
import {
  ShieldCheck,
  PackageCheck,
  ShoppingCart,
  Truck,
  Users,
  BarChart3,
  Layers,
  FileCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface GovernmentDashboardProps {
  currentUser: User | null;
  onTrackOrder?: (trackingId: string) => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({ currentUser, onTrackOrder }) => {
  const [stats, setStats] = useState<ImpactStatistics>(impactStatisticsService.getStatistics());
  const [activeTab, setActiveTab] = useState<'approvals' | 'artisans' | 'orders' | 'analytics'>('approvals');
  const [pendingProductsCount, setPendingProductsCount] = useState<number>(0);
  const [pendingArtisansCount, setPendingArtisansCount] = useState<number>(0);

  useEffect(() => {
    const unsubStats = impactStatisticsService.subscribe((s) => setStats(s));
    const unsubProds = productService.subscribe(() => {
      setPendingProductsCount(productService.getPendingProducts().length);
    });
    const unsubArts = governmentService.subscribe(() => {
      setPendingArtisansCount(governmentService.getPendingArtisans().length);
    });

    return () => {
      unsubStats();
      unsubProds();
      unsubArts();
    };
  }, []);

  const statCards = [
    {
      label: 'Total Artisans',
      value: stats.artisanCount.toLocaleString('en-IN'),
      icon: Users,
      color: 'bg-amber-500',
      badge: `${pendingArtisansCount} Pending`
    },
    {
      label: 'Approved Products',
      value: stats.approvedProductCount.toLocaleString('en-IN'),
      icon: PackageCheck,
      color: 'bg-emerald-600',
      badge: `${pendingProductsCount} In Queue`
    },
    {
      label: 'Orders Placed',
      value: stats.orderedCount.toLocaleString('en-IN'),
      icon: ShoppingCart,
      color: 'bg-blue-600',
      badge: 'National Total'
    },
    {
      label: 'Orders Delivered',
      value: stats.deliveredCount.toLocaleString('en-IN'),
      icon: Truck,
      color: 'bg-purple-600',
      badge: 'QR Verified'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-govnavy-900 via-govnavy-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ministry of Textiles • Development Commissioner (Handicrafts)</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              National Artisan Verification & Oversight Portal
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Officer Console for Dr. Sunita Verma, IAS. Authorize GI craft certifications, monitor supply chain integrity, and track rural economic upliftment.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 text-right flex-shrink-0">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest block">
              Direct Beneficiary Outflow
            </span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              ₹{(stats.totalRevenueGenerated / 100000).toFixed(2)} Lakhs
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {card.badge}
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {card.value}
                </span>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {card.label}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'approvals'
              ? 'bg-govnavy-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Product Approvals ({pendingProductsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('artisans')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'artisans'
              ? 'bg-govnavy-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Artisan Verification ({pendingArtisansCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'orders'
              ? 'bg-govnavy-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Logistics & Orders</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-govnavy-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>National Analytics</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'approvals' && <ProductApprovalTab />}
        {activeTab === 'artisans' && <ArtisanVerificationTab />}
        {activeTab === 'orders' && <OrderMonitoringTab onTrackOrder={onTrackOrder} />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>
    </div>
  );
};
