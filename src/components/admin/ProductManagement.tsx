import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import type { Product, EventCategory, DecorType } from '../../types';
import { Plus, Edit2, Trash2, Search, X, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useBooking();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    description: '',
    category: 'wedding' as EventCategory,
    decorType: 'mandap' as DecorType,
    pricePerDay: 15000,
    securityDeposit: 8000,
    setupFee: 2000,
    images: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    dimensions: '15ft x 15ft',
    material: 'Premium velvet & hand-carved wood',
    setupTimeHours: 4,
    totalStock: 5,
    tags: 'Wedding, Luxury, Handcrafted',
    inclusions: 'Main frame, Fabric canopy, 4 Corner lights',
    exclusions: 'Flowers, Pandit samagri',
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      hindiName: '',
      description: '',
      category: 'wedding',
      decorType: 'mandap',
      pricePerDay: 15000,
      securityDeposit: 8000,
      setupFee: 2000,
      images: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      dimensions: '15ft x 15ft',
      material: 'Premium velvet & carved pillars',
      setupTimeHours: 4,
      totalStock: 5,
      tags: 'Wedding, Royal, Luxury',
      inclusions: 'Frame, Canopy, 4 Focus Lamps',
      exclusions: 'Puja samagri',
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      hindiName: p.hindiName || '',
      description: p.description,
      category: p.category,
      decorType: p.decorType,
      pricePerDay: p.pricePerDay,
      securityDeposit: p.securityDeposit,
      setupFee: p.setupFee,
      images: p.images.join(', '),
      dimensions: p.dimensions,
      material: p.material,
      setupTimeHours: p.setupTimeHours,
      totalStock: p.totalStock,
      tags: p.tags.join(', '),
      inclusions: p.inclusions.join(', '),
      exclusions: p.exclusions.join(', '),
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArr = formData.images.split(',').map(s => s.trim()).filter(Boolean);
    const tagsArr = formData.tags.split(',').map(s => s.trim()).filter(Boolean);
    const incArr = formData.inclusions.split(',').map(s => s.trim()).filter(Boolean);
    const excArr = formData.exclusions.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        hindiName: formData.hindiName,
        description: formData.description,
        category: formData.category,
        decorType: formData.decorType,
        pricePerDay: Number(formData.pricePerDay),
        securityDeposit: Number(formData.securityDeposit),
        setupFee: Number(formData.setupFee),
        images: imagesArr.length > 0 ? imagesArr : [formData.images],
        dimensions: formData.dimensions,
        material: formData.material,
        setupTimeHours: Number(formData.setupTimeHours),
        totalStock: Number(formData.totalStock),
        availableStock: Number(formData.totalStock),
        tags: tagsArr,
        inclusions: incArr,
        exclusions: excArr,
      });
    } else {
      addProduct({
        name: formData.name,
        hindiName: formData.hindiName,
        description: formData.description,
        category: formData.category,
        decorType: formData.decorType,
        pricePerDay: Number(formData.pricePerDay),
        securityDeposit: Number(formData.securityDeposit),
        setupFee: Number(formData.setupFee),
        images: imagesArr.length > 0 ? imagesArr : [formData.images],
        dimensions: formData.dimensions,
        material: formData.material,
        setupTimeHours: Number(formData.setupTimeHours),
        totalStock: Number(formData.totalStock),
        availableStock: Number(formData.totalStock),
        rating: 5.0,
        reviewCount: 1,
        featured: true,
        tags: tagsArr,
        inclusions: incArr,
        exclusions: excArr,
        specifications: { 'Assembly': 'Professional Crew Required' },
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gold-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search decor item or category..."
            className="w-full pl-9 pr-4 py-2 bg-ivory-50 border border-gold-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-maroon-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Decor Set
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gold-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-gold-200">
              <tr>
                <th className="p-4">Item & Visual</th>
                <th className="p-4">Occasion & Type</th>
                <th className="p-4">Daily Rate</th>
                <th className="p-4">Deposit</th>
                <th className="p-4">Stock Fleet</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gold-50/40 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gold-200 flex-shrink-0"
                      />
                      <div>
                        <span className="font-serif font-bold text-maroon-950 block text-sm">
                          {p.name}
                        </span>
                        {p.hindiName && (
                          <span className="text-[10px] text-gold-600 font-semibold block">
                            {p.hindiName}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-block bg-maroon-100 text-maroon-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {p.category}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5 capitalize">
                      {p.decorType}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-maroon-900 text-sm">
                    ₹{p.pricePerDay.toLocaleString('en-IN')}/day
                  </td>

                  <td className="p-4 text-emerald-800 font-bold">
                    ₹{p.securityDeposit.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800">{p.totalStock} units</span>
                    <span className="block text-[10px] text-emerald-600">
                      {p.availableStock} currently free
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-500 hover:text-maroon-800 hover:bg-gold-100 rounded-lg transition"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl border-2 border-gold-300 relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-maroon-950">
                {editingProduct ? 'Edit Decor Item' : 'Add New Decor Fleet Item'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hindi Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    placeholder="e.g. राजसी शहनाई मंडप"
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occasion / Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl cursor-pointer"
                  >
                    <option value="wedding">Weddings & Mandaps</option>
                    <option value="haldi">Haldi Ceremonies</option>
                    <option value="mehndi">Mehndi & Sangeet</option>
                    <option value="reception">Grand Receptions</option>
                    <option value="birthday">Birthdays & Anniversaries</option>
                    <option value="pooja-spiritual">Pooja & Spiritual</option>
                    <option value="cocktail-party">Cocktails & Parties</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Decor Type *</label>
                  <select
                    value={formData.decorType}
                    onChange={(e) => setFormData({ ...formData, decorType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl cursor-pointer"
                  >
                    <option value="mandap">Mandap</option>
                    <option value="stage">Stage / Swing</option>
                    <option value="backdrop">Backdrop / Lounge</option>
                    <option value="entryway">Grand Entrance Arch</option>
                    <option value="lighting">Lighting & Special Effects</option>
                    <option value="furniture">Royal Furniture</option>
                    <option value="props-accessories">Props & Urlis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Daily Rental Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Security Deposit (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setup Crew Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.setupFee}
                    onChange={(e) => setFormData({ ...formData, setupFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Stock in Warehouse *</label>
                  <input
                    type="number"
                    required
                    value={formData.totalStock}
                    onChange={(e) => setFormData({ ...formData, totalStock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setup Time (Hours)</label>
                  <input
                    type="number"
                    value={formData.setupTimeHours}
                    onChange={(e) => setFormData({ ...formData, setupTimeHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URLs (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-3 py-2 bg-ivory-50 border border-gold-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-maroon-800 text-gold-200 rounded-xl font-bold shadow"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
