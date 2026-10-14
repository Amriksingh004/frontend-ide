import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  CalendarCheck, 
  Boxes, 
  Users, 
  Tag, 
  Settings, 
  ArrowLeft 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export type AdminTab = 'overview' | 'products' | 'bookings' | 'inventory' | 'customers' | 'coupons';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { bookings, products, coupons } = useBooking();

  const navItems = [
    { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Fleet', icon: Package, badge: products.length },
    { id: 'bookings', label: 'Booking Orders', icon: CalendarCheck, badge: bookings.length },
    { id: 'inventory', label: 'Inventory Stock', icon: Boxes },
    { id: 'customers', label: 'Customer CRM', icon: Users },
    { id: 'coupons', label: 'Coupons & Deals', icon: Tag, badge: coupons.filter(c => c.isActive).length },
  ];

  return (
    <aside className="w-full lg:w-64 bg-maroon-900 text-gold-100 flex-shrink-0 p-4 border-r border-gold-500/20 lg:min-h-[calc(100vh-65px)]">
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-gold-500 text-maroon-950 shadow-md font-extrabold'
                  : 'text-gold-200/80 hover:bg-maroon-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-maroon-950' : 'text-gold-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-maroon-950 text-gold-300' : 'bg-maroon-800 text-gold-200 border border-gold-500/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
