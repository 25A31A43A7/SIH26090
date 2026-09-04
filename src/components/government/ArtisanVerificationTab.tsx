import React, { useEffect, useState } from 'react';
import { Artisan } from '../../types';
import { governmentService } from '../../services/governmentService';
import { StatusBadge } from '../common/StatusBadge';
import { ShieldCheck, UserX, CheckCircle, MapPin, Award, Clock } from 'lucide-react';

export const ArtisanVerificationTab: React.FC = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED'>('PENDING');

  useEffect(() => {
    return governmentService.subscribe((all) => {
      setArtisans(all);
    });
  }, []);

  const filtered = artisans.filter((a) => {
    if (selectedFilter === 'ALL') return true;
    return a.verificationStatus === selectedFilter;
  });

  const handleVerify = (artisanId: string) => {
    governmentService.verifyArtisan(artisanId);
  };

  const handleReject = (artisanId: string) => {
    governmentService.rejectArtisan(artisanId, 'GI Handicraft certification document required.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Artisan Master Verification Queue</h3>
          <p className="text-xs text-slate-500">
            Verify GI craft credentials and authorize artisan onboarding onto the national portal
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['PENDING', 'VERIFIED', 'ALL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === tab
                  ? 'bg-govnavy-800 text-white shadow-xs'
                  : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab === 'PENDING' ? '⏳ Pending Review' : tab === 'VERIFIED' ? '✓ Verified Artisans' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Artisans list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800">No pending artisan registrations</h4>
          <p className="text-xs text-slate-400 mt-1">All master craftspersons in this queue have been processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((art) => (
            <div
              key={art.artisanId}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-craft transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={art.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                      alt={art.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base leading-tight">{art.name}</h4>
                      <p className="text-xs text-craft-700 font-semibold">{art.craftType}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{art.generalLocation}</span>
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={art.verificationStatus} size="sm" />
                </div>

                <p className="text-xs text-slate-600 mt-3 italic leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  "{art.story}"
                </p>

                {art.specialties && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {art.specialties.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Joined: {art.joinedDate}</span>

                {art.verificationStatus === 'PENDING' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(art.artisanId)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 flex items-center gap-1"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleVerify(art.artisanId)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verify Artisan</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Authenticated Profile
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
