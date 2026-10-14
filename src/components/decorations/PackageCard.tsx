import React from 'react';
import type { DecorPackage } from '../../types';
import { Check, Sparkles, Users, Truck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface PackageCardProps {
  pkg: DecorPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { addToCart, products, selectedDates, navigateTo, showToast } = useBooking();

  const handleBookPackage = () => {
    // Add primary matching product to cart
    const primaryProduct = products.find(p => p.category === pkg.eventType) || products[0];
    addToCart(primaryProduct, 1, selectedDates.startDate, selectedDates.endDate, true);
    showToast(`Added full "${pkg.name}" package to your cart!`);
    navigateTo('cart');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-gold-300 hover:border-gold-500 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Package Image & Badge Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-gold-500 text-maroon-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-gold-300">
              <Sparkles className="w-3.5 h-3.5" /> Save ₹{pkg.savings.toLocaleString('en-IN')}
            </span>

            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold-300" /> {pkg.idealForGuests}
            </span>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-300 mb-1">
              All-Inclusive Master Suite
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Package Body */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-medium">
            {pkg.tagline}
          </p>

          {/* Included Features Ribbon */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700 bg-ivory-50 p-3 rounded-xl border border-gold-200">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-maroon-700 flex-shrink-0" />
              <span className="font-semibold">Master Crew Setup Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-maroon-700 flex-shrink-0" />
              <span className="font-semibold">Free Venue Logistics</span>
            </div>
          </div>

          {/* Checklist of Inclusions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-maroon-950 mb-3 flex items-center gap-1.5">
              <span>What's Included in This Package</span>
            </h4>
            {pkg.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Footer */}
      <div className="p-6 bg-ivory-50/80 border-t border-gold-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 line-through">
              ₹{pkg.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              BUNDLE DEAL
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-maroon-900">
              ₹{pkg.packagePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 1 Day Complete</span>
          </div>
        </div>

        <button
          onClick={handleBookPackage}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group"
        >
          <span>Book Complete Package</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
