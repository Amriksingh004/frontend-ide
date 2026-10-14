import React from 'react';
import { Heart, Star, Sparkles, Clock, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    navigateTo, 
    selectedDates, 
    rentalDays,
    checkAvailability 
  } = useBooking();

  const isFavorited = isInWishlist(product.id);
  const availability = checkAvailability(product.id, selectedDates.startDate, selectedDates.endDate, 1);

  const handleCardClick = () => {
    navigateTo('product-details', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedDates.startDate, selectedDates.endDate, true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-gold-200/80 hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.bestseller && (
              <span className="bg-gold-500 text-maroon-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-gold-300">
                <Sparkles className="w-3 h-3" /> Most Booked
              </span>
            )}
            <span className="bg-maroon-900/90 backdrop-blur-sm text-gold-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-500/40">
              {product.category}
            </span>
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 flex items-center justify-center shadow-md backdrop-blur-sm transition transform hover:scale-110 active:scale-95"
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>

          {/* Bottom Availability & Setup Time Strip on Image */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white font-medium">
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-gold-300" /> {product.setupTimeHours}h setup
            </span>

            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
              availability.available
                ? 'bg-emerald-600/90 text-white'
                : 'bg-rose-600/90 text-white'
            }`}>
              {availability.available ? 'In Stock' : 'Waitlist'}
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-4 sm:p-5">
          {/* Hindi name subtitle */}
          {product.hindiName && (
            <p className="text-[11px] font-medium text-gold-600 tracking-wider mb-0.5">
              {product.hindiName}
            </p>
          )}

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-maroon-950 group-hover:text-maroon-700 transition line-clamp-1">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating & Reviews */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[11px]">({product.reviewCount} celebrations)</span>
          </div>

          {/* Inclusions summary tag */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 
              Deposit: ₹{product.securityDeposit.toLocaleString('en-IN')} (Refundable)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pricing & Action Footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 bg-ivory-50/50 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
            Rental Rate
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg sm:text-xl font-bold text-maroon-900">
              ₹{product.pricePerDay.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">/ day</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 text-xs font-bold rounded-xl shadow-sm hover:shadow transition flex items-center gap-1"
            title="Add directly to cart for selected dates"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
