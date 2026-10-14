import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck, 
  LayoutDashboard,
  LogOut,
  PhoneCall,
  ChevronDown
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    user, 
    activePage, 
    navigateTo, 
    getCartTotals, 
    selectedDates, 
    rentalDays, 
    switchRole,
    logout,
    searchQuery,
    setSearchQuery
  } = useBooking();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const cartTotals = getCartTotals();

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Decorations', id: 'decorations' },
    { name: 'Categories', id: 'categories' },
    { name: 'Curated Packages', id: 'packages' },
    { name: 'Offers & Coupons', id: 'offers' },
    { name: 'Track Booking', id: 'track-booking' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('decorations', { query: searchQuery });
      setShowSearchModal(false);
    }
  };

  return (
    <>
      {/* Top Royal Announcement Banner */}
      <div className="bg-maroon-900 text-gold-200 text-xs py-2 px-4 border-b border-gold-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="text-white">Wedding Season 2026:</span> 
            <span>Use code <strong className="text-gold-300 font-bold bg-maroon-800/80 px-2 py-0.5 rounded border border-gold-500/40">UTSAV20</strong> for 20% OFF!</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gold-100/90 hidden sm:flex">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> 100% Refundable Security Deposit
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" /> Concierge: +91 98290 41122
            </span>
            {user && (
              <button 
                onClick={switchRole}
                className="text-xs bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold px-2 py-0.5 rounded transition"
              >
                Switch to {user.role === 'customer' ? 'Admin Portal' : 'Customer View'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gold-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo */}
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 flex items-center justify-center text-gold-300 shadow-md group-hover:scale-105 transition-transform border border-gold-400">
                <Sparkles className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-wider text-maroon-900">UTSAV</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-gold-100 text-maroon-800 px-1.5 py-0.5 rounded border border-gold-300">Royal</span>
                </div>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase font-medium">Event & Wedding Decor Rentals</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                    activePage === link.id
                      ? 'text-maroon-900 bg-gold-50 font-bold'
                      : 'text-slate-700 hover:text-maroon-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {activePage === link.id && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-maroon-700 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Rental Date Pill Display */}
              <button
                onClick={() => navigateTo('decorations')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-ivory-100 hover:bg-gold-50 border border-gold-300 rounded-full text-xs font-medium text-slate-700 transition shadow-sm"
                title="Active Rental Date Selection"
              >
                <Calendar className="w-3.5 h-3.5 text-maroon-800" />
                <span className="text-slate-800 font-semibold">{selectedDates.startDate}</span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-800 font-semibold">{selectedDates.endDate}</span>
                <span className="bg-maroon-800 text-gold-200 px-1.5 py-0.2 rounded-full text-[10px]">
                  {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                </span>
              </button>

              {/* Search Icon Trigger */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-slate-600 hover:text-maroon-800 hover:bg-gold-50 rounded-full transition"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => navigateTo('user-dashboard')}
                className="p-2 text-slate-600 hover:text-maroon-800 hover:bg-gold-50 rounded-full transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => navigateTo('cart')}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-maroon-900 bg-gold-100/60 hover:bg-gold-200/80 rounded-full transition relative border border-gold-300"
                aria-label="Rental Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-maroon-900" />
                  {cartTotals.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-maroon-700 text-gold-100 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartTotals.itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold text-xs text-maroon-900">
                  {cartTotals.subtotal > 0 ? `₹${cartTotals.subtotal.toLocaleString('en-IN')}` : 'Cart'}
                </span>
              </button>

              {/* User Profile / Admin Switch */}
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gold-50 transition border border-slate-200"
                    >
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover border border-gold-400"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gold-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs font-semibold text-slate-500">Signed in as</p>
                          <p className="text-sm font-bold text-maroon-900 truncate">{user.name}</p>
                          <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            user.role === 'admin' ? 'bg-maroon-100 text-maroon-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {user.role === 'admin' ? '👑 Admin Role' : '✨ Valued Customer'}
                          </span>
                        </div>

                        {user.role === 'admin' ? (
                          <button
                            onClick={() => {
                              navigateTo('admin-dashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gold-50 hover:text-maroon-900 flex items-center gap-2 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4 text-maroon-700" /> Admin Dashboard
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              navigateTo('user-dashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gold-50 hover:text-maroon-900 flex items-center gap-2 font-medium"
                          >
                            <User className="w-4 h-4 text-maroon-700" /> My Account & Bookings
                          </button>
                        )}

                        <button
                          onClick={() => {
                            switchRole();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gold-50 hover:text-maroon-900 flex items-center gap-2 font-medium border-t border-slate-100"
                        >
                          <Sparkles className="w-4 h-4 text-gold-600" /> 
                          Switch to {user.role === 'customer' ? 'Admin Portal' : 'Customer Store'}
                        </button>

                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium border-t border-slate-100"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigateTo('login')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-maroon-800 hover:bg-maroon-900 text-gold-200 rounded-full transition shadow-sm"
                  >
                    <User className="w-3.5 h-3.5" /> Sign In
                  </button>
                )}
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-maroon-900 rounded-lg hover:bg-gold-50"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gold-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => {
                  navigateTo('decorations');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gold-50 rounded-lg text-xs font-semibold text-maroon-900 border border-gold-200"
              >
                <Calendar className="w-4 h-4 text-gold-600" />
                {selectedDates.startDate} ({rentalDays}d)
              </button>
              <button
                onClick={() => {
                  setShowSearchModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200"
              >
                <Search className="w-4 h-4 text-slate-500" /> Search Decor
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                    activePage === link.id
                      ? 'bg-maroon-800 text-gold-200'
                      : 'text-slate-700 hover:bg-gold-50 hover:text-maroon-900'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              {user?.role === 'admin' ? (
                <button
                  onClick={() => {
                    navigateTo('admin-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-maroon-800 bg-gold-100 border border-gold-300 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Admin Console
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigateTo('user-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-maroon-800 bg-gold-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> My Dashboard & Bookings
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gold-300 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-maroon-900 mb-2">
              Find Grand Event Decor
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Search by event type, decor style, item name or accessories (e.g. Mandap, Haldi, Jharokha, Fairy Lights)
            </p>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try 'Rajwada Mandap', 'Brass Urli', 'Haldi Jhula'..."
                className="w-full pl-11 pr-24 py-3.5 bg-ivory-50 border-2 border-gold-300 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-maroon-700 text-sm"
                autoFocus
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 text-xs font-bold rounded-lg transition"
              >
                Search
              </button>
            </form>

            <div className="mt-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Royal Mandap', 'Haldi Jhula', 'Moroccan Mehndi', 'Reception Stage', 'Brass Urli', 'Cold Pyro Sparklers', 'Fairy Light Tunnel'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigateTo('decorations', { query: term });
                      setShowSearchModal(false);
                    }}
                    className="text-xs px-3 py-1.5 bg-gold-50 hover:bg-gold-100 text-maroon-900 rounded-full border border-gold-200 transition font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
