import React from 'react';
import { mapService, RouteData } from '../../services/mapService';
import { MapPin, Navigation, Truck, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface DeliveryRouteMapProps {
  trackingId: string;
  status: string;
}

export const DeliveryRouteMap: React.FC<DeliveryRouteMapProps> = ({ trackingId, status }) => {
  const route: RouteData = mapService.getRouteForTracking(trackingId, status);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
            <Navigation className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base">
              Smart Transit Corridor Simulation
            </h4>
            <p className="text-xs text-slate-400">
              {route.origin} &rarr; {route.destination} ({route.totalDistanceKm} km)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            {route.currentProgressPercent}% Route Progress
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            style={{ width: `${route.currentProgressPercent}%` }}
            className="h-full bg-gradient-to-r from-craft-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
          />
        </div>
      </div>

      {/* Visual Checkpoint Route Nodes */}
      <div className="relative pt-4 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
          {route.checkpoints.map((cp, idx) => {
            const isCompleted = cp.status === 'completed';
            const isCurrent = cp.status === 'current';

            return (
              <div
                key={cp.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Checkpoint 0{idx + 1}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>

                  <h5 className="font-bold text-xs text-white leading-snug">
                    {cp.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-craft-400 flex-shrink-0 mt-0.5" />
                    <span>{cp.location}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Status:</span>
                  <strong className={isCurrent ? 'text-amber-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                    {cp.timeEstimate}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          Protected Route Privacy • Zero exposure of exact residential door numbers
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          GPS Corridor: Vijayawada-Hyderabad NH65
        </span>
      </div>
    </div>
  );
};
