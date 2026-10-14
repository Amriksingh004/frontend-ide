import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface AvailabilityCheckerProps {
  productId: string;
  startDate?: string;
  endDate?: string;
  quantity?: number;
}

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({
  productId,
  startDate,
  endDate,
  quantity = 1,
}) => {
  const { checkAvailability, selectedDates } = useBooking();

  const start = startDate || selectedDates.startDate;
  const end = endDate || selectedDates.endDate;

  const { available, remainingStock, message } = checkAvailability(productId, start, end, quantity);

  if (available && remainingStock > 2) {
    return (
      <div className="bg-emerald-50 border border-emerald-300/80 rounded-xl p-3 flex items-start gap-2.5">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-emerald-900">
            Available for Selected Dates ({remainingStock} units in warehouse)
          </p>
          <p className="text-emerald-700/90 mt-0.5">
            Confirmed inventory reserved immediately upon booking. Guaranteed dispatch for {start}.
          </p>
        </div>
      </div>
    );
  }

  if (available && remainingStock <= 2) {
    return (
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-amber-900">
            High Demand: Only {remainingStock} {remainingStock === 1 ? 'unit' : 'units'} left!
          </p>
          <p className="text-amber-800 mt-0.5">
            Multiple customers are viewing this item for {start}. Lock your dates now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 flex items-start gap-2.5">
      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
      <div className="text-xs">
        <p className="font-bold text-rose-900">
          Booked Out for {start} to {end}
        </p>
        <p className="text-rose-700 mt-0.5">
          {message} Please try shifting dates or browse similar items in this category.
        </p>
      </div>
    </div>
  );
};
