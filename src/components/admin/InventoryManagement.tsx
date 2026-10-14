import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Boxes, AlertTriangle, CheckCircle2, Wrench, RefreshCw, Calendar } from 'lucide-react';

export const InventoryManagement: React.FC = () => {
  const { products, bookings, selectedDates, updateProduct, showToast } = useBooking();

  const handleQuickAddStock = (id: string, currentTotal: number) => {
    updateProduct(id, { totalStock: currentTotal + 1, availableStock: currentTotal + 1 });
    showToast('Added 1 unit to warehouse fleet!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-gold-600" /> Warehouse Fleet & Real-time Stock Monitor
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor physical units, maintenance condition, and live reservation overlap.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-ivory-50 px-3 py-1.5 rounded-xl border border-gold-200">
          <Calendar className="w-4 h-4 text-maroon-800" />
          <span>Active Calendar Slot: {selectedDates.startDate} to {selectedDates.endDate}</span>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => {
          const bookedCount = p.totalStock - p.availableStock;
          const occupancyPercent = Math.round((bookedCount / p.totalStock) * 100);

          return (
            <div key={p.id} className="bg-white rounded-3xl p-5 border border-gold-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-gold-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-maroon-950 truncate mt-1">
                    {p.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">Dimensions: {p.dimensions}</span>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-600">Total Fleet: {p.totalStock} units</span>
                  <span className="text-emerald-700">{p.availableStock} Free</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-maroon-800 h-full"
                    style={{ width: `${occupancyPercent}%` }}
                    title={`${bookedCount} units booked`}
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${100 - occupancyPercent}%` }}
                    title={`${p.availableStock} units available`}
                  />
                </div>
              </div>

              {/* Status info */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Condition: Pristine
                </span>

                <button
                  onClick={() => handleQuickAddStock(p.id, p.totalStock)}
                  className="px-2.5 py-1 bg-ivory-100 hover:bg-gold-100 text-maroon-900 font-bold rounded-lg text-[11px] border border-gold-300 transition"
                >
                  + Add Stock Unit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
