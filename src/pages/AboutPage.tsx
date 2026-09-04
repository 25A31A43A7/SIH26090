import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Mic,
  Calculator,
  ShoppingBag,
  Truck,
  Bell,
  ArrowRight,
  Award
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const problems = [
    'Dependence on physical exhibitions & annual seasonal melas',
    'Limited year-round market access outside local villages',
    'Digital literacy & complex e-commerce interface barriers',
    'Language barriers in English-only seller portals',
    'Difficulty capturing clean, professional product photography',
    'Complex technical cataloging & SEO metadata writing',
    'Uncertain pricing leading to middleman exploitation',
    'Logistical disconnects and fragmented rural courier pickups'
  ];

  const solutions = [
    {
      title: 'AI Image Studio',
      desc: 'Transforms mobile photos into studio-grade e-commerce listings with instant background removal and lighting correction.',
      icon: Camera
    },
    {
      title: 'Multilingual Voice Cataloger',
      desc: 'Enables artisans to speak naturally in Telugu, Hindi, Tamil, or English to generate complete product descriptions.',
      icon: Mic
    },
    {
      title: 'Dynamic Pricing Assistant',
      desc: 'Calculates raw materials and craft hours against national artisan wage benchmarks to recommend fair selling prices.',
      icon: Calculator
    },
    {
      title: 'Government Verification',
      desc: 'Authenticated by Ministry of Textiles officers to ensure 100% authentic GI provenance and eliminate counterfeits.',
      icon: ShieldCheck
    },
    {
      title: 'Digital Marketplace',
      desc: 'Direct-to-consumer marketplace with complete artisan storytelling and zero platform commission deductions.',
      icon: ShoppingBag
    },
    {
      title: 'Voice Order Approval',
      desc: 'Artisans receive voice-prompted new order notifications with large, accessible one-tap accept/reject controls.',
      icon: Bell
    },
    {
      title: 'Smart Delivery Tracking',
      desc: 'Unique Tracking IDs, physical handover QR codes, and a transparent delivery timeline for all stakeholders.',
      icon: Truck
    },
    {
      title: 'Central Alert System',
      desc: 'Real-time multi-stakeholder alert synchronization via SMS simulations, toasts, and unified statistics.',
      icon: Sparkles
    }
  ];

  const workflowSteps = [
    'Artisan',
    'AI Catalog',
    'Government Verification',
    'Marketplace',
    'Customer Order',
    'Artisan Approval',
    'Payment',
    'Delivery',
    'Customer'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Mission Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-craft-50 border border-craft-200 text-craft-800 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-craft-600" />
          <span>Smart India Hackathon 2026 Initiative</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Our Mission
        </h1>
        <p className="text-xl sm:text-2xl font-serif text-craft-700 italic">
          “Empowering marginalized Indian artisans with AI-driven digital commerce.”
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-2">
          ShilpSetu AI bridges the deep digital divide between traditional craftspersons in remote heritage villages and conscious global consumers who value authentic Indian handicrafts.
        </p>
      </div>

      {/* The Problem Section */}
      <div className="bg-rose-50/50 rounded-3xl p-8 sm:p-12 border border-rose-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-700">
              Grassroots Realities
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">The Problem</h2>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Despite practicing centuries of generational master craftsmanship, millions of rural artisans across India remain trapped in poverty due to systemic barriers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {problems.map((prob, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-rose-100 text-xs text-slate-700 font-medium">
              <span className="text-rose-600 font-bold">✕</span>
              <span>{prob}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Solution Section */}
      <div className="bg-emerald-50/40 rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Technology Architecture
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Solution</h2>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          ShilpSetu AI delivers an integrated ecosystem specifically engineered for low-literacy and voice-first rural users:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-emerald-100/80 shadow-xs flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{sol.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Flow */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 text-center space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            End-to-End Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            HOW IT WORKS
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 font-bold text-xs text-amber-300">
                {step}
              </span>
              {idx < workflowSteps.length - 1 && (
                <span className="text-craft-400 text-xs font-bold">&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-8 py-3.5 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-sm shadow-lg shadow-craft-600/30 transition-all hover:scale-105"
          >
            Explore the Verified Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
