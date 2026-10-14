import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Truck, 
  Wrench, 
  Sparkles, 
  RotateCcw, 
  DollarSign, 
  Phone, 
  MapPin, 
  Calendar,
  ShieldCheck,
  Download
} from 'lucide-react';
import { BookingStatus } from '../components/booking/BookingStatus';

export const TrackBookingPage: React.FC = () => {
  const { bookings, selectedBookingId, showToast } = useBooking();

  const [searchId, setSearchId] = useState(selectedBookingId || bookings[0]?.id || '');
  const [activeBooking, setActiveBooking] = useState(
    bookings.find((b) => b.id === (selectedBookingId || bookings[0]?.id)) || bookings[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = bookings.find(
      (b) => b.id.toUpperCase() === query || b.customerPhone.includes(query)
    );
    if (found) {
      setActiveBooking(found);
      showToast(`Found booking details for ${found.id}!`);
    } else {
      showToast('⚠️ No booking found with that ID or mobile number.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
          Track Your Event Setup Timeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your Booking ID (e.g. UTSAV-2026-8921) to track dispatch, crew assignment, and deposit refund status.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Booking ID (e.g. UTSAV-2026-8921)"
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gold-300 rounded-2xl text-xs sm:text-sm font-mono font-bold text-maroon-900 focus:outline-none focus:border-maroon-800 shadow-sm"
          />
          <Search className="w-5 h-5 text-gold-600 absolute left-3 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition"
        >
          Track
        </button>
      </form>

      {/* Quick sample IDs pills for user convenience */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <span>Sample Bookings:</span>
        {bookings.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => {
              setSearchId(b.id);
              setActiveBooking(b);
            }}
            className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition ${
              activeBooking?.id === b.id
                ? 'bg-maroon-900 text-gold-200 border-maroon-900'
                : 'bg-white text-slate-700 border-gold-200 hover:bg-gold-50'
            }`}
          >
            {b.id}
          </button>
        ))}
      </div>

      {activeBooking && (
        <div className="space-y-8 animate-in fade-in">
          {/* Booking Overview Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-300 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Active Booking
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-maroon-950">
                  {activeBooking.id}
                </span>
                <span className="text-xs text-slate-500 block">{activeBooking.eventType}</span>
              </div>

              <BookingStatus status={activeBooking.status} size="lg" />
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-ivory-50 p-3.5 rounded-xl border border-gold-100 space-y-1">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Venue</span>
                <div className="font-bold text-slate-900 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>{activeBooking.venueName}, {activeBooking.city}</span>
                </div>
              </div>

              <div className="bg-ivory-50 p-3.5 rounded-xl border border-gold-100 space-y-1">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Dates</span>
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-maroon-800" />
                  <span>{activeBooking.startDate} to {activeBooking.endDate}</span>
                </div>
              </div>

              <div className="bg-ivory-50 p-3.5 rounded-xl border border-gold-100 space-y-1">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Assigned Master Lead</span>
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeBooking.assignedCrewLeader || 'Assigning soon...'}</span>
                </div>
                {activeBooking.crewContact && (
                  <span className="text-[11px] text-slate-500 block">{activeBooking.crewContact}</span>
                )}
              </div>
            </div>

            {/* Interactive Timeline */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-serif text-base font-bold text-maroon-950 mb-6">
                Live Milestone Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold-200">
                {activeBooking.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon Indicator */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                        step.completed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : 'bg-slate-200 text-slate-400 border border-slate-300'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 bg-ivory-50/60 p-3.5 rounded-2xl border border-gold-100 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className={`font-serif font-bold ${step.completed ? 'text-maroon-950' : 'text-slate-400'}`}>
                          {step.step}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {step.date}
                        </span>
                      </div>
                      {step.notes && (
                        <p className="text-slate-600 text-[11px] italic mt-0.5">
                          Note: {step.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Deposit status banner */}
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-950 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="block">Security Deposit Refund (₹{activeBooking.securityDeposit.toLocaleString('en-IN')})</span>
                  <span className="text-[11px] text-emerald-700 font-normal">
                    {activeBooking.status === 'Deposit Refunded'
                      ? 'Credited to your linked UPI account successfully.'
                      : 'Held safely in bank escrow. Will be refunded automatically within 24h of pickup.'}
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                activeBooking.status === 'Deposit Refunded'
                  ? 'bg-emerald-200 text-emerald-950'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {activeBooking.status === 'Deposit Refunded' ? 'REFUND CREDITED' : 'IN ESCROW'}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
