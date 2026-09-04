import React, { useEffect, useState } from 'react';
import { impactStatisticsService } from '../../services/impactStatisticsService';
import { ImpactStatistics } from '../../types';
import { BarChart3, PieChart, TrendingUp, MapPin, CheckCircle, Percent } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const [stats, setStats] = useState<ImpactStatistics>(impactStatisticsService.getStatistics());

  useEffect(() => {
    return impactStatisticsService.subscribe((s) => {
      setStats(s);
    });
  }, []);

  const craftCategoryData = [
    { name: 'Wooden Crafts', count: 1240, percent: 32, color: 'bg-craft-500' },
    { name: 'Handloom & Silk', count: 980, percent: 25, color: 'bg-amber-500' },
    { name: 'Pottery & Ceramics', count: 620, percent: 16, color: 'bg-emerald-500' },
    { name: 'Bamboo Crafts', count: 430, percent: 11, color: 'bg-blue-500' },
    { name: 'Traditional Paintings', count: 350, percent: 9, color: 'bg-purple-500' },
    { name: 'Home Decor & Metal', count: 230, percent: 7, color: 'bg-rose-500' }
  ];

  const stateRegionalData = [
    { state: 'Andhra Pradesh & Telangana', artisans: 480, growth: '+28%' },
    { state: 'Rajasthan', artisans: 320, growth: '+19%' },
    { state: 'Assam & North East', artisans: 240, growth: '+34%' },
    { state: 'Uttar Pradesh', artisans: 190, growth: '+15%' },
    { state: 'Bihar & Odisha', artisans: 130, growth: '+22%' },
    { state: 'Karnataka & Tamil Nadu', artisans: 110, growth: '+18%' }
  ];

  const deliverySuccessRate = Math.min(
    99.2,
    Math.round((stats.deliveredCount / Math.max(1, stats.orderedCount)) * 1000) / 10
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">National Craft Ecosystem Analytics</h3>
        <p className="text-xs text-slate-500">
          Geographical cluster health, category distribution, and logistics completion benchmarks
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Delivery Success Rate</span>
            <Percent className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {deliverySuccessRate}%
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">✓ Verified with QR Digital POD</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Craft Clusters</span>
            <MapPin className="w-5 h-5 text-craft-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {stats.statesReachedCount} States
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 8 GI-Certified Craft Types</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Direct Economic Outflow</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            ₹{(stats.totalRevenueGenerated / 100000).toFixed(2)} Lakhs
          </div>
          <p className="text-xs text-slate-500 mt-1">Transferred directly to artisan bank accounts</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Handicraft Category Distribution</h4>
              <p className="text-xs text-slate-500">Breakdown of {stats.approvedProductCount} approved listings</p>
            </div>
            <BarChart3 className="w-5 h-5 text-craft-600" />
          </div>

          <div className="space-y-4">
            {craftCategoryData.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.name}</span>
                  <span className="font-mono text-slate-900">{cat.percent}% ({cat.count})</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.percent}%` }}
                    className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State/Regional Growth */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Regional Artisan Clusters</h4>
              <p className="text-xs text-slate-500">Distribution across verified handicraft hubs</p>
            </div>
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>

          <div className="divide-y divide-slate-100">
            {stateRegionalData.map((reg, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{reg.state}</span>
                  <span className="text-[11px] text-slate-500">{reg.artisans} Registered Artisans</span>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {reg.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
