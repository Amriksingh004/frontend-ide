import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { DatePicker } from './DatePicker';

export const Hero: React.FC = () => {
  const { navigateTo, selectedDates, setSelectedDates } = useBooking();

  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('decorations', {
      category: selectedOccasion === 'all' ? undefined : selectedOccasion,
    });
  };

  return (
    <section className="relative overflow-hidden bg-maroon-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Imagery with Royal Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
          alt="Royal Indian Wedding Mandap Decor"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 animate-pulse-subtle"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-950/90 to-maroon-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-black/40" />
      </div>

      {/* Decorative Ornate Golden Circles */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Royal Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>India's Premier Royal Decor Rental Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Grand Indian <br className="hidden sm:inline" />
              <span className="gold-shimmer-text">Function & Wedding</span> <br />
              Decor Rentals
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gold-100/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Heirloom carved Rajwada mandaps, fragrant marigold haldi swings, bohemian mehndi lounges, and fairytale crystal reception stages. Delivered, assembled, and dismantled by our master crew at your venue.
            </p>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-gold-200/90 font-medium">
              <div className="flex items-center gap-1.5 bg-maroon-900/80 px-3 py-1.5 rounded-full border border-gold-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Refundable Deposit</span>
              </div>
              <div className="flex items-center gap-1.5 bg-maroon-900/80 px-3 py-1.5 rounded-full border border-gold-500/30">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>Guaranteed On-Time Setup</span>
              </div>
              <div className="flex items-center gap-1.5 bg-maroon-900/80 px-3 py-1.5 rounded-full border border-gold-500/30">
                <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                <span>4.9★ (5,000+ Grand Events)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Availability Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-gold-300 text-slate-800 space-y-4">
              
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-0.5">
                  Instant Fleet Availability
                </span>
                <h3 className="font-serif text-lg font-bold text-maroon-950">
                  Plan Your Event Decor
                </h3>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-3.5 text-xs">
                {/* Occasion */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Event Occasion
                  </label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-maroon-800 cursor-pointer"
                  >
                    <option value="all">All Occasions (Explore Full Fleet)</option>
                    <option value="wedding">Weddings & Mandaps</option>
                    <option value="haldi">Haldi Ceremonies</option>
                    <option value="mehndi">Mehndi & Sangeet</option>
                    <option value="reception">Grand Receptions</option>
                    <option value="birthday">Birthdays & Anniversaries</option>
                    <option value="pooja-spiritual">Pooja & Spiritual</option>
                    <option value="cocktail-party">Cocktails & After-Parties</option>
                  </select>
                </div>

                {/* Rental Dates */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Rental Duration (Start & End Date)
                  </label>
                  <DatePicker
                    startDate={selectedDates.startDate}
                    endDate={selectedDates.endDate}
                    onChange={setSelectedDates}
                    compact
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Venue City
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-maroon-800 cursor-pointer"
                    >
                      <option value="Delhi NCR">Delhi NCR (Free Logistics on ₹30k+)</option>
                      <option value="Jaipur">Jaipur (Hub Warehouse)</option>
                      <option value="Udaipur">Udaipur (Palace Logistics)</option>
                      <option value="Mumbai">Mumbai & Navi Mumbai</option>
                      <option value="Bengaluru">Bengaluru Hub</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 font-serif font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group border border-gold-400"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Available Decor & Daily Rates</span>
                </button>

              </form>

              <div className="text-center pt-1">
                <span className="text-[10px] text-slate-400">
                  Instant real-time stock lookup • No advance deposit needed to browse
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
