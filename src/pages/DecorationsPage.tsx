import React, { useState, useMemo, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { ProductFilters } from '../components/decorations/ProductFilters';
import { ProductGrid } from '../components/decorations/ProductGrid';
import { SearchBar } from '../components/common/SearchBar';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';

export const DecorationsPage: React.FC = () => {
  const { 
    products, 
    activeCategoryFilter, 
    setActiveCategoryFilter, 
    searchQuery, 
    setSearchQuery, 
    checkAvailability, 
    selectedDates 
  } = useBooking();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: activeCategoryFilter || 'all',
    decorType: 'all',
    maxPrice: 40000,
    onlyAvailable: false,
    minRating: 0,
  });

  // Keep category in sync with context
  useEffect(() => {
    if (activeCategoryFilter) {
      setFilters(prev => ({ ...prev, category: activeCategoryFilter }));
    }
  }, [activeCategoryFilter]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    if (newFilters.category !== activeCategoryFilter) {
      setActiveCategoryFilter(newFilters.category);
    }
  };

  const handleResetFilters = () => {
    const defaultF = {
      category: 'all',
      decorType: 'all',
      maxPrice: 40000,
      onlyAvailable: false,
      minRating: 0,
    };
    setFilters(defaultF);
    setActiveCategoryFilter('all');
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchHindi = p.hindiName?.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchHindi && !matchDesc && !matchTags && !matchCat) return false;
      }

      // Category match
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Decor type match
      if (filters.decorType !== 'all' && p.decorType !== filters.decorType) {
        return false;
      }

      // Price match
      if (p.pricePerDay > filters.maxPrice) {
        return false;
      }

      // Min rating match
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // Only available match for selected dates
      if (filters.onlyAvailable) {
        const avail = checkAvailability(p.id, selectedDates.startDate, selectedDates.endDate, 1);
        if (!avail.available) return false;
      }

      return true;
    });
  }, [products, filters, searchQuery, selectedDates]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header and Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-maroon-700" />
              <span>Full Rental Catalog</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">
              Function & Wedding Decor Items
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your dates to verify live warehouse stock and book instant rental sets.
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-maroon-800 text-gold-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm self-start"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          initialValue={searchQuery}
          onSearch={setSearchQuery}
        />
      </div>

      {/* Active Filter Chips */}
      {(filters.category !== 'all' || filters.decorType !== 'all' || searchQuery || filters.onlyAvailable) && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            Active Filters:
          </span>

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-gold-100 text-maroon-900 font-bold px-2.5 py-1 rounded-full border border-gold-300">
              Occasion: {filters.category}
              <button onClick={() => handleFilterChange({ ...filters, category: 'all' })}>
                <X className="w-3 h-3 text-maroon-700" />
              </button>
            </span>
          )}

          {filters.decorType !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-gold-100 text-maroon-900 font-bold px-2.5 py-1 rounded-full border border-gold-300">
              Type: {filters.decorType}
              <button onClick={() => handleFilterChange({ ...filters, decorType: 'all' })}>
                <X className="w-3 h-3 text-maroon-700" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-maroon-800 text-gold-200 font-bold px-2.5 py-1 rounded-full">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3 text-gold-300" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-maroon-800 hover:underline font-bold ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Product Grid (9 cols) */}
        <div className="lg:col-span-9">
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto space-y-4 shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-base font-bold text-maroon-950">Filter Catalog</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
