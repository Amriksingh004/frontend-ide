import React from 'react';
import { useBooking } from '../context/BookingContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Download, 
  ArrowRight, 
  Phone, 
  ShieldCheck,
  MessageCircle,
  Clock
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { bookings, selectedBookingId, navigateTo, showToast } = useBooking();

  const booking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleDownloadInvoice = () => {
    showToast(`Downloading Tax Invoice for ${booking?.id}...`);
    const invoiceContent = `
=========================================
      UTSAV ROYAL EVENT RENTALS
   Tax Invoice & Rental Agreement
=========================================
Booking ID: ${booking?.id}
Date: ${booking?.createdAt}
Customer: ${booking?.customerName} (${booking?.customerPhone})
Event Type: ${booking?.eventType}
Venue: ${booking?.venueName}, ${booking?.venueAddress}, ${booking?.city} - ${booking?.pincode}
Duration: ${booking?.startDate} to ${booking?.endDate} (${booking?.rentalDays} Days)

Items Rented:
${booking?.items.map(i => `- ${i.productName} (Qty: ${i.quantity}) - ₹${i.totalItemPrice}`).join('\n')}

Subtotal: ₹${booking?.subtotal}
Logistics: ₹${booking?.deliveryFee}
Setup Crew: ₹${booking?.setupCrewFee}
Refundable Deposit: ₹${booking?.securityDeposit}
GST (18%): ₹${booking?.tax}
Grand Total: ₹${booking?.grandTotal}
Payment Method: ${booking?.paymentMethod} (${booking?.paymentStatus})

100% Refundable Deposit Promise:
Deposit of ₹${booking?.securityDeposit} will be credited to your account within 24h of pickup.
=========================================
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UTSAV_Invoice_${booking?.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!booking) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
        <h2 className="font-serif text-xl font-bold text-maroon-950">No Booking Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Festive Hero Card */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 rounded-3xl p-8 sm:p-12 text-center text-white border-2 border-gold-400 shadow-2xl relative overflow-hidden space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg border-2 border-white">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auspicious Booking Confirmed</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Shubh Aarambh! <br />
          <span className="gold-shimmer-text">Your Event Decor is Locked</span>
        </h1>

        <p className="text-xs sm:text-sm text-gold-100/80 max-w-xl mx-auto leading-relaxed">
          Thank you for choosing UTSAV. Our logistics fleet and master installation crew have reserved your decor sets for your celebration dates.
        </p>

        {/* Booking ID Pill */}
        <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-gold-400/50 mt-2">
          <span className="text-[11px] text-gold-300 font-semibold uppercase tracking-wider block">
            Official Booking Reference ID
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-gold-300 tracking-wider">
            {booking.id}
          </span>
        </div>
      </div>

      {/* Confirmation Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-300 shadow-xl space-y-6">
        
        {/* Next Steps Strip */}
        <div className="bg-ivory-50 p-4 rounded-2xl border border-gold-200 space-y-2">
          <h4 className="font-serif text-sm font-bold text-maroon-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" /> What Happens Next?
          </h4>
          <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>A booking confirmation SMS & WhatsApp message has been dispatched to <strong>{booking.customerPhone}</strong>.</li>
            <li>Our Senior Decor Master <strong>{booking.assignedCrewLeader}</strong> will call 24 hours prior to verify venue gate pass & unloading dock.</li>
            <li>Setup crew arrives on <strong>{booking.startDate}</strong> with all equipment.</li>
            <li>Refundable security deposit (₹{booking.securityDeposit.toLocaleString('en-IN')}) will be processed back to your UPI within 24h of pickup.</li>
          </ol>
        </div>

        {/* Event Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 uppercase font-bold text-[10px] block">Occasion & Venue</span>
            <span className="font-serif font-bold text-sm text-maroon-950 block">{booking.eventType}</span>
            <p className="text-slate-600 font-medium flex items-start gap-1 pt-1">
              <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
              <span>{booking.venueName}, {booking.venueAddress}, {booking.city} - {booking.pincode}</span>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 uppercase font-bold text-[10px] block">Rental Schedule</span>
            <div className="flex items-center gap-1.5 font-bold text-sm text-maroon-950">
              <Calendar className="w-4 h-4 text-maroon-800" />
              <span>{booking.startDate} to {booking.endDate}</span>
            </div>
            <span className="text-slate-500 block pt-1">
              Duration: {booking.rentalDays} {booking.rentalDays === 1 ? 'Calendar Day' : 'Calendar Days'}
            </span>
          </div>
        </div>

        {/* Reserved Items */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-maroon-950 uppercase tracking-wider">
            Reserved Fleet Items ({booking.items.length})
          </h4>
          <div className="space-y-2">
            {booking.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-ivory-50/70 p-3 rounded-xl border border-gold-100 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-slate-900">{item.productName}</h5>
                    <span className="text-slate-500">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-serif font-bold text-maroon-900 text-sm">
                  ₹{item.totalItemPrice.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Paid Amount</span>
            <span className="font-serif text-2xl font-bold text-maroon-950">
              ₹{booking.grandTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Includes ₹{booking.securityDeposit.toLocaleString('en-IN')} Refundable Deposit
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2.5 bg-ivory-100 hover:bg-gold-50 text-slate-800 font-bold rounded-xl border border-gold-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-4 h-4 text-maroon-800" /> Download Tax Invoice
            </button>

            <button
              onClick={() => navigateTo('track-booking', { bookingId: booking.id })}
              className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold rounded-xl transition shadow flex items-center gap-1.5"
            >
              <span>Track Live Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Support desk banner */}
      <div className="text-center text-xs text-slate-500">
        <p>Questions about this booking? Contact your dedicated Concierge: <strong>+91 98290 41122</strong></p>
      </div>

    </div>
  );
};
