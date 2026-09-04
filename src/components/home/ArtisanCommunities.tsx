import React from 'react';
import { SEED_COMMUNITIES } from '../../data/seedData';
import { MapPin, Users, Package, ArrowRight, ShieldCheck } from 'lucide-react';

interface ArtisanCommunitiesProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ArtisanCommunities: React.FC<ArtisanCommunitiesProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Geographical Craft Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Artisan Communities
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-xl">
              Discover centuries-old craft clusters and GI-certified cooperative hubs registered on ShilpSetu.
            </p>
          </div>

          <button
            onClick={() => onNavigate('marketplace')}
            className="inline-flex items-center gap-2 text-sm font-bold text-craft-600 hover:text-craft-800 transition-colors"
          >
            <span>View All Registered Clusters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Community Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEED_COMMUNITIES.map((hub) => (
            <div
              key={hub.id}
              className="bg-slate-50/70 hover:bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-craft-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={hub.image}
                    alt={hub.craft}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{hub.state}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-craft-700 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{hub.region}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-craft-600 transition-colors">
                    {hub.craft}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {hub.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>{hub.artisanCount}</strong> Artisans</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>{hub.availableProductsCount}</strong> Products</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('marketplace', { filterCraft: hub.craft })}
                  className="w-full mt-4 py-2.5 rounded-xl bg-white hover:bg-craft-50 text-craft-700 font-bold text-xs border border-craft-200 hover:border-craft-400 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Cluster Crafts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
