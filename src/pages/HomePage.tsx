import React from 'react';
import { Hero } from '../components/common/Hero';
import { CategorySection } from '../components/decorations/CategorySection';
import { ProductGrid } from '../components/decorations/ProductGrid';
import { PackageCard } from '../components/decorations/PackageCard';
import { ReviewCard } from '../components/common/ReviewCard';
import { useBooking } from '../context/BookingContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Truck, 
  RotateCcw, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { products, packages, navigateTo } = useBooking();

  const featuredProducts = products.filter((p) => p.featured || p.bestseller).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-maroon-700" />
              <span>Royal Masterpieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
              Most Booked Decor Sets
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Heirloom quality mandaps, haldi swings, and fairy light arches hand-inspected for your big day.
            </p>
          </div>

          <button
            onClick={() => navigateTo('decorations')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-maroon-800 hover:text-maroon-950 hover:underline group flex-shrink-0"
          >
            <span>Explore All Decor ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories Showcase */}
      <div className="bg-ivory-100/60 border-y border-gold-200/80">
        <CategorySection />
      </div>

      {/* Curated All-Inclusive Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-gold-600" />
            <span>Complete Event Suites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
            Curated All-Inclusive Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Eliminate coordination headaches. Book complete stage, mandap, entrance, and lounge setups with master crew and logistics included at bundle savings up to 25%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.slice(0, 2).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigateTo('packages')}
            className="px-8 py-3.5 bg-maroon-900 hover:bg-maroon-800 text-gold-200 font-serif font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition inline-flex items-center gap-2"
          >
            <span>View All Curated Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Why Choose UTSAV Royal Rentals */}
      <section className="bg-maroon-950 text-gold-100 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              The UTSAV Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Why 5,000+ Indian Families Trust UTSAV
            </h2>
            <p className="text-xs sm:text-sm text-gold-200/70">
              We treat your sacred rituals and milestone celebrations with the dignity and precision they deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-maroon-900/60 p-6 rounded-3xl border border-gold-500/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">100% Deposit Refund</h3>
              <p className="text-xs text-gold-100/70 leading-relaxed">
                No hidden deductions. Your refundable security deposit is transferred back directly via UPI within 24 hours of item return.
              </p>
            </div>

            <div className="bg-maroon-900/60 p-6 rounded-3xl border border-gold-500/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">On-Time Setup Guarantee</h3>
              <p className="text-xs text-gold-100/70 leading-relaxed">
                Our logistics and assembly crew arrives at the venue 4-6 hours prior to ceremony muhurat for peaceful sign-off.
              </p>
            </div>

            <div className="bg-maroon-900/60 p-6 rounded-3xl border border-gold-500/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">Master Artisan Crew</h3>
              <p className="text-xs text-gold-100/70 leading-relaxed">
                Trained installers handle heavy mandap pillars, electrical wiring, flower rigging, and final safety inspections.
              </p>
            </div>

            <div className="bg-maroon-900/60 p-6 rounded-3xl border border-gold-500/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">Pristine Condition</h3>
              <p className="text-xs text-gold-100/70 leading-relaxed">
                Every brass urli is re-lacquered, fabrics dry-cleaned, and lights multi-point tested before dispatch from our warehouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Host Word of Mouth
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
            Stories of Unforgettable Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From palace weddings in Rajasthan to rooftop sangeets in Mumbai and Bengaluru farmhouses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-maroon-900 to-maroon-950 rounded-3xl p-8 sm:p-12 text-center text-white border-2 border-gold-400 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest block">
              Wedding Season Booking Active
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Reserve Your Auspicious Dates Before Inventory Runs Out
            </h2>
            <p className="text-xs sm:text-sm text-gold-100/80 leading-relaxed">
              Top wedding dates across November to February fill up rapidly. Check live inventory availability for your venue now.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigateTo('decorations')}
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition"
              >
                Browse All Decor Items
              </button>
              <button
                onClick={() => navigateTo('packages')}
                className="px-8 py-3.5 bg-maroon-800 hover:bg-maroon-700 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-gold-500/40 transition"
              >
                Explore Curated Packages
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
