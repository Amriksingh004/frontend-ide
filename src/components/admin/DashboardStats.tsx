import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  TrendingUp, 
  CalendarCheck, 
  Boxes, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const { bookings, products, coupons } = useBooking();

  // Calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'Paid' ? b.grandTotal : b.subtotal * 0.3), 0);
  const activeBookings = bookings.filter(b => b.status !== 'Picked Up' && b.status !== 'Deposit Refunded').length;
  const totalStockCount = products.reduce((sum, p) => sum + p.totalStock, 0);
  const totalDepositHeld = bookings
    .filter(b => b.status !== 'Deposit Refunded')
    .reduce((sum, b) => sum + b.securityDeposit, 0);

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gold-300 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Rental Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-maroon-950">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28% vs last wedding season
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gold-300 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Celebrations</span>
            <div className="w-8 h-8 rounded-lg bg-gold-100 text-maroon-800 flex items-center justify-center font-bold">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-maroon-950">
            {activeBookings} Events
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {bookings.length} total lifetime orders
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gold-300 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inventory Fleet Stock</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-maroon-950">
            {totalStockCount} Units
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Across {products.length} catalog collections
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gold-300 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Security Deposit Escrow</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-maroon-950">
            ₹{totalDepositHeld.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            100% Held in Bank Escrow
          </p>
        </div>
      </div>

      {/* Demand & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Share */}
        <div className="bg-white p-6 rounded-2xl border border-gold-200 shadow-sm space-y-4">
          <h4 className="font-serif text-base font-bold text-maroon-950 border-b border-slate-100 pb-3">
            Rental Demand by Event Type
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-700">
                <span>Weddings & Mandaps</span>
                <span className="text-maroon-900">45% of Bookings</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-maroon-800 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-700">
                <span>Haldi & Mehndi Day Ceremonies</span>
                <span className="text-maroon-900">28% of Bookings</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gold-500 h-full rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-700">
                <span>Reception & Sangeet Nights</span>
                <span className="text-maroon-900">18% of Bookings</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-700 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-700">
                <span>Milestone Birthdays & Anniversaries</span>
                <span className="text-maroon-900">9% of Bookings</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '9%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="bg-white p-6 rounded-2xl border border-gold-200 shadow-sm space-y-4">
          <h4 className="font-serif text-base font-bold text-maroon-950 border-b border-slate-100 pb-3">
            On-Site Operational Health
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-950">On-Time Setup Arrival Rate</span>
              <span className="font-extrabold text-emerald-700 text-sm">99.4%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-950">Average Deposit Refund TAT</span>
              <span className="font-extrabold text-blue-700 text-sm">14.2 Hours</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gold-50 rounded-xl border border-gold-200">
              <span className="font-bold text-maroon-950">Active Promo Campaigns</span>
              <span className="font-extrabold text-maroon-900 text-sm">
                {coupons.filter(c => c.isActive).length} Coupons Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700">Total Customer Host Base</span>
              <span className="font-extrabold text-slate-900 text-sm">1,240 Hosts</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
