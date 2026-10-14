export const UTSAV_VERSION = '2026.1';

export type EventCategory = 
  | 'wedding'
  | 'haldi'
  | 'mehndi'
  | 'engagement'
  | 'birthday'
  | 'anniversary'
  | 'reception'
  | 'cocktail-party'
  | 'pooja-spiritual';

export type DecorType = 
  | 'mandap'
  | 'backdrop'
  | 'floral'
  | 'lighting'
  | 'furniture'
  | 'stage'
  | 'entryway'
  | 'table-setting'
  | 'props-accessories';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  category: EventCategory;
  decorType: DecorType;
  pricePerDay: number; // in INR ₹
  securityDeposit: number; // in INR ₹
  setupFee: number; // in INR ₹
  images: string[];
  dimensions: string;
  material: string;
  setupTimeHours: number;
  totalStock: number;
  availableStock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
  inclusions: string[];
  exclusions: string[];
  specifications: Record<string, string>;
}

export interface PackageInclusion {
  productId: string;
  productName: string;
  quantity: number;
}

export interface DecorPackage {
  id: string;
  name: string;
  tagline: string;
  eventType: EventCategory;
  originalPrice: number;
  packagePrice: number;
  savings: number;
  image: string;
  durationDays: number;
  includesSetup: boolean;
  includesTransport: boolean;
  featured?: boolean;
  items: string[];
  idealForGuests: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  rentalDays: number;
  withSetupCrew: boolean;
}

export type BookingStatusType = 
  | 'Pending'
  | 'Confirmed'
  | 'Crew Assigned'
  | 'In Transit'
  | 'Setup Completed'
  | 'Event Active'
  | 'Picked Up'
  | 'Deposit Refunded'
  | 'Cancelled';

export interface Booking {
  id: string; // e.g. UTSAV-2026-9214
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventType: string;
  venueName: string;
  venueAddress: string;
  city: string;
  pincode: string;
  startDate: string;
  endDate: string;
  rentalDays: number;
  items: {
    productId: string;
    productName: string;
    image: string;
    quantity: number;
    pricePerDay: number;
    totalItemPrice: number;
    securityDeposit: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  setupCrewFee: number;
  securityDeposit: number;
  couponCode?: string;
  discount: number;
  tax: number; // GST 18%
  grandTotal: number;
  paymentMethod: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'CashOnSetup';
  paymentStatus: 'Paid' | 'Advance Paid (30%)' | 'Pending';
  status: BookingStatusType;
  trackingSteps: {
    step: string;
    date: string;
    completed: boolean;
    notes?: string;
  }[];
  assignedCrewLeader?: string;
  crewContact?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountPercentage?: number;
  flatDiscount?: number;
  minBookingAmount: number;
  maxDiscount?: number;
  validUntil: string;
  usageCount: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  city: string;
  eventType: string;
  rating: number;
  comment: string;
  date: string;
  userImage?: string;
  eventImage?: string;
  verifiedBooking: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  savedAddresses: {
    id: string;
    label: string; // e.g. "Royal Orchid Resort, Bangalore"
    venueName: string;
    address: string;
    city: string;
    pincode: string;
    isDefault?: boolean;
  }[];
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  totalStock: number;
  inRentCount: number;
  inMaintenanceCount: number;
  availableCount: number;
  condition: 'Pristine' | 'Good' | 'Needs Polish' | 'Under Repair';
  nextMaintenanceDate: string;
}
