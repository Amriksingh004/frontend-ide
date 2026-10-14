import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CartItem } from '../components/booking/CartItem';
import { CartSummary } from '../components/booking/CartSummary';
import { ShoppingBag, ArrowLeft, Trash2, Calendar, ShieldCheck } from 'lucide-react';
import { DatePicker } from '../components/common/DatePicker';

export const CartPage: React.FC = () => {
  const { cart, clearCart, navigateTo, selectedDates, setSelectedDates } = useBooking();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <button
            onClick={() => navigateTo('decorations')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-950 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Browsing Decor
          </button>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">
            Your Event Rental Cart
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review reserved items, duration days, setup options, and security deposits.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="self-start sm:self-auto px-3.5 py-1.5 text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-bold rounded-xl transition border border-rose-200 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Global dates sync reminder */}
            <div className="bg-ivory-50 p-4 rounded-2xl border border-gold-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                <div>
                  <span className="font-bold text-maroon-950 block">Active Rental Window</span>
                  <span className="text-slate-500">{selectedDates.startDate} to {selectedDates.endDate}</span>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <DatePicker
                  startDate={selectedDates.startDate}
                  endDate={selectedDates.endDate}
                  onChange={setSelectedDates}
                  compact
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Refundable deposit guarantee */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 flex items-start gap-3 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">100% Refundable Security Deposit</span>
                <span className="text-emerald-700 leading-relaxed block mt-0.5">
                  Deposits are held safely and refunded automatically within 24 hours of item return and post-event crew inspection.
                </span>
              </div>
            </div>
          </div>

          {/* Cart summary (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <CartSummary />
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-gold-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold-100 text-maroon-800 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-maroon-950">
            Your Rental Cart is Empty
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You haven't reserved any decor sets or props yet. Browse our handcrafted Rajwada mandaps, haldi swings, and fairy light tunnels to begin.
          </p>
          <button
            onClick={() => navigateTo('decorations')}
            className="px-6 py-3 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
          >
            Explore Decor Catalog
          </button>
        </div>
      )}
    </div>
  );
};
