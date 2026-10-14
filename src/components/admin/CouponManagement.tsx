import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';

export const CouponManagement: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon, toggleCouponActive } = useBooking();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'flat',
    discountValue: 15,
    minBookingAmount: 10000,
    maxDiscount: 5000,
    validUntil: '2026-12-31',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      code: formData.code.toUpperCase().trim(),
      description: formData.description,
      discountPercentage: formData.discountType === 'percentage' ? Number(formData.discountValue) : undefined,
      flatDiscount: formData.discountType === 'flat' ? Number(formData.discountValue) : undefined,
      minBookingAmount: Number(formData.minBookingAmount),
      maxDiscount: formData.discountType === 'percentage' ? Number(formData.maxDiscount) : undefined,
      validUntil: formData.validUntil,
      usageCount: 0,
      isActive: true,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gold-200 shadow-sm">
        <div>
          <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gold-600" /> Wedding Season Discounts & Promo Codes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Create festive incentives, bundle savings, and VIP discount coupons.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`bg-white rounded-3xl p-6 border-2 transition duration-300 shadow-sm flex flex-col justify-between ${
              c.isActive ? 'border-gold-300' : 'border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-base font-black tracking-wider text-maroon-900 bg-gold-100 px-3 py-1 rounded-xl border border-gold-300">
                  {c.code}
                </span>

                <button
                  onClick={() => toggleCouponActive(c.id)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    c.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {c.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {c.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                {c.description}
              </p>

              <div className="bg-ivory-50 p-3 rounded-xl border border-gold-100 text-xs space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Discount Benefit:</span>
                  <span className="font-bold text-maroon-900">
                    {c.discountPercentage ? `${c.discountPercentage}% OFF` : `Flat ₹${c.flatDiscount?.toLocaleString('en-IN')} OFF`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Min. Booking:</span>
                  <span className="font-semibold text-slate-800">₹{c.minBookingAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expires:</span>
                  <span className="font-semibold text-slate-800">{c.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">Used {c.usageCount} times</span>
              <button
                onClick={() => deleteCoupon(c.id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                title="Delete coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-gold-300 relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-maroon-950">
                Create Festive Discount Coupon
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SANGEET25"
                  className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl uppercase font-bold text-maroon-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Get 25% off for all Sangeet lighting setups"
                  className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Value ({formData.discountType === 'percentage' ? '%' : '₹'})
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min. Order (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.minBookingAmount}
                    onChange={(e) => setFormData({ ...formData, minBookingAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    required
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-maroon-800 text-gold-200 rounded-xl font-bold shadow"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
