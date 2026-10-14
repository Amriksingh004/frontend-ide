import React from 'react';
import { EVENT_CATEGORIES } from '../../data/mockData';
import { CategoryCard } from './CategoryCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CategorySection: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4 text-maroon-700" />
            <span>Rituals & Celebrations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-950">
            Browse By Sacred Occasion
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            From majestic Rajwada mandaps to cheerful sunny haldi swings and fairy light Sangeet tunnels, find complete decor sets for your celebration.
          </p>
        </div>

        <button
          onClick={() => navigateTo('categories')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-maroon-800 hover:text-maroon-950 hover:underline group flex-shrink-0"
        >
          <span>View All 8 Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EVENT_CATEGORIES.slice(0, 4).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
