import React from 'react';
import { Sparkles, Shield, Heart, MapPin, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-2xl bg-craft-600 text-white flex items-center justify-center font-serif text-xl font-bold">
                श
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-white">ShilpSetu</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  AI
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An AI-powered digital ecosystem helping marginalized Indian artisans move from traditional offline selling to verified digital commerce, transparent pricing, and smart logistics.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Smart India Hackathon Prototype (SIH-2026)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-amber-400 transition-colors">
                  Verified Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-amber-400 transition-colors">
                  Track Order Live
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('impact')} className="hover:text-amber-400 transition-colors">
                  National Impact Data
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  About the Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Artisan & Tech Features */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              AI Innovations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400 flex items-center gap-1.5">
                <span className="text-craft-400">✦</span> AI Image Studio
              </li>
              <li className="text-slate-400 flex items-center gap-1.5">
                <span className="text-craft-400">✦</span> Voice Cataloger (4 Langs)
              </li>
              <li className="text-slate-400 flex items-center gap-1.5">
                <span className="text-craft-400">✦</span> Dynamic Fair Pricing
              </li>
              <li className="text-slate-400 flex items-center gap-1.5">
                <span className="text-craft-400">✦</span> Government Verification
              </li>
              <li className="text-slate-400 flex items-center gap-1.5">
                <span className="text-craft-400">✦</span> Smart Route Logistics
              </li>
            </ul>
          </div>

          {/* Government & Transparency */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Governance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>GI Tag Verification</span>
              </li>
              <li className="text-xs text-slate-500">
                100% direct artisan payments with zero middleman exploitation.
              </li>
              <li className="text-xs text-slate-500 pt-2">
                Privacy-first consignment tags with protected home coordinates.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 ShilpSetu AI. Built for Smart India Hackathon.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">From Artisan to Customer</span>
            <span>•</span>
            <span className="text-amber-400/80">Made with ❤️ for Indian Heritage Craftspersons</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
