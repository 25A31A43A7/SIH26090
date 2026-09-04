import React from 'react';
import { ProductCategory } from '../../types';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface FilterSidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Pottery',
  'Handloom',
  'Wooden Crafts',
  'Bamboo Crafts',
  'Traditional Textiles',
  'Paintings',
  'Home Decor',
  'Other Handicrafts'
];

const LOCATIONS = [
  'All Regions',
  'Andhra Pradesh',
  'Rajasthan',
  'Telangana',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Uttar Pradesh'
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalProductsCount
}) => {
  return (
    <aside className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-craft-600" />
          <h3 className="font-bold text-slate-900 text-base">Filter Products</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-craft-600 hover:text-craft-800 font-semibold flex items-center gap-1"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Search Crafts
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search toy, silk, pottery..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-craft-500 focus:ring-2 focus:ring-craft-100 transition-all"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Sort Order
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-hidden focus:border-craft-500"
        >
          <option value="featured">Featured / Curated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="newest">Recently Approved</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Craft Category
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-craft-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <span className="text-[10px]">●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Region / State
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-hidden focus:border-craft-500"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <label className="font-bold text-slate-700 uppercase tracking-wider">
            Max Price
          </label>
          <span className="font-bold text-craft-700 font-mono">
            ₹{priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-craft-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹500</span>
          <span>₹5,000+</span>
        </div>
      </div>

      {/* Products Counter */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <span className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{totalProductsCount}</strong> certified products
        </span>
      </div>
    </aside>
  );
};
