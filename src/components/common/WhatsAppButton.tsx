import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const WhatsAppButton: React.FC = () => {
  const { selectedDates, user } = useBooking();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '919829041122'; // UTSAV Decor Official WhatsApp
  const defaultMessage = `Namaste UTSAV Decor Team! I am planning an upcoming function around ${selectedDates.startDate} to ${selectedDates.endDate}. I would love to check package availability and custom setup options for my venue.`;

  const handleOpenWhatsApp = (customText?: string) => {
    const textToSend = encodeURIComponent(customText || defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${textToSend}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/30">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">UTSAV Wedding Stylist</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online | Typically replies in 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-ivory-50 text-xs space-y-3">
            <div className="bg-white p-3 rounded-xl border border-gold-200/80 shadow-sm text-slate-700">
              <p className="font-medium text-maroon-900 mb-1">
                Namaste {user ? user.name.split(' ')[0] : 'Guest'}! 🙏
              </p>
              <p className="text-slate-600 leading-relaxed">
                Need advice on mandap sizing, haldi theme matching, or bulk rental discounts for your upcoming celebration?
              </p>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => handleOpenWhatsApp('Hi! I need urgent decor rental quotes for my wedding dates.')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 text-[11px] font-medium transition flex items-center justify-between"
              >
                <span>💬 Urgent wedding decor quotation</span>
                <span className="text-emerald-600">→</span>
              </button>
              <button
                onClick={() => handleOpenWhatsApp('Hello! Can we customize the Haldi & Mehndi flower colors to yellow and pink?')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 text-[11px] font-medium transition flex items-center justify-between"
              >
                <span>🎨 Custom theme & flower queries</span>
                <span className="text-emerald-600">→</span>
              </button>
            </div>

            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" /> Start Direct WhatsApp Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-white/60"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white" />
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-bold text-xs tracking-wide hidden sm:inline">
          Chat With Stylist
        </span>
      </button>
    </div>
  );
};
