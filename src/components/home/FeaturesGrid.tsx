import React from 'react';
import {
  Sparkles,
  Camera,
  Mic,
  Calculator,
  ShieldCheck,
  ShoppingBag,
  Truck,
  BellRing,
  ArrowRight
} from 'lucide-react';

interface FeaturesGridProps {
  onNavigate: (page: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'image-studio',
      title: 'AI Image Studio',
      description: 'Transform basic artisan mobile photos into marketplace-ready images with background removal and auto-lighting enhancement.',
      icon: Camera,
      badge: 'Vision AI',
      color: 'from-orange-500 to-craft-600',
      actionPage: 'artisan'
    },
    {
      id: 'voice-cataloger',
      title: 'Multilingual Voice Cataloger',
      description: 'Allow artisans to describe products in Telugu, Hindi, Tamil or English. Generates title, materials, description and SEO tags automatically.',
      icon: Mic,
      badge: 'Speech & NLP',
      color: 'from-amber-500 to-amber-700',
      actionPage: 'artisan'
    },
    {
      id: 'pricing-assistant',
      title: 'Dynamic Pricing Assistant',
      description: 'Suggest a fair, market-competitive selling price calculating raw costs, craft hours, and regional marketplace trends.',
      icon: Calculator,
      badge: 'Fair Trade AI',
      color: 'from-emerald-500 to-emerald-700',
      actionPage: 'artisan'
    },
    {
      id: 'government-verification',
      title: 'Government Verification',
      description: 'Ministry & Handloom Board officers verify artisan identities and authenticate GI handicraft certificates before public publishing.',
      icon: ShieldCheck,
      badge: 'Trust & Governance',
      color: 'from-govnavy-600 to-govnavy-800',
      actionPage: 'government'
    },
    {
      id: 'digital-marketplace',
      title: 'Digital Marketplace',
      description: 'Customers discover 100% verified, authentic Indian handicrafts with complete transparency and artisan storytelling.',
      icon: ShoppingBag,
      badge: 'Zero Middleman',
      color: 'from-blue-500 to-blue-700',
      actionPage: 'marketplace'
    },
    {
      id: 'smart-delivery',
      title: 'Smart Delivery Tracking',
      description: 'Unique Tracking IDs, physical handover QR codes, and a real-time visual milestone timeline from rural workshop to doorstep.',
      icon: Truck,
      badge: 'Smart Logistics',
      color: 'from-purple-500 to-purple-700',
      actionPage: 'track'
    },
    {
      id: 'central-alert',
      title: 'Central Alert System',
      description: 'Synchronized multi-stakeholder alerts via toasts, notification center, and SMS updates keep artisans, customers and logistics in sync.',
      icon: BellRing,
      badge: 'Real-Time Sync',
      color: 'from-rose-500 to-rose-700',
      actionPage: 'home'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-craft-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-craft-700 uppercase bg-craft-100/70 px-3.5 py-1 rounded-full border border-craft-200">
            Core Technology Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            7 Pillars of ShilpSetu AI
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered to overcome language, literacy, photography, and logistical barriers faced by rural handicraft producers.
          </p>
        </div>

        {/* 7 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isFullWidth = idx === 6; // Center the 7th item on desktop

            return (
              <div
                key={feat.id}
                className={`bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-craft-lg transition-all flex flex-col justify-between group ${
                  isFullWidth ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-craft-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    PILLAR 0{idx + 1}
                  </span>
                  <button
                    onClick={() => onNavigate(feat.actionPage)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-craft-600 hover:text-craft-800 transition-colors group-hover:translate-x-1"
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
