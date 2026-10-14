import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  Heart, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useBooking();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Thank you! A ₹1,000 festive voucher has been sent to your email.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-maroon-950 text-gold-100 border-t-2 border-gold-500/40 relative overflow-hidden">
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Trust Badges Strip */}
      <div className="border-b border-gold-500/20 bg-maroon-900/50 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Refundable Deposit</h4>
              <p className="text-xs text-gold-200/70">Automatic transfer within 24h of pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 text-gold-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">On-Time Setup Guarantee</h4>
              <p className="text-xs text-gold-200/70">Master crew arrives 6h prior to rituals</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 text-gold-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Zero Damage Hassle</h4>
              <p className="text-xs text-gold-200/70">Compliant with luxury palace & hotel venues</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 text-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">5,000+ Grand Events</h4>
              <p className="text-xs text-gold-200/70">India's most trusted wedding decor rental</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-maroon-950 font-bold shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-gold-300">UTSAV</span>
                <span className="block text-[10px] uppercase tracking-widest text-gold-200/60 font-medium">Royal Decor Rentals</span>
              </div>
            </div>

            <p className="text-xs text-gold-100/70 leading-relaxed pr-6">
              UTSAV is India's premier luxury event decoration rental platform. We curate heirloom-grade mandaps, handcrafted brass urlis, vibrant haldi swings, fairytale reception stages, and high-impact party effects for discerning hosts across India.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">Service Hubs & Warehouses</h5>
              <div className="flex flex-wrap gap-2 text-xs text-gold-200/80">
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Delhi NCR</span>
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Jaipur</span>
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Udaipur</span>
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Mumbai</span>
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Bengaluru</span>
                <span className="bg-maroon-900/80 px-2.5 py-1 rounded border border-gold-500/20">Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-gold-300 tracking-wide border-b border-gold-500/20 pb-2">
              Explore Decor
            </h4>
            <ul className="space-y-2 text-xs text-gold-100/80">
              <li>
                <button onClick={() => navigateTo('decorations', { category: 'wedding' })} className="hover:text-gold-300 transition">
                  Royal Wedding Mandaps
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('decorations', { category: 'haldi' })} className="hover:text-gold-300 transition">
                  Haldi Jhula & Swings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('decorations', { category: 'mehndi' })} className="hover:text-gold-300 transition">
                  Moroccan Mehndi Lounges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('decorations', { category: 'reception' })} className="hover:text-gold-300 transition">
                  Wisteria Reception Stages
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('decorations', { category: 'cocktail-party' })} className="hover:text-gold-300 transition">
                  Fairy Lights & Cold Pyros
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('packages')} className="hover:text-gold-300 transition font-bold text-gold-300">
                  Curated Packages (Save 25%)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-gold-300 tracking-wide border-b border-gold-500/20 pb-2">
              Assistance & Policy
            </h4>
            <ul className="space-y-2 text-xs text-gold-100/80">
              <li>
                <button onClick={() => navigateTo('track-booking')} className="hover:text-gold-300 transition">
                  Track Your Booking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers')} className="hover:text-gold-300 transition">
                  Offers & Seasonal Coupons
                </button>
              </li>
              <li>
                <span className="text-gold-200/60 block">Deposit Refund Policy (24h SLA)</span>
              </li>
              <li>
                <span className="text-gold-200/60 block">Venue Permission & Compliance</span>
              </li>
              <li>
                <span className="text-gold-200/60 block">Setup Crew Health & Safety</span>
              </li>
              <li>
                <button onClick={() => navigateTo('user-dashboard')} className="hover:text-gold-300 transition">
                  My Invoices & Receipts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-gold-300 tracking-wide border-b border-gold-500/20 pb-2">
              Concierge Desk
            </h4>
            <div className="space-y-2.5 text-xs text-gold-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Headquarters: Rajwada Towers, MG Road, New Delhi 110001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+91 98290 41122 / 011-4982233</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>concierge@utsavdecor.in</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gold-300 mb-1.5">Wedding Season Perks</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> Coupon code sent to your email!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs bg-maroon-900 border border-gold-500/30 rounded-lg text-white placeholder-gold-200/50 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold rounded-lg text-xs transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gold-200/60">
          <p>© 2026 UTSAV Royal Event Rentals Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gold-300 cursor-pointer">Terms of Rental</span>
            <span>•</span>
            <span className="hover:text-gold-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gold-300 cursor-pointer">GST: 07AAACU1234F1Z5</span>
          </div>
          <p className="flex items-center gap-1 text-gold-300 font-medium">
            Handcrafted with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> for Indian Celebrations
          </p>
        </div>
      </div>
    </footer>
  );
};
