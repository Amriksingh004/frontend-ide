import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventType: string;
  venueName: string;
  venueAddress: string;
  city: string;
  pincode: string;
  deliverySlot: string;
  depositRefundUpi: string;
  specialInstructions: string;
  agreeToPolicy: boolean;
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (data: CheckoutFormData) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  onChange,
}) => {
  const { user } = useBooking();

  const cities = [
    'Delhi NCR',
    'Jaipur',
    'Udaipur',
    'Mumbai',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Chandigarh',
    'Kolkata',
  ];

  const deliverySlots = [
    'Early Morning (06:00 AM - 09:00 AM) - Best for Day Rituals',
    'Mid-Day (10:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM) - Best for Sangeet & Reception',
    'Previous Night Setup (11:00 PM - 04:00 AM)',
  ];

  const handleChange = (field: keyof CheckoutFormData, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const handleUseSavedAddress = (addr: any) => {
    onChange({
      ...formData,
      venueName: addr.venueName,
      venueAddress: addr.address,
      city: addr.city,
      pincode: addr.pincode,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Quick Autofill from saved address if user logged in */}
      {user && user.savedAddresses && user.savedAddresses.length > 0 && (
        <div className="bg-gold-50/80 p-4 rounded-2xl border border-gold-300">
          <span className="text-xs font-bold text-maroon-900 block mb-2">
            📍 Quick Fill From Your Saved Venues:
          </span>
          <div className="flex flex-wrap gap-2">
            {user.savedAddresses.map((addr) => (
              <button
                key={addr.id}
                type="button"
                onClick={() => handleUseSavedAddress(addr)}
                className="text-xs bg-white hover:bg-gold-100 text-maroon-900 px-3 py-1.5 rounded-lg border border-gold-200 transition font-medium shadow-xs"
              >
                {addr.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Host / Primary Contact Details */}
      <div className="bg-white p-6 rounded-2xl border border-gold-200/90 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-maroon-800" /> Host & Event Manager Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Host Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="e.g. Rohit Khandelwal"
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              WhatsApp / Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={formData.customerPhone}
              onChange={(e) => handleChange('customerPhone', e.target.value)}
              placeholder="+91 98290 XXXXX"
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Email Address (For Invoices & Tracking) *
            </label>
            <input
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) => handleChange('customerEmail', e.target.value)}
              placeholder="name@gmail.com"
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Event Celebration Type *
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => handleChange('eventType', e.target.value)}
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800 cursor-pointer"
            >
              <option value="Wedding & Mandap Ceremony">Wedding & Mandap Ceremony</option>
              <option value="Haldi Ceremony">Haldi Ceremony</option>
              <option value="Mehndi & Sangeet">Mehndi & Sangeet</option>
              <option value="Grand Reception">Grand Reception</option>
              <option value="Ring Ceremony / Engagement">Ring Ceremony / Engagement</option>
              <option value="Milestone Birthday / Anniversary">Milestone Birthday / Anniversary</option>
              <option value="Spiritual Pooja / Griha Pravesh">Spiritual Pooja / Griha Pravesh</option>
              <option value="Cocktail / After-Party">Cocktail / After-Party</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue & Logistics Details */}
      <div className="bg-white p-6 rounded-2xl border border-gold-200/90 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building2 className="w-4 h-4 text-maroon-800" /> Venue & Delivery Location
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Venue Name (Resort / Hotel / Farmhouse / Hall) *
            </label>
            <input
              type="text"
              required
              value={formData.venueName}
              onChange={(e) => handleChange('venueName', e.target.value)}
              placeholder="e.g. The Leela Palace, Grand Ballroom"
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Full Venue Address & Landmark *
            </label>
            <textarea
              rows={2}
              required
              value={formData.venueAddress}
              onChange={(e) => handleChange('venueAddress', e.target.value)}
              placeholder="Gate number, wing, street and landmark for decor transport truck entry"
              className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Event City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800 cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="e.g. 560008"
                className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Preferred Setup Arrival Slot *
            </label>
            <select
              value={formData.deliverySlot}
              onChange={(e) => handleChange('deliverySlot', e.target.value)}
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800 cursor-pointer"
            >
              {deliverySlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Security Deposit Refund Information */}
      <div className="bg-white p-6 rounded-2xl border border-gold-200/90 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security Deposit Refund Destination
        </h3>

        <div className="text-xs space-y-3">
          <p className="text-slate-600">
            Your security deposit is 100% refundable upon post-event handover. Please provide your UPI ID or Bank account for instant return within 24 hours:
          </p>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Your UPI ID or Account Number for Refund *
            </label>
            <input
              type="text"
              required
              value={formData.depositRefundUpi}
              onChange={(e) => handleChange('depositRefundUpi', e.target.value)}
              placeholder="e.g. rohit@okhdfcbank or 9829041122@paytm"
              className="w-full px-3 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Special Setup Instructions / Gate Pass Notes (Optional)
            </label>
            <input
              type="text"
              value={formData.specialInstructions}
              onChange={(e) => handleChange('specialInstructions', e.target.value)}
              placeholder="e.g. Venue requires labor Aadhaar copies 24h prior"
              className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          {/* Terms checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreeToPolicy}
                onChange={(e) => handleChange('agreeToPolicy', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-maroon-800 accent-maroon-800 cursor-pointer"
              />
              <span className="text-[11px] text-slate-600 leading-relaxed">
                I agree to the <strong>UTSAV Rental & Zero-Damage Policy</strong>. I understand that the items remain the property of UTSAV and will be collected at the scheduled post-event pickup time.
              </span>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};
