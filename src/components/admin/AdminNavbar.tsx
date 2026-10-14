import React from 'react';
import { Sparkles, ArrowLeft, Bell, Search, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface AdminNavbarProps {
  onToggleSidebar?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = () => {
  const { navigateTo, user, switchRole } = useBooking();

  return (
    <header className="bg-maroon-950 text-gold-100 border-b border-gold-500/30 px-6 py-3.5 sticky top-0 z-30 flex items-center justify-between">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center font-bold shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-gold-300">UTSAV ADMIN</span>
            <span className="bg-gold-500 text-maroon-950 text-[10px] font-black uppercase px-2 py-0.2 rounded-full">
              Master Fleet Portal
            </span>
          </div>
          <p className="text-[10px] text-gold-200/60">Inventory, Bookings & Revenue Command Center</p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo('home')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-maroon-900 hover:bg-maroon-800 text-gold-200 text-xs font-bold rounded-xl border border-gold-500/30 transition shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </button>

        <button
          onClick={switchRole}
          className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-maroon-950 text-xs font-extrabold rounded-xl transition shadow-xs"
        >
          Customer View
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gold-500/20">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover border border-gold-400"
          />
          <div className="hidden md:block text-left text-xs">
            <span className="font-bold text-white block leading-tight">{user?.name || 'Vikram Singh'}</span>
            <span className="text-[10px] text-gold-400">Head of Operations</span>
          </div>
        </div>
      </div>
    </header>
  );
};
