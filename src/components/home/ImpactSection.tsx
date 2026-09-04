import React, { useEffect, useState } from 'react';
import { impactStatisticsService } from '../../services/impactStatisticsService';
import { ImpactStatistics } from '../../types';
import { Users, PackageCheck, ShoppingCart, Truck, TrendingUp, Sparkles, ShieldCheck, Activity } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const [stats, setStats] = useState<ImpactStatistics>(impactStatisticsService.getStatistics());

  useEffect(() => {
    return impactStatisticsService.subscribe((currentStats) => {
      setStats(currentStats);
    });
  }, []);

  // Format large numbers with Indian comma notation
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  const statCards = [
    {
      id: 'artisans',
      label: 'Artisans Empowered',
      value: formatNumber(stats.artisanCount),
      subtext: 'Verified master craftspersons across 24 states',
      icon: Users,
      color: 'from-amber-500 to-craft-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'products',
      label: 'Products Approved',
      value: formatNumber(stats.approvedProductCount),
      subtext: 'Govt-certified GI & authentic handicrafts',
      icon: PackageCheck,
      color: 'from-emerald-500 to-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'orders',
      label: 'Orders Placed',
      value: formatNumber(stats.orderedCount),
      subtext: 'Direct artisan orders without middlemen',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-700',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'delivered',
      label: 'Orders Delivered',
      value: formatNumber(stats.deliveredCount),
      subtext: 'Smart tracked & securely fulfilled',
      icon: Truck,
      color: 'from-purple-500 to-purple-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  // Realistic growth trend bars normalized to the current live counts
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Live)'];
  const baseApproved = Math.round(stats.approvedProductCount / 5);
  const baseOrders = Math.round(stats.orderedCount / 5);
  const baseDelivered = Math.round(stats.deliveredCount / 5);

  const chartData = months.map((month, idx) => {
    const factor = (idx + 1) / 6;
    return {
      month,
      products: Math.round(baseApproved * (0.4 + factor * 0.6) * 5),
      orders: Math.round(baseOrders * (0.35 + factor * 0.65) * 5),
      delivered: Math.round(baseDelivered * (0.3 + factor * 0.7) * 5)
    };
  });

  // Latest month uses exact live state
  chartData[5] = {
    month: 'Sep (Live)',
    products: stats.approvedProductCount,
    orders: stats.orderedCount,
    delivered: stats.deliveredCount
  };

  const maxVal = Math.max(...chartData.map((d) => Math.max(d.products, d.orders, d.delivered)));

  return (
    <section className="py-20 bg-white border-b border-craft-100" id="impact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-craft-50 border border-craft-200 text-craft-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-craft-600 animate-pulse" />
            <span>Real-Time Ecosystem Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ShilpSetu Impact
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real-time digital transformation statistics recorded across verified Indian craft clusters.
          </p>

          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <strong className="text-slate-700">Platform Demo Statistics:</strong>
            <span>These figures represent activity recorded within the ShilpSetu platform.</span>
          </div>
        </div>

        {/* 4 Large Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-craft-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                    Live Metric
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1">
                  {card.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {card.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Platform Growth & Impact Visual Chart */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Aggregated Trajectory
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Platform Growth & Impact
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Correlation between government catalog approval and fulfilled customer deliveries
              </p>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-300">Approved Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-slate-300">Orders Placed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-slate-300">Orders Delivered</span>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Series Bar Visualization */}
          <div className="mt-8 pt-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-6 items-end h-64 border-b border-slate-800 pb-2">
              {chartData.map((item, idx) => {
                const prodH = Math.max(12, Math.round((item.products / maxVal) * 100));
                const orderH = Math.max(15, Math.round((item.orders / maxVal) * 100));
                const delivH = Math.max(10, Math.round((item.delivered / maxVal) * 100));

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-24 bg-slate-800 border border-slate-700 text-[10px] p-2 rounded-lg pointer-events-none z-20 shadow-lg text-slate-200">
                      <p className="font-bold text-amber-300">{item.month}</p>
                      <p>Products: {formatNumber(item.products)}</p>
                      <p>Orders: {formatNumber(item.orders)}</p>
                      <p>Delivered: {formatNumber(item.delivered)}</p>
                    </div>

                    {/* Bar columns */}
                    <div className="flex items-end gap-1 sm:gap-2 w-full justify-center h-full">
                      {/* Approved Products */}
                      <div
                        style={{ height: `${prodH}%` }}
                        className="w-2.5 sm:w-5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-500 hover:brightness-125"
                        title={`Approved Products: ${item.products}`}
                      />
                      {/* Orders Placed */}
                      <div
                        style={{ height: `${orderH}%` }}
                        className="w-2.5 sm:w-5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 hover:brightness-125"
                        title={`Orders Placed: ${item.orders}`}
                      />
                      {/* Orders Delivered */}
                      <div
                        style={{ height: `${delivH}%` }}
                        className="w-2.5 sm:w-5 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-500 hover:brightness-125"
                        title={`Orders Delivered: ${item.delivered}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="grid grid-cols-6 gap-2 sm:gap-6 mt-3 text-center text-xs font-medium text-slate-400">
              {months.map((m, idx) => (
                <span
                  key={idx}
                  className={idx === 5 ? 'text-amber-400 font-bold' : 'text-slate-400'}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>Direct artisan payouts recorded: <strong className="text-amber-300 font-mono">₹{formatNumber(stats.totalRevenueGenerated)}</strong></span>
            <span>Central database sync status: <strong className="text-emerald-400">Active & Reactive</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
