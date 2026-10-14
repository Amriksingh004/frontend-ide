import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckoutForm, CheckoutFormData } from '../components/booking/CheckoutForm';
import { PaymentSection } from '../components/booking/PaymentSection';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotals, createBooking, navigateTo, user, selectedDates } = useBooking();
  const totals = getCartTotals();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: user?.name || 'Rohit Khandelwal',
    customerPhone: user?.phone || '+91 98290 41122',
    customerEmail: user?.email || 'rohit.khandelwal@gmail.com',
    eventType: 'Wedding & Mandap Ceremony',
    venueName: user?.savedAddresses?.[0]?.venueName || 'The Leela Palace, Grand Ballroom',
    venueAddress: user?.savedAddresses?.[0]?.address || 'Old Airport Road, Kodihalli',
    city: user?.savedAddresses?.[0]?.city || 'Bengaluru',
    pincode: user?.savedAddresses?.[0]?.pincode || '560008',
    deliverySlot: 'Early Morning (06:00 AM - 09:00 AM) - Best for Day Rituals',
    depositRefundUpi: 'rohit@okhdfcbank',
    specialInstructions: 'Delivery truck gate 2 entry. Freight elevator available.',
    agreeToPolicy: true,
  });

  const isFormValid =
    formData.customerName.trim().length > 0 &&
    formData.customerPhone.trim().length > 0 &&
    formData.customerEmail.trim().length > 0 &&
    formData.venueName.trim().length > 0 &&
    formData.venueAddress.trim().length > 0 &&
    formData.depositRefundUpi.trim().length > 0 &&
    formData.agreeToPolicy;

  const handlePaymentSuccess = (
    method: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'CashOnSetup',
    paymentStatus: 'Paid' | 'Advance Paid (30%)'
  ) => {
    // Construct items array
    const bookingItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.images[0],
      quantity: item.quantity,
      pricePerDay: item.product.pricePerDay,
      totalItemPrice: item.product.pricePerDay * item.rentalDays * item.quantity,
      securityDeposit: item.product.securityDeposit * item.quantity,
    }));

    // Create booking
    const newBooking = createBooking({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      eventType: formData.eventType,
      venueName: formData.venueName,
      venueAddress: formData.venueAddress,
      city: formData.city,
      pincode: formData.pincode,
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      rentalDays: cart[0]?.rentalDays || 1,
      items: bookingItems,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      setupCrewFee: totals.setupFee,
      securityDeposit: totals.securityDeposit,
      discount: totals.discount,
      tax: totals.tax,
      grandTotal: totals.grandTotal,
      paymentMethod: method,
      paymentStatus: paymentStatus,
    });

    // Navigate to confirmation page
    navigateTo('confirmation', { bookingId: newBooking.id });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
        <h2 className="font-serif text-2xl font-bold text-maroon-950">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Please add decor items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('decorations')}
          className="px-6 py-2.5 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
        >
          Return to Decor Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigateTo('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-950 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </button>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">
          Complete Event Booking & Venue Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide venue coordinates for the master setup truck and select payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <CheckoutForm formData={formData} onChange={setFormData} />

          <PaymentSection
            grandTotal={totals.grandTotal}
            onPaymentSuccess={handlePaymentSuccess}
            isFormValid={isFormValid}
          />
        </div>

        {/* Right Column: Order Items & Breakdown Review (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gold-300 shadow-xl space-y-5">
            <h3 className="font-serif text-lg font-bold text-maroon-950 border-b border-slate-100 pb-3">
              Order Review ({totals.itemCount} Items)
            </h3>

            {/* Items list preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs bg-ivory-50/80 p-2.5 rounded-xl border border-gold-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-maroon-950 truncate">
                      {item.product.name}
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × {item.rentalDays} {item.rentalDays === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  <span className="font-bold text-maroon-900 font-serif">
                    ₹{(item.product.pricePerDay * item.rentalDays * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Rental Subtotal</span>
                <span className="font-semibold text-slate-800">₹{totals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Logistics & Transport</span>
                <span className="font-semibold text-slate-800">{totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Master Setup & Dismantle Crew</span>
                <span className="font-semibold text-slate-800">₹{totals.setupFee.toLocaleString('en-IN')}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Savings</span>
                  <span>-₹{totals.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-semibold text-slate-800">₹{totals.tax.toLocaleString('en-IN')}</span>
              </div>

              {/* Deposit badge */}
              <div className="bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl flex justify-between items-center text-emerald-950 font-bold">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Refundable Security Deposit
                </span>
                <span className="font-serif">₹{totals.securityDeposit.toLocaleString('en-IN')}</span>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t-2 border-gold-300 flex justify-between items-baseline font-bold">
                <span className="font-serif text-sm text-maroon-950">Grand Total Payable</span>
                <span className="font-serif text-2xl text-maroon-900">
                  ₹{totals.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center">
              Instant booking confirmation with Booking ID will be generated upon payment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
