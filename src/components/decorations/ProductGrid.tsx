import React, { useState, useMemo } from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ArrowUpDown, AlertCircle, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then bestseller
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, sortBy]);

  return (
    <div className="space-y-4">
      {/* Top Bar with Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:px-5 rounded-2xl border border-gold-200/80 shadow-xs">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Showing <strong className="text-maroon-900 font-bold">{sortedProducts.length}</strong> rental items
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-600" /> Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-ivory-50 border border-gold-300 rounded-lg px-2.5 py-1.5 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 cursor-pointer"
          >
            <option value="featured">Royal Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gold-300 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-lg font-bold text-maroon-950 mb-2">
            No matching decor items found
          </h4>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            We couldn't find items matching your exact filter criteria or budget. Try adjusting the price slider or resetting your filters.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 text-xs font-bold rounded-xl shadow transition"
            >
              Reset All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
