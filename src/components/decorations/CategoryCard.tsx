import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    hindi: string;
    count: number;
    image: string;
    color: string;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { navigateTo } = useBooking();

  const handleClick = () => {
    navigateTo('decorations', { category: category.id });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gold-300/60 transform hover:-translate-y-1.5"
    >
      {/* Background Image with Zoom */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Rich Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-maroon-950/90 transition-colors duration-500" />

      {/* Top Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/20 backdrop-blur-md text-gold-300 border border-white/30 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
          {category.count} Sets Available
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
        <span className="text-xs font-semibold text-gold-300 tracking-wider block mb-1">
          {category.hindi}
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide group-hover:text-gold-200 transition">
          {category.name}
        </h3>

        <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/20">
          <span className="text-xs text-white/80 font-medium">Explore Collection</span>
          <div className="w-8 h-8 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center group-hover:bg-white group-hover:translate-x-1 transition-all shadow-md">
            <ArrowRight className="w-4 h-4 font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
