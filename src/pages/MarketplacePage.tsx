import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { productService } from '../services/productService';
import { ProductCard } from '../components/marketplace/ProductCard';
import { FilterSidebar } from '../components/marketplace/FilterSidebar';
import { ProductDetailsModal } from '../components/marketplace/ProductDetailsModal';
import { ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

interface MarketplacePageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  initialFilterCraft?: string;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onAddToCart,
  onBuyNow,
  initialFilterCraft
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All Regions');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    return productService.subscribe(() => {
      // ONLY GOVERNMENT APPROVED PRODUCTS APPEAR IN PUBLIC MARKETPLACE (SECTION 9)
      const approved = productService.getApprovedProducts();
      setProducts(approved);
    });
  }, []);

  useEffect(() => {
    if (initialFilterCraft) {
      setSearchQuery(initialFilterCraft);
    }
  }, [initialFilterCraft]);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesArtisan = product.artisanName.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesArtisan && !matchesCategory && !matchesTags) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (product.price > priceRange[1]) {
      return false;
    }

    // Location filter
    if (selectedLocation !== 'All Regions' && !product.artisanLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0; // featured
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 5000]);
    setSelectedLocation('All Regions');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Marketplace Header */}
      <div className="bg-gradient-to-r from-craft-800 via-craft-700 to-craft-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Government Verified Artisan Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Authentic Indian Handicrafts
          </h1>
          <p className="text-sm sm:text-base text-craft-100 leading-relaxed">
            Every product listed here is verified with certified Geographical Indication (GI) provenance and purchased directly from master artisans.
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            totalProductsCount={sortedProducts.length}
          />
        </div>

        {/* Right Products Catalog */}
        <div className="lg:col-span-3 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto stroke-[1.5]" />
              <h3 className="text-xl font-bold text-slate-800">No matching craft products</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search terms or expanding the price range slider.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-craft-600 text-white font-bold text-xs shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  onAddToCart={(p) => onAddToCart(p, 1)}
                  onViewDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, qty) => onAddToCart(p, qty)}
          onBuyNow={(p, qty) => {
            onBuyNow(p, qty);
          }}
        />
      )}
    </div>
  );
};
