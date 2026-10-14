import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ShieldCheck, Tag, ArrowRight, Check, X, Info } from 'lucide-react';

export const CartSummary: React.FC = () => {
  const { 
    getCartTotals, 
    appliedCoupon, 
    applyCouponCode, 
    removeCouponCode, 
    navigateTo, 
    cart 
  } = useBooking();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const totals = getCartTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gold-300 shadow-xl space-y-6">
      <h3 className="font-serif text-xl font-bold text-maroon-950 border-b border-slate-100 pb-3">
        Rental Order Summary
      </h3>

      {/* Coupon Application Box */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-gold-600" /> Apply Coupon Code
        </label>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200">
                {appliedCoupon.code}
              </span>
              <span className="text-emerald-700 font-semibold">
                -₹{totals.discount.toLocaleString('en-IN')} Saved!
              </span>
            </div>
            <button
              onClick={removeCouponCode}
              className="text-slate-400 hover:text-rose-600 p-1"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="e.g. UTSAV20, SHUBH5000"
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-gold-300 rounded-xl uppercase font-bold text-maroon-900 placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-maroon-800"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs rounded-xl shadow-xs transition flex-shrink-0"
            >
              Apply
            </button>
          </form>
        )}

        {couponError && (
          <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
        )}
      </div>

      {/* Financial Line Items */}
      <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex justify-between">
          <span>Decor Rental ({totals.itemCount} items)</span>
          <span className="font-semibold text-slate-800">₹{totals.subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            Logistics & Transport
            {totals.deliveryFee === 0 && (
              <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.2 rounded">
                FREE
              </span>
            )}
          </span>
          <span className="font-semibold text-slate-800">
            {totals.deliveryFee === 0 ? '₹0' : `₹${totals.deliveryFee.toLocaleString('en-IN')}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Master Setup & Dismantle Crew</span>
          <span className="font-semibold text-slate-800">₹{totals.setupFee.toLocaleString('en-IN')}</span>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Coupon Discount</span>
            <span>-₹{totals.discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>GST (18% Equipment Rental)</span>
          <span className="font-semibold text-slate-800">₹{totals.tax.toLocaleString('en-IN')}</span>
        </div>

        {/* Security Deposit (Refundable) */}
        <div className="flex justify-between items-center bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-emerald-900">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Refundable Security Deposit</span>
          </div>
          <span className="font-bold font-serif text-sm">
            ₹{totals.securityDeposit.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="pt-4 border-t-2 border-gold-300">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-serif text-base font-bold text-maroon-950">Grand Total Payable</span>
          <div className="text-right">
            <span className="font-serif text-2xl font-extrabold text-maroon-900 block">
              ₹{totals.grandTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-500">
              Includes ₹{totals.securityDeposit.toLocaleString('en-IN')} refundable deposit
            </span>
          </div>
        </div>
      </div>

      {/* Checkout CTA */}
      <button
        onClick={() => navigateTo('checkout')}
        disabled={cart.length === 0}
        className="w-full py-4 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 disabled:opacity-50 disabled:cursor-not-allowed text-gold-200 font-serif font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
      >
        <span>Proceed to Event Details & Payment</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Security note */}
      <div className="text-center text-[11px] text-slate-400 space-y-1">
        <p>🔒 256-bit Encrypted Transaction • Razorpay & UPI Protected</p>
        <p>Deposit refunded automatically to source account within 24 hours of item return.</p>
      </div>
    </div>
  );
};
