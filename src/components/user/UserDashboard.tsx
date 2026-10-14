import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  Calendar, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  User, 
  ShoppingBag, 
  Plus, 
  CheckCircle2, 
  Clock, 
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BookingCard } from '../booking/BookingCard';
import { ProductCard } from '../decorations/ProductCard';

export const UserDashboard: React.FC = () => {
  const { user, bookings, wishlist, products, logout, navigateTo, showToast } = useBooking();
  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'venues' | 'refunds'>('bookings');

  // Filter bookings for user
  const userBookings = bookings; // In real app, filter by user email
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  // State for new venue form
  const [newVenueName, setNewVenueName] = useState('');
  const [newVenueAddress, setNewVenueAddress] = useState('');
  const [newVenueCity, setNewVenueCity] = useState('Bengaluru');
  const [newVenuePincode, setNewVenuePincode] = useState('');
  const [showAddVenue, setShowAddVenue] = useState(false);

  const handleAddVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenueName || !newVenueAddress) return;
    if (user) {
      user.savedAddresses.push({
        id: `addr-${Date.now()}`,
        label: newVenueName,
        venueName: newVenueName,
        address: newVenueAddress,
        city: newVenueCity,
        pincode: newVenuePincode || '560001',
      });
      showToast('Venue saved to your address book!');
      setNewVenueName('');
      setNewVenueAddress('');
      setShowAddVenue(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4 px-4">
        <h2 className="font-serif text-2xl font-bold text-maroon-950">Please Sign In</h2>
        <p className="text-xs text-slate-500">Sign in to access your event bookings, wishlist and saved addresses.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-3 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Profile Overview Header Card */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 rounded-3xl p-6 sm:p-8 text-gold-100 border-2 border-gold-400 shadow-xl relative overflow-hidden mb-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold-400 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {user.name}
                </h1>
                <span className="bg-gold-500/20 text-gold-300 border border-gold-400/40 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Host Member
                </span>
              </div>
              <p className="text-xs text-gold-200/80 mt-1">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-gold-300/70 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Member since Jan 2026 • 2 Grand Events Decorated
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                navigateTo('home');
              }}
              className="px-4 py-2 bg-maroon-900/80 hover:bg-maroon-800 text-gold-200 text-xs font-bold rounded-xl border border-gold-500/30 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gold-500/20 text-xs">
          <div className="bg-maroon-900/60 p-3 rounded-2xl border border-gold-500/20">
            <span className="text-gold-200/60 block text-[10px] uppercase font-bold">Total Bookings</span>
            <span className="font-serif text-xl font-bold text-gold-300">{userBookings.length}</span>
          </div>
          <div className="bg-maroon-900/60 p-3 rounded-2xl border border-gold-500/20">
            <span className="text-gold-200/60 block text-[10px] uppercase font-bold">Saved in Wishlist</span>
            <span className="font-serif text-xl font-bold text-gold-300">{wishlist.length}</span>
          </div>
          <div className="bg-maroon-900/60 p-3 rounded-2xl border border-gold-500/20">
            <span className="text-gold-200/60 block text-[10px] uppercase font-bold">Active Events</span>
            <span className="font-serif text-xl font-bold text-gold-300">
              {userBookings.filter(b => b.status !== 'Picked Up' && b.status !== 'Deposit Refunded').length}
            </span>
          </div>
          <div className="bg-maroon-900/60 p-3 rounded-2xl border border-gold-500/20">
            <span className="text-gold-200/60 block text-[10px] uppercase font-bold">Security Deposit Status</span>
            <span className="font-serif text-base font-bold text-emerald-400">100% Protected</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-gold-200 gap-2 mb-8 overflow-x-auto pb-1 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-3 px-5 rounded-t-2xl border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-maroon-800 text-maroon-950 bg-gold-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-maroon-800" />
          <span>My Celebrations & Bookings ({userBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`py-3 px-5 rounded-t-2xl border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'border-maroon-800 text-maroon-950 bg-gold-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Wishlist Collection ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('venues')}
          className={`py-3 px-5 rounded-t-2xl border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'venues'
              ? 'border-maroon-800 text-maroon-950 bg-gold-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4 text-gold-600" />
          <span>Saved Venues ({user.savedAddresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('refunds')}
          className={`py-3 px-5 rounded-t-2xl border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'refunds'
              ? 'border-maroon-800 text-maroon-950 bg-gold-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Deposit Refund Tracker</span>
        </button>
      </div>

      {/* Tab 1: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {userBookings.length > 0 ? (
            userBookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gold-200 max-w-md mx-auto">
              <Calendar className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <h4 className="font-serif text-lg font-bold text-maroon-950">No Bookings Yet</h4>
              <p className="text-xs text-slate-500 mb-6">Explore our curated mandaps and decor sets for your upcoming celebrations.</p>
              <button
                onClick={() => navigateTo('decorations')}
                className="px-6 py-2.5 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
              >
                Browse Decor Catalog
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gold-200 max-w-md mx-auto">
              <Heart className="w-12 h-12 text-rose-300 mx-auto mb-3" />
              <h4 className="font-serif text-lg font-bold text-maroon-950">Your Wishlist is Empty</h4>
              <p className="text-xs text-slate-500 mb-6">Click the heart icon on any decor set to save it here for family discussions.</p>
              <button
                onClick={() => navigateTo('decorations')}
                className="px-6 py-2.5 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
              >
                Explore Decor Sets
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Venues */}
      {activeTab === 'venues' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-maroon-950">Event Venues & Addresses</h3>
            <button
              onClick={() => setShowAddVenue(!showAddVenue)}
              className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-gold-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Venue
            </button>
          </div>

          {showAddVenue && (
            <form onSubmit={handleAddVenue} className="bg-white p-6 rounded-2xl border-2 border-gold-300 shadow-md space-y-4 text-xs">
              <h4 className="font-bold text-sm text-maroon-900">Add New Venue Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue Name</label>
                  <input
                    type="text"
                    required
                    value={newVenueName}
                    onChange={(e) => setNewVenueName(e.target.value)}
                    placeholder="e.g. Jai Mahal Palace Banquet Lawns"
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newVenueCity}
                    onChange={(e) => setNewVenueCity(e.target.value)}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address & Gate Details</label>
                <input
                  type="text"
                  required
                  value={newVenueAddress}
                  onChange={(e) => setNewVenueAddress(e.target.value)}
                  placeholder="Gate No. 2, North Lawn Entry"
                  className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-maroon-800 text-gold-200 font-bold rounded-xl"
                >
                  Save Venue
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddVenue(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.savedAddresses.map((addr) => (
              <div key={addr.id} className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-maroon-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" /> {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="bg-gold-100 text-maroon-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{addr.address}</p>
                <p className="text-[11px] text-slate-400">{addr.city} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Security Deposit Tracker */}
      {activeTab === 'refunds' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-3xl space-y-2">
            <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              UTSAV 24-Hour Security Deposit Refund Guarantee
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-3xl">
              All security deposits are held in an escrow account during your celebration. Immediately after our dismantling crew completes the post-event inventory inspection, the full deposit is refunded to your linked UPI ID within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {userBookings.map((b) => (
              <div key={b.id} className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-mono font-bold text-maroon-900 block text-sm">{b.id}</span>
                  <span className="text-slate-500">{b.eventType} • {b.venueName}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Deposit Amount</span>
                    <span className="font-serif font-bold text-base text-slate-800">
                      ₹{b.securityDeposit.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Refund Status</span>
                    <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-xs ${
                      b.status === 'Deposit Refunded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status === 'Deposit Refunded' ? '✓ Refund Credited' : '⏳ In Escrow (Active)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
