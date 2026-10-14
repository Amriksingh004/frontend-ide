import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { EventCategory, DecorType } from '../../types';

interface FiltersState {
  category: string;
  decorType: string;
  maxPrice: number;
  onlyAvailable: boolean;
  minRating: number;
}

interface ProductFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  onReset: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const categories: { label: string; value: string }[] = [
    { label: 'All Celebrations', value: 'all' },
    { label: 'Weddings & Mandaps', value: 'wedding' },
    { label: 'Haldi Ceremonies', value: 'haldi' },
    { label: 'Mehndi & Sangeet', value: 'mehndi' },
    { label: 'Grand Receptions', value: 'reception' },
    { label: 'Birthdays & Anniversaries', value: 'birthday' },
    { label: 'Pooja & Spiritual', value: 'pooja-spiritual' },
    { label: 'Cocktails & Parties', value: 'cocktail-party' },
  ];

  const decorTypes: { label: string; value: string }[] = [
    { label: 'All Items', value: 'all' },
    { label: 'Mandaps & Canopies', value: 'mandap' },
    { label: 'Backdrops & Lounges', value: 'backdrop' },
    { label: 'Stages & Swings', value: 'stage' },
    { label: 'Grand Entrance Arches', value: 'entryway' },
    { label: 'Lighting & Special FX', value: 'lighting' },
    { label: 'Royal Furniture & Diwans', value: 'furniture' },
    { label: 'Photo Booths & Urlis', value: 'props-accessories' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gold-200/90 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-maroon-800" />
          <h3 className="font-serif text-sm font-bold text-maroon-950 uppercase tracking-wider">
            Refine Catalog
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-maroon-700 hover:text-maroon-900 font-bold flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Event Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Event Occasion
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onFilterChange({ ...filters, category: cat.value })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat.value
                  ? 'bg-maroon-800 text-gold-200 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-gold-50 hover:text-maroon-900'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.value && <Check className="w-3.5 h-3.5 text-gold-300" />}
            </button>
          ))}
        </div>
      </div>

      {/* Decor Type Filter */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Decor Category
        </label>
        <div className="space-y-1">
          {decorTypes.map((dt) => (
            <button
              key={dt.value}
              onClick={() => onFilterChange({ ...filters, decorType: dt.value })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                filters.decorType === dt.value
                  ? 'bg-gold-100 text-maroon-900 font-bold border border-gold-300'
                  : 'text-slate-600 hover:bg-gold-50 hover:text-maroon-900'
              }`}
            >
              <span>{dt.label}</span>
              {filters.decorType === dt.value && <Check className="w-3.5 h-3.5 text-maroon-800" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Daily Budget
          </label>
          <span className="text-xs font-bold text-maroon-800">
            Up to ₹{filters.maxPrice.toLocaleString('en-IN')}/day
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="40000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-maroon-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹5,000</span>
          <span>₹20,000</span>
          <span>₹40,000+</span>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(e) => onFilterChange({ ...filters, onlyAvailable: e.target.checked })}
            className="w-4 h-4 rounded text-maroon-800 focus:ring-maroon-800 accent-maroon-800 cursor-pointer"
          />
          <span className="text-xs font-semibold text-slate-700">
            Only show in-stock items for my dates
          </span>
        </label>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[0, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange({ ...filters, minRating: r })}
              className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition ${
                filters.minRating === r
                  ? 'bg-maroon-800 text-gold-200 border-maroon-800'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-gold-300'
              }`}
            >
              {r === 0 ? 'Any' : `${r}★ & up`}
            </button>
          ))}
        </div>
      </div>

      {/* Results badge */}
      <div className="pt-2 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-maroon-900">{totalResults}</strong> handcrafted items
        </p>
      </div>
    </div>
  );
};
