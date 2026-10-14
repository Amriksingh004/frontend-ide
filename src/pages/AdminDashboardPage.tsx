import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { DashboardStats } from '../components/admin/DashboardStats';
import { ProductManagement } from '../components/admin/ProductManagement';
import { BookingManagement } from '../components/admin/BookingManagement';
import { InventoryManagement } from '../components/admin/InventoryManagement';
import { CustomerManagement } from '../components/admin/CustomerManagement';
import { CouponManagement } from '../components/admin/CouponManagement';
import { ShieldAlert, Sparkles } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, login } = useBooking();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // If not admin, provide quick role switch
  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border-2 border-gold-300 text-center shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-100 text-maroon-900 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6 text-maroon-800" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-maroon-950">
            Admin Access Required
          </h2>
          <p className="text-xs text-slate-500">
            You are currently signed in as a Customer (Host). Switch to the Administrator role to access the warehouse fleet & booking management console.
          </p>
          <button
            onClick={() => login('admin@utsavdecor.in', 'admin')}
            className="w-full py-3 bg-maroon-900 hover:bg-maroon-800 text-gold-200 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
          >
            Switch to Admin Role (Demo Access)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AdminNavbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Main Admin View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <DashboardStats />}
            {activeTab === 'products' && <ProductManagement />}
            {activeTab === 'bookings' && <BookingManagement />}
            {activeTab === 'inventory' && <InventoryManagement />}
            {activeTab === 'customers' && <CustomerManagement />}
            {activeTab === 'coupons' && <CouponManagement />}
          </div>
        </main>
      </div>
    </div>
  );
};
