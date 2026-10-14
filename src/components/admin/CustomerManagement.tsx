import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Users, Search, Phone, Mail, MessageCircle, Star, Sparkles } from 'lucide-react';

export const CustomerManagement: React.FC = () => {
  const { bookings } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');

  // Generate unique customer list from bookings + defaults
  const customerMap: Record<string, any> = {
    'rohit.khandelwal@gmail.com': {
      name: 'Rohit Khandelwal',
      phone: '+91 98290 41122',
      email: 'rohit.khandelwal@gmail.com',
      city: 'Bengaluru / Jaipur',
      totalSpent: 147220,
      bookingsCount: 2,
      tier: 'Royal VIP',
      lastEvent: 'Grand Palace Wedding & Sangeet',
    },
    'kavita.singhal@yahoo.com': {
      name: 'Kavita Singhal',
      phone: '+91 94140 88291',
      email: 'kavita.singhal@yahoo.com',
      city: 'Jaipur',
      totalSpent: 38376,
      bookingsCount: 1,
      tier: 'Preferred Host',
      lastEvent: 'Haldi & Chooda Ceremony',
    },
    'aditya.kapoor@outlook.com': {
      name: 'Aditya Kapoor',
      phone: '+91 98190 33214',
      email: 'aditya.kapoor@outlook.com',
      city: 'Mumbai',
      totalSpent: 86000,
      bookingsCount: 2,
      tier: 'Royal VIP',
      lastEvent: 'Moroccan Mehndi Lounge',
    },
  };

  // Merge any new booking customers
  bookings.forEach(b => {
    if (!customerMap[b.customerEmail]) {
      customerMap[b.customerEmail] = {
        name: b.customerName,
        phone: b.customerPhone,
        email: b.customerEmail,
        city: b.city,
        totalSpent: b.grandTotal,
        bookingsCount: 1,
        tier: 'Preferred Host',
        lastEvent: b.eventType,
      };
    }
  });

  const customerList = Object.values(customerMap).filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gold-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search host by name, email, or city..."
            className="w-full pl-9 pr-4 py-2 bg-ivory-50 border border-gold-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-maroon-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <span className="text-xs font-bold text-maroon-900 bg-gold-100 px-3 py-1.5 rounded-xl border border-gold-300">
          {customerList.length} Registered Celebration Hosts
        </span>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-3xl border border-gold-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-gold-200">
              <tr>
                <th className="p-4">Customer Name & Tier</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">City / Region</th>
                <th className="p-4">Events Booked</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {customerList.map((c, i) => (
                <tr key={i} className="hover:bg-gold-50/40 transition">
                  <td className="p-4">
                    <span className="font-serif font-bold text-slate-900 text-sm block">
                      {c.name}
                    </span>
                    <span className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.tier === 'Royal VIP'
                        ? 'bg-amber-100 text-maroon-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      👑 {c.tier}
                    </span>
                  </td>

                  <td className="p-4 space-y-0.5 text-[11px]">
                    <span className="text-slate-800 font-semibold block">{c.phone}</span>
                    <span className="text-slate-500 block">{c.email}</span>
                  </td>

                  <td className="p-4 text-slate-800 font-semibold">
                    {c.city}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-maroon-900">{c.bookingsCount} Celebrations</span>
                    <span className="text-[10px] text-slate-400 block">{c.lastEvent}</span>
                  </td>

                  <td className="p-4 font-serif font-bold text-maroon-950 text-sm">
                    ₹{c.totalSpent.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-right">
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-2xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
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
