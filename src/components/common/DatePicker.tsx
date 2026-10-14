import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onChange: (dates: { startDate: string; endDate: string }) => void;
  minDate?: string;
  label?: string;
  compact?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onChange,
  minDate,
  label = 'Select Rental Duration',
  compact = false,
}) => {
  // Tomorrow's date string as minimum
  const defaultMin = minDate || new Date().toISOString().split('T')[0];

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    let newEnd = endDate;
    if (new Date(newEnd) < new Date(newStart)) {
      // Advance end date by 1 day
      const d = new Date(newStart);
      d.setDate(d.getDate() + 1);
      newEnd = d.toISOString().split('T')[0];
    }
    onChange({ startDate: newStart, endDate: newEnd });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    onChange({ startDate, endDate: newEnd });
  };

  // Calculate rental duration in days
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const diffTime = Math.abs(endD.getTime() - startD.getTime());
  const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-gold-300 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-maroon-800" />
          <input
            type="date"
            value={startDate}
            min={defaultMin}
            onChange={handleStartChange}
            className="text-xs text-slate-800 font-semibold focus:outline-none bg-transparent cursor-pointer"
          />
        </div>
        <span className="text-slate-400 font-bold">to</span>
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-gold-300 shadow-sm">
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={handleEndChange}
            className="text-xs text-slate-800 font-semibold focus:outline-none bg-transparent cursor-pointer"
          />
        </div>
        <span className="bg-maroon-800 text-gold-200 px-2 py-1 rounded-md text-[11px] font-bold">
          {days} {days === 1 ? 'day' : 'days'}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gold-300 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-maroon-900 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gold-600" /> {label}
        </label>
        <span className="inline-flex items-center gap-1 bg-gold-100 text-maroon-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-gold-300">
          <Clock className="w-3 h-3 text-maroon-700" />
          {days} {days === 1 ? 'Day (24h Rental)' : `Days (${days * 24}h Rental)`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="block text-[11px] font-semibold text-slate-500 mb-1">
            Setup / Event Start Date
          </span>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              min={defaultMin}
              onChange={handleStartChange}
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/20 focus:border-maroon-700"
            />
          </div>
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-slate-500 mb-1">
            Dismantle / End Date
          </span>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={handleEndChange}
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/20 focus:border-maroon-700"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <AlertCircle className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
        <span>Rental rate applies per calendar day. Setup crew arrives 6h prior to start date.</span>
      </div>
    </div>
  );
};
