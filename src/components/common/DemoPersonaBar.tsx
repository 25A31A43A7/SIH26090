import React from 'react';
import { User } from '../../types';
import { authService } from '../../services/authService';
import { notificationService } from '../../services/notificationService';
import { Sparkles, RotateCcw, LogIn, UserCheck } from 'lucide-react';

interface DemoPersonaBarProps {
  currentUser: User | null;
  onNavigate: (page: string) => void;
}

export const DemoPersonaBar: React.FC<DemoPersonaBarProps> = ({ currentUser, onNavigate }) => {
  const handleResetData = () => {
    if (confirm('Reset demo data to initial pre-seeded hackathon state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hackathon MVP badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wider text-amber-300 uppercase text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
            SIH 2026 Platform Portal
          </span>
          <span className="text-slate-300 hidden md:inline text-[11px]">
            {currentUser
              ? `Logged in as ${currentUser.name} (${currentUser.role.toUpperCase()}) • SMS Alerts to ${currentUser.phone}`
              : 'Public Visitor Mode • Access Artisan, Customer, Delivery & Govt roles via Login'}
          </span>
        </div>

        {/* Right: Quick actions & Link to Login */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{currentUser.name}</span>
              </span>
              <button
                onClick={() => {
                  authService.logout();
                  onNavigate('home');
                  notificationService.showToast('Logged Out', 'Returned to public view.', 'info');
                }}
                className="text-[11px] text-slate-400 hover:text-white underline ml-1"
              >
                Switch Role / Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Role Login (Artisan / Customer / Logistics / Govt)</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('track')}
            className="text-xs text-slate-400 hover:text-amber-300 hidden lg:inline font-mono"
          >
            Track Order (SHP-2026-7K29A4)
          </button>

          <button
            onClick={handleResetData}
            title="Reset to fresh demo data"
            className="p-1 rounded text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
