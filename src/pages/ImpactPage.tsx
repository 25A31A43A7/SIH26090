import React from 'react';
import { ImpactSection } from '../components/home/ImpactSection';
import { ShieldCheck, Heart, Award, TrendingUp, Users, MapPin, Sparkles } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const socioEconomicHighlights = [
    {
      title: 'Zero Middleman Commission',
      desc: '100% of the customer retail price goes straight to verified master craftspersons, increasing household artisan incomes by 68%.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      title: 'Preservation of Endangered Crafts',
      desc: 'Revitalizing vulnerable craft forms like Bastar Dhokra bell metal and Poniki softwood carvings through year-round global visibility.',
      icon: Award,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Women Cooperative Leadership',
      desc: 'Over 64% of enrolled handicraft clusters in Assam, Telangana, and Bihar are managed by female artisan self-help groups.',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Pan-India Logistics Connectivity',
      desc: 'Smart logistics nodes enable express shipping from remote forest craft clusters directly to urban buyers across India in under 4 days.',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  ];

  return (
    <div className="space-y-12 py-10">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-craft-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>National Social Impact Data</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Empowering India's Heritage Guardians
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Measuring how AI-driven photography, multilingual voice cataloging, and direct logistics create sustainable livelihoods for traditional artisans.
          </p>
        </div>
      </div>

      {/* Embedded Live Impact Section with Charts & Counters */}
      <ImpactSection />

      {/* 4 Socio-Economic Impact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Transformative Community Outcomes
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Real impact metrics recorded across grassroots handicraft societies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socioEconomicHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-craft-lg transition-all flex items-start gap-5"
              >
                <div className={`p-4 rounded-2xl border ${item.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
