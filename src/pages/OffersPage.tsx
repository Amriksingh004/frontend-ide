import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Tag, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { coupons, navigateTo, showToast } = useBooking();

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Copied "${code}" to clipboard! Paste it in your Cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Festive & Wedding Season Benefits</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-950">
          Exclusive Offers & Coupons
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Celebrate more while spending smart. Copy your preferred promo code and apply it during checkout for instant rental discounts.
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.filter(c => c.isActive).map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-3xl p-6 border-2 border-gold-300 hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Expiry */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-maroon-900 bg-gold-100 px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold-200">
                  {coupon.discountPercentage ? `${coupon.discountPercentage}% Instant Discount` : `Flat ₹${coupon.flatDiscount} Off`}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Valid till {coupon.validUntil}
                </span>
              </div>

              {/* Coupon Code Pill */}
              <div className="bg-ivory-50 border-2 border-dashed border-gold-400 rounded-2xl p-4 flex items-center justify-between mb-4 group-hover:bg-gold-50 transition">
                <span className="font-mono text-xl font-black text-maroon-950 tracking-wider">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="px-3.5 py-1.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4">
                {coupon.description}
              </p>
            </div>

            {/* Terms Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Min. Rental: ₹{coupon.minBookingAmount.toLocaleString('en-IN')}</span>
              {coupon.maxDiscount && (
                <span>Max Discount: ₹{coupon.maxDiscount.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Free Logistics Banner */}
      <div className="bg-gradient-to-r from-maroon-900 to-maroon-950 rounded-3xl p-8 sm:p-10 text-white border-2 border-gold-400 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-gold-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automatic Complimentary Perk</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Free Logistics & Transport on Orders Over ₹30,000
          </h3>
          <p className="text-xs sm:text-sm text-gold-100/70 max-w-xl">
            No coupon code needed. We automatically waive off all transport and loading truck fees across major hub cities for grand wedding orders.
          </p>
        </div>

        <button
          onClick={() => navigateTo('decorations')}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2 flex-shrink-0"
        >
          <span>Start Decor Rental</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
