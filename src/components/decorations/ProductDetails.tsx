import React, { useState } from 'react';
import type { Product } from '../../types';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Truck, 
  Heart, 
  Share2, 
  Check, 
  X, 
  Calendar, 
  Sparkles, 
  Layers, 
  ArrowLeft,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { DatePicker } from '../common/DatePicker';
import { AvailabilityChecker } from '../common/AvailabilityChecker';
import { QuantitySelector } from '../common/QuantitySelector';
import { ReviewCard } from '../common/ReviewCard';
import { ProductCard } from './ProductCard';
import { REVIEWS } from '../../data/mockData';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    selectedDates, 
    setSelectedDates, 
    navigateTo, 
    products, 
    showToast 
  } = useBooking();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [withSetupCrew, setWithSetupCrew] = useState(true);

  // Local dates state matching context
  const [dates, setDates] = useState(selectedDates);

  const handleDateChange = (newDates: { startDate: string; endDate: string }) => {
    setDates(newDates);
    setSelectedDates(newDates);
  };

  // Calculate rental days
  const startD = new Date(dates.startDate);
  const endD = new Date(dates.endDate);
  const diffTime = Math.abs(endD.getTime() - startD.getTime());
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const isFavorited = isInWishlist(product.id);

  // Price calculation
  const rentalSubtotal = product.pricePerDay * rentalDays * quantity;
  const setupTotal = withSetupCrew ? product.setupFee * quantity : 0;
  const depositTotal = product.securityDeposit * quantity;
  const grandTotalEstimate = rentalSubtotal + setupTotal + depositTotal;

  const handleAddToCart = () => {
    addToCart(product, quantity, dates.startDate, dates.endDate, withSetupCrew);
  };

  const handleBookNow = () => {
    addToCart(product, quantity, dates.startDate, dates.endDate, withSetupCrew);
    navigateTo('cart');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  // Related products from the same category
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.decorType === product.decorType))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button & Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('decorations')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-maroon-800 hover:text-maroon-950 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-maroon-800 bg-white border border-slate-200 rounded-full hover:bg-gold-50 transition shadow-xs"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-2 bg-white border border-slate-200 rounded-full hover:bg-gold-50 transition shadow-xs text-slate-600 hover:text-rose-500"
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery on left, Booking Panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery & Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Stage Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border-2 border-gold-300 shadow-xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.bestseller && (
              <span className="absolute top-4 left-4 bg-gold-500 text-maroon-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-md border border-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> High Demand Choice
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                    activeImageIndex === idx
                      ? 'border-maroon-800 ring-2 ring-gold-400'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Product Description */}
          <div className="bg-white rounded-2xl p-6 border border-gold-200/90 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-maroon-950 border-b border-slate-100 pb-3">
              About This Masterpiece
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description}
            </p>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" /> What's Included:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                  <Info className="w-4 h-4 text-slate-400" /> Exclusions / Client Provided:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-500">
                  {product.exclusions.length > 0 ? (
                    product.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))
                  ) : (
                    <li>No special exclusions. Complete set provided.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div className="bg-white rounded-2xl p-6 border border-gold-200/90 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-maroon-950 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold-600" /> Technical Specifications & Dimensions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-ivory-50 p-3 rounded-xl border border-gold-100">
                <span className="text-slate-400 block mb-0.5">Dimensions</span>
                <span className="font-bold text-slate-800">{product.dimensions}</span>
              </div>
              <div className="bg-ivory-50 p-3 rounded-xl border border-gold-100">
                <span className="text-slate-400 block mb-0.5">Crafted Materials</span>
                <span className="font-bold text-slate-800">{product.material}</span>
              </div>
              <div className="bg-ivory-50 p-3 rounded-xl border border-gold-100">
                <span className="text-slate-400 block mb-0.5">Setup & Assembly Time</span>
                <span className="font-bold text-slate-800">{product.setupTimeHours} Hours (Included)</span>
              </div>
              <div className="bg-ivory-50 p-3 rounded-xl border border-gold-100">
                <span className="text-slate-400 block mb-0.5">Inventory Stock</span>
                <span className="font-bold text-slate-800">{product.totalStock} Sets in Total Fleet</span>
              </div>
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="bg-ivory-50 p-3 rounded-xl border border-gold-100">
                  <span className="text-slate-400 block mb-0.5">{key}</span>
                  <span className="font-bold text-slate-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Dates, Availability & Booking Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-300 shadow-xl sticky top-28 space-y-6">
            
            {/* Header info */}
            <div>
              {product.hindiName && (
                <p className="text-xs font-semibold text-gold-600 tracking-wider mb-1">
                  {product.hindiName}
                </p>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950 leading-tight">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="mt-2.5 flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{product.rating}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  {product.reviewCount} verified wedding celebrations
                </span>
              </div>
            </div>

            {/* Price display banner */}
            <div className="bg-ivory-50 p-4 rounded-2xl border border-gold-200 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-bold block">
                  Daily Rental Charge
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-extrabold text-maroon-900">
                    ₹{product.pricePerDay.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ 24 hrs</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-emerald-800 font-bold block">
                  100% Refundable Deposit
                </span>
                <span className="text-xs font-bold text-slate-700">
                  ₹{product.securityDeposit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Date Range Selector */}
            <div>
              <DatePicker
                startDate={dates.startDate}
                endDate={dates.endDate}
                onChange={handleDateChange}
                label="Choose Rental Dates"
              />
            </div>

            {/* Live Inventory Availability Checker */}
            <div>
              <AvailabilityChecker
                productId={product.id}
                startDate={dates.startDate}
                endDate={dates.endDate}
                quantity={quantity}
              />
            </div>

            {/* Quantity Selector & Setup Crew Option */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Quantity Needed:</span>
                  <span className="text-[11px] text-slate-400">Total units required for venue</span>
                </div>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  max={product.availableStock}
                  min={1}
                />
              </div>

              {/* Setup Crew Addon Toggle */}
              <div className="bg-ivory-50 p-3.5 rounded-xl border border-gold-200 flex items-center justify-between">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="setupCrewToggle"
                    checked={withSetupCrew}
                    onChange={(e) => setWithSetupCrew(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-maroon-800 accent-maroon-800 cursor-pointer"
                  />
                  <label htmlFor="setupCrewToggle" className="cursor-pointer text-xs">
                    <span className="font-bold text-maroon-950 block">Include Master Setup Crew</span>
                    <span className="text-[11px] text-slate-500 block">
                      Our skilled artisans assemble and test everything before the rituals.
                    </span>
                  </label>
                </div>
                <span className="text-xs font-bold text-maroon-900 flex-shrink-0">
                  +₹{(product.setupFee * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Live Financial Breakdown Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Rental: ₹{product.pricePerDay.toLocaleString('en-IN')} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'} × {quantity}</span>
                <span className="font-semibold text-slate-800">₹{rentalSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {withSetupCrew && (
                <div className="flex justify-between text-slate-600">
                  <span>Setup & Dismantle Crew ({quantity} units)</span>
                  <span className="font-semibold text-slate-800">₹{setupTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Refundable Security Deposit</span>
                <span className="font-bold">₹{depositTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-sm text-maroon-950">
                <span>Estimated Payable:</span>
                <span className="font-serif text-lg text-maroon-900">
                  ₹{grandTotalEstimate.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                *Final GST & coupon discounts applied in Cart. Deposit refunded post-event inspection.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 font-serif font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center gap-2 border border-gold-400"
              >
                <span>Reserve for My Celebration</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-gold-100 hover:bg-gold-200 text-maroon-950 font-bold text-xs uppercase tracking-wider rounded-2xl border border-gold-300 shadow-xs transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-maroon-800" />
                <span>Add to Rental Cart</span>
              </button>
            </div>

            {/* Guarantee footnote */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Full refund if cancelled up to 72 hours before event.</span>
            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16 pt-12 border-t border-gold-300">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest block mb-1">
            Real Host Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
            Celebration Reviews & Photos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See how host families and luxury venues celebrated with UTSAV decor sets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gold-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest block mb-1">
                Complementary Accents
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
                Frequently Paired With This Set
              </h2>
            </div>
            <button
              onClick={() => navigateTo('decorations')}
              className="text-xs sm:text-sm font-bold text-maroon-800 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
