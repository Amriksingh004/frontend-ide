import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingStatusType } from '../../types';
import { BookingStatus } from '../booking/BookingStatus';
import { Search, Calendar, MapPin, Phone, ShieldCheck, User } from 'lucide-react';

export const BookingManagement: React.FC = () => {
  const { bookings, updateBookingStatus } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.venueName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: BookingStatusType[] = [
    'Pending',
    'Confirmed',
    'Crew Assigned',
    'In Transit',
    'Setup Completed',
    'Event Active',
    'Picked Up',
    'Deposit Refunded',
    'Cancelled',
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gold-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Booking ID, Host name, Venue..."
            className="w-full pl-9 pr-4 py-2 bg-ivory-50 border border-gold-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-maroon-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto pb-1">
          <span className="font-bold text-slate-500 flex-shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-ivory-50 border border-gold-300 rounded-xl px-3 py-1.5 font-bold text-maroon-900 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-gold-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-gold-200">
              <tr>
                <th className="p-4">Booking & Host</th>
                <th className="p-4">Event & Venue</th>
                <th className="p-4">Dates & Duration</th>
                <th className="p-4">Financials</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Update Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gold-50/40 transition">
                  <td className="p-4">
                    <span className="font-mono font-bold text-maroon-950 block text-sm">
                      {b.id}
                    </span>
                    <span className="font-bold text-slate-900 block">{b.customerName}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gold-600" /> {b.customerPhone}
                    </span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <span className="font-serif font-bold text-maroon-900 block truncate">
                      {b.eventType}
                    </span>
                    <span className="text-[11px] text-slate-600 flex items-start gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{b.venueName}, {b.city}</span>
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800 block">
                      {b.startDate} → {b.endDate}
                    </span>
                    <span className="bg-maroon-100 text-maroon-900 text-[10px] font-bold px-1.5 py-0.2 rounded inline-block mt-0.5">
                      {b.rentalDays} {b.rentalDays === 1 ? 'day' : 'days'}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-serif font-bold text-maroon-950 text-sm block">
                      ₹{b.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      Dep: ₹{b.securityDeposit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{b.paymentMethod} ({b.paymentStatus})</span>
                  </td>

                  <td className="p-4">
                    <BookingStatus status={b.status} size="sm" />
                  </td>

                  <td className="p-4 text-right">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatusType)}
                      className="bg-ivory-50 border border-gold-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-maroon-900 focus:outline-none focus:border-maroon-800 cursor-pointer shadow-2xs"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          → Set {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
