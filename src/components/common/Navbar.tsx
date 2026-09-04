import React, { useState } from 'react';
import { User } from '../../types';
import { authService } from '../../services/authService';
import {
  Sparkles,
  ShoppingBag,
  Bell,
  Menu,
  X,
  Compass,
  TrendingUp,
  Info,
  MapPin,
  Layers,
  LogOut,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenNotifications,
  unreadNotifsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'about', label: 'About', icon: Info },
    { id: 'track', label: 'Track Order', icon: MapPin },
    { id: 'impact', label: 'Impact', icon: TrendingUp }
  ];

  const getDashboardLabel = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'artisan':
        return 'Artisan Studio';
      case 'customer':
        return 'My Orders & Account';
      case 'delivery':
        return 'Delivery Console';
      case 'government':
        return 'Govt Portal';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-craft-100/80 sticky top-7 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-craft-600 to-craft-800 text-white flex items-center justify-center shadow-md shadow-craft-600/20 group-hover:scale-105 transition-transform">
            <span className="font-serif text-2xl font-bold tracking-tight">श</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-craft-600 transition-colors">
                ShilpSetu
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              From Artisan to Customer
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-craft-600 bg-craft-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* If Logged in, show role Dashboard link */}
          {currentUser && (
            <button
              onClick={() => onNavigate(currentUser.role)}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                currentPage === currentUser.role
                  ? 'bg-craft-600 text-white shadow-sm'
                  : 'text-craft-700 bg-craft-50 hover:bg-craft-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{getDashboardLabel()}</span>
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-craft-300 transition-all"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-craft-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-craft-300 transition-all"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div
                onClick={() => onNavigate(currentUser.role)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-craft-200 shadow-xs"
                />
                <div className="text-left leading-tight hidden xl:block">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-craft-600 font-semibold uppercase tracking-wider">
                    {currentUser.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('marketplace')}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-craft-600 hover:bg-craft-700 shadow-md shadow-craft-600/20 transition-all hover:scale-[1.02]"
              >
                Explore Crafts
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute 0 right-0 w-4 h-4 rounded-full bg-craft-600 text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                currentPage === link.id
                  ? 'bg-craft-50 text-craft-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          {currentUser ? (
            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate(currentUser.role);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold bg-craft-600 text-white flex items-center justify-between"
              >
                <span>Go to {getDashboardLabel()}</span>
                <span className="text-xs uppercase bg-white/20 px-2 py-0.5 rounded">
                  {currentUser.role}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({currentUser.name})</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 mt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onNavigate('marketplace');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-craft-600 text-white text-center shadow-md shadow-craft-600/20"
              >
                Marketplace
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
