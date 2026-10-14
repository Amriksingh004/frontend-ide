import React from 'react';
import { EVENT_CATEGORIES } from '../data/mockData';
import { CategoryCard } from '../components/decorations/CategoryCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Curated Indian Event Decor Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-950">
          Sacred Rituals & Celebration Themes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          From Vedic wedding mandaps to cheerful sunny haldi swings, bohemian mehndi cabanas, and high-glamour reception stages. Select your occasion to view available rental fleet.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EVENT_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Custom Theme Request Banner */}
      <div className="bg-ivory-100 rounded-3xl p-8 border-2 border-gold-300 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-950">
            Need a Customized Theme or Specific Color Palette?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Our wedding stylists can customize fabrics, florals, and lighting to match your lehenga, sherwani, or family traditions.
          </p>
        </div>

        <button
          onClick={() => navigateTo('decorations')}
          className="px-6 py-3 bg-maroon-900 hover:bg-maroon-800 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 flex-shrink-0"
        >
          <span>Browse All Decor Items</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
