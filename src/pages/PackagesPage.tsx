import React from 'react';
import { useBooking } from '../context/BookingContext';
import { PackageCard } from '../components/decorations/PackageCard';
import { Sparkles, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { packages, navigateTo } = useBooking();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>All-Inclusive Wedding & Function Suites</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-950">
          Curated Master Packages
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Designed by India's top wedding stylists. Get complete stage, mandap, entrance archway, seating, and lighting bundles with master installation crew and logistics included at bundle savings up to 25%.
        </p>
      </div>

      {/* Package Benefits Strip */}
      <div className="bg-ivory-50 rounded-2xl p-4 sm:p-6 border border-gold-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-maroon-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Guaranteed Theme Harmony</h4>
            <p className="text-slate-500 text-[11px]">Matching florals, drapes and furniture</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-maroon-800 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Dedicated Master Crew Lead</h4>
            <p className="text-slate-500 text-[11px]">Single point of contact on-site</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-maroon-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Up to 25% Bundle Savings</h4>
            <p className="text-slate-500 text-[11px]">Compared to item-by-item rental</p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Custom Inquiry */}
      <div className="text-center pt-8">
        <p className="text-xs text-slate-500 mb-3">
          Need a bespoke package customized for 1,000+ guest royal palace setups?
        </p>
        <button
          onClick={() => navigateTo('decorations')}
          className="px-6 py-3 bg-maroon-900 hover:bg-maroon-800 text-gold-200 text-xs font-bold rounded-xl shadow transition inline-flex items-center gap-2"
        >
          <span>Explore Custom Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
