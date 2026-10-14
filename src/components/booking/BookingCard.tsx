import React from 'react';
import type { Booking } from '../../types';
import { BookingStatus } from './BookingStatus';
import { Calendar, MapPin, Download, ArrowRight, Phone, Clock, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { navigateTo, showToast } = useBooking();

  const handleTrackClick = () => {
    navigateTo('track-booking', { bookingId: booking.id });
  };

  const handleDownloadInvoice = () => {
    showToast(`Downloading official GST Tax Invoice for ${booking.id}...`);
    // Simulated invoice file download
    const invoiceContent = `
=========================================
      UTSAV ROYAL EVENT RENTALS
   Tax Invoice & Rental Agreement
=========================================
Booking ID: ${booking.id}
Date: ${booking.createdAt}
Customer: ${booking.customerName} (${booking.customerPhone})
Event Type: ${booking.eventType}
Venue: ${booking.venueName}, ${booking.venueAddress}, ${booking.city} - ${booking.pincode}
Duration: ${booking.startDate} to ${booking.endDate} (${booking.rentalDays} Days)

Items Rented:
${booking.items.map(i => `- ${i.productName} (Qty: ${i.quantity}) - ₹${i.totalItemPrice}`).join('\n')}

Subtotal: ₹${booking.subtotal}
Logistics: ₹${booking.deliveryFee}
Setup Crew: ₹${booking.setupCrewFee}
Refundable Deposit: ₹${booking.securityDeposit}
GST (18%): ₹${booking.tax}
Grand Total Paid: ₹${booking.grandTotal}
Payment Method: ${booking.paymentMethod} (${booking.paymentStatus})

Deposit Refund Policy:
Refund of ₹${booking.securityDeposit} will be initiated within 24 hours of item return.
=========================================
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border border-gold-200/90 hover:border-gold-400 p-6 shadow-sm hover:shadow-md transition duration-300 space-y-4">
      
      {/* Top Header: ID & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Booking ID
          </span>
          <span className="font-mono font-bold text-maroon-900 text-base">
            {booking.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BookingStatus status={booking.status} />
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Items preview */}
        <div className="md:col-span-2 space-y-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
            Reserved Decor Items ({booking.items.length})
          </span>
          <div className="space-y-2">
            {booking.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-ivory-50/80 p-2 rounded-xl border border-gold-100">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-serif font-bold text-slate-900 truncate">
                    {item.productName}
                  </h5>
                  <span className="text-[11px] text-slate-500">
                    Qty: {item.quantity} • ₹{item.pricePerDay.toLocaleString('en-IN')}/day
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dates & Venue Info */}
        <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
              Event Dates
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Calendar className="w-3.5 h-3.5 text-maroon-800" />
              <span>{booking.startDate} → {booking.endDate}</span>
            </div>
            <span className="text-[10px] text-maroon-800 font-bold block mt-0.5">
              {booking.rentalDays} {booking.rentalDays === 1 ? 'Day Rental' : 'Days Rental'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
              Venue
            </span>
            <div className="flex items-start gap-1.5 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold leading-tight">
                {booking.venueName}, {booking.city}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <span className="text-slate-500 font-medium">Grand Total:</span>
            <span className="font-serif font-bold text-sm text-maroon-900">
              ₹{booking.grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security Deposit: ₹{booking.securityDeposit.toLocaleString('en-IN')} (Refundable)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadInvoice}
            className="px-3 py-1.5 bg-ivory-100 hover:bg-gold-50 text-slate-700 hover:text-maroon-900 font-bold rounded-xl text-xs border border-gold-300 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-maroon-800" /> Invoice
          </button>

          <button
            onClick={handleTrackClick}
            className="px-4 py-1.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-xs"
          >
            <span>Track Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
