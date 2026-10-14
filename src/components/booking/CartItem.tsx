import React from 'react';
import type { CartItem as CartItemType } from '../../types';
import { Trash2, Calendar, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { QuantitySelector } from '../common/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCartQuantity, toggleCartItemSetup, navigateTo } = useBooking();

  const itemRentalTotal = item.product.pricePerDay * item.rentalDays * item.quantity;
  const itemSetupTotal = item.withSetupCrew ? item.product.setupFee * item.quantity : 0;
  const itemDeposit = item.product.securityDeposit * item.quantity;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gold-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-gold-300">
      
      {/* Product Image & Details */}
      <div className="flex items-start gap-4 flex-1">
        <div 
          onClick={() => navigateTo('product-details', { productId: item.product.id })}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer border border-gold-200"
        >
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-100/60 px-2 py-0.5 rounded">
            {item.product.category}
          </span>

          <h4 
            onClick={() => navigateTo('product-details', { productId: item.product.id })}
            className="font-serif text-sm sm:text-base font-bold text-maroon-950 hover:text-maroon-700 cursor-pointer line-clamp-1"
          >
            {item.product.name}
          </h4>

          {/* Date range & duration */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-maroon-800" />
              {item.startDate} to {item.endDate}
            </span>
            <span className="bg-maroon-100 text-maroon-900 font-bold px-1.5 py-0.2 rounded text-[10px]">
              {item.rentalDays} {item.rentalDays === 1 ? 'day' : 'days'}
            </span>
          </div>

          {/* Refundable deposit badge */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Refundable Deposit: ₹{itemDeposit.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Setup Crew toggle & Quantity controls */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
        
        {/* Setup Crew Addon */}
        <div className="flex items-center gap-2 bg-ivory-50 px-3 py-1.5 rounded-xl border border-gold-200">
          <input
            type="checkbox"
            id={`setup-${item.product.id}`}
            checked={item.withSetupCrew}
            onChange={() => toggleCartItemSetup(item.product.id)}
            className="w-3.5 h-3.5 rounded text-maroon-800 accent-maroon-800 cursor-pointer"
          />
          <label htmlFor={`setup-${item.product.id}`} className="text-xs text-slate-700 cursor-pointer">
            <span className="font-semibold block">Master Setup</span>
            <span className="text-[10px] text-slate-500 block">
              +₹{(item.product.setupFee * item.quantity).toLocaleString('en-IN')}
            </span>
          </label>
        </div>

        {/* Quantity Stepper */}
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(q) => updateCartQuantity(item.product.id, q)}
          max={item.product.totalStock}
          size="sm"
        />

        {/* Price & Delete */}
        <div className="text-right min-w-[100px]">
          <span className="text-[10px] text-slate-400 block">Item Total</span>
          <span className="font-serif text-base sm:text-lg font-bold text-maroon-900 block">
            ₹{(itemRentalTotal + itemSetupTotal).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400">excl. refundable deposit</span>
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
          title="Remove from cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
