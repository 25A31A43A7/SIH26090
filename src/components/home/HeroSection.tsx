import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mic,
  Truck,
  ShoppingBag,
  Palette,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const journeySteps = [
    { title: 'Artisan', icon: Palette, color: 'bg-craft-500' },
    { title: 'AI Catalog', icon: Mic, color: 'bg-amber-500' },
    { title: 'Govt Verification', icon: ShieldCheck, color: 'bg-govnavy-600' },
    { title: 'Marketplace', icon: ShoppingBag, color: 'bg-emerald-600' },
    { title: 'Customer Order', icon: ShoppingBag, color: 'bg-indigo-600' },
    { title: 'Payment', icon: CheckCircle2, color: 'bg-blue-600' },
    { title: 'Smart Delivery', icon: Truck, color: 'bg-purple-600' },
    { title: 'Customer', icon: Sparkles, color: 'bg-craft-600' }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-craft-gradient border-b border-craft-200/60">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 hero-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* SIH Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-craft-200 shadow-xs mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-craft-600 animate-pulse" />
            <span className="text-xs font-bold text-craft-800 tracking-wide">
              Smart India Hackathon 2026 • AI for Grassroots Artisans
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            <span className="block text-craft-700 font-serif font-normal italic mb-1">
              ShilpSetu AI
            </span>
            From Artisan to Customer
          </h1>

          {/* Supporting text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            An AI-powered digital ecosystem helping marginalized artisans create professional product listings, reach wider markets and manage orders and deliveries.
          </p>

          {/* Primary Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('marketplace')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-base shadow-lg shadow-craft-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('artisan')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-craft-300 shadow-sm transition-all hover:border-craft-500 flex items-center justify-center gap-2"
            >
              <Palette className="w-5 h-5 text-craft-600" />
              <span>Become an Artisan</span>
            </button>
          </div>
        </div>

        {/* Secondary Visual: The 8-Step Core Ecosystem Journey */}
        <div className="mt-16 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-craft-200 shadow-craft-lg">
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest text-craft-700 uppercase bg-craft-50 px-3 py-1 rounded-full border border-craft-200">
              Complete End-to-End Digital Commerce Pipeline
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
              The ShilpSetu Value Chain
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-2">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:border-craft-300 group-hover:bg-craft-50/50 transition-all">
                    <div
                      className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  {/* Arrow for desktop */}
                  {idx < journeySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-craft-400">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
