import React, { useState } from 'react';
import { UserRole } from '../types';
import { authService } from '../services/authService';
import { notificationService } from '../services/notificationService';
import {
  Palette,
  ShoppingBag,
  Truck,
  Shield,
  ArrowRight,
  Sparkles,
  Smartphone,
  Mail,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'personas' | 'custom'>('personas');
  const [phoneNumber, setPhoneNumber] = useState<string>('+91 98765 43210');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>('artisan');

  const handlePersonaLogin = (role: UserRole) => {
    const user = authService.loginAsPersona(role, phoneNumber);
    notificationService.showToast(
      `Welcome, ${user.name}!`,
      `Logged in as ${role.toUpperCase()}. SMS alerts routed to ${phoneNumber}.`,
      'success'
    );
    onLoginSuccess(role);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmail.trim()) {
      const user = authService.customLogin(
        customEmail,
        customRole,
        customName || 'Registered User',
        phoneNumber
      );
      notificationService.showToast(
        `Welcome, ${user.name}!`,
        `Logged in as ${customRole.toUpperCase()}. SMS alerts routed to ${phoneNumber}.`,
        'success'
      );
      onLoginSuccess(customRole);
    }
  };

  const personas = [
    {
      role: 'artisan' as UserRole,
      name: 'Lakshmi Devi',
      title: 'Master Artisan (Kondapalli Toys, AP)',
      desc: 'Create AI product listings via Telugu/Hindi/Tamil voice, manage inventory, and accept customer orders with voice prompts.',
      icon: Palette,
      badge: 'Artisan Account',
      color: 'from-orange-500 to-craft-600',
      border: 'border-craft-200 hover:border-craft-500',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
    },
    {
      role: 'customer' as UserRole,
      name: 'Aarav Sharma',
      title: 'Heritage Craft Buyer (Hyderabad)',
      desc: 'Browse GI-verified Indian handicrafts, direct-to-artisan cart checkout, simulated UPI payment, and live order tracking.',
      icon: ShoppingBag,
      badge: 'Customer Account',
      color: 'from-blue-500 to-blue-700',
      border: 'border-blue-200 hover:border-blue-500',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
    },
    {
      role: 'delivery' as UserRole,
      name: 'Rajesh Kumar',
      title: 'Logistics Partner (Hub 04, South Zone)',
      desc: 'Scan consignment QR handover tags, manage express corridor transit checkpoints, and trigger milestone SMS updates.',
      icon: Truck,
      badge: 'Logistics Console',
      color: 'from-purple-500 to-purple-700',
      border: 'border-purple-200 hover:border-purple-500',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
    },
    {
      role: 'government' as UserRole,
      name: 'Dr. Sunita Verma, IAS',
      title: 'DC Handicrafts (Ministry of Textiles)',
      desc: 'Verify artisan identities, approve pending product catalog submissions for the marketplace, and inspect national impact data.',
      icon: Shield,
      badge: 'Govt Admin Authority',
      color: 'from-govnavy-600 to-govnavy-800',
      border: 'border-govnavy-300 hover:border-govnavy-600',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>ShilpSetu Authentication Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Role-Based Ecosystem Login
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your mobile phone number for real-time dispatch alerts, then choose your stakeholder account to sign in.
        </p>
      </div>

      {/* Mobile Phone Number Alert Routing Input */}
      <div className="max-w-md mx-auto bg-white p-5 rounded-3xl border-2 border-craft-200 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-craft-600" />
          <span>Mobile Phone Number (for SMS & Dispatch Alerts)</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-900 focus:border-craft-600 bg-slate-50"
          />
        </div>
        <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Order confirmations and live delivery SMS will be routed to this number.</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('personas')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'personas'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          1-Click Role Accounts
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'custom'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Custom Account Credentials
        </button>
      </div>

      {/* Persona Cards Grid */}
      {activeTab === 'personas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.role}
                onClick={() => handlePersonaLogin(persona.role)}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${persona.border} shadow-sm hover:shadow-craft-lg cursor-pointer transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={persona.avatar}
                        alt={persona.name}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                      />
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-craft-600 transition-colors">
                          {persona.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{persona.title}</p>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${persona.color} text-white flex items-center justify-center shadow-xs flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
                    {persona.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {persona.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-craft-600 group-hover:translate-x-1 transition-transform">
                    <span>Log In as {persona.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Login Form */}
      {activeTab === 'custom' && (
        <form
          onSubmit={handleCustomLogin}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-md mx-auto space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-lg text-center">Custom Account Sign In</h3>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Ramesh Chandra"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder="name@shilpsetu.in"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Role Type</label>
            <select
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-craft-500"
            >
              <option value="artisan">Artisan (Craft Creator)</option>
              <option value="customer">Customer (Direct Buyer)</option>
              <option value="delivery">Delivery Partner (Logistics)</option>
              <option value="government">Government / Admin Authority</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-sm shadow-md transition-all mt-4"
          >
            Sign In with Role & Phone Number
          </button>
        </form>
      )}
    </div>
  );
};
